from flask import Blueprint, request, jsonify
from app.utils.jwt_auth import token_required, customer_required
from app.extensions import mongo
from app.models.field import Field
from app.models.booking import Booking
from app.models.payment import Payment
from app.models.voucher import Voucher
from app.models.notification import Notification
from app.models.user import User
from app.models.profile import Profile
from bson import ObjectId
from datetime import datetime, timezone, timedelta
import json

customer_api_bp = Blueprint('customer_api', __name__)

# ==================== FIELDS API ====================

@customer_api_bp.route('/fields/featured', methods=['GET'])
def get_featured_fields():
    """Get featured fields for homepage"""
    try:
        # Get featured fields (is_featured = True)
        fields_data = list(mongo.db.fields.find({'is_featured': True, 'is_active': True}).limit(6))
        
        fields = []
        for field_data in fields_data:
            field = Field.from_dict(field_data)
            fields.append({
                'id': field.id,
                'name': field.name,
                'location': field.location,
                'field_type': field.field_type,
                'price_per_slot': field.price_per_slot,
                'is_indoor': field.is_indoor,
                'images': field.images[:1] if field.images else [],  # First image only
                'description': field.description
            })
        
        return jsonify({
            'success': True,
            'data': fields,
            'message': 'Lấy danh sách sân nổi bật thành công'
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Lỗi: {str(e)}'
        }), 500

@customer_api_bp.route('/fields', methods=['GET'])
def get_fields():
    """Get fields with filtering"""
    try:
        # Get query parameters
        field_type = request.args.get('type')
        location = request.args.get('location')
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))
        
        # Build filter
        filter_query = {'is_active': True}
        if field_type:
            filter_query['field_type'] = field_type
        if location:
            filter_query['location'] = {'$regex': location, '$options': 'i'}
        
        # Get total count
        total = mongo.db.fields.count_documents(filter_query)
        
        # Get fields with pagination
        skip = (page - 1) * per_page
        fields_data = list(mongo.db.fields.find(filter_query).skip(skip).limit(per_page))
        
        fields = []
        for field_data in fields_data:
            field = Field.from_dict(field_data)
            fields.append({
                'id': field.id,
                'name': field.name,
                'location': field.location,
                'field_type': field.field_type,
                'price_per_slot': field.price_per_slot,
                'is_indoor': field.is_indoor,
                'images': field.images[:1] if field.images else [],
                'description': field.description
            })
        
        return jsonify({
            'success': True,
            'data': fields,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': total,
                'pages': (total + per_page - 1) // per_page
            },
            'message': 'Lấy danh sách sân thành công'
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Lỗi: {str(e)}'
        }), 500

@customer_api_bp.route('/fields/<field_id>', methods=['GET'])
def get_field_detail(field_id):
    """Get field details and availability"""
    try:
        if not ObjectId.is_valid(field_id):
            return jsonify({
                'success': False,
                'message': 'ID sân không hợp lệ'
            }), 400
        
        field_data = mongo.db.fields.find_one({'_id': ObjectId(field_id), 'is_active': True})
        if not field_data:
            return jsonify({
                'success': False,
                'message': 'Sân không tồn tại'
            }), 404
        
        field = Field.from_dict(field_data)
        
        # Get field details
        field_detail = {
            'id': field.id,
            'name': field.name,
            'location': field.location,
            'field_type': field.field_type,
            'price_per_slot': field.price_per_slot,
            'is_indoor': field.is_indoor,
            'images': field.images,
            'description': field.description,
            'created_at': field.created_at.isoformat() if field.created_at else None
        }
        
        # Get availability for next 7 days
        availability = []
        current_date = datetime.now(timezone.utc).date()
        
        for i in range(7):
            check_date = current_date + timedelta(days=i)
            
            # Get bookings for this date
            bookings = list(mongo.db.bookings.find({
                'field_id': ObjectId(field_id),
                'date': check_date,
                'status': {'$in': ['pending', 'confirmed']}
            }))
            
            # Calculate available slots
            booked_slots = []
            for booking in bookings:
                booked_slots.append({
                    'start_time': booking['start_time'],
                    'end_time': booking['end_time']
                })
            
            availability.append({
                'date': check_date.isoformat(),
                'booked_slots': booked_slots
            })
        
        field_detail['availability'] = availability
        
        return jsonify({
            'success': True,
            'data': field_detail,
            'message': 'Lấy chi tiết sân thành công'
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Lỗi: {str(e)}'
        }), 500

# ==================== BOOKINGS API ====================

@customer_api_bp.route('/bookings', methods=['POST'])
@token_required
@customer_required
def create_booking(current_user):
    """Create a new booking"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['field_id', 'date', 'start_time', 'end_time', 'payment_method']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'message': f'Thiếu thông tin: {field}'
                }), 400
        
        field_id = data['field_id']
        if not ObjectId.is_valid(field_id):
            return jsonify({
                'success': False,
                'message': 'ID sân không hợp lệ'
            }), 400
        
        # Check if field exists
        field_data = mongo.db.fields.find_one({'_id': ObjectId(field_id), 'is_active': True})
        if not field_data:
            return jsonify({
                'success': False,
                'message': 'Sân không tồn tại'
            }), 404
        
        field = Field.from_dict(field_data)
        
        # Check if time slot is available
        booking_date = datetime.strptime(data['date'], '%Y-%m-%d').date()
        start_time = data['start_time']
        end_time = data['end_time']
        
        # Check for conflicts
        existing_booking = mongo.db.bookings.find_one({
            'field_id': ObjectId(field_id),
            'date': booking_date,
            'status': {'$in': ['pending', 'confirmed']},
            '$or': [
                {
                    'start_time': {'$lt': end_time},
                    'end_time': {'$gt': start_time}
                }
            ]
        })
        
        if existing_booking:
            return jsonify({
                'success': False,
                'message': 'Thời gian này đã được đặt'
            }), 400
        
        # Calculate duration and price
        start_hour = int(start_time.split(':')[0])
        end_hour = int(end_time.split(':')[0])
        duration = end_hour - start_hour
        total_price = duration * field.price_per_slot
        
        # Apply voucher if provided
        voucher_discount = 0
        if 'voucher_code' in data and data['voucher_code']:
            voucher_data = mongo.db.vouchers.find_one({
                'code': data['voucher_code'],
                'is_active': True
            })
            
            if voucher_data:
                voucher = Voucher.from_dict(voucher_data)
                is_valid, message = voucher.is_valid()
                
                if is_valid and total_price >= voucher.min_amount:
                    voucher_discount = voucher.calculate_discount(total_price)
                    total_price -= voucher_discount
        
        # Create booking
        booking = Booking(
            user_id=str(current_user.id),
            field_id=field_id,
            date=booking_date,
            start_time=start_time,
            end_time=end_time,
            duration=duration,
            total_price=total_price,
            status='pending',
            payment_method=data['payment_method']
        )
        
        booking_data = booking.to_dict()
        booking_data['created_at'] = datetime.now(timezone.utc)
        
        result = mongo.db.bookings.insert_one(booking_data)
        booking.id = str(result.inserted_id)
        
        # Create payment record
        payment = Payment(
            booking_id=booking.id,
            user_id=str(current_user.id),
            field_id=field_id,
            owner_id=str(field.owner_id),
            amount=total_price,
            payment_method=data['payment_method'],
            status='pending'
        )
        
        payment_data = payment.to_dict()
        payment_data['created_at'] = datetime.now(timezone.utc)
        payment_data['updated_at'] = datetime.now(timezone.utc)
        
        mongo.db.payments.insert_one(payment_data)
        
        # Create notification for owner
        notification = Notification(
            user_id=str(field.owner_id),
            title='Booking mới cần duyệt',
            message=f'Có booking mới cho sân {field.name} - Khách hàng: {current_user.full_name}',
            type='booking',
            subtype='urgent',
            data={
                'booking_id': booking.id,
                'field_name': field.name,
                'customer_name': current_user.full_name,
                'booking_time': f"{data['date']} {start_time}-{end_time}",
                'amount': total_price
            },
            action_required=True
        )
        
        notification_data = notification.to_dict()
        notification_data['created_at'] = datetime.now(timezone.utc)
        
        mongo.db.notifications.insert_one(notification_data)
        
        return jsonify({
            'success': True,
            'data': {
                'booking_id': booking.id,
                'total_price': total_price,
                'voucher_discount': voucher_discount
            },
            'message': 'Đặt sân thành công'
        }), 201
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Lỗi: {str(e)}'
        }), 500

@customer_api_bp.route('/users/<user_id>/bookings', methods=['GET'])
@token_required
@customer_required
def get_user_bookings(current_user, user_id):
    """Get user's booking history"""
    try:
        # Check if user is requesting their own bookings
        if str(current_user.id) != user_id:
            return jsonify({
                'success': False,
                'message': 'Không có quyền truy cập'
            }), 403
        
        if not ObjectId.is_valid(user_id):
            return jsonify({
                'success': False,
                'message': 'ID người dùng không hợp lệ'
            }), 400
        
        # Get query parameters
        status = request.args.get('status')
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))
        
        # Build filter
        filter_query = {'user_id': ObjectId(user_id)}
        if status:
            filter_query['status'] = status
        
        # Get total count
        total = mongo.db.bookings.count_documents(filter_query)
        
        # Get bookings with pagination
        skip = (page - 1) * per_page
        bookings_data = list(mongo.db.bookings.find(filter_query).sort('created_at', -1).skip(skip).limit(per_page))
        
        bookings = []
        for booking_data in bookings_data:
            booking = Booking.from_dict(booking_data)
            
            # Get field info
            field_data = mongo.db.fields.find_one({'_id': ObjectId(booking.field_id)})
            field_name = field_data['name'] if field_data else 'Unknown Field'
            
            # Get payment info
            payment_data = mongo.db.payments.find_one({'booking_id': ObjectId(booking.id)})
            payment_status = payment_data['status'] if payment_data else 'unknown'
            
            bookings.append({
                'id': booking.id,
                'field_name': field_name,
                'date': booking.date.isoformat() if booking.date else None,
                'start_time': booking.start_time,
                'end_time': booking.end_time,
                'duration': booking.duration,
                'total_price': booking.total_price,
                'status': booking.status,
                'payment_status': payment_status,
                'created_at': booking.created_at.isoformat() if booking.created_at else None
            })
        
        return jsonify({
            'success': True,
            'data': bookings,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': total,
                'pages': (total + per_page - 1) // per_page
            },
            'message': 'Lấy lịch sử đặt sân thành công'
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Lỗi: {str(e)}'
        }), 500

# ==================== VOUCHERS API ====================

@customer_api_bp.route('/vouchers/active', methods=['GET'])
def get_active_vouchers():
    """Get active vouchers for homepage"""
    try:
        current_time = datetime.now(timezone.utc)
        
        vouchers_data = list(mongo.db.vouchers.find({
            'is_active': True,
            '$or': [
                {'valid_from': {'$lte': current_time}},
                {'valid_from': None}
            ],
            '$or': [
                {'valid_until': {'$gte': current_time}},
                {'valid_until': None}
            ]
        }).limit(5))
        
        vouchers = []
        for voucher_data in vouchers_data:
            voucher = Voucher.from_dict(voucher_data)
            vouchers.append({
                'id': voucher.id,
                'code': voucher.code,
                'name': voucher.name,
                'description': voucher.description,
                'discount_type': voucher.discount_type,
                'discount_value': voucher.discount_value,
                'min_amount': voucher.min_amount,
                'max_discount': voucher.max_discount,
                'valid_until': voucher.valid_until.isoformat() if voucher.valid_until else None
            })
        
        return jsonify({
            'success': True,
            'data': vouchers,
            'message': 'Lấy danh sách voucher thành công'
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Lỗi: {str(e)}'
        }), 500

@customer_api_bp.route('/users/<user_id>/vouchers', methods=['GET'])
@token_required
@customer_required
def get_user_vouchers(current_user, user_id):
    """Get user's available vouchers"""
    try:
        # Check if user is requesting their own vouchers
        if str(current_user.id) != user_id:
            return jsonify({
                'success': False,
                'message': 'Không có quyền truy cập'
            }), 403
        
        current_time = datetime.now(timezone.utc)
        
        # Get active vouchers
        vouchers_data = list(mongo.db.vouchers.find({
            'is_active': True,
            '$or': [
                {'valid_from': {'$lte': current_time}},
                {'valid_from': None}
            ],
            '$or': [
                {'valid_until': {'$gte': current_time}},
                {'valid_until': None}
            ]
        }))
        
        vouchers = []
        for voucher_data in vouchers_data:
            voucher = Voucher.from_dict(voucher_data)
            is_valid, message = voucher.is_valid()
            
            if is_valid:
                vouchers.append({
                    'id': voucher.id,
                    'code': voucher.code,
                    'name': voucher.name,
                    'description': voucher.description,
                    'discount_type': voucher.discount_type,
                    'discount_value': voucher.discount_value,
                    'min_amount': voucher.min_amount,
                    'max_discount': voucher.max_discount,
                    'valid_until': voucher.valid_until.isoformat() if voucher.valid_until else None,
                    'usage_limit': voucher.usage_limit,
                    'used_count': voucher.used_count
                })
        
        return jsonify({
            'success': True,
            'data': vouchers,
            'message': 'Lấy danh sách voucher thành công'
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Lỗi: {str(e)}'
        }), 500

# ==================== PAYMENTS API ====================

@customer_api_bp.route('/payments', methods=['POST'])
@token_required
@customer_required
def create_payment(current_user):
    """Create payment for booking"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['booking_id', 'amount', 'payment_method']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'message': f'Thiếu thông tin: {field}'
                }), 400
        
        booking_id = data['booking_id']
        if not ObjectId.is_valid(booking_id):
            return jsonify({
                'success': False,
                'message': 'ID booking không hợp lệ'
            }), 400
        
        # Check if booking exists and belongs to user
        booking_data = mongo.db.bookings.find_one({
            '_id': ObjectId(booking_id),
            'user_id': ObjectId(current_user.id)
        })
        
        if not booking_data:
            return jsonify({
                'success': False,
                'message': 'Booking không tồn tại'
            }), 404
        
        # Update payment status
        result = mongo.db.payments.update_one(
            {'booking_id': ObjectId(booking_id)},
            {
                '$set': {
                    'status': 'completed',
                    'payment_date': datetime.now(timezone.utc),
                    'updated_at': datetime.now(timezone.utc)
                }
            }
        )
        
        if result.modified_count == 0:
            return jsonify({
                'success': False,
                'message': 'Không thể cập nhật thanh toán'
            }), 400
        
        # Update booking status
        mongo.db.bookings.update_one(
            {'_id': ObjectId(booking_id)},
            {'$set': {'status': 'confirmed'}}
        )
        
        return jsonify({
            'success': True,
            'message': 'Thanh toán thành công'
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Lỗi: {str(e)}'
        }), 500

@customer_api_bp.route('/users/<user_id>/payments', methods=['GET'])
@token_required
@customer_required
def get_user_payments(current_user, user_id):
    """Get user's payment history"""
    try:
        # Check if user is requesting their own payments
        if str(current_user.id) != user_id:
            return jsonify({
                'success': False,
                'message': 'Không có quyền truy cập'
            }), 403
        
        if not ObjectId.is_valid(user_id):
            return jsonify({
                'success': False,
                'message': 'ID người dùng không hợp lệ'
            }), 400
        
        # Get query parameters
        status = request.args.get('status')
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))
        
        # Build filter
        filter_query = {'user_id': ObjectId(user_id)}
        if status:
            filter_query['status'] = status
        
        # Get total count
        total = mongo.db.payments.count_documents(filter_query)
        
        # Get payments with pagination
        skip = (page - 1) * per_page
        payments_data = list(mongo.db.payments.find(filter_query).sort('created_at', -1).skip(skip).limit(per_page))
        
        payments = []
        for payment_data in payments_data:
            payment = Payment.from_dict(payment_data)
            
            # Get booking info
            booking_data = mongo.db.bookings.find_one({'_id': ObjectId(payment.booking_id)})
            booking_info = None
            if booking_data:
                booking = Booking.from_dict(booking_data)
                booking_info = {
                    'date': booking.date.isoformat() if booking.date else None,
                    'start_time': booking.start_time,
                    'end_time': booking.end_time
                }
            
            # Get field info
            field_data = mongo.db.fields.find_one({'_id': ObjectId(payment.field_id)})
            field_name = field_data['name'] if field_data else 'Unknown Field'
            
            payments.append({
                'id': payment.id,
                'booking_info': booking_info,
                'field_name': field_name,
                'amount': payment.amount,
                'payment_method': payment.payment_method,
                'status': payment.status,
                'payment_date': payment.payment_date.isoformat() if payment.payment_date else None,
                'created_at': payment.created_at.isoformat() if payment.created_at else None
            })
        
        return jsonify({
            'success': True,
            'data': payments,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': total,
                'pages': (total + per_page - 1) // per_page
            },
            'message': 'Lấy lịch sử thanh toán thành công'
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Lỗi: {str(e)}'
        }), 500

# ==================== PROFILE API ====================

@customer_api_bp.route('/users/<user_id>', methods=['PUT'])
@token_required
@customer_required
def update_user_profile(current_user, user_id):
    """Update user profile"""
    try:
        # Check if user is updating their own profile
        if str(current_user.id) != user_id:
            return jsonify({
                'success': False,
                'message': 'Không có quyền truy cập'
            }), 403
        
        if not ObjectId.is_valid(user_id):
            return jsonify({
                'success': False,
                'message': 'ID người dùng không hợp lệ'
            }), 400
        
        data = request.get_json()
        
        # Validate profile data
        if 'full_name' in data:
            is_valid, message = Profile.validate_full_name(data['full_name'])
            if not is_valid:
                return jsonify({
                    'success': False,
                    'message': message
                }), 400
        
        if 'phone' in data:
            is_valid, message = Profile.validate_phone(data['phone'])
            if not is_valid:
                return jsonify({
                    'success': False,
                    'message': message
                }), 400
        
        if 'gender' in data:
            is_valid, message = Profile.validate_gender(data['gender'])
            if not is_valid:
                return jsonify({
                    'success': False,
                    'message': message
                }), 400
        
        # Update or create profile
        profile_data = {
            'user_id': ObjectId(user_id),
            'updated_at': datetime.now(timezone.utc)
        }
        
        # Add fields that are provided
        profile_fields = ['full_name', 'phone', 'address', 'birthday', 'gender', 'bio']
        for field in profile_fields:
            if field in data:
                profile_data[field] = data[field]
        
        # Check if profile exists
        existing_profile = mongo.db.profiles.find_one({'user_id': ObjectId(user_id)})
        
        if existing_profile:
            # Update existing profile
            result = mongo.db.profiles.update_one(
                {'user_id': ObjectId(user_id)},
                {'$set': profile_data}
            )
        else:
            # Create new profile
            profile_data['created_at'] = datetime.now(timezone.utc)
            result = mongo.db.profiles.insert_one(profile_data)
        
        if result.modified_count > 0 or result.inserted_id:
            return jsonify({
                'success': True,
                'message': 'Cập nhật hồ sơ thành công'
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Không thể cập nhật hồ sơ'
            }), 400
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Lỗi: {str(e)}'
        }), 500 