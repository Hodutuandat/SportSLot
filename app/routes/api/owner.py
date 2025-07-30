from flask import Blueprint, request, jsonify
from app.utils.jwt_auth import owner_required, get_current_user_from_token
from app.models.field import Field
from app.models.booking import Booking
from app.models.payment import Payment
from app.models.notification import Notification
from app.extensions import mongo
from bson import ObjectId
from datetime import datetime, timedelta
import json

owner_api_bp = Blueprint('owner_api', __name__)

# Dashboard Statistics
@owner_api_bp.route('/dashboard', methods=['GET'])
@owner_required
def get_dashboard_stats():
    """Get owner dashboard statistics"""
    try:
        user = get_current_user_from_token()
        owner_id = str(user['_id'])
        
        # Get owner's fields
        fields = list(mongo.db.fields.find({'owner_id': ObjectId(owner_id)}))
        
        # Calculate statistics
        total_fields = len(fields)
        active_fields = len([f for f in fields if f.get('status') == 'active'])
        
        # Get bookings for owner's fields
        field_ids = [f['_id'] for f in fields]
        total_bookings = mongo.db.bookings.count_documents({'field_id': {'$in': field_ids}})
        
        # Calculate monthly revenue
        current_month = datetime.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        monthly_bookings = list(mongo.db.bookings.find({
            'field_id': {'$in': field_ids},
            'created_at': {'$gte': current_month}
        }))
        
        monthly_revenue = sum(booking.get('total_price', 0) for booking in monthly_bookings)
        
        # Pending bookings
        pending_bookings = mongo.db.bookings.count_documents({
            'field_id': {'$in': field_ids},
            'status': 'pending'
        })
        
        # Recent bookings (last 5)
        recent_bookings = list(mongo.db.bookings.find({
            'field_id': {'$in': field_ids}
        }).sort('created_at', -1).limit(5))
        
        # Format recent bookings
        formatted_bookings = []
        for booking in recent_bookings:
            field = mongo.db.fields.find_one({'_id': booking['field_id']})
            customer = mongo.db.users.find_one({'_id': booking['user_id']})
            
            formatted_bookings.append({
                'id': str(booking['_id']),
                'field_name': field['name'] if field else 'Unknown',
                'customer_name': customer['full_name'] if customer else 'Unknown',
                'date': booking['booking_date'].strftime('%Y-%m-%d'),
                'time': booking['time_slot'],
                'status': booking['status'],
                'total_price': booking.get('total_price', 0)
            })
        
        return jsonify({
            'success': True,
            'data': {
                'total_fields': total_fields,
                'active_fields': active_fields,
                'total_bookings': total_bookings,
                'monthly_revenue': monthly_revenue,
                'pending_bookings': pending_bookings,
                'recent_bookings': formatted_bookings
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error getting dashboard stats: {str(e)}'
        }), 500

# Field Management
@owner_api_bp.route('/fields', methods=['GET'])
@owner_required
def get_owner_fields():
    """Get all fields owned by the current owner"""
    try:
        user = get_current_user_from_token()
        owner_id = str(user['_id'])
        
        fields = list(mongo.db.fields.find({'owner_id': ObjectId(owner_id)}))
        
        formatted_fields = []
        for field in fields:
            # Calculate average price
            pricing = field.get('pricing', {})
            prices = [price for price in pricing.values() if price and price > 0]
            avg_price = sum(prices) // len(prices) if prices else 0
            
            formatted_fields.append({
                'id': str(field['_id']),
                'name': field['name'],
                'sport_type': field['sport_type'],
                'type': f"Sân {Field.get_sport_name(field['sport_type'])}",
                'address': field['address'],
                'district': field.get('district', ''),
                'city': field.get('city', ''),
                'status': field.get('status', 'pending'),
                'price': avg_price,
                'total_bookings': field.get('total_bookings', 0),
                'monthly_revenue': field.get('monthly_revenue', 0),
                'created_date': field['created_at'].strftime('%Y-%m-%d'),
                'description': field.get('description', ''),
                'capacity': field.get('capacity'),
                'field_size': field.get('field_size'),
                'images': field.get('images', [])
            })
        
        return jsonify({
            'success': True,
            'data': formatted_fields
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error getting fields: {str(e)}'
        }), 500

@owner_api_bp.route('/fields', methods=['POST'])
@owner_required
def create_field():
    """Create a new field"""
    try:
        user = get_current_user_from_token()
        owner_id = str(user['_id'])
        
        data = request.get_json()
        
        # Validate field data
        errors = Field.validate_field_data(data)
        if errors:
            return jsonify({
                'success': False,
                'message': 'Validation errors',
                'errors': errors
            }), 400
        
        # Create field object
        field_data = {
            'name': data['name'],
            'sport_type': data['sport_type'],
            'description': data.get('description', ''),
            'capacity': data.get('capacity'),
            'field_size': data.get('field_size'),
            'address': data['address'],
            'district': data['district'],
            'city': data['city'],
            'latitude': data.get('latitude'),
            'longitude': data.get('longitude'),
            'parking': data.get('parking'),
            'transportation': data.get('transportation'),
            'amenities': data.get('amenities', []),
            'rules': data.get('rules'),
            'pricing': data.get('pricing', {}),
            'weekday_hours': data.get('weekday_hours', {}),
            'weekend_hours': data.get('weekend_hours', {}),
            'deposit': data.get('deposit'),
            'cancellation': data.get('cancellation'),
            'owner_id': ObjectId(owner_id),
            'status': 'pending',
            'images': data.get('images', []),
            'total_bookings': 0,
            'monthly_revenue': 0,
            'created_at': datetime.now(),
            'updated_at': datetime.now()
        }
        
        # Insert into database
        result = mongo.db.fields.insert_one(field_data)
        
        # Create notification for admin approval
        notification_data = {
            'user_id': ObjectId(owner_id),
            'title': 'Sân mới đã được tạo',
            'message': f'Sân "{data["name"]}" đã được tạo và đang chờ duyệt',
            'type': 'field',
            'subtype': 'created',
            'data': {
                'field_id': str(result.inserted_id),
                'field_name': data['name']
            },
            'is_read': False,
            'action_required': False,
            'created_at': datetime.now()
        }
        mongo.db.notifications.insert_one(notification_data)
        
        return jsonify({
            'success': True,
            'message': 'Sân đã được tạo thành công và đang chờ duyệt!',
            'field_id': str(result.inserted_id)
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error creating field: {str(e)}'
        }), 500

@owner_api_bp.route('/fields/<field_id>', methods=['GET'])
@owner_required
def get_field(field_id):
    """Get specific field details"""
    try:
        user = get_current_user_from_token()
        owner_id = str(user['_id'])
        
        field = mongo.db.fields.find_one({
            '_id': ObjectId(field_id),
            'owner_id': ObjectId(owner_id)
        })
        
        if not field:
            return jsonify({
                'success': False,
                'message': 'Field not found'
            }), 404
        
        # Format field data
        field_data = {
            'id': str(field['_id']),
            'name': field['name'],
            'sport_type': field['sport_type'],
            'description': field.get('description', ''),
            'capacity': field.get('capacity'),
            'field_size': field.get('field_size'),
            'address': field['address'],
            'district': field.get('district'),
            'city': field.get('city'),
            'latitude': field.get('latitude'),
            'longitude': field.get('longitude'),
            'parking': field.get('parking'),
            'transportation': field.get('transportation'),
            'amenities': field.get('amenities', []),
            'rules': field.get('rules'),
            'pricing': field.get('pricing', {}),
            'weekday_hours': field.get('weekday_hours', {}),
            'weekend_hours': field.get('weekend_hours', {}),
            'deposit': field.get('deposit'),
            'cancellation': field.get('cancellation'),
            'status': field.get('status', 'pending'),
            'images': field.get('images', []),
            'total_bookings': field.get('total_bookings', 0),
            'monthly_revenue': field.get('monthly_revenue', 0),
            'created_at': field['created_at'].isoformat(),
            'updated_at': field['updated_at'].isoformat()
        }
        
        return jsonify({
            'success': True,
            'data': field_data
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error getting field: {str(e)}'
        }), 500

@owner_api_bp.route('/fields/<field_id>', methods=['PUT'])
@owner_required
def update_field(field_id):
    """Update field information"""
    try:
        user = get_current_user_from_token()
        owner_id = str(user['_id'])
        
        data = request.get_json()
        
        # Check if field exists and belongs to owner
        field = mongo.db.fields.find_one({
            '_id': ObjectId(field_id),
            'owner_id': ObjectId(owner_id)
        })
        
        if not field:
            return jsonify({
                'success': False,
                'message': 'Field not found'
            }), 404
        
        # Validate field data
        errors = Field.validate_field_data(data)
        if errors:
            return jsonify({
                'success': False,
                'message': 'Validation errors',
                'errors': errors
            }), 400
        
        # Update field data
        update_data = {
            'name': data['name'],
            'sport_type': data['sport_type'],
            'description': data.get('description', ''),
            'capacity': data.get('capacity'),
            'field_size': data.get('field_size'),
            'address': data['address'],
            'district': data['district'],
            'city': data['city'],
            'latitude': data.get('latitude'),
            'longitude': data.get('longitude'),
            'parking': data.get('parking'),
            'transportation': data.get('transportation'),
            'amenities': data.get('amenities', []),
            'rules': data.get('rules'),
            'pricing': data.get('pricing', {}),
            'weekday_hours': data.get('weekday_hours', {}),
            'weekend_hours': data.get('weekend_hours', {}),
            'deposit': data.get('deposit'),
            'cancellation': data.get('cancellation'),
            'updated_at': datetime.now()
        }
        
        # Update in database
        mongo.db.fields.update_one(
            {'_id': ObjectId(field_id)},
            {'$set': update_data}
        )
        
        return jsonify({
            'success': True,
            'message': 'Cập nhật sân thành công!'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error updating field: {str(e)}'
        }), 500

@owner_api_bp.route('/fields/<field_id>/status', methods=['PUT'])
@owner_required
def toggle_field_status(field_id):
    """Toggle field status (active/inactive)"""
    try:
        user = get_current_user_from_token()
        owner_id = str(user['_id'])
        
        data = request.get_json()
        new_status = data.get('status')
        
        if new_status not in ['active', 'inactive']:
            return jsonify({
                'success': False,
                'message': 'Invalid status'
            }), 400
        
        # Check if field exists and belongs to owner
        field = mongo.db.fields.find_one({
            '_id': ObjectId(field_id),
            'owner_id': ObjectId(owner_id)
        })
        
        if not field:
            return jsonify({
                'success': False,
                'message': 'Field not found'
            }), 404
        
        # Update status
        mongo.db.fields.update_one(
            {'_id': ObjectId(field_id)},
            {'$set': {'status': new_status, 'updated_at': datetime.now()}}
        )
        
        status_text = 'kích hoạt' if new_status == 'active' else 'tạm dừng'
        
        return jsonify({
            'success': True,
            'message': f'Đã {status_text} sân thành công!',
            'status': new_status
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error updating field status: {str(e)}'
        }), 500

# Booking Management
@owner_api_bp.route('/bookings', methods=['GET'])
@owner_required
def get_owner_bookings():
    """Get all bookings for owner's fields"""
    try:
        user = get_current_user_from_token()
        owner_id = str(user['_id'])
        
        # Get owner's field IDs
        field_ids = [f['_id'] for f in mongo.db.fields.find({'owner_id': ObjectId(owner_id)})]
        
        if not field_ids:
            return jsonify({
                'success': True,
                'data': []
            })
        
        # Get bookings
        bookings = list(mongo.db.bookings.find({'field_id': {'$in': field_ids}}).sort('created_at', -1))
        
        formatted_bookings = []
        for booking in bookings:
            field = mongo.db.fields.find_one({'_id': booking['field_id']})
            customer = mongo.db.users.find_one({'_id': booking['user_id']})
            
            formatted_bookings.append({
                'id': str(booking['_id']),
                'field_id': str(booking['field_id']),
                'field_name': field['name'] if field else 'Unknown',
                'customer_name': customer['full_name'] if customer else 'Unknown',
                'customer_phone': customer.get('phone', ''),
                'date': booking['booking_date'].strftime('%Y-%m-%d'),
                'time': booking['time_slot'],
                'duration': booking.get('duration', 2),
                'total_price': booking.get('total_price', 0),
                'status': booking['status'],
                'booking_date': booking['created_at'].strftime('%Y-%m-%d'),
                'payment_status': booking.get('payment_status', 'pending')
            })
        
        return jsonify({
            'success': True,
            'data': formatted_bookings
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error getting bookings: {str(e)}'
        }), 500

@owner_api_bp.route('/bookings/<booking_id>/approve', methods=['PUT'])
@owner_required
def approve_booking(booking_id):
    """Approve a booking"""
    try:
        user = get_current_user_from_token()
        owner_id = str(user['_id'])
        
        # Check if booking exists and belongs to owner's field
        booking = mongo.db.bookings.find_one({'_id': ObjectId(booking_id)})
        if not booking:
            return jsonify({
                'success': False,
                'message': 'Booking not found'
            }), 404
        
        field = mongo.db.fields.find_one({'_id': booking['field_id']})
        if not field or str(field['owner_id']) != owner_id:
            return jsonify({
                'success': False,
                'message': 'Unauthorized'
            }), 403
        
        # Update booking status
        mongo.db.bookings.update_one(
            {'_id': ObjectId(booking_id)},
            {'$set': {'status': 'confirmed', 'updated_at': datetime.now()}}
        )
        
        # Create notification for customer
        notification_data = {
            'user_id': booking['user_id'],
            'title': 'Đặt sân được duyệt',
            'message': f'Đặt sân của bạn đã được duyệt thành công',
            'type': 'booking',
            'subtype': 'approved',
            'data': {
                'booking_id': str(booking['_id']),
                'field_name': field['name']
            },
            'is_read': False,
            'action_required': False,
            'created_at': datetime.now()
        }
        mongo.db.notifications.insert_one(notification_data)
        
        return jsonify({
            'success': True,
            'message': 'Đã duyệt đặt sân thành công!'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error approving booking: {str(e)}'
        }), 500

@owner_api_bp.route('/bookings/<booking_id>/reject', methods=['PUT'])
@owner_required
def reject_booking(booking_id):
    """Reject a booking"""
    try:
        user = get_current_user_from_token()
        owner_id = str(user['_id'])
        
        data = request.get_json()
        reason = data.get('reason', 'Chủ sân từ chối đặt sân')
        
        # Check if booking exists and belongs to owner's field
        booking = mongo.db.bookings.find_one({'_id': ObjectId(booking_id)})
        if not booking:
            return jsonify({
                'success': False,
                'message': 'Booking not found'
            }), 404
        
        field = mongo.db.fields.find_one({'_id': booking['field_id']})
        if not field or str(field['owner_id']) != owner_id:
            return jsonify({
                'success': False,
                'message': 'Unauthorized'
            }), 403
        
        # Update booking status
        mongo.db.bookings.update_one(
            {'_id': ObjectId(booking_id)},
            {'$set': {'status': 'rejected', 'rejection_reason': reason, 'updated_at': datetime.now()}}
        )
        
        # Create notification for customer
        notification_data = {
            'user_id': booking['user_id'],
            'title': 'Đặt sân bị từ chối',
            'message': f'Đặt sân của bạn đã bị từ chối: {reason}',
            'type': 'booking',
            'subtype': 'rejected',
            'data': {
                'booking_id': str(booking['_id']),
                'field_name': field['name'],
                'reason': reason
            },
            'is_read': False,
            'action_required': False,
            'created_at': datetime.now()
        }
        mongo.db.notifications.insert_one(notification_data)
        
        return jsonify({
            'success': True,
            'message': 'Đã từ chối đặt sân!'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error rejecting booking: {str(e)}'
        }), 500

# Notifications
@owner_api_bp.route('/notifications', methods=['GET'])
@owner_required
def get_owner_notifications():
    """Get owner notifications"""
    try:
        user = get_current_user_from_token()
        user_id = str(user['_id'])
        
        notifications = list(mongo.db.notifications.find({
            'user_id': ObjectId(user_id)
        }).sort('created_at', -1).limit(50))
        
        formatted_notifications = []
        for notification in notifications:
            formatted_notifications.append({
                'id': str(notification['_id']),
                'title': notification['title'],
                'message': notification['message'],
                'type': notification['type'],
                'subtype': notification.get('subtype'),
                'is_read': notification.get('is_read', False),
                'action_required': notification.get('action_required', False),
                'created_at': notification['created_at'].isoformat(),
                'data': notification.get('data', {})
            })
        
        return jsonify({
            'success': True,
            'data': formatted_notifications
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error getting notifications: {str(e)}'
        }), 500

@owner_api_bp.route('/notifications/<notification_id>/read', methods=['PUT'])
@owner_required
def mark_notification_read(notification_id):
    """Mark notification as read"""
    try:
        user = get_current_user_from_token()
        user_id = str(user['_id'])
        
        result = mongo.db.notifications.update_one(
            {
                '_id': ObjectId(notification_id),
                'user_id': ObjectId(user_id)
            },
            {
                '$set': {
                    'is_read': True,
                    'read_at': datetime.now()
                }
            }
        )
        
        if result.modified_count == 0:
            return jsonify({
                'success': False,
                'message': 'Notification not found'
            }), 404
        
        return jsonify({
            'success': True,
            'message': 'Notification marked as read'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error marking notification read: {str(e)}'
        }), 500

# Transaction History
@owner_api_bp.route('/transactions', methods=['GET'])
@owner_required
def get_owner_transactions():
    """Get owner transaction history"""
    try:
        user = get_current_user_from_token()
        owner_id = str(user['_id'])
        
        # Get owner's field IDs
        field_ids = [f['_id'] for f in mongo.db.fields.find({'owner_id': ObjectId(owner_id)})]
        
        if not field_ids:
            return jsonify({
                'success': True,
                'data': []
            })
        
        # Get payments for owner's fields
        payments = list(mongo.db.payments.find({
            'field_id': {'$in': field_ids}
        }).sort('payment_date', -1))
        
        formatted_transactions = []
        for payment in payments:
            field = mongo.db.fields.find_one({'_id': payment['field_id']})
            customer = mongo.db.users.find_one({'_id': payment['user_id']})
            booking = mongo.db.bookings.find_one({'_id': payment['booking_id']})
            
            formatted_transactions.append({
                'id': str(payment['_id']),
                'customer_name': customer['full_name'] if customer else 'Unknown',
                'field_name': field['name'] if field else 'Unknown',
                'date': payment['payment_date'].strftime('%d/%m/%Y'),
                'time': booking['time_slot'] if booking else '',
                'amount': payment['amount'],
                'status': payment['status'],
                'payment_method': payment['payment_method'],
                'notes': payment.get('notes', '')
            })
        
        return jsonify({
            'success': True,
            'data': formatted_transactions
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error getting transactions: {str(e)}'
        }), 500 