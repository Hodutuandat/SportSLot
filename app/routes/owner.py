from flask import Blueprint, render_template, redirect, url_for, request, flash, jsonify
from flask_login import login_required, current_user
from datetime import datetime, timedelta
import random

owner_bp = Blueprint('owner', __name__, url_prefix='/owner')

# Dữ liệu mẫu cho owner123
owner_fields_data = [
    {
        "id": 1, 
        "name": "Sân Bóng Đá A", 
        "phone": "0901234567", 
        "address": "Quận 1, TP.HCM", 
        "image": None, 
        "sport": "Bóng đá", 
        "sport_type": "football", 
        "price": 200000, 
        "owner_id": 2,
        "owner": "owner123", 
        "type": "Sân cỏ nhân tạo 7 người", 
        "description": "Sân cỏ nhân tạo 7 người, có đèn chiếu sáng, đạt chuẩn FIFA mini.",
        "status": "active",
        "created_date": "2024-01-15",
        "total_bookings": 45,
        "monthly_revenue": 9000000
    },
    {
        "id": 7, 
        "name": "Sân Mini Football Pro", 
        "phone": "0901234567", 
        "address": "Quận 1, TP.HCM", 
        "image": None, 
        "sport": "Bóng đá", 
        "sport_type": "football", 
        "price": 180000, 
        "owner_id": 2,
        "owner": "owner123", 
        "type": "Sân cỏ nhân tạo 5 người", 
        "description": "Sân mini chuyên nghiệp, mặt cỏ mới, phòng thay đồ hiện đại.",
        "status": "active",
        "created_date": "2024-02-10",
        "total_bookings": 38,
        "monthly_revenue": 6840000
    }
]

# Dữ liệu đặt sân mẫu
bookings_data = [
    {
        "id": 1,
        "field_id": 1,
        "field_name": "Sân Bóng Đá A",
        "customer_name": "Nguyễn Văn Nam",
        "customer_phone": "0987654321",
        "date": "2024-12-15",
        "time": "18:00-20:00",
        "duration": 2,
        "total_price": 400000,
        "status": "confirmed", # pending, confirmed, cancelled, completed
        "booking_date": "2024-12-10",
        "payment_status": "paid"
    },
    {
        "id": 2,
        "field_id": 1,
        "field_name": "Sân Bóng Đá A",
        "customer_name": "Trần Minh Tuấn",
        "customer_phone": "0976543210",
        "date": "2024-12-16",
        "time": "14:00-16:00",
        "duration": 2,
        "total_price": 400000,
        "status": "pending",
        "booking_date": "2024-12-12",
        "payment_status": "pending"
    },
    {
        "id": 3,
        "field_id": 7,
        "field_name": "Sân Mini Football Pro",
        "customer_name": "Lê Hoàng Anh",
        "customer_phone": "0965432109",
        "date": "2024-12-17",
        "time": "20:00-22:00",
        "duration": 2,
        "total_price": 360000,
        "status": "confirmed",
        "booking_date": "2024-12-11",
        "payment_status": "paid"
    }
]

@owner_bp.route('/dashboard')
@login_required
def dashboard():
    if not current_user.is_owner():
        return redirect(url_for('common.home'))
    
    # Thống kê tổng quan
    total_fields = len(owner_fields_data)
    total_bookings = sum(field['total_bookings'] for field in owner_fields_data)
    total_revenue = sum(field['monthly_revenue'] for field in owner_fields_data)
    pending_bookings = len([b for b in bookings_data if b['status'] == 'pending'])
    
    # Thống kê theo tháng (dữ liệu mẫu)
    monthly_stats = {
        'January': {'bookings': 15, 'revenue': 3200000},
        'February': {'bookings': 18, 'revenue': 3800000},
        'March': {'bookings': 22, 'revenue': 4500000},
        'April': {'bookings': 25, 'revenue': 5200000},
        'May': {'bookings': 28, 'revenue': 5800000},
        'June': {'bookings': 30, 'revenue': 6300000},
        'July': {'bookings': 32, 'revenue': 6800000},
        'August': {'bookings': 35, 'revenue': 7200000},
        'September': {'bookings': 38, 'revenue': 7800000},
        'October': {'bookings': 40, 'revenue': 8500000},
        'November': {'bookings': 42, 'revenue': 9200000},
        'December': {'bookings': 45, 'revenue': 9800000}
    }
    
    recent_bookings = bookings_data[-5:]  # 5 booking gần nhất
    
    return render_template('owner/dashboard.html', 
                         user=current_user,
                         total_fields=total_fields,
                         total_bookings=total_bookings,
                         total_revenue=total_revenue,
                         pending_bookings=pending_bookings,
                         monthly_stats=monthly_stats,
                         recent_bookings=recent_bookings)

@owner_bp.route('/my-fields')
@login_required
def my_fields():
    if not current_user.is_owner():
        return redirect(url_for('common.home'))
    return render_template('owner/my_fields.html', user=current_user, fields=owner_fields_data)

@owner_bp.route('/add-field', methods=['GET', 'POST'])
@login_required
def add_field():
    if not current_user.is_owner():
        return redirect(url_for('common.home'))
    
    if request.method == 'POST':
        try:
            # Collect form data
            field_data = {
                'id': len(owner_fields_data) + 1,
                'name': request.form.get('fieldName'),
                'type': request.form.get('fieldType'),
                'description': request.form.get('fieldDescription'),
                'capacity': request.form.get('capacity'),
                'field_size': request.form.get('fieldSize'),
                'address': request.form.get('address'),
                'city': request.form.get('city'),
                'district': request.form.get('district'),
                'parking': request.form.get('parking'),
                'transportation': request.form.get('transportation'),
                'amenities': request.form.getlist('amenities'),
                'rules': request.form.get('rules'),
                'pricing': {
                    'morning_weekday': request.form.get('morning_weekday'),
                    'morning_weekend': request.form.get('morning_weekend'),
                    'afternoon_weekday': request.form.get('afternoon_weekday'),
                    'afternoon_weekend': request.form.get('afternoon_weekend'),
                    'evening_weekday': request.form.get('evening_weekday'),
                    'evening_weekend': request.form.get('evening_weekend'),
                },
                'weekday_hours': {
                    'start': request.form.get('weekday_start'),
                    'end': request.form.get('weekday_end')
                },
                'weekend_hours': {
                    'start': request.form.get('weekend_start'),
                    'end': request.form.get('weekend_end')
                },
                'deposit': request.form.get('deposit'),
                'cancellation': request.form.get('cancellation'),
                'owner_id': current_user.id,
                'owner': current_user.username,
                'status': 'pending',  # Đang chờ duyệt
                'created_date': datetime.now().strftime('%Y-%m-%d'),
                'total_bookings': 0,
                'monthly_revenue': 0
            }
            
            # Simulate saving to database
            new_field = {
                "id": field_data['id'],
                "name": field_data['name'],
                "phone": "0901234567",  # Default
                "address": f"{field_data['district']}, {field_data['city']}",
                "image": None,
                "sport": get_sport_name(field_data['type']),
                "sport_type": field_data['type'],
                "price": int(field_data['pricing']['morning_weekday'] or 200000),
                "owner_id": field_data['owner_id'],
                "owner": field_data['owner'],
                "type": f"Sân {get_sport_name(field_data['type'])}",
                "description": field_data['description'] or "Sân thể thao chất lượng cao",
                "status": "pending",
                "created_date": field_data['created_date'],
                "total_bookings": 0,
                "monthly_revenue": 0
            }
            
            # Add to mock data
            owner_fields_data.append(new_field)
            
            # Return JSON response for AJAX
            if request.headers.get('Content-Type') == 'application/json':
                return jsonify({
                    'success': True, 
                    'message': 'Sân đã được tạo thành công và đang chờ duyệt!',
                    'field_id': new_field['id']
                })
            
            flash('Thêm sân mới thành công! Sân đang chờ duyệt.', 'success')
            return redirect(url_for('owner.my_fields'))
            
        except Exception as e:
            if request.headers.get('Content-Type') == 'application/json':
                return jsonify({
                    'success': False, 
                    'message': f'Có lỗi xảy ra: {str(e)}'
                }), 400
            
            flash('Có lỗi xảy ra khi tạo sân. Vui lòng thử lại!', 'error')
            return render_template('owner/add_field.html', user=current_user)
    
    return render_template('owner/add_field.html', user=current_user)

def get_sport_name(sport_type):
    sport_map = {
        'football': 'Bóng đá',
        'tennis': 'Tennis',
        'badminton': 'Cầu lông',
        'basketball': 'Bóng rổ',
        'volleyball': 'Bóng chuyền',
        'futsal': 'Futsal',
        'ping-pong': 'Ping Pong',
        'other': 'Khác'
    }
    return sport_map.get(sport_type, 'Khác')

@owner_bp.route('/edit-field/<int:field_id>', methods=['GET', 'POST'])
@login_required
def edit_field(field_id):
    if not current_user.is_owner():
        return redirect(url_for('common.home'))
    
    field = next((f for f in owner_fields_data if f["id"] == field_id), None)
    if not field:
        flash('Không tìm thấy sân!', 'error')
        return redirect(url_for('owner.my_fields'))
    
    if request.method == 'POST':
        # Xử lý cập nhật sân (giả lập)
        flash('Cập nhật sân thành công!', 'success')
        return redirect(url_for('owner.my_fields'))
    
    return render_template('owner/edit_field.html', user=current_user, field=field)

@owner_bp.route('/booking-schedule')
@login_required
def booking_schedule():
    if not current_user.is_owner():
        return redirect(url_for('common.home'))
    
    # Tạo dữ liệu lịch đặt mẫu cho tuần hiện tại
    schedule_data = {
        'fields': [
            {'id': 1, 'name': 'Sân A'},
            {'id': 2, 'name': 'Sân B'},
            {'id': 3, 'name': 'Sân C'}
        ],
        'time_slots': [
            {'id': 'morning', 'name': 'Sáng', 'time': '05:00 - 12:00'},
            {'id': 'afternoon', 'name': 'Trưa', 'time': '12:00 - 17:00'},
            {'id': 'evening', 'name': 'Chiều', 'time': '17:00 - 23:00'}
        ],
        'days': [
            {'id': 'monday', 'name': 'Thứ 2', 'date': '18/12'},
            {'id': 'tuesday', 'name': 'Thứ 3', 'date': '19/12'},
            {'id': 'wednesday', 'name': 'Thứ 4', 'date': '20/12'},
            {'id': 'thursday', 'name': 'Thứ 5', 'date': '21/12'},
            {'id': 'friday', 'name': 'Thứ 6', 'date': '22/12'},
            {'id': 'saturday', 'name': 'Thứ 7', 'date': '23/12'},
            {'id': 'sunday', 'name': 'Chủ nhật', 'date': '24/12'}
        ]
    }
    
    return render_template('owner/booking_schedule.html', 
                         user=current_user, 
                         schedule_data=schedule_data,
                         bookings=bookings_data)

@owner_bp.route('/transaction-history')
@login_required
def transaction_history():
    if not current_user.is_owner():
        return redirect(url_for('common.home'))
    
    # Tạo dữ liệu doanh thu mẫu chi tiết
    revenue_data = {
        'overview': {
            'total_revenue': 15800000,
            'total_bookings': 127,
            'avg_revenue_per_booking': 124409,
            'conversion_rate': 94.2
        },
        'chart_data': {
            'revenue': [2.1, 1.8, 2.3, 2.5, 2.8, 3.2, 2.1],
            'bookings': [15, 12, 18, 20, 22, 25, 15]
        },
        'field_performance': [
            {'name': 'Sân A', 'revenue': 45, 'bookings': 57},
            {'name': 'Sân B', 'revenue': 35, 'bookings': 44},
            {'name': 'Sân C', 'revenue': 20, 'bookings': 26}
        ],
        'top_customers': [
            {'name': 'Nguyễn Văn Nam', 'bookings': 15, 'total_spent': 2800000},
            {'name': 'Trần Minh Tuấn', 'bookings': 12, 'total_spent': 2100000},
            {'name': 'Lê Hoàng Anh', 'bookings': 10, 'total_spent': 1900000},
            {'name': 'Phạm Thị Mai', 'bookings': 8, 'total_spent': 1500000},
            {'name': 'Vũ Đức Hùng', 'bookings': 7, 'total_spent': 1300000}
        ],
        'transactions': [
            {
                'id': 'TX001',
                'customer': 'Nguyễn Văn Nam',
                'field': 'Sân A',
                'date': '18/12/2024',
                'time': '18:00-20:00',
                'amount': 400000,
                'status': 'completed',
                'payment_method': 'Chuyển khoản',
                'notes': 'Không có'
            },
            {
                'id': 'TX002',
                'customer': 'Trần Minh Tuấn',
                'field': 'Sân B',
                'date': '19/12/2024',
                'time': '14:00-16:00',
                'amount': 360000,
                'status': 'completed',
                'payment_method': 'Tiền mặt',
                'notes': 'Khách hàng VIP'
            },
            {
                'id': 'TX003',
                'customer': 'Lê Hoàng Anh',
                'field': 'Sân C',
                'date': '20/12/2024',
                'time': '20:00-22:00',
                'amount': 450000,
                'status': 'pending',
                'payment_method': 'Chuyển khoản',
                'notes': 'Chờ xác nhận thanh toán'
            },
            {
                'id': 'TX004',
                'customer': 'Phạm Thị Mai',
                'field': 'Sân A',
                'date': '21/12/2024',
                'time': '19:00-21:00',
                'amount': 400000,
                'status': 'completed',
                'payment_method': 'Chuyển khoản',
                'notes': 'Không có'
            },
            {
                'id': 'TX005',
                'customer': 'Vũ Đức Hùng',
                'field': 'Sân B',
                'date': '22/12/2024',
                'time': '15:00-17:00',
                'amount': 360000,
                'status': 'cancelled',
                'payment_method': 'Tiền mặt',
                'notes': 'Khách hàng hủy do thời tiết'
            }
        ],
        'insights': [
            {
                'title': 'Thời gian cao điểm',
                'description': '18:00-22:00 là khung giờ có doanh thu cao nhất, chiếm 65% tổng doanh thu',
                'icon': '📊'
            },
            {
                'title': 'Sân phổ biến nhất',
                'description': 'Sân A được đặt nhiều nhất với 45% tổng số đặt sân',
                'icon': '🎯'
            },
            {
                'title': 'Xu hướng tăng trưởng',
                'description': 'Doanh thu tăng 12.5% so với tuần trước, chủ yếu từ cuối tuần',
                'icon': '📈'
            },
            {
                'title': 'Khách hàng VIP',
                'description': '20% khách hàng đóng góp 80% doanh thu, cần tập trung chăm sóc',
                'icon': '💰'
            }
        ]
    }
    
    return render_template('owner/transaction_history.html', 
                         user=current_user, 
                         revenue_data=revenue_data)

@owner_bp.route('/profile')
@login_required
def profile():
    if not current_user.is_owner():
        return redirect(url_for('common.home'))
    return render_template('owner/profile.html', user=current_user)

@owner_bp.route('/notifications')
@login_required
def notifications():
    if not current_user.is_owner():
        return redirect(url_for('common.home'))
    
    # Tạo thông báo mẫu chi tiết
    notifications = [
        {
            'id': 1,
            'title': 'Booking cần duyệt gấp',
            'message': 'Sân bóng đá A - Khách hàng: Nguyễn Văn Nam',
            'details': '21/12/2024 15:00-17:00 | 400.000đ',
            'date': '2024-12-12 14:30',
            'type': 'booking',
            'subtype': 'urgent',
            'read': False,
            'action_required': True,
            'booking_id': 1,
            'field_name': 'Sân Bóng Đá A',
            'customer_name': 'Nguyễn Văn Nam',
            'booking_time': '21/12/2024 15:00-17:00',
            'amount': 400000
        },
        {
            'id': 2,
            'title': 'Thanh toán thành công',
            'message': 'Booking #BK003 - Sân Tennis Elite',
            'details': '400.000đ | Phương thức: VNPay',
            'date': '2024-12-10 16:45',
            'type': 'payment',
            'subtype': 'success',
            'read': False,
            'action_required': False,
            'booking_id': 3,
            'field_name': 'Sân Tennis Elite',
            'customer_name': 'Trần Minh Tuấn',
            'amount': 400000,
            'payment_method': 'VNPay'
        },
        {
            'id': 3,
            'title': 'Đánh giá mới 5 sao',
            'message': 'Sân bóng đá B - Khách hàng: Lê Hoàng Anh',
            'details': '"Sân đẹp, chất lượng tốt, nhân viên phục vụ nhiệt tình"',
            'date': '2024-12-09 10:15',
            'type': 'review',
            'subtype': 'positive',
            'read': False,
            'action_required': False,
            'field_name': 'Sân Bóng Đá B',
            'customer_name': 'Lê Hoàng Anh',
            'rating': 5,
            'review_text': 'Sân đẹp, chất lượng tốt, nhân viên phục vụ nhiệt tình'
        },
        {
            'id': 4,
            'title': 'Báo cáo doanh thu tuần',
            'message': 'Tuần này: 15.2M VNĐ (+12% so với tuần trước)',
            'details': '45 booking | 8.5 sao trung bình',
            'date': '2024-12-08 09:00',
            'type': 'report',
            'subtype': 'weekly',
            'read': True,
            'action_required': False,
            'revenue': 15200000,
            'growth': 12,
            'total_bookings': 45,
            'avg_rating': 8.5
        },
        {
            'id': 5,
            'title': 'Sân mới được duyệt',
            'message': 'Sân Tennis Elite đã được phê duyệt thành công',
            'details': 'Sân sẽ hoạt động từ ngày mai',
            'date': '2024-12-07 15:30',
            'type': 'system',
            'subtype': 'approval',
            'read': True,
            'action_required': False,
            'field_name': 'Sân Tennis Elite',
            'status': 'approved'
        },
        {
            'id': 6,
            'title': 'Booking bị hủy',
            'message': 'Sân Mini Football Pro - Khách hàng: Phạm Thị Mai',
            'details': 'Lý do: Khách hàng yêu cầu hủy',
            'date': '2024-12-06 11:20',
            'type': 'booking',
            'subtype': 'cancelled',
            'read': True,
            'action_required': False,
            'field_name': 'Sân Mini Football Pro',
            'customer_name': 'Phạm Thị Mai',
            'cancel_reason': 'Khách hàng yêu cầu hủy'
        },
        {
            'id': 7,
            'title': 'Đánh giá cần phản hồi',
            'message': 'Sân Bóng Đá A - Khách hàng: Vũ Đức Hùng',
            'details': '3 sao - "Sân hơi ẩm, cần cải thiện"',
            'date': '2024-12-05 14:15',
            'type': 'review',
            'subtype': 'negative',
            'read': False,
            'action_required': True,
            'field_name': 'Sân Bóng Đá A',
            'customer_name': 'Vũ Đức Hùng',
            'rating': 3,
            'review_text': 'Sân hơi ẩm, cần cải thiện'
        },
        {
            'id': 8,
            'title': 'Thanh toán thất bại',
            'message': 'Booking #BK004 - Sân Bóng Đá A',
            'details': '200.000đ | Lỗi: Thẻ bị từ chối',
            'date': '2024-12-04 16:00',
            'type': 'payment',
            'subtype': 'failed',
            'read': False,
            'action_required': True,
            'field_name': 'Sân Bóng Đá A',
            'customer_name': 'Đặng Văn Minh',
            'amount': 200000,
            'error': 'Thẻ bị từ chối'
        }
    ]
    
    # Thống kê thông báo
    stats = {
        'total': len(notifications),
        'unread': len([n for n in notifications if not n['read']]),
        'urgent': len([n for n in notifications if n.get('action_required', False)]),
        'by_type': {
            'booking': len([n for n in notifications if n['type'] == 'booking']),
            'payment': len([n for n in notifications if n['type'] == 'payment']),
            'review': len([n for n in notifications if n['type'] == 'review']),
            'report': len([n for n in notifications if n['type'] == 'report']),
            'system': len([n for n in notifications if n['type'] == 'system'])
        }
    }
    
    return render_template('owner/notification.html', 
                         user=current_user, 
                         notifications=notifications,
                         stats=stats)

@owner_bp.route('/approve-booking/<int:booking_id>')
@login_required
def approve_booking(booking_id):
    if not current_user.is_owner():
        return redirect(url_for('common.home'))
    
    # Giả lập approve booking
    booking = next((b for b in bookings_data if b["id"] == booking_id), None)
    if booking:
        booking['status'] = 'confirmed'
        flash('Đã duyệt đặt sân thành công!', 'success')
    else:
        flash('Không tìm thấy booking!', 'error')
    
    return redirect(url_for('owner.booking_schedule'))

@owner_bp.route('/reject-booking/<int:booking_id>')
@login_required
def reject_booking(booking_id):
    if not current_user.is_owner():
        return redirect(url_for('common.home'))
    
    # Giả lập reject booking
    booking = next((b for b in bookings_data if b["id"] == booking_id), None)
    if booking:
        booking['status'] = 'cancelled'
        flash('Đã từ chối đặt sân!', 'info')
    else:
        flash('Không tìm thấy booking!', 'error')
    
    return redirect(url_for('owner.booking_schedule')) 