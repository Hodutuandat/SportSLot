# Chi tiết Back-end Implementation với Flask

## 1. Kiến trúc Back-end

### 1.1 Cấu trúc ứng dụng Flask

**Application Factory Pattern:**
```python
# app/__init__.py
from flask import Flask
from flask_login import LoginManager
from flask_mail import Mail
from .config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'
    
    mail = Mail()
    mail.init_app(app)
    
    # Register blueprints
    from .routes import auth, customer, owner, admin, common
    app.register_blueprint(auth.bp)
    app.register_blueprint(customer.bp)
    app.register_blueprint(owner.bp)
    app.register_blueprint(admin.bp)
    app.register_blueprint(common.bp)
    
    return app
```

**Blueprint Structure:**
```
app/routes/
├── __init__.py
├── auth.py          # Authentication routes
├── customer.py      # Customer-specific routes
├── owner.py         # Owner-specific routes
├── admin.py         # Admin-specific routes
├── common.py        # Common/shared routes
└── api/            # REST API endpoints
    ├── auth.py
    ├── customer.py
    └── owner.py
```

### 1.2 Configuration Management

**Environment-based Configuration:**
```python
# app/config.py
import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    
    # Database configuration
    DATABASE_URL = os.environ.get('DATABASE_URL') or 'sqlite:///sportslot.db'
    
    # Email configuration
    MAIL_SERVER = os.environ.get('MAIL_SERVER') or 'smtp.gmail.com'
    MAIL_PORT = int(os.environ.get('MAIL_PORT') or 587)
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS', 'true').lower() in ['true', 'on', '1']
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = os.environ.get('MAIL_DEFAULT_SENDER')
    
    # Session configuration
    PERMANENT_SESSION_LIFETIME = timedelta(days=7)
    
    # File upload configuration
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    UPLOAD_FOLDER = 'app/static/uploads'
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

class DevelopmentConfig(Config):
    DEBUG = True
    TESTING = False

class ProductionConfig(Config):
    DEBUG = False
    TESTING = False

class TestingConfig(Config):
    TESTING = True
    WTF_CSRF_ENABLED = False
```

## 2. Authentication & Authorization

### 2.1 User Management System

**User Model với Flask-Login:**
```python
# app/models/user.py
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class User(UserMixin):
    def __init__(self, id, username, email, role, created_at=None):
        self.id = id
        self.username = username
        self.email = email
        self.role = role  # 'customer', 'owner', 'admin'
        self.created_at = created_at or datetime.utcnow()
        self.is_active = True
        self.email_verified = False
        
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
        
    def get_id(self):
        return str(self.id)
        
    def is_authenticated(self):
        return True
        
    def is_anonymous(self):
        return False
```

**Authentication Routes:**
```python
# app/routes/auth.py
from flask import Blueprint, render_template, request, flash, redirect, url_for
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash
from ..models.user import User

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        role = request.form.get('role', 'customer')
        
        # Validate user credentials
        user = validate_user(username, password, role)
        
        if user:
            login_user(user, remember=True)
            flash('Đăng nhập thành công!', 'success')
            
            # Redirect based on role
            if user.role == 'customer':
                return redirect(url_for('customer.home'))
            elif user.role == 'owner':
                return redirect(url_for('owner.dashboard'))
            elif user.role == 'admin':
                return redirect(url_for('admin.dashboard'))
        else:
            flash('Tên đăng nhập hoặc mật khẩu không đúng!', 'error')
    
    return render_template('auth/login.html')

@bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')
        role = request.form.get('role', 'customer')
        
        # Validation
        if password != confirm_password:
            flash('Mật khẩu xác nhận không khớp!', 'error')
            return render_template('auth/register.html')
            
        if len(password) < 6:
            flash('Mật khẩu phải có ít nhất 6 ký tự!', 'error')
            return render_template('auth/register.html')
        
        # Create new user
        user = create_user(username, email, password, role)
        
        if user:
            flash('Đăng ký thành công! Vui lòng đăng nhập.', 'success')
            return redirect(url_for('auth.login'))
        else:
            flash('Tên đăng nhập hoặc email đã tồn tại!', 'error')
    
    return render_template('auth/register.html')

@bp.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Đã đăng xuất thành công!', 'success')
    return redirect(url_for('common.home'))
```

### 2.2 Role-based Access Control

**Decorator cho Role Protection:**
```python
# app/utils/decorators.py
from functools import wraps
from flask import abort, flash, redirect, url_for
from flask_login import current_user

def role_required(role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if not current_user.is_authenticated:
                return redirect(url_for('auth.login'))
            
            if current_user.role != role:
                flash('Bạn không có quyền truy cập trang này!', 'error')
                return redirect(url_for('common.home'))
            
            return f(*args, **kwargs)
        return decorated_function
    return decorator

def admin_required(f):
    return role_required('admin')(f)

def owner_required(f):
    return role_required('owner')(f)

def customer_required(f):
    return role_required('customer')(f)
```

## 3. Data Models & Business Logic

### 3.1 Field Management

**Field Model:**
```python
# app/models/field.py
from datetime import datetime, time
from decimal import Decimal

class Field:
    def __init__(self, id, name, field_type, location, price_per_slot, 
                 owner_id, description=None, image_url=None, is_active=True):
        self.id = id
        self.name = name
        self.field_type = field_type  # 'football', 'basketball', 'tennis', etc.
        self.location = location
        self.price_per_slot = Decimal(price_per_slot)
        self.owner_id = owner_id
        self.description = description
        self.image_url = image_url
        self.is_active = is_active
        self.created_at = datetime.utcnow()
        self.rating = 0.0
        self.review_count = 0
        
    def get_availability(self, date):
        """Lấy lịch trống cho ngày cụ thể"""
        # Mock implementation - trong thực tế sẽ query database
        available_slots = []
        start_time = time(6, 0)  # 6:00 AM
        end_time = time(22, 0)   # 10:00 PM
        
        current_time = start_time
        while current_time < end_time:
            # Mock: 50% chance slot is available
            if hash(f"{self.id}-{date}-{current_time}") % 2 == 0:
                available_slots.append(current_time.strftime("%H:%M"))
            current_time = time(current_time.hour + 2, current_time.minute)
            
        return available_slots
    
    def calculate_price(self, duration_hours, voucher_code=None):
        """Tính giá thuê sân"""
        base_price = self.price_per_slot * duration_hours
        
        if voucher_code:
            discount = self.apply_voucher(voucher_code, base_price)
            return base_price - discount
        
        return base_price
    
    def apply_voucher(self, voucher_code, amount):
        """Áp dụng voucher giảm giá"""
        # Mock implementation
        vouchers = {
            'WELCOME10': 0.1,  # 10% discount
            'SPORT20': 0.2,    # 20% discount
            'VIP30': 0.3       # 30% discount
        }
        
        discount_rate = vouchers.get(voucher_code, 0)
        return amount * discount_rate
```

### 3.2 Booking System

**Booking Model:**
```python
# app/models/booking.py
from datetime import datetime, timedelta
from decimal import Decimal

class Booking:
    def __init__(self, id, field_id, customer_id, booking_date, 
                 start_time, duration_hours, total_amount, status='pending'):
        self.id = id
        self.field_id = field_id
        self.customer_id = customer_id
        self.booking_date = booking_date
        self.start_time = start_time
        self.duration_hours = duration_hours
        self.total_amount = Decimal(total_amount)
        self.status = status  # 'pending', 'approved', 'rejected', 'cancelled'
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()
        self.voucher_code = None
        self.discount_amount = Decimal('0')
        
    def get_end_time(self):
        """Tính thời gian kết thúc"""
        start_dt = datetime.combine(self.booking_date, self.start_time)
        end_dt = start_dt + timedelta(hours=self.duration_hours)
        return end_dt.time()
    
    def is_conflict(self, other_booking):
        """Kiểm tra xung đột thời gian với booking khác"""
        if self.field_id != other_booking.field_id:
            return False
            
        if self.booking_date != other_booking.booking_date:
            return False
            
        self_start = datetime.combine(self.booking_date, self.start_time)
        self_end = self_start + timedelta(hours=self.duration_hours)
        
        other_start = datetime.combine(other_booking.booking_date, other_booking.start_time)
        other_end = other_start + timedelta(hours=other_booking.duration_hours)
        
        return (self_start < other_end and self_end > other_start)
    
    def can_cancel(self):
        """Kiểm tra có thể hủy booking không"""
        booking_datetime = datetime.combine(self.booking_date, self.start_time)
        now = datetime.now()
        
        # Có thể hủy trước 2 giờ
        return (booking_datetime - now) > timedelta(hours=2)
    
    def calculate_refund(self):
        """Tính tiền hoàn lại khi hủy"""
        booking_datetime = datetime.combine(self.booking_date, self.start_time)
        now = datetime.now()
        time_diff = booking_datetime - now
        
        if time_diff > timedelta(hours=24):
            return self.total_amount * Decimal('0.8')  # Hoàn 80%
        elif time_diff > timedelta(hours=2):
            return self.total_amount * Decimal('0.5')  # Hoàn 50%
        else:
            return Decimal('0')  # Không hoàn
```

### 3.3 Payment Processing

**Payment Model:**
```python
# app/models/payment.py
from datetime import datetime
from decimal import Decimal

class Payment:
    def __init__(self, id, booking_id, amount, payment_method, status='pending'):
        self.id = id
        self.booking_id = booking_id
        self.amount = Decimal(amount)
        self.payment_method = payment_method  # 'cash', 'bank_transfer', 'momo', 'vnpay'
        self.status = status  # 'pending', 'completed', 'failed', 'refunded'
        self.created_at = datetime.utcnow()
        self.completed_at = None
        self.transaction_id = None
        self.gateway_response = None
        
    def process_payment(self):
        """Xử lý thanh toán"""
        # Mock payment processing
        import random
        success = random.choice([True, True, True, False])  # 75% success rate
        
        if success:
            self.status = 'completed'
            self.completed_at = datetime.utcnow()
            self.transaction_id = f"TXN{self.id:06d}"
            return True
        else:
            self.status = 'failed'
            self.gateway_response = 'Payment failed'
            return False
    
    def refund(self, amount=None):
        """Hoàn tiền"""
        refund_amount = amount or self.amount
        self.status = 'refunded'
        return {
            'success': True,
            'amount': refund_amount,
            'transaction_id': f"REF{self.id:06d}"
        }
```

## 4. API Endpoints

### 4.1 RESTful API Design

**API Authentication:**
```python
# app/routes/api/auth.py
from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, current_user
from functools import wraps

bp = Blueprint('api_auth', __name__, url_prefix='/api/auth')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:
            # Verify token (implement JWT verification)
            user = verify_token(token)
            if not user:
                return jsonify({'message': 'Token is invalid!'}), 401
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
        
        return f(*args, **kwargs)
    return decorated

@bp.route('/login', methods=['POST'])
def api_login():
    data = request.get_json()
    
    username = data.get('username')
    password = data.get('password')
    role = data.get('role', 'customer')
    
    user = validate_user(username, password, role)
    
    if user:
        login_user(user)
        token = generate_token(user)
        return jsonify({
            'success': True,
            'token': token,
            'user': {
                'id': user.id,
                'username': user.username,
                'role': user.role
            }
        })
    else:
        return jsonify({
            'success': False,
            'message': 'Invalid credentials'
        }), 401
```

**Field API Endpoints:**
```python
# app/routes/api/customer.py
from flask import Blueprint, request, jsonify
from ..models.field import Field
from ..models.booking import Booking

bp = Blueprint('api_customer', __name__, url_prefix='/api/customer')

@bp.route('/fields', methods=['GET'])
def get_fields():
    """Lấy danh sách sân thể thao"""
    # Query parameters
    field_type = request.args.get('type')
    location = request.args.get('location')
    date = request.args.get('date')
    time = request.args.get('time')
    
    # Filter fields based on parameters
    fields = filter_fields(field_type, location, date, time)
    
    return jsonify({
        'success': True,
        'fields': [field.to_dict() for field in fields]
    })

@bp.route('/fields/<int:field_id>', methods=['GET'])
def get_field_detail(field_id):
    """Lấy chi tiết sân thể thao"""
    field = get_field_by_id(field_id)
    
    if not field:
        return jsonify({
            'success': False,
            'message': 'Field not found'
        }), 404
    
    # Get availability for next 7 days
    availability = {}
    from datetime import date, timedelta
    for i in range(7):
        check_date = date.today() + timedelta(days=i)
        availability[check_date.isoformat()] = field.get_availability(check_date)
    
    return jsonify({
        'success': True,
        'field': field.to_dict(),
        'availability': availability
    })

@bp.route('/bookings', methods=['POST'])
@token_required
def create_booking():
    """Tạo booking mới"""
    data = request.get_json()
    
    field_id = data.get('field_id')
    booking_date = data.get('booking_date')
    start_time = data.get('start_time')
    duration_hours = data.get('duration_hours', 1)
    voucher_code = data.get('voucher_code')
    
    # Validate booking
    validation_result = validate_booking(
        field_id, booking_date, start_time, duration_hours, current_user.id
    )
    
    if not validation_result['valid']:
        return jsonify({
            'success': False,
            'message': validation_result['message']
        }), 400
    
    # Create booking
    booking = create_booking_record(
        field_id, current_user.id, booking_date, 
        start_time, duration_hours, voucher_code
    )
    
    return jsonify({
        'success': True,
        'booking': booking.to_dict()
    })

@bp.route('/bookings/<int:booking_id>', methods=['PUT'])
@token_required
def update_booking(booking_id):
    """Cập nhật booking"""
    booking = get_booking_by_id(booking_id)
    
    if not booking or booking.customer_id != current_user.id:
        return jsonify({
            'success': False,
            'message': 'Booking not found'
        }), 404
    
    data = request.get_json()
    action = data.get('action')
    
    if action == 'cancel':
        if not booking.can_cancel():
            return jsonify({
                'success': False,
                'message': 'Cannot cancel booking less than 2 hours before start time'
            }), 400
        
        booking.status = 'cancelled'
        refund_amount = booking.calculate_refund()
        
        return jsonify({
            'success': True,
            'message': 'Booking cancelled successfully',
            'refund_amount': float(refund_amount)
        })
    
    return jsonify({
        'success': False,
        'message': 'Invalid action'
    }), 400
```

## 5. Business Logic Implementation

### 5.1 Booking Validation Logic

```python
# app/services/booking_service.py
from datetime import datetime, timedelta
from ..models.field import Field
from ..models.booking import Booking

class BookingService:
    @staticmethod
    def validate_booking(field_id, booking_date, start_time, duration_hours, customer_id):
        """Validate booking request"""
        errors = []
        
        # Check if field exists and is active
        field = get_field_by_id(field_id)
        if not field or not field.is_active:
            errors.append("Sân thể thao không tồn tại hoặc đã bị vô hiệu hóa")
        
        # Check if booking date is in the future
        booking_datetime = datetime.combine(booking_date, start_time)
        if booking_datetime <= datetime.now():
            errors.append("Thời gian đặt sân phải trong tương lai")
        
        # Check if booking is within allowed time range
        if start_time < time(6, 0) or start_time > time(22, 0):
            errors.append("Thời gian đặt sân phải từ 6:00 đến 22:00")
        
        # Check if duration is valid
        if duration_hours < 1 or duration_hours > 4:
            errors.append("Thời lượng đặt sân phải từ 1-4 giờ")
        
        # Check for time conflicts
        if field:
            conflicts = BookingService.check_time_conflicts(
                field_id, booking_date, start_time, duration_hours
            )
            if conflicts:
                errors.append("Thời gian đã được đặt trước")
        
        # Check customer booking limit
        customer_bookings = get_customer_bookings_today(customer_id, booking_date)
        if len(customer_bookings) >= 3:
            errors.append("Bạn đã đạt giới hạn 3 booking mỗi ngày")
        
        return {
            'valid': len(errors) == 0,
            'errors': errors
        }
    
    @staticmethod
    def check_time_conflicts(field_id, booking_date, start_time, duration_hours):
        """Kiểm tra xung đột thời gian"""
        existing_bookings = get_bookings_by_field_date(field_id, booking_date)
        
        new_start = datetime.combine(booking_date, start_time)
        new_end = new_start + timedelta(hours=duration_hours)
        
        for booking in existing_bookings:
            if booking.status in ['pending', 'approved']:
                booking_start = datetime.combine(booking_date, booking.start_time)
                booking_end = booking_start + timedelta(hours=booking.duration_hours)
                
                if (new_start < booking_end and new_end > booking_start):
                    return True
        
        return False
    
    @staticmethod
    def calculate_booking_price(field, duration_hours, voucher_code=None):
        """Tính giá booking"""
        base_price = field.price_per_slot * duration_hours
        
        if voucher_code:
            discount = BookingService.apply_voucher(voucher_code, base_price)
            return base_price - discount
        
        return base_price
    
    @staticmethod
    def apply_voucher(voucher_code, amount):
        """Áp dụng voucher giảm giá"""
        voucher = get_voucher_by_code(voucher_code)
        
        if not voucher or not voucher.is_valid():
            return Decimal('0')
        
        if voucher.discount_type == 'percentage':
            return amount * (voucher.discount_value / 100)
        else:
            return min(voucher.discount_value, amount)
```

### 5.2 Notification System

```python
# app/services/notification_service.py
from datetime import datetime
from ..models.notification import Notification

class NotificationService:
    @staticmethod
    def send_booking_confirmation(booking):
        """Gửi thông báo xác nhận booking"""
        notification = Notification(
            user_id=booking.customer_id,
            title="Xác nhận đặt sân",
            message=f"Đặt sân của bạn cho {booking.booking_date} đã được xác nhận",
            type="booking_confirmation",
            data={'booking_id': booking.id}
        )
        
        save_notification(notification)
        send_email_notification(notification)
    
    @staticmethod
    def send_booking_reminder(booking):
        """Gửi thông báo nhắc nhở booking"""
        notification = Notification(
            user_id=booking.customer_id,
            title="Nhắc nhở đặt sân",
            message=f"Bạn có lịch đặt sân vào ngày mai lúc {booking.start_time}",
            type="booking_reminder",
            data={'booking_id': booking.id}
        )
        
        save_notification(notification)
        send_email_notification(notification)
    
    @staticmethod
    def send_payment_confirmation(payment):
        """Gửi thông báo xác nhận thanh toán"""
        notification = Notification(
            user_id=payment.booking.customer_id,
            title="Xác nhận thanh toán",
            message=f"Thanh toán {payment.amount:,.0f} VNĐ đã được xác nhận",
            type="payment_confirmation",
            data={'payment_id': payment.id}
        )
        
        save_notification(notification)
        send_email_notification(notification)
    
    @staticmethod
    def send_system_notification(user_ids, title, message, notification_type="system"):
        """Gửi thông báo hệ thống cho nhiều người dùng"""
        notifications = []
        
        for user_id in user_ids:
            notification = Notification(
                user_id=user_id,
                title=title,
                message=message,
                type=notification_type
            )
            notifications.append(notification)
        
        save_notifications_bulk(notifications)
```

## 6. Error Handling & Logging

### 6.1 Custom Error Handlers

```python
# app/utils/error_handlers.py
from flask import render_template, jsonify
from werkzeug.exceptions import HTTPException
import logging

def register_error_handlers(app):
    @app.errorhandler(404)
    def not_found_error(error):
        if request.path.startswith('/api/'):
            return jsonify({
                'success': False,
                'message': 'Resource not found'
            }), 404
        return render_template('shared/404.html'), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        # Log the error
        logging.error(f'Internal server error: {error}')
        
        if request.path.startswith('/api/'):
            return jsonify({
                'success': False,
                'message': 'Internal server error'
            }), 500
        return render_template('shared/500.html'), 500
    
    @app.errorhandler(403)
    def forbidden_error(error):
        if request.path.startswith('/api/'):
            return jsonify({
                'success': False,
                'message': 'Access forbidden'
            }), 403
        return render_template('shared/403.html'), 403
```

### 6.2 Logging Configuration

```python
# app/utils/logging_config.py
import logging
from logging.handlers import RotatingFileHandler
import os

def setup_logging(app):
    if not app.debug and not app.testing:
        # Create logs directory if it doesn't exist
        if not os.path.exists('logs'):
            os.mkdir('logs')
        
        # File handler for general logs
        file_handler = RotatingFileHandler(
            'logs/sportslot.log', 
            maxBytes=10240000, 
            backupCount=10
        )
        file_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
        ))
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)
        
        # File handler for error logs
        error_handler = RotatingFileHandler(
            'logs/error.log', 
            maxBytes=10240000, 
            backupCount=10
        )
        error_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
        ))
        error_handler.setLevel(logging.ERROR)
        app.logger.addHandler(error_handler)
        
        app.logger.setLevel(logging.INFO)
        app.logger.info('SportSlot startup')
```

## 7. Security Implementation

### 7.1 CSRF Protection

```python
# app/utils/security.py
from flask_wtf.csrf import CSRFProtect
from flask import request, abort

csrf = CSRFProtect()

def init_csrf(app):
    csrf.init_app(app)
    
    @app.before_request
    def csrf_protect():
        if request.method == "POST":
            token = request.form.get('csrf_token')
            if not token or not csrf.validate_token(token):
                abort(400, description="CSRF token missing or invalid")

def generate_csrf_token():
    return csrf._get_token()
```

### 7.2 Input Validation & Sanitization

```python
# app/utils/validation.py
import re
from werkzeug.security import safe_str_cmp

class InputValidator:
    @staticmethod
    def validate_email(email):
        """Validate email format"""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None
    
    @staticmethod
    def validate_phone(phone):
        """Validate Vietnamese phone number"""
        pattern = r'^(0|\+84)[3|5|7|8|9][0-9]{8}$'
        return re.match(pattern, phone) is not None
    
    @staticmethod
    def validate_password(password):
        """Validate password strength"""
        if len(password) < 8:
            return False, "Mật khẩu phải có ít nhất 8 ký tự"
        
        if not re.search(r'[A-Z]', password):
            return False, "Mật khẩu phải có ít nhất 1 chữ hoa"
        
        if not re.search(r'[a-z]', password):
            return False, "Mật khẩu phải có ít nhất 1 chữ thường"
        
        if not re.search(r'\d', password):
            return False, "Mật khẩu phải có ít nhất 1 số"
        
        return True, "Mật khẩu hợp lệ"
    
    @staticmethod
    def sanitize_input(text):
        """Sanitize user input"""
        # Remove potentially dangerous characters
        dangerous_chars = ['<', '>', '"', "'", '&']
        for char in dangerous_chars:
            text = text.replace(char, '')
        
        # Limit length
        if len(text) > 1000:
            text = text[:1000]
        
        return text.strip()
```

## 8. Performance Optimization

### 8.1 Database Query Optimization

```python
# app/utils/db_optimization.py
from functools import wraps
import time

def cache_result(ttl=300):  # 5 minutes default
    """Cache decorator for expensive operations"""
    def decorator(func):
        cache = {}
        
        @wraps(func)
        def wrapper(*args, **kwargs):
            key = str(args) + str(sorted(kwargs.items()))
            
            if key in cache:
                result, timestamp = cache[key]
                if time.time() - timestamp < ttl:
                    return result
            
            result = func(*args, **kwargs)
            cache[key] = (result, time.time())
            return result
        
        return wrapper
    return decorator

@cache_result(ttl=600)  # Cache for 10 minutes
def get_popular_fields():
    """Get popular fields with caching"""
    # Expensive database query
    return query_popular_fields()

def optimize_booking_query(field_id, date):
    """Optimized booking query with proper indexing"""
    # Use database indexes for faster queries
    return Booking.query.filter_by(
        field_id=field_id,
        booking_date=date
    ).options(
        joinedload(Booking.field),
        joinedload(Booking.customer)
    ).all()
```

### 8.2 Background Task Processing

```python
# app/utils/background_tasks.py
from celery import Celery
from datetime import datetime, timedelta

# Configure Celery
celery = Celery('sportslot', broker='redis://localhost:6379/0')

@celery.task
def send_booking_reminders():
    """Send booking reminders for tomorrow's bookings"""
    tomorrow = datetime.now().date() + timedelta(days=1)
    bookings = get_bookings_for_date(tomorrow)
    
    for booking in bookings:
        send_reminder_email(booking)

@celery.task
def cleanup_expired_bookings():
    """Clean up expired pending bookings"""
    expired_bookings = get_expired_pending_bookings()
    
    for booking in expired_bookings:
        booking.status = 'cancelled'
        save_booking(booking)

@celery.task
def generate_daily_reports():
    """Generate daily revenue and booking reports"""
    yesterday = datetime.now().date() - timedelta(days=1)
    
    # Generate reports
    revenue_report = generate_revenue_report(yesterday)
    booking_report = generate_booking_report(yesterday)
    
    # Send reports to admins
    send_reports_to_admins(revenue_report, booking_report)
```

## 9. Testing Implementation

### 9.1 Unit Tests

```python
# tests/test_models.py
import unittest
from app.models.booking import Booking
from app.models.field import Field
from datetime import datetime, time, date

class TestBookingModel(unittest.TestCase):
    def setUp(self):
        self.field = Field(
            id=1,
            name="Sân Bóng Đá A",
            field_type="football",
            location="Quận 1, TP.HCM",
            price_per_slot=200000
        )
        
        self.booking = Booking(
            id=1,
            field_id=1,
            customer_id=1,
            booking_date=date(2024, 1, 15),
            start_time=time(18, 0),
            duration_hours=2,
            total_amount=400000
        )
    
    def test_booking_end_time_calculation(self):
        """Test end time calculation"""
        end_time = self.booking.get_end_time()
        expected_time = time(20, 0)
        self.assertEqual(end_time, expected_time)
    
    def test_booking_conflict_detection(self):
        """Test booking conflict detection"""
        other_booking = Booking(
            id=2,
            field_id=1,
            customer_id=2,
            booking_date=date(2024, 1, 15),
            start_time=time(19, 0),
            duration_hours=2,
            total_amount=400000
        )
        
        self.assertTrue(self.booking.is_conflict(other_booking))
    
    def test_booking_cancellation_eligibility(self):
        """Test booking cancellation eligibility"""
        # Booking is in the future, should be cancellable
        self.assertTrue(self.booking.can_cancel())
        
        # Modify booking to be in the past
        self.booking.booking_date = date(2024, 1, 1)
        self.assertFalse(self.booking.can_cancel())

class TestFieldModel(unittest.TestCase):
    def setUp(self):
        self.field = Field(
            id=1,
            name="Sân Tennis Pro",
            field_type="tennis",
            location="Quận 2, TP.HCM",
            price_per_slot=300000
        )
    
    def test_price_calculation(self):
        """Test price calculation with voucher"""
        price = self.field.calculate_price(2, "WELCOME10")
        expected_price = 300000 * 2 * 0.9  # 10% discount
        self.assertEqual(price, expected_price)
    
    def test_availability_generation(self):
        """Test availability generation"""
        availability = self.field.get_availability(date(2024, 1, 15))
        self.assertIsInstance(availability, list)
        self.assertTrue(len(availability) > 0)
```

### 9.2 Integration Tests

```python
# tests/test_api.py
import unittest
from app import create_app
from app.models.user import User

class TestAPIEndpoints(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()
    
    def tearDown(self):
        self.app_context.pop()
    
    def test_get_fields_api(self):
        """Test GET /api/customer/fields endpoint"""
        response = self.client.get('/api/customer/fields')
        data = response.get_json()
        
        self.assertEqual(response.status_code, 200)
        self.assertTrue(data['success'])
        self.assertIn('fields', data)
    
    def test_create_booking_api(self):
        """Test POST /api/customer/bookings endpoint"""
        booking_data = {
            'field_id': 1,
            'booking_date': '2024-01-15',
            'start_time': '18:00',
            'duration_hours': 2
        }
        
        response = self.client.post(
            '/api/customer/bookings',
            json=booking_data,
            headers={'Authorization': 'Bearer test_token'}
        )
        
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertTrue(data['success'])
    
    def test_invalid_booking_api(self):
        """Test booking with invalid data"""
        booking_data = {
            'field_id': 999,  # Non-existent field
            'booking_date': '2024-01-15',
            'start_time': '18:00',
            'duration_hours': 2
        }
        
        response = self.client.post(
            '/api/customer/bookings',
            json=booking_data,
            headers={'Authorization': 'Bearer test_token'}
        )
        
        data = response.get_json()
        self.assertEqual(response.status_code, 400)
        self.assertFalse(data['success'])
```

## 10. Deployment & Production Configuration

### 10.1 Production WSGI Configuration

```python
# wsgi.py
from app import create_app
from app.config import ProductionConfig

app = create_app(ProductionConfig)

if __name__ == "__main__":
    app.run()
```

### 10.2 Docker Configuration

```dockerfile
# Dockerfile
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user
RUN useradd -m -u 1000 sportslot && chown -R sportslot:sportslot /app
USER sportslot

# Expose port
EXPOSE 5000

# Run application
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "wsgi:app"]
```

### 10.3 Environment Configuration

```bash
# .env.production
FLASK_ENV=production
SECRET_KEY=your-super-secret-production-key-here
DATABASE_URL=postgresql://user:password@localhost/sportslot_prod
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
REDIS_URL=redis://localhost:6379/0
```

## Tóm tắt Back-end Implementation

### Các tính năng chính đã triển khai:

1. **Kiến trúc Flask Application Factory Pattern** - Tạo ứng dụng linh hoạt với cấu hình theo môi trường
2. **Authentication & Authorization** - Hệ thống đăng nhập với Flask-Login và role-based access control
3. **Data Models** - Các model cho User, Field, Booking, Payment với business logic đầy đủ
4. **RESTful API** - API endpoints cho customer, owner với authentication và validation
5. **Business Logic** - Booking validation, payment processing, notification system
6. **Security** - CSRF protection, input validation, password hashing
7. **Error Handling & Logging** - Custom error handlers và logging configuration
8. **Performance Optimization** - Caching, database query optimization, background tasks
9. **Testing** - Unit tests và integration tests cho models và API endpoints
10. **Deployment** - Production configuration với Docker và environment setup

### Công nghệ sử dụng:

- **Flask** - Web framework chính
- **Flask-Login** - User session management
- **Flask-Mail** - Email functionality
- **Werkzeug** - Security utilities
- **Celery** - Background task processing
- **SQLAlchemy** - Database ORM (cho production)
- **JWT** - Token-based authentication cho API
- **Redis** - Caching và message broker
- **Gunicorn** - WSGI server cho production
- **Docker** - Containerization

### Mô hình dữ liệu:

1. **User Model** - Quản lý người dùng với roles (customer, owner, admin)
2. **Field Model** - Quản lý sân thể thao với availability và pricing
3. **Booking Model** - Quản lý đặt sân với conflict detection và cancellation logic
4. **Payment Model** - Xử lý thanh toán với multiple payment methods
5. **Notification Model** - Hệ thống thông báo real-time

### API Endpoints:

1. **Authentication API** - Login, register, token management
2. **Customer API** - Field listing, booking management, payment processing
3. **Owner API** - Field management, booking approval, revenue tracking
4. **Admin API** - User management, system monitoring, reporting

### Security Features:

1. **Password Hashing** - Bcrypt hashing cho mật khẩu
2. **CSRF Protection** - Cross-site request forgery protection
3. **Input Validation** - Sanitization và validation cho user input
4. **Role-based Access** - Authorization theo vai trò người dùng
5. **Session Management** - Secure session handling

### Performance Features:

1. **Caching** - Redis caching cho expensive operations
2. **Database Optimization** - Query optimization với proper indexing
3. **Background Tasks** - Celery cho non-blocking operations
4. **Connection Pooling** - Database connection management
5. **Load Balancing** - Multiple worker processes với Gunicorn

### Testing Strategy:

1. **Unit Tests** - Testing individual models và business logic
2. **Integration Tests** - Testing API endpoints và database operations
3. **Mock Testing** - Mock external services và dependencies
4. **Performance Testing** - Load testing cho critical endpoints

### Deployment Strategy:

1. **Environment Configuration** - Separate configs cho development, testing, production
2. **Containerization** - Docker cho consistent deployment
3. **Process Management** - Gunicorn với multiple workers
4. **Monitoring** - Logging và error tracking
5. **Backup Strategy** - Database backup và recovery procedures 