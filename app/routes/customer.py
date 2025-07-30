from flask import Blueprint, render_template, jsonify, request
from flask_login import login_required, current_user
from app.extensions import mongo
from app.models.field import Field
from app.models.booking import Booking
from bson import ObjectId

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
                "name": field.name,
                "phone": "0901234567",  # Default phone
                "address": field.location,
                "image": field.images[0] if field.images else None,
                "sport": field.field_type.title(),
                "sport_type": field.field_type,
                "price": field.price_per_slot,
                "owner": "Chủ sân",  # Default owner
                "type": f"Sân {field.field_type}",
                "description": field.description
            }
            fields.append(field_dict)
    except Exception as e:
        print(f"Error loading fields: {e}")
        # Fallback to mock data
        fields = fields_data
    
    return render_template('customer/field_list.html', fields=fields)

@customer_bp.route('/fields/<int:field_id>')
@login_required
def field_detail(field_id):
    field = next((f for f in fields_data if f["id"] == field_id), None)
    if not field:
        return "Không tìm thấy sân", 404
    return render_template('customer/field_detail.html', field=field)

# XÓA route booking page riêng biệt, chỉ giữ lại booking popup/modal như ban đầu

@customer_bp.route('/booking-history')
@customer_bp.route('/booking-history/<int:page>')
@login_required
def booking_history(page=1):
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

@customer_bp.route('/transaction-history')
@login_required
def transaction_history():
    return render_template('customer/transaction_history.html', user=current_user)

@customer_bp.route('/profile')
@login_required
def profile():
    # Mock data for profile
    user_data = {
        'username': current_user.username,
        'email': current_user.email,
        'full_name': 'Nguyễn Văn An',
        'phone': '0123456789',
        'address': '123 Đường ABC, Quận 1, TP.HCM',
        'birthday': '1990-05-15',
        'gender': 'male'
    }
    
    # Mock stats
    total_bookings = 15
    total_points = 1250
    active_vouchers = 3
    total_spent = "2,500,000 VNĐ"
    join_date = "01/12/2024"
    
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
                         user=user_data,
                         total_bookings=total_bookings,
                         total_points=total_points,
                         active_vouchers=active_vouchers,
                         total_spent=total_spent,
                         join_date=join_date,
                         points_history=points_history,
                         recent_activities=recent_activities)

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