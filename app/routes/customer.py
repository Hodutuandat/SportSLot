from flask import Blueprint, render_template, jsonify, request, flash, redirect, url_for
from flask_login import login_required, current_user
from app.extensions import mongo
from app.models.field import Field
from app.models.booking import Booking
from app.models.profile import Profile
from app.models.review import Review
from bson import ObjectId
from datetime import datetime, timezone

customer_bp = Blueprint('customer', __name__)

fields_data = [
    {"id": 1, "name": "Sân Bóng Đá A", "phone": "0901234567", "address": "Quận 1, TP.HCM", "image": None, "sport": "Bóng đá", "sport_type": "football", "price": 200000, "owner": "Anh Nguyễn Văn A", "type": "Sân cỏ nhân tạo 7 người", "description": "Sân cỏ nhân tạo 7 người, có đèn chiếu sáng, đạt chuẩn FIFA mini."},
    {"id": 2, "name": "Sân Bóng Đá B", "phone": "0902345678", "address": "Quận 7, TP.HCM", "image": None, "sport": "Bóng đá", "sport_type": "football", "price": 180000, "owner": "Chị Trần Thị B", "type": "Sân cỏ nhân tạo 5 người", "description": "Sân cỏ nhân tạo 5 người, mặt cỏ mới, có phòng thay đồ."},
    {"id": 3, "name": "Sân Bóng Chuyền 1", "phone": "0903456789", "address": "Quận Bình Thạnh, TP.HCM", "image": None, "sport": "Bóng chuyền", "sport_type": "volleyball", "price": 150000, "owner": "Anh Lê Văn C", "type": "Sân bóng chuyền tiêu chuẩn", "description": "Sân bóng chuyền tiêu chuẩn, lưới mới, có khu vực khán giả."},
    {"id": 4, "name": "Sân Bóng Rổ Central", "phone": "0904567890", "address": "Quận 3, TP.HCM", "image": None, "sport": "Bóng rổ", "sport_type": "basketball", "price": 170000, "owner": "Anh Phạm Văn D", "type": "Sân bóng rổ tiêu chuẩn", "description": "Sân bóng rổ tiêu chuẩn FIBA, có hệ thống âm thanh hiện đại."},
    {"id": 5, "name": "Sân Tennis Pro", "phone": "0905678901", "address": "Quận 2, TP.HCM", "image": None, "sport": "Tennis", "sport_type": "tennis", "price": 250000, "owner": "Chị Nguyễn Thị E", "type": "Sân tennis cứng", "description": "Sân tennis cứng chất lượng cao, có ghế ngồi và căng tin."},
    {"id": 6, "name": "Sân Cầu Lông Vip", "phone": "0906789012", "address": "Quận 10, TP.HCM", "image": None, "sport": "Cầu lông", "sport_type": "badminton", "price": 120000, "owner": "Anh Lý Văn F", "type": "Sân cầu lông tiêu chuẩn", "description": "Sân cầu lông tiêu chuẩn BWF, sàn gỗ chuyên dụng, ánh sáng tốt."},
]

@customer_bp.route('/fields')
def field_list():
    try:
        # Get fields from MongoDB
        fields_cursor = mongo.db.fields.find()
        fields = []
        for field_data in fields_cursor:
            field = Field.from_dict(field_data)
            # Convert to format expected by template
            field_dict = {
                "id": field.id,
                "name": field.name or '',
                "phone": "0901234567",  # Default phone
                "address": field.location or '',
                "image": field.images[0] if field.images else None,
                "sport": field.field_type.title() if field.field_type else '',
                "sport_type": field.field_type or '',
                "price": field.price_per_slot or 0,
                "owner": "Chủ sân",  # Default owner
                "type": f"Sân {field.field_type}" if field.field_type else 'Sân',
                "description": field.description or ''
            }
            fields.append(field_dict)
        
        # Nếu không có fields trong MongoDB, sử dụng mock data
        if not fields:
            fields = fields_data
            
    except Exception as e:
        import traceback
        traceback.print_exc()
        # Fallback to mock data
        fields = fields_data
    
    return render_template('customer/field_list.html', fields=fields)

@customer_bp.route('/fields/<field_id>')
@login_required
def field_detail(field_id):
    try:
        # Tìm field trong MongoDB
        if ObjectId.is_valid(field_id):
            field_data = mongo.db.fields.find_one({'_id': ObjectId(field_id)})
            if field_data:
                field = Field.from_dict(field_data)
                # Convert to format expected by template
                field_dict = {
                    "id": field.id,
                    "name": field.name or '',
                    "phone": "0901234567",  # Default phone
                    "address": field.location or '',
                    "image": field.images[0] if field.images else None,
                    "sport": field.field_type.title() if field.field_type else '',
                    "sport_type": field.field_type or '',
                    "price": field.price_per_slot or 0,
                    "price_per_slot": field.price_per_slot or 0,  # Add this for consistency
                    "owner": "Chủ sân",  # Default owner
                    "type": f"Sân {field.field_type}" if field.field_type else 'Sân',
                    "description": field.description or ''
                }
                return render_template('customer/field_detail.html', field=field_dict)
        
        # Fallback to mock data
        field = next((f for f in fields_data if str(f["id"]) == str(field_id)), None)
        if not field:
            return "Không tìm thấy sân", 404
        return render_template('customer/field_detail.html', field=field)
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        # Fallback to mock data
        field = next((f for f in fields_data if str(f["id"]) == str(field_id)), None)
        if not field:
            return "Không tìm thấy sân", 404
        return render_template('customer/field_detail.html', field=field)

# XÓA route booking page riêng biệt, chỉ giữ lại booking popup/modal như ban đầu

@customer_bp.route('/booking-history')
@customer_bp.route('/booking-history/<int:page>')
@login_required
def booking_history(page=1):
    try:
        # Lấy bookings từ MongoDB cho user hiện tại
        user_id = current_user.id
        bookings_cursor = mongo.db.bookings.find({'user_id': ObjectId(user_id)}).sort('created_at', -1)
        
        bookings = []
        for booking_data in bookings_cursor:
            booking = Booking.from_dict(booking_data)
            
            # Lấy thông tin field
            field_data = mongo.db.fields.find_one({'_id': ObjectId(booking.field_id)})
            field_name = field_data.get('name', 'Sân không xác định') if field_data else 'Sân không xác định'
            field_address = field_data.get('location', 'Địa chỉ không xác định') if field_data else 'Địa chỉ không xác định'
            
            # Convert to format expected by template
            booking_dict = {
                "id": booking.id,
                "booking_code": f"BK{booking.id[-6:].upper()}",  # Tạo booking code từ ID
                "field_id": booking.field_id,
                "field_name": field_name,
                "field_address": field_address,
                "booking_date": booking.date.strftime('%Y-%m-%d') if hasattr(booking.date, 'strftime') else str(booking.date),
                "start_time": booking.start_time,
                "end_time": booking.end_time,
                "duration": booking.duration,
                "total_price": booking.total_price,
                "payment_method": booking.payment_method or "Chưa thanh toán",
                "status": booking.status
            }
            bookings.append(booking_dict)
        
        # Nếu không có bookings trong MongoDB, sử dụng mock data
        if not bookings:
            # Mock data for booking history
            all_bookings_data = [
        {
            "id": 1,
            "booking_code": "BK001",
            "field_id": 1,
            "field_name": "Sân Bóng Đá A",
            "field_address": "Quận 1, TP.HCM",
            "booking_date": "2024-01-15",
            "start_time": "18:00",
            "end_time": "20:00",
            "duration": 2,
            "total_price": 400000,
            "payment_method": "Chuyển khoản",
            "status": "completed"
        },
        {
            "id": 2,
            "booking_code": "BK002",
            "field_id": 2,
            "field_name": "Sân Bóng Đá B",
            "field_address": "Quận 7, TP.HCM",
            "booking_date": "2024-01-20",
            "start_time": "19:00",
            "end_time": "21:00",
            "duration": 2,
            "total_price": 360000,
            "payment_method": "Tiền mặt",
            "status": "confirmed"
        },
        {
            "id": 3,
            "booking_code": "BK003",
            "field_id": 3,
            "field_name": "Sân Bóng Chuyền 1",
            "field_address": "Quận Bình Thạnh, TP.HCM",
            "booking_date": "2024-01-25",
            "start_time": "20:00",
            "end_time": "22:00",
            "duration": 2,
            "total_price": 300000,
            "payment_method": "Chuyển khoản",
            "status": "pending"
        },
        {
            "id": 4,
            "booking_code": "BK004",
            "field_id": 4,
            "field_name": "Sân Bóng Rổ Central",
            "field_address": "Quận 3, TP.HCM",
            "booking_date": "2024-01-10",
            "start_time": "17:00",
            "end_time": "19:00",
            "duration": 2,
            "total_price": 340000,
            "payment_method": "Tiền mặt",
            "status": "cancelled"
        },
        {
            "id": 5,
            "booking_code": "BK005",
            "field_id": 5,
            "field_name": "Sân Tennis Pro",
            "field_address": "Quận 2, TP.HCM",
            "booking_date": "2024-01-30",
            "start_time": "16:00",
            "end_time": "18:00",
            "duration": 2,
            "total_price": 500000,
            "payment_method": "Chuyển khoản",
            "status": "completed"
        },
        {
            "id": 6,
            "booking_code": "BK006",
            "field_id": 6,
            "field_name": "Sân Cầu Lông Vip",
            "field_address": "Quận 10, TP.HCM",
            "booking_date": "2024-02-05",
            "start_time": "19:00",
            "end_time": "21:00",
            "duration": 2,
            "total_price": 240000,
            "payment_method": "Tiền mặt",
            "status": "confirmed"
        },
        {
            "id": 7,
            "booking_code": "BK007",
            "field_id": 1,
            "field_name": "Sân Bóng Đá A",
            "field_address": "Quận 1, TP.HCM",
            "booking_date": "2024-02-10",
            "start_time": "20:00",
            "end_time": "22:00",
            "duration": 2,
            "total_price": 400000,
            "payment_method": "Chuyển khoản",
            "status": "pending"
        }
            ]
            
            # Convert string dates to datetime objects for template
            from datetime import datetime
            for booking in all_bookings_data:
                booking["booking_date"] = datetime.strptime(booking["booking_date"], "%Y-%m-%d")
            
            bookings = all_bookings_data
        
        # Pagination logic - 3 items per page
        items_per_page = 3
        total_items = len(bookings)
        total_pages = (total_items + items_per_page - 1) // items_per_page
        
        # Ensure page is within valid range
        if page < 1:
            page = 1
        elif page > total_pages:
            page = total_pages
        
        # Calculate start and end indices for current page
        start_idx = (page - 1) * items_per_page
        end_idx = start_idx + items_per_page
        
        # Get bookings for current page
        bookings_data = bookings[start_idx:end_idx]
        
        # Calculate stats
        total_bookings = total_items
        active_bookings = len([b for b in bookings if b["status"] in ["confirmed", "pending"]])
        
        # Create pagination object
        pagination = type('Pagination', (), {
            'page': page,
            'pages': total_pages,
            'has_prev': page > 1,
            'has_next': page < total_pages,
            'prev_num': page - 1 if page > 1 else None,
            'next_num': page + 1 if page < total_pages else None,
            'total': total_items,
            'per_page': items_per_page
        })()
        
        return render_template('customer/booking_history.html', 
                             user=current_user,
                             bookings=bookings_data,
                             total_bookings=total_bookings,
                             active_bookings=active_bookings,
                             fields=fields_data,
                             pagination=pagination)
                             
    except Exception as e:
        # Fallback to mock data
        all_bookings_data = [
            {
                "id": 1,
                "booking_code": "BK001",
                "field_id": 1,
                "field_name": "Sân Bóng Đá A",
                "field_address": "Quận 1, TP.HCM",
                "booking_date": "2024-01-15",
                "start_time": "18:00",
                "end_time": "20:00",
                "duration": 2,
                "total_price": 400000,
                "payment_method": "Chuyển khoản",
                "status": "completed"
            }
        ]
        
        # Convert string dates to datetime objects for template
        from datetime import datetime
        for booking in all_bookings_data:
            booking["booking_date"] = datetime.strptime(booking["booking_date"], "%Y-%m-%d")
        
        # Pagination logic - 3 items per page
        items_per_page = 3
        total_items = len(all_bookings_data)
        total_pages = (total_items + items_per_page - 1) // items_per_page
        
        # Ensure page is within valid range
        if page < 1:
            page = 1
        elif page > total_pages:
            page = total_pages
        
        # Calculate start and end indices for current page
        start_idx = (page - 1) * items_per_page
        end_idx = start_idx + items_per_page
        
        # Get bookings for current page
        bookings_data = all_bookings_data[start_idx:end_idx]
        
        # Calculate stats
        total_bookings = total_items
        active_bookings = len([b for b in all_bookings_data if b["status"] in ["confirmed", "pending"]])
        
        # Create pagination object
        pagination = type('Pagination', (), {
            'page': page,
            'pages': total_pages,
            'has_prev': page > 1,
            'has_next': page < total_pages,
            'prev_num': page - 1 if page > 1 else None,
            'next_num': page + 1 if page < total_pages else None,
            'total': total_items,
            'per_page': items_per_page
        })()
        
        return render_template('customer/booking_history.html', 
                             user=current_user,
                             bookings=bookings_data,
                             total_bookings=total_bookings,
                             active_bookings=active_bookings,
                             fields=fields_data,
                             pagination=pagination)

@customer_bp.route('/booking-history/<booking_id>/detail')
@login_required
def booking_detail(booking_id):
    """Xem chi tiết booking"""
    try:
        # Tìm booking trong MongoDB
        if ObjectId.is_valid(booking_id):
            booking_data = mongo.db.bookings.find_one({
                '_id': ObjectId(booking_id),
                'user_id': ObjectId(current_user.id)
            })
            
            if booking_data:
                booking = Booking.from_dict(booking_data)
                
                # Lấy thông tin field
                field_data = mongo.db.fields.find_one({'_id': ObjectId(booking.field_id)})
                field_name = field_data.get('name', 'Sân không xác định') if field_data else 'Sân không xác định'
                field_address = field_data.get('location', 'Địa chỉ không xác định') if field_data else 'Địa chỉ không xác định'
                field_type = field_data.get('field_type', 'Không xác định') if field_data else 'Không xác định'
                
                # Convert to format expected by template
                booking_detail = {
                    "id": booking.id,
                    "booking_code": f"BK{booking.id[-6:].upper()}",
                    "field_id": booking.field_id,
                    "field_name": field_name,
                    "field_address": field_address,
                    "field_type": field_type,
                    "booking_date": booking.date.strftime('%Y-%m-%d') if hasattr(booking.date, 'strftime') else str(booking.date),
                    "start_time": booking.start_time,
                    "end_time": booking.end_time,
                    "duration": booking.duration,
                    "total_price": booking.total_price,
                    "payment_method": booking.payment_method or "Chưa thanh toán",
                    "status": booking.status,
                    "created_at": booking.created_at.strftime('%d/%m/%Y %H:%M') if hasattr(booking.created_at, 'strftime') else str(booking.created_at)
                }
                
                return render_template('customer/booking_detail.html', 
                                     user=current_user, booking=booking_detail)
        
        # Fallback to mock data if not found in MongoDB
        # Mock data for booking detail
        mock_bookings = [
            {
                "id": 1,
                "booking_code": "BK001",
                "field_id": 1,
                "field_name": "Sân Bóng Đá A",
                "field_address": "Quận 1, TP.HCM",
                "field_type": "Bóng đá",
                "booking_date": "15/01/2024",
                "start_time": "18:00",
                "end_time": "20:00",
                "duration": 2,
                "total_price": 400000,
                "payment_method": "Chuyển khoản",
                "status": "completed",
                "created_at": "15/01/2024 17:30"
            },
            {
                "id": 2,
                "booking_code": "BK002",
                "field_id": 2,
                "field_name": "Sân Bóng Đá B",
                "field_address": "Quận 7, TP.HCM",
                "field_type": "Bóng đá",
                "booking_date": "20/01/2024",
                "start_time": "19:00",
                "end_time": "21:00",
                "duration": 2,
                "total_price": 360000,
                "payment_method": "Tiền mặt",
                "status": "confirmed",
                "created_at": "20/01/2024 18:45"
            },
            {
                "id": 3,
                "booking_code": "BK003",
                "field_id": 3,
                "field_name": "Sân Bóng Chuyền 1",
                "field_address": "Quận Bình Thạnh, TP.HCM",
                "field_type": "Bóng chuyền",
                "booking_date": "25/01/2024",
                "start_time": "20:00",
                "end_time": "22:00",
                "duration": 2,
                "total_price": 300000,
                "payment_method": "Chuyển khoản",
                "status": "pending",
                "created_at": "25/01/2024 19:15"
            },
            {
                "id": 4,
                "booking_code": "BK004",
                "field_id": 4,
                "field_name": "Sân Bóng Rổ Central",
                "field_address": "Quận 3, TP.HCM",
                "field_type": "Bóng rổ",
                "booking_date": "10/01/2024",
                "start_time": "17:00",
                "end_time": "19:00",
                "duration": 2,
                "total_price": 340000,
                "payment_method": "Tiền mặt",
                "status": "cancelled",
                "created_at": "10/01/2024 16:20"
            },
            {
                "id": 5,
                "booking_code": "BK005",
                "field_id": 5,
                "field_name": "Sân Tennis Pro",
                "field_address": "Quận 2, TP.HCM",
                "field_type": "Tennis",
                "booking_date": "30/01/2024",
                "start_time": "16:00",
                "end_time": "18:00",
                "duration": 2,
                "total_price": 500000,
                "payment_method": "Chuyển khoản",
                "status": "completed",
                "created_at": "30/01/2024 15:30"
            },
            {
                "id": 6,
                "booking_code": "BK006",
                "field_id": 6,
                "field_name": "Sân Cầu Lông Vip",
                "field_address": "Quận 10, TP.HCM",
                "field_type": "Cầu lông",
                "booking_date": "05/02/2024",
                "start_time": "19:00",
                "end_time": "21:00",
                "duration": 2,
                "total_price": 240000,
                "payment_method": "Tiền mặt",
                "status": "confirmed",
                "created_at": "05/02/2024 18:00"
            },
            {
                "id": 7,
                "booking_code": "BK007",
                "field_id": 1,
                "field_name": "Sân Bóng Đá A",
                "field_address": "Quận 1, TP.HCM",
                "field_type": "Bóng đá",
                "booking_date": "10/02/2024",
                "start_time": "20:00",
                "end_time": "22:00",
                "duration": 2,
                "total_price": 400000,
                "payment_method": "Chuyển khoản",
                "status": "pending",
                "created_at": "10/02/2024 19:30"
            }
        ]
        
        # Tìm booking trong mock data
        booking_detail = next((b for b in mock_bookings if str(b["id"]) == str(booking_id)), None)
        
        if booking_detail:
            return render_template('customer/booking_detail.html', 
                                 user=current_user, booking=booking_detail)
        
        # Nếu không tìm thấy, redirect về booking history
        flash('Không tìm thấy thông tin đặt sân', 'error')
        return redirect(url_for('customer.booking_history'))
        
    except Exception as e:
        flash('Có lỗi xảy ra khi tải thông tin đặt sân', 'error')
        return redirect(url_for('customer.booking_history'))

@customer_bp.route('/transaction-history')
@login_required
def transaction_history():
    return render_template('customer/transaction_history.html', user=current_user)

@customer_bp.route('/booking/<booking_id>/review', methods=['GET', 'POST'])
@login_required
def write_review(booking_id):
    """Viết đánh giá cho booking"""
    try:
        booking = None
        field_name = "Sân không xác định"
        
        # Tìm booking trong MongoDB
        if ObjectId.is_valid(booking_id):
            booking_data = mongo.db.bookings.find_one({
                '_id': ObjectId(booking_id),
                'user_id': ObjectId(current_user.id),
                'status': 'completed'
            })
            
            if booking_data:
                booking = Booking.from_dict(booking_data)
                
                # Lấy thông tin field
                field_data = mongo.db.fields.find_one({'_id': ObjectId(booking.field_id)})
                field_name = field_data.get('name', 'Sân không xác định') if field_data else 'Sân không xác định'
        
        # Fallback to mock data if not found in MongoDB
        if not booking:
            # Mock data for completed bookings
            mock_bookings = [
                {
                    "id": 1,
                    "booking_code": "BK001",
                    "field_id": 1,
                    "field_name": "Sân Bóng Đá A",
                    "field_address": "Quận 1, TP.HCM",
                    "field_type": "Bóng đá",
                    "booking_date": "15/01/2024",
                    "start_time": "18:00",
                    "end_time": "20:00",
                    "duration": 2,
                    "total_price": 400000,
                    "payment_method": "Chuyển khoản",
                    "status": "completed",
                    "created_at": "15/01/2024 17:30"
                },
                {
                    "id": 5,
                    "booking_code": "BK005",
                    "field_id": 5,
                    "field_name": "Sân Tennis Pro",
                    "field_address": "Quận 2, TP.HCM",
                    "field_type": "Tennis",
                    "booking_date": "30/01/2024",
                    "start_time": "16:00",
                    "end_time": "18:00",
                    "duration": 2,
                    "total_price": 500000,
                    "payment_method": "Chuyển khoản",
                    "status": "completed",
                    "created_at": "30/01/2024 15:30"
                }
            ]
            
            # Tìm booking trong mock data
            booking_detail = next((b for b in mock_bookings if str(b["id"]) == str(booking_id) and b["status"] == "completed"), None)
            
            if booking_detail:
                # Tạo mock booking object
                booking = type('MockBooking', (), booking_detail)()
                field_name = booking_detail["field_name"]
            else:
                flash('Không tìm thấy đặt sân hoặc chưa hoàn thành', 'error')
                return redirect(url_for('customer.booking_history'))
        
        if request.method == 'POST':
            # Xử lý form đánh giá
            rating = request.form.get('rating', '').strip()
            comment = request.form.get('comment', '').strip()
            
            # Validation
            errors = []
            if not rating:
                errors.append('Vui lòng chọn số sao đánh giá')
            elif not rating.isdigit() or int(rating) < 1 or int(rating) > 5:
                errors.append('Số sao phải từ 1-5')
            
            if not comment:
                errors.append('Vui lòng viết nhận xét')
            elif len(comment.strip()) < 10:
                errors.append('Nhận xét phải có ít nhất 10 ký tự')
            
            if errors:
                for error in errors:
                    flash(error, 'error')
                return render_template('customer/write_review.html', 
                                     booking=booking, field_name=field_name)
            
            # Lưu đánh giá vào database (chỉ nếu là MongoDB booking)
            if ObjectId.is_valid(booking_id):
                review_data = {
                    'booking_id': ObjectId(booking_id),
                    'user_id': ObjectId(current_user.id),
                    'field_id': ObjectId(booking.field_id),
                    'rating': int(rating),
                    'comment': comment,
                    'created_at': datetime.now(timezone.utc)
                }
                
                # Kiểm tra xem đã đánh giá chưa
                existing_review = mongo.db.reviews.find_one({
                    'booking_id': ObjectId(booking_id)
                })
                
                if existing_review:
                    # Cập nhật đánh giá
                    mongo.db.reviews.update_one(
                        {'booking_id': ObjectId(booking_id)},
                        {'$set': {
                            'rating': int(rating),
                            'comment': comment,
                            'updated_at': datetime.now(timezone.utc)
                        }}
                    )
                    flash('Cập nhật đánh giá thành công!', 'success')
                else:
                    # Tạo đánh giá mới
                    mongo.db.reviews.insert_one(review_data)
                    flash('Đánh giá thành công!', 'success')
            else:
                # Mock data - chỉ hiển thị thông báo thành công
                flash('Đánh giá thành công! (Mock data)', 'success')
            
            return redirect(url_for('customer.booking_history'))
        
        # GET request - hiển thị form đánh giá
        return render_template('customer/write_review.html', 
                             booking=booking, field_name=field_name)
        
    except Exception as e:
        flash('Có lỗi xảy ra khi xử lý đánh giá', 'error')
        return redirect(url_for('customer.booking_history'))

@customer_bp.route('/booking/<booking_id>/cancel', methods=['POST'])
@login_required
def cancel_booking(booking_id):
    """Hủy đặt sân"""
    try:
        # Tìm booking trong MongoDB
        if ObjectId.is_valid(booking_id):
            booking_data = mongo.db.bookings.find_one({
                '_id': ObjectId(booking_id),
                'user_id': ObjectId(current_user.id),
                'status': 'pending'
            })
            
            if booking_data:
                # Cập nhật trạng thái thành cancelled
                result = mongo.db.bookings.update_one(
                    {'_id': ObjectId(booking_id)},
                    {'$set': {
                        'status': 'cancelled',
                        'cancelled_at': datetime.now(timezone.utc)
                    }}
                )
                
                if result.modified_count > 0:
                    return jsonify({'success': True, 'message': 'Hủy đặt sân thành công'})
                else:
                    return jsonify({'success': False, 'message': 'Không thể hủy đặt sân'})
        
        # Fallback to mock data
        # Mock data for pending bookings that can be cancelled
        mock_pending_bookings = [3, 7]  # Booking IDs that are pending
        
        if int(booking_id) in mock_pending_bookings:
            return jsonify({'success': True, 'message': 'Hủy đặt sân thành công (Mock data)'})
        else:
            return jsonify({'success': False, 'message': 'Không tìm thấy đặt sân hoặc không thể hủy'})
        
    except Exception as e:
        return jsonify({'success': False, 'message': 'Có lỗi xảy ra khi hủy đặt sân'})

@customer_bp.route('/profile')
@login_required
def profile():
    try:
        # Lấy thông tin user từ MongoDB
        user_data = mongo.db.users.find_one({'_id': ObjectId(current_user.id)})
        
        # Lấy thông tin profile từ collection profiles
        profile_data = mongo.db.profiles.find_one({'user_id': ObjectId(current_user.id)})
        
        if profile_data:
            # Sử dụng dữ liệu từ collection profiles
            profile_obj = Profile.from_dict(profile_data)
            profile_info = {
                'username': user_data.get('username', current_user.username) if user_data else current_user.username,
                'email': user_data.get('email', current_user.email) if user_data else current_user.email,
                'full_name': profile_obj.full_name or 'Chưa cập nhật',
                'phone': profile_obj.phone or 'Chưa cập nhật',
                'address': profile_obj.address or 'Chưa cập nhật',
                'birthday': profile_obj.birthday or 'Chưa cập nhật',
                'gender': profile_obj.gender or 'Chưa cập nhật',
                'bio': profile_obj.bio or '',
                'avatar': profile_obj.avatar or None
            }
        else:
            # Fallback data nếu chưa có profile
            profile_info = {
                'username': user_data.get('username', current_user.username) if user_data else current_user.username,
                'email': user_data.get('email', current_user.email) if user_data else current_user.email,
                'full_name': 'Chưa cập nhật',
                'phone': 'Chưa cập nhật',
                'address': 'Chưa cập nhật',
                'birthday': 'Chưa cập nhật',
                'gender': 'Chưa cập nhật',
                'bio': '',
                'avatar': None
            }
    except Exception as e:
        # Fallback data
        profile_info = {
            'username': current_user.username,
            'email': current_user.email,
            'full_name': 'Chưa cập nhật',
            'phone': 'Chưa cập nhật',
            'address': 'Chưa cập nhật',
            'birthday': 'Chưa cập nhật',
            'gender': 'Chưa cập nhật',
            'bio': '',
            'avatar': None
        }
    
    # Tính toán stats từ MongoDB
    try:
        # Đếm tổng số bookings
        total_bookings = mongo.db.bookings.count_documents({'user_id': ObjectId(current_user.id)})
        
        # Đếm active bookings
        active_bookings = mongo.db.bookings.count_documents({
            'user_id': ObjectId(current_user.id),
            'status': {'$in': ['confirmed', 'pending']}
        })
        
        # Tính tổng tiền đã chi
        pipeline = [
            {'$match': {'user_id': ObjectId(current_user.id), 'status': 'completed'}},
            {'$group': {'_id': None, 'total': {'$sum': '$total_price'}}}
        ]
        total_spent_result = list(mongo.db.bookings.aggregate(pipeline))
        total_spent = f"{total_spent_result[0]['total']:,} VNĐ" if total_spent_result else "0 VNĐ"
        
        # Ngày tham gia
        join_date = current_user.created_at.strftime('%d/%m/%Y') if hasattr(current_user.created_at, 'strftime') else "Chưa xác định"
        
        # Mock data cho points và vouchers (có thể mở rộng sau)
        total_points = 1250
        active_vouchers = 3
        
    except Exception as e:
        # Fallback stats
        total_bookings = 0
        total_points = 0
        active_vouchers = 0
        total_spent = "0 VNĐ"
        join_date = "Chưa xác định"
    
    # Mock points history
    points_history = [
        {
            'icon': 'calendar-check',
            'description': 'Đặt sân bóng đá - Sân A',
            'date': '15/12/2024',
            'amount': 50,
            'balance': 1250
        },
        {
            'icon': 'calendar-check',
            'description': 'Đặt sân tennis - Sân Pro',
            'date': '10/12/2024',
            'amount': 30,
            'balance': 1200
        },
        {
            'icon': 'calendar-check',
            'description': 'Đặt sân cầu lông - Sân Vip',
            'date': '05/12/2024',
            'amount': 20,
            'balance': 1170
        },
        {
            'icon': 'user-plus',
            'description': 'Đăng ký thành viên',
            'date': '01/12/2024',
            'amount': 100,
            'balance': 1150
        }
    ]
    
    # Mock recent activities
    recent_activities = [
        {
            'icon': 'calendar-check',
            'title': 'Đặt sân thành công',
            'description': 'Sân Bóng Đá A - 20/12/2024 18:00',
            'time': '2 giờ trước',
            'status': 'completed',
            'status_text': 'Hoàn thành'
        },
        {
            'icon': 'credit-card',
            'title': 'Thanh toán thành công',
            'description': '400,000 VNĐ - Chuyển khoản',
            'time': '1 ngày trước',
            'status': 'completed',
            'status_text': 'Thành công'
        },
        {
            'icon': 'ticket-alt',
            'title': 'Nhận voucher mới',
            'description': 'Giảm 20% cho lần đặt sân tiếp theo',
            'time': '3 ngày trước',
            'status': 'pending',
            'status_text': 'Chờ sử dụng'
        }
    ]
    
    return render_template('customer/profile.html', 
                         user=profile_info,
                         total_bookings=total_bookings,
                         total_points=total_points,
                         active_vouchers=active_vouchers,
                         total_spent=total_spent,
                         join_date=join_date,
                         points_history=points_history,
                         recent_activities=recent_activities)

@customer_bp.route('/profile/update', methods=['POST'])
@login_required
def update_profile():
    """Cập nhật thông tin profile"""
    try:
        # Lấy dữ liệu từ form
        full_name = request.form.get('full_name', '').strip()
        phone = request.form.get('phone', '').strip()
        address = request.form.get('address', '').strip()
        birthday = request.form.get('birthday', '').strip()
        gender = request.form.get('gender', '').strip()
        bio = request.form.get('bio', '').strip()
        
        # Validation
        errors = []
        
        # Validate full name
        is_valid, error_msg = Profile.validate_full_name(full_name)
        if not is_valid:
            errors.append(error_msg)
        
        # Validate phone
        if phone:
            is_valid, error_msg = Profile.validate_phone(phone)
            if not is_valid:
                errors.append(error_msg)
        
        # Validate gender
        is_valid, error_msg = Profile.validate_gender(gender)
        if not is_valid:
            errors.append(error_msg)
        
        # Kiểm tra phone đã tồn tại chưa (nếu thay đổi)
        if phone:
            # Lấy profile hiện tại để so sánh
            current_profile = mongo.db.profiles.find_one({'user_id': ObjectId(current_user.id)})
            current_phone = current_profile.get('phone') if current_profile else None
            
            if phone != current_phone:
                existing_phone = mongo.db.profiles.find_one({
                    'phone': phone,
                    'user_id': {'$ne': ObjectId(current_user.id)}
                })
                if existing_phone:
                    errors.append('Số điện thoại đã được sử dụng')
        
        if errors:
            for error in errors:
                flash(error, 'error')
            return redirect(url_for('customer.profile'))
        
        # Tạo hoặc cập nhật profile
        profile_data = {
            'user_id': ObjectId(current_user.id),
            'full_name': full_name,
            'phone': phone,
            'address': address,
            'birthday': birthday,
            'gender': gender,
            'bio': bio,
            'updated_at': datetime.now(timezone.utc)
        }
        
        # Kiểm tra profile đã tồn tại chưa
        existing_profile = mongo.db.profiles.find_one({'user_id': ObjectId(current_user.id)})
        
        if existing_profile:
            # Cập nhật profile hiện có
            mongo.db.profiles.update_one(
                {'user_id': ObjectId(current_user.id)},
                {'$set': profile_data}
            )
            flash('Cập nhật thông tin thành công!', 'success')
        else:
            # Tạo profile mới
            profile_data['created_at'] = datetime.now(timezone.utc)
            mongo.db.profiles.insert_one(profile_data)
            flash('Tạo hồ sơ thành công!', 'success')
        
        return redirect(url_for('customer.profile'))
        
    except Exception as e:
        flash('Có lỗi xảy ra khi cập nhật thông tin', 'error')
        return redirect(url_for('customer.profile'))

@customer_bp.route('/my-vouchers')
@login_required
def my_vouchers():
    # Mock data for user vouchers
    vouchers = [
        {
            'id': 1,
            'type': 'Giảm giá',
            'icon': 'percent',
            'title': 'Giảm 20% cho lần đặt sân đầu tiên',
            'description': 'Áp dụng cho tất cả sân thể thao, giảm tối đa 150.000 VNĐ',
            'discount_type': 'percentage',
            'discount_value': 20,
            'max_discount': 150,
            'min_order': 200,
            'code': 'WELCOME20',
            'expiry_date': '31/12/2024',
            'is_expired': False
        },
        {
            'id': 2,
            'type': 'Giảm tiền',
            'icon': 'money-bill-wave',
            'title': 'Giảm 50.000 VNĐ cho đơn hàng từ 300K',
            'description': 'Áp dụng cho tất cả sân, không giới hạn số lần sử dụng',
            'discount_type': 'fixed',
            'discount_value': 50,
            'max_discount': None,
            'min_order': 300,
            'code': 'SAVE50K',
            'expiry_date': '15/01/2025',
            'is_expired': False
        },
        {
            'id': 3,
            'type': 'Sinh nhật',
            'icon': 'birthday-cake',
            'title': 'Voucher sinh nhật 100.000 VNĐ',
            'description': 'Quà tặng sinh nhật đặc biệt từ SportSlot',
            'discount_type': 'fixed',
            'discount_value': 100,
            'max_discount': None,
            'min_order': 500,
            'code': 'BIRTHDAY100',
            'expiry_date': '30/11/2024',
            'is_expired': True
        },
        {
            'id': 4,
            'type': 'Khuyến mãi',
            'icon': 'gift',
            'title': 'Giảm 15% cho sân tennis',
            'description': 'Áp dụng riêng cho các sân tennis, giảm tối đa 100.000 VNĐ',
            'discount_type': 'percentage',
            'discount_value': 15,
            'max_discount': 100,
            'min_order': 250,
            'code': 'TENNIS15',
            'expiry_date': '20/12/2024',
            'is_expired': False
        }
    ]
    
    # Calculate stats
    total_vouchers = len(vouchers)
    active_vouchers = len([v for v in vouchers if not v['is_expired']])
    expired_vouchers = len([v for v in vouchers if v['is_expired']])
    
    return render_template('customer/my_vouchers.html', 
                         user=current_user,
                         vouchers=vouchers,
                         total_vouchers=total_vouchers,
                         active_vouchers=active_vouchers,
                         expired_vouchers=expired_vouchers) 

# API giả lập: trả về danh sách slot đã đặt cho từng sân theo ngày
def get_mock_bookings(field_id, date):
    # Dữ liệu mẫu: mỗi sân có thể có các slot đã đặt khác nhau
    # Định dạng: [{'start': '18:00', 'duration': 2}, ...]
    mock = {
        1: [{'date': '2025-07-24', 'start': '18:00', 'duration': 2}, {'date': '2025-07-24', 'start': '20:00', 'duration': 1}],
        2: [{'date': '2025-07-24', 'start': '19:00', 'duration': 2}],
        3: [],
        4: [{'date': '2025-07-24', 'start': '17:00', 'duration': 1}],
        5: [],
        6: [],
    }
    bookings = [b for b in mock.get(field_id, []) if b['date'] == date]
    return bookings

@customer_bp.route('/api/fields/<int:field_id>/bookings')
def api_field_bookings(field_id):
    date = request.args.get('date')
    if not date:
        return jsonify({'error': 'Missing date'}), 400
    bookings = get_mock_bookings(field_id, date)
    return jsonify({'bookings': bookings}) 