from datetime import datetime, timezone
from bson import ObjectId

class Profile:
    def __init__(self, id=None, user_id=None, full_name=None, phone=None, address=None, 
                 birthday=None, gender=None, avatar=None, bio=None, preferences=None, 
                 created_at=None, updated_at=None):
        self.id = id
        self.user_id = user_id
        self.full_name = full_name
        self.phone = phone
        self.address = address
        self.birthday = birthday
        self.gender = gender  # 'male', 'female', 'other'
        self.avatar = avatar
        self.bio = bio
        self.preferences = preferences or {}
        self.created_at = created_at or datetime.now(timezone.utc)
        self.updated_at = updated_at or datetime.now(timezone.utc)
    
    @staticmethod
    def from_dict(data):
        """Create Profile object from MongoDB document"""
        return Profile(
            id=str(data['_id']),
            user_id=str(data.get('user_id')) if data.get('user_id') else None,
            full_name=data.get('full_name'),
            phone=data.get('phone'),
            address=data.get('address'),
            birthday=data.get('birthday'),
            gender=data.get('gender'),
            avatar=data.get('avatar'),
            bio=data.get('bio'),
            preferences=data.get('preferences', {}),
            created_at=data.get('created_at'),
            updated_at=data.get('updated_at')
        )
    
    def to_dict(self):
        """Convert Profile object to MongoDB document"""
        return {
            'user_id': ObjectId(self.user_id) if self.user_id else None,
            'full_name': self.full_name,
            'phone': self.phone,
            'address': self.address,
            'birthday': self.birthday,
            'gender': self.gender,
            'avatar': self.avatar,
            'bio': self.bio,
            'preferences': self.preferences,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
    @staticmethod
    def validate_phone(phone):
        """Validate phone number format"""
        import re
        if not phone:
            return True, None
        
        # Vietnamese phone number pattern
        pattern = r'^(0|\+84)(3[2-9]|5[689]|7[06-9]|8[1-689]|9[0-46-9])[0-9]{7}$'
        if re.match(pattern, phone):
            return True, None
        else:
            return False, 'Số điện thoại không đúng định dạng'
    
    @staticmethod
    def validate_full_name(full_name):
        """Validate full name"""
        if not full_name:
            return False, 'Họ tên không được để trống'
        
        if len(full_name.strip()) < 2:
            return False, 'Họ tên phải có ít nhất 2 ký tự'
        
        if len(full_name.strip()) > 100:
            return False, 'Họ tên không được quá 100 ký tự'
        
        return True, None
    
    @staticmethod
    def validate_gender(gender):
        """Validate gender"""
        if not gender:
            return True, None
        
        valid_genders = ['male', 'female', 'other']
        if gender not in valid_genders:
            return False, 'Giới tính không hợp lệ'
        
        return True, None 