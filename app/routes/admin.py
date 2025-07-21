from flask import Blueprint, render_template, redirect, url_for, request, flash, jsonify
from flask_login import login_required, current_user
from datetime import datetime, timedelta
import random

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

# Mock data for admin dashboard
dashboard_stats = {
    'total_users': 1247,
    'total_owners': 89,
    'total_fields': 156,
    'total_bookings': 2341,
    'total_revenue': 45600000,
    'pending_approvals': 12,
    'system_health': 98.5,
    'active_sessions': 45
}

# Mock data for user management
users_data = [
    {
        'id': 1,
        'username': 'customer123',
        'email': 'customer123@gmail.com',
        'full_name': 'Nguyễn Văn An',
        'phone': '0123456789',
        'role': 'customer',
        'status': 'active',
        'join_date': '2024-01-15',
        'last_login': '2024-12-20 14:30',
        'total_bookings': 15,
        'total_spent': 2500000
    },
    {
        'id': 2,
        'username': 'owner123',
        'email': 'owner123@sportslot.vn',
        'full_name': 'Trần Thị Bình',
        'phone': '0987654321',
        'role': 'owner',
        'status': 'active',
        'join_date': '2024-02-10',
        'last_login': '2024-12-20 16:45',
        'total_fields': 3,
        'total_revenue': 15000000
    },
    {
        'id': 3,
        'username': 'customer456',
        'email': 'customer456@gmail.com',
        'full_name': 'Lê Hoàng Cường',
        'phone': '0369852147',
        'role': 'customer',
        'status': 'suspended',
        'join_date': '2024-03-05',
        'last_login': '2024-12-18 09:15',
        'total_bookings': 8,
        'total_spent': 1200000
    }
]

# Mock data for field management
fields_data = [
    {
        'id': 1,
        'name': 'Sân Bóng Đá A',
        'owner': 'owner123',
        'owner_name': 'Trần Thị Bình',
        'sport_type': 'football',
        'address': 'Quận 1, TP.HCM',
        'status': 'active',
        'created_date': '2024-02-15',
        'total_bookings': 45,
        'monthly_revenue': 9000000,
        'rating': 4.5,
        'reviews_count': 23
    },
    {
        'id': 2,
        'name': 'Sân Tennis Elite',
        'owner': 'owner456',
        'owner_name': 'Phạm Văn Dũng',
        'sport_type': 'tennis',
        'address': 'Quận 2, TP.HCM',
        'status': 'pending',
        'created_date': '2024-12-18',
        'total_bookings': 0,
        'monthly_revenue': 0,
        'rating': 0,
        'reviews_count': 0
    }
]

# Mock data for booking management
bookings_data = [
    {
        'id': 1,
        'booking_code': 'BK001',
        'customer': 'customer123',
        'customer_name': 'Nguyễn Văn An',
        'field': 'Sân Bóng Đá A',
        'field_owner': 'owner123',
        'date': '2024-12-21',
        'time': '18:00-20:00',
        'duration': 2,
        'total_price': 400000,
        'status': 'confirmed',
        'payment_status': 'paid',
        'payment_method': 'Chuyển khoản',
        'created_date': '2024-12-15'
    },
    {
        'id': 2,
        'booking_code': 'BK002',
        'customer': 'customer456',
        'customer_name': 'Lê Hoàng Cường',
        'field': 'Sân Tennis Elite',
        'field_owner': 'owner456',
        'date': '2024-12-22',
        'time': '14:00-16:00',
        'duration': 2,
        'total_price': 500000,
        'status': 'pending',
        'payment_status': 'pending',
        'payment_method': 'Tiền mặt',
        'created_date': '2024-12-16'
    }
]

# Mock data for transaction management
transactions_data = [
    {
        'id': 1,
        'transaction_code': 'TX001',
        'booking_code': 'BK001',
        'customer': 'customer123',
        'field_owner': 'owner123',
        'amount': 400000,
        'commission': 20000,
        'platform_fee': 10000,
        'status': 'completed',
        'payment_method': 'Chuyển khoản',
        'date': '2024-12-20',
        'time': '14:30'
    },
    {
        'id': 2,
        'transaction_code': 'TX002',
        'booking_code': 'BK002',
        'customer': 'customer456',
        'field_owner': 'owner456',
        'amount': 500000,
        'commission': 25000,
        'platform_fee': 12500,
        'status': 'pending',
        'payment_method': 'Tiền mặt',
        'date': '2024-12-20',
        'time': '16:45'
    }
]

# Mock data for voucher management
vouchers_data = [
    {
        'id': 1,
        'code': 'WELCOME20',
        'name': 'Giảm 20% cho lần đặt sân đầu tiên',
        'type': 'percentage',
        'value': 20,
        'max_discount': 150000,
        'min_order': 200000,
        'usage_limit': 1000,
        'used_count': 156,
        'status': 'active',
        'start_date': '2024-01-01',
        'end_date': '2024-12-31',
        'created_by': 'admin'
    },
    {
        'id': 2,
        'code': 'SAVE50K',
        'name': 'Giảm 50.000 VNĐ cho đơn hàng từ 300K',
        'type': 'fixed',
        'value': 50000,
        'max_discount': None,
        'min_order': 300000,
        'usage_limit': 500,
        'used_count': 89,
        'status': 'active',
        'start_date': '2024-06-01',
        'end_date': '2024-12-31',
        'created_by': 'admin'
    }
]

@admin_bp.route('/dashboard')
@login_required
def dashboard():
    if not current_user.is_admin():
        return redirect(url_for('common.home'))
    
    # Calculate additional stats
    growth_stats = {
        'users_growth': 12.5,
        'revenue_growth': 8.3,
        'bookings_growth': 15.7,
        'fields_growth': 5.2
    }
    
    # Recent activities
    recent_activities = [
        {
            'type': 'user_registration',
            'title': 'Tài khoản mới đăng ký',
            'description': 'customer789 đã đăng ký thành công',
            'time': '2 phút trước',
            'icon': '👤'
        },
        {
            'type': 'field_approval',
            'title': 'Sân mới được duyệt',
            'description': 'Sân Tennis Elite đã được phê duyệt',
            'time': '15 phút trước',
            'icon': '⚽'
        },
        {
            'type': 'payment_success',
            'title': 'Thanh toán thành công',
            'description': 'Booking BK001 đã thanh toán 400.000đ',
            'time': '1 giờ trước',
            'icon': '💰'
        },
        {
            'type': 'system_update',
            'title': 'Cập nhật hệ thống',
            'description': 'Phiên bản 2.1.0 đã được triển khai',
            'time': '3 giờ trước',
            'icon': '🔧'
        }
    ]
    
    return render_template('admin/dashboard.html', 
                         user=current_user,
                         stats=dashboard_stats,
                         growth_stats=growth_stats,
                         recent_activities=recent_activities)

@admin_bp.route('/user-management')
@login_required
def user_management():
    if not current_user.is_admin():
        return redirect(url_for('common.home'))
    
    # Filter parameters
    role_filter = request.args.get('role', 'all')
    status_filter = request.args.get('status', 'all')
    search_query = request.args.get('search', '')
    
    # Apply filters
    filtered_users = users_data.copy()
    
    if role_filter != 'all':
        filtered_users = [u for u in filtered_users if u['role'] == role_filter]
    
    if status_filter != 'all':
        filtered_users = [u for u in filtered_users if u['status'] == status_filter]
    
    if search_query:
        filtered_users = [u for u in filtered_users 
                        if search_query.lower() in u['username'].lower() 
                        or search_query.lower() in u['full_name'].lower()]
    
    # Calculate stats
    total_users = len(users_data)
    active_users = len([u for u in users_data if u['status'] == 'active'])
    suspended_users = len([u for u in users_data if u['status'] == 'suspended'])
    customers = len([u for u in users_data if u['role'] == 'customer'])
    owners = len([u for u in users_data if u['role'] == 'owner'])
    
    return render_template('admin/user_management.html',
                         user=current_user,
                         users=filtered_users,
                         total_users=total_users,
                         active_users=active_users,
                         suspended_users=suspended_users,
                         customers=customers,
                         owners=owners)

@admin_bp.route('/field-management')
@login_required
def field_management():
    if not current_user.is_admin():
        return redirect(url_for('common.home'))
    
    # Filter parameters
    status_filter = request.args.get('status', 'all')
    sport_filter = request.args.get('sport', 'all')
    search_query = request.args.get('search', '')
    
    # Apply filters
    filtered_fields = fields_data.copy()
    
    if status_filter != 'all':
        filtered_fields = [f for f in filtered_fields if f['status'] == status_filter]
    
    if sport_filter != 'all':
        filtered_fields = [f for f in filtered_fields if f['sport_type'] == sport_filter]
    
    if search_query:
        filtered_fields = [f for f in filtered_fields 
                         if search_query.lower() in f['name'].lower()]
    
    # Calculate stats
    total_fields = len(fields_data)
    active_fields = len([f for f in fields_data if f['status'] == 'active'])
    pending_fields = len([f for f in fields_data if f['status'] == 'pending'])
    total_revenue = sum(f['monthly_revenue'] for f in fields_data)
    
    return render_template('admin/field_management.html',
                         user=current_user,
                         fields=filtered_fields,
                         total_fields=total_fields,
                         active_fields=active_fields,
                         pending_fields=pending_fields,
                         total_revenue=total_revenue)

@admin_bp.route('/booking-management')
@login_required
def booking_management():
    if not current_user.is_admin():
        return redirect(url_for('common.home'))
    
    # Filter parameters
    status_filter = request.args.get('status', 'all')
    date_filter = request.args.get('date', 'all')
    search_query = request.args.get('search', '')
    
    # Apply filters
    filtered_bookings = bookings_data.copy()
    
    if status_filter != 'all':
        filtered_bookings = [b for b in filtered_bookings if b['status'] == status_filter]
    
    if search_query:
        filtered_bookings = [b for b in filtered_bookings 
                           if search_query.lower() in b['booking_code'].lower()
                           or search_query.lower() in b['customer_name'].lower()]
    
    # Calculate stats
    total_bookings = len(bookings_data)
    confirmed_bookings = len([b for b in bookings_data if b['status'] == 'confirmed'])
    pending_bookings = len([b for b in bookings_data if b['status'] == 'pending'])
    total_revenue = sum(b['total_price'] for b in bookings_data if b['status'] == 'confirmed')
    
    return render_template('admin/booking_management.html',
                         user=current_user,
                         bookings=filtered_bookings,
                         total_bookings=total_bookings,
                         confirmed_bookings=confirmed_bookings,
                         pending_bookings=pending_bookings,
                         total_revenue=total_revenue)

@admin_bp.route('/transaction-management')
@login_required
def transaction_management():
    if not current_user.is_admin():
        return redirect(url_for('common.home'))
    
    # Filter parameters
    status_filter = request.args.get('status', 'all')
    date_filter = request.args.get('date', 'all')
    search_query = request.args.get('search', '')
    
    # Apply filters
    filtered_transactions = transactions_data.copy()
    
    if status_filter != 'all':
        filtered_transactions = [t for t in filtered_transactions if t['status'] == status_filter]
    
    if search_query:
        filtered_transactions = [t for t in filtered_transactions 
                               if search_query.lower() in t['transaction_code'].lower()]
    
    # Calculate stats
    total_transactions = len(transactions_data)
    completed_transactions = len([t for t in transactions_data if t['status'] == 'completed'])
    pending_transactions = len([t for t in transactions_data if t['status'] == 'pending'])
    total_revenue = sum(t['amount'] for t in transactions_data if t['status'] == 'completed')
    total_commission = sum(t['commission'] for t in transactions_data if t['status'] == 'completed')
    
    return render_template('admin/transaction_management.html',
                         user=current_user,
                         transactions=filtered_transactions,
                         total_transactions=total_transactions,
                         completed_transactions=completed_transactions,
                         pending_transactions=pending_transactions,
                         total_revenue=total_revenue,
                         total_commission=total_commission)

@admin_bp.route('/voucher-management')
@login_required
def voucher_management():
    if not current_user.is_admin():
        return redirect(url_for('common.home'))
    
    # Filter parameters
    status_filter = request.args.get('status', 'all')
    type_filter = request.args.get('type', 'all')
    search_query = request.args.get('search', '')
    
    # Apply filters
    filtered_vouchers = vouchers_data.copy()
    
    if status_filter != 'all':
        filtered_vouchers = [v for v in filtered_vouchers if v['status'] == status_filter]
    
    if type_filter != 'all':
        filtered_vouchers = [v for v in filtered_vouchers if v['type'] == type_filter]
    
    if search_query:
        filtered_vouchers = [v for v in filtered_vouchers 
                           if search_query.lower() in v['code'].lower()
                           or search_query.lower() in v['name'].lower()]
    
    # Calculate stats
    total_vouchers = len(vouchers_data)
    active_vouchers = len([v for v in vouchers_data if v['status'] == 'active'])
    total_usage = sum(v['used_count'] for v in vouchers_data)
    total_discount = sum(v['value'] * v['used_count'] for v in vouchers_data if v['type'] == 'fixed')
    
    return render_template('admin/voucher_management.html',
                         user=current_user,
                         vouchers=filtered_vouchers,
                         total_vouchers=total_vouchers,
                         active_vouchers=active_vouchers,
                         total_usage=total_usage,
                         total_discount=total_discount)

@admin_bp.route('/notification')
@login_required
def notification():
    if not current_user.is_admin():
        return redirect(url_for('common.home'))
    
    # Mock notifications data
    notifications = [
        {
            'id': 1,
            'type': 'system',
            'title': 'Sân mới cần duyệt',
            'message': 'Sân Tennis Elite - Chủ sân: owner456',
            'details': 'Chờ phê duyệt từ 2 giờ trước',
            'date': '2024-12-20 14:30',
            'read': False,
            'urgent': True
        },
        {
            'id': 2,
            'type': 'user',
            'title': 'Báo cáo vi phạm',
            'message': 'Khách hàng: Nguyễn Văn Nam',
            'details': 'Báo cáo sân bóng đá A - Chất lượng kém',
            'date': '2024-12-20 13:15',
            'read': False,
            'urgent': True
        },
        {
            'id': 3,
            'type': 'system',
            'title': 'Cập nhật bảo mật',
            'message': 'Phiên bản 2.1.0 đã được triển khai',
            'details': 'Cải thiện bảo mật và hiệu suất',
            'date': '2024-12-20 10:00',
            'read': False,
            'urgent': False
        }
    ]
    
    # Calculate stats
    total_notifications = len(notifications)
    unread_notifications = len([n for n in notifications if not n['read']])
    urgent_notifications = len([n for n in notifications if n['urgent']])
    
    return render_template('admin/notification.html',
                         user=current_user,
                         notifications=notifications,
                         total_notifications=total_notifications,
                         unread_notifications=unread_notifications,
                         urgent_notifications=urgent_notifications)

@admin_bp.route('/system-setting', methods=['GET'])
@login_required
def system_setting():
    if not current_user.is_admin():
        return redirect(url_for('common.home'))
    # Mock settings
    settings = {
        'system_name': 'SportSlot',
        'support_email': 'support@sportslot.vn',
        'version': '2.1.0',
        'maintenance': False,
        'maintenance_time': '',
        'system_notice': 'Chào mừng bạn đến với hệ thống SportSlot!'
    }
    return render_template('admin/system_setting.html', user=current_user, settings=settings)

@admin_bp.route('/admin-log')
@login_required
def admin_log():
    if not current_user.is_admin():
        return redirect(url_for('common.home'))
    
    # Mock admin log data
    admin_logs = [
        {
            'id': 1,
            'admin': 'admin123',
            'action': 'approve_field',
            'description': 'Duyệt sân Tennis Elite',
            'target': 'field_id: 2',
            'ip_address': '192.168.1.100',
            'timestamp': '2024-12-20 15:30:00',
            'status': 'success'
        },
        {
            'id': 2,
            'admin': 'admin123',
            'action': 'suspend_user',
            'description': 'Tạm khóa tài khoản customer456',
            'target': 'user_id: 3',
            'ip_address': '192.168.1.100',
            'timestamp': '2024-12-20 14:15:00',
            'status': 'success'
        },
        {
            'id': 3,
            'admin': 'admin456',
            'action': 'update_system_setting',
            'description': 'Cập nhật cài đặt hệ thống',
            'target': 'commission_rate: 5.0%',
            'ip_address': '192.168.1.101',
            'timestamp': '2024-12-20 13:45:00',
            'status': 'success'
        }
    ]
    
    # Filter parameters
    action_filter = request.args.get('action', 'all')
    admin_filter = request.args.get('admin', 'all')
    status_filter = request.args.get('status', 'all')
    
    # Apply filters
    filtered_logs = admin_logs.copy()
    
    if action_filter != 'all':
        filtered_logs = [l for l in filtered_logs if l['action'] == action_filter]
    
    if admin_filter != 'all':
        filtered_logs = [l for l in filtered_logs if l['admin'] == admin_filter]
    
    if status_filter != 'all':
        filtered_logs = [l for l in filtered_logs if l['status'] == status_filter]
    
    return render_template('admin/admin_log.html',
                         user=current_user,
                         logs=filtered_logs)

@admin_bp.route('/profile')
@login_required
def profile():
    if not current_user.is_admin():
        return redirect(url_for('common.home'))
    
    # Mock admin profile data
    admin_profile = {
        'username': current_user.username,
        'email': f'{current_user.username}@sportslot.vn',
        'full_name': 'Admin System',
        'phone': '0123456789',
        'role': 'Super Admin',
        'permissions': ['user_management', 'field_management', 'system_settings'],
        'last_login': '2024-12-20 16:30:00',
        'login_count': 156,
        'created_date': '2024-01-01'
    }
    
    return render_template('admin/profile.html',
                         user=current_user,
                         profile=admin_profile)

@admin_bp.route('/activity-log')
@login_required
def activity_log():
    if not current_user.is_admin():
        return redirect(url_for('common.home'))
    # Mock data
    activities = [
        {'icon': '👤', 'title': 'Tài khoản mới đăng ký', 'description': 'customer789 đã đăng ký thành công', 'time': '2 phút trước'},
        {'icon': '⚽', 'title': 'Sân mới được duyệt', 'description': 'Sân Tennis Elite đã được phê duyệt', 'time': '15 phút trước'},
        {'icon': '💰', 'title': 'Thanh toán thành công', 'description': 'Booking BK001 đã thanh toán 400.000đ', 'time': '1 giờ trước'},
        {'icon': '🛠️', 'title': 'Cập nhật hệ thống', 'description': 'Phiên bản 2.1.0 đã được triển khai', 'time': '3 giờ trước'},
        {'icon': '📅', 'title': 'Đặt sân mới', 'description': 'Booking BK002 đã được tạo', 'time': '4 giờ trước'},
        {'icon': '⚠️', 'title': 'Báo cáo vi phạm', 'description': 'Khách hàng báo cáo sân bóng đá A', 'time': '5 giờ trước'},
        {'icon': '👤', 'title': 'Tài khoản mới đăng ký', 'description': 'customer123 đã đăng ký thành công', 'time': '6 giờ trước'},
        {'icon': '💰', 'title': 'Thanh toán thành công', 'description': 'Booking BK003 đã thanh toán 250.000đ', 'time': '7 giờ trước'},
        {'icon': '🛠️', 'title': 'Cập nhật hệ thống', 'description': 'Bảo trì hệ thống hoàn tất', 'time': '8 giờ trước'},
    ]
    return render_template('admin/activity_log.html', user=current_user, activities=activities)

# API endpoints for admin actions
@admin_bp.route('/api/approve-field/<int:field_id>', methods=['POST'])
@login_required
def approve_field_api(field_id):
    if not current_user.is_admin():
        return jsonify({'success': False, 'message': 'Unauthorized'}), 403
    
    # Mock API response
    return jsonify({
        'success': True,
        'message': f'Đã duyệt sân #{field_id} thành công'
    })

@admin_bp.route('/api/suspend-user/<int:user_id>', methods=['POST'])
@login_required
def suspend_user_api(user_id):
    if not current_user.is_admin():
        return jsonify({'success': False, 'message': 'Unauthorized'}), 403
    
    # Mock API response
    return jsonify({
        'success': True,
        'message': f'Đã tạm khóa người dùng #{user_id}'
    })

@admin_bp.route('/api/update-system-setting', methods=['POST'])
@login_required
def update_system_setting_api():
    if not current_user.is_admin():
        return jsonify({'success': False, 'message': 'Unauthorized'}), 403
    
    # Mock API response
    return jsonify({
        'success': True,
        'message': 'Cập nhật cài đặt hệ thống thành công'
    }) 