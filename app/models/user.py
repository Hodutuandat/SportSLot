from datetime import datetime, timezone
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from bson import ObjectId

class User(UserMixin):
    def __init__(self, id=None, username=None, user_type='customer', email=None, phone=None, 
                 password_hash=None, full_name=None, address=None, birthday=None, gender=None, 
                 created_at=None, is_active=True):
        self.id = id
        self.username = username
        self.user_type = user_type  # 'customer', 'owner', 'admin'
        self.email = email
        self.phone = phone
        self.password_hash = password_hash
        self.full_name = full_name
        self.address = address
        self.birthday = birthday
        self.gender = gender
        self.created_at = created_at or datetime.now(timezone.utc)
        self._is_active = is_active
        self._is_authenticated = True
        self._is_anonymous = False
    
    def get_id(self):
        return str(self.id)
    
    @property
    def is_authenticated(self):
        return self._is_authenticated
    
    @property
    def is_active(self):
        return self._is_active
    
    @property
    def is_anonymous(self):
        return self._is_anonymous
    
    def is_customer(self):
        return self.user_type == 'customer'
    
    def is_owner(self):
        return self.user_type == 'owner'
    
    def is_admin(self):
        return self.user_type == 'admin'
    
    def set_password(self, password):
        """Hash password và lưu vào database"""
        self.password_hash = generate_password_hash(password)
        return self.password_hash
    
    def check_password(self, password):
        """Kiểm tra password có đúng không"""
        if not self.password_hash:
            return False
        return check_password_hash(self.password_hash, password)
    
    @staticmethod
    def from_dict(data):
        """Create User object from MongoDB document"""
        return User(
            id=str(data['_id']),
            username=data.get('username'),
            user_type=data.get('user_type', 'customer'),
            email=data.get('email'),
            phone=data.get('phone'),
            password_hash=data.get('password_hash'),
            full_name=data.get('full_name'),
            address=data.get('address'),
            birthday=data.get('birthday'),
            gender=data.get('gender'),
            created_at=data.get('created_at'),
            is_active=data.get('is_active', True)
        )
    
    def to_dict(self):
        """Convert User object to MongoDB document"""
        return {
            'username': self.username,
            'user_type': self.user_type,
            'email': self.email,
            'phone': self.phone,
            'password_hash': self.password_hash,
            'full_name': self.full_name,
            'address': self.address,
            'birthday': self.birthday,
            'gender': self.gender,
            'created_at': self.created_at,
            'is_active': self.is_active
        }
    
    @staticmethod
    def validate_username(username):
        """Kiểm tra username có hợp lệ không"""
        if not username:
            return False, "Tên đăng nhập không được để trống"
        if len(username) < 3:
            return False, "Tên đăng nhập phải có ít nhất 3 ký tự"
        if len(username) > 20:
            return False, "Tên đăng nhập không được quá 20 ký tự"
        if not username.replace('_', '').replace('-', '').isalnum():
            return False, "Tên đăng nhập chỉ được chứa chữ cái, số, dấu gạch dưới và gạch ngang"
        return True, ""
    
    @staticmethod
    def validate_email(email):
        """Kiểm tra email có hợp lệ không"""
        import re
        if not email:
            return False, "Email không được để trống"
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(pattern, email):
            return False, "Email không đúng định dạng"
        return True, ""
    
    @staticmethod
    def validate_password(password):
        """Kiểm tra password có đủ mạnh không"""
        if not password:
            return False, "Mật khẩu không được để trống"
        if len(password) < 6:
            return False, "Mật khẩu phải có ít nhất 6 ký tự"
        if len(password) > 50:
            return False, "Mật khẩu không được quá 50 ký tự"
        return True, ""
    
    @staticmethod
    def validate_phone(phone):
        """Kiểm tra số điện thoại có hợp lệ không"""
        import re
        if not phone:
            return False, "Số điện thoại không được để trống"
        pattern = r'^[0-9]{10,11}$'
        if not re.match(pattern, phone):
            return False, "Số điện thoại không đúng định dạng"
        return True, "" 