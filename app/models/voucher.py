from datetime import datetime, timezone
from bson import ObjectId

class Voucher:
    def __init__(self, id=None, code=None, name=None, description=None, discount_type=None,
                 discount_value=None, min_amount=None, max_discount=None, valid_from=None,
                 valid_until=None, usage_limit=None, used_count=None, is_active=None,
                 created_by=None, created_at=None, updated_at=None):
        self.id = id
        self.code = code
        self.name = name
        self.description = description
        self.discount_type = discount_type  # 'percentage', 'fixed_amount'
        self.discount_value = discount_value  # percentage (0-100) or fixed amount
        self.min_amount = min_amount  # minimum booking amount to apply
        self.max_discount = max_discount  # maximum discount amount
        self.valid_from = valid_from
        self.valid_until = valid_until
        self.usage_limit = usage_limit  # total usage limit
        self.used_count = used_count or 0
        self.is_active = is_active if is_active is not None else True
        self.created_by = created_by
        self.created_at = created_at or datetime.now(timezone.utc)
        self.updated_at = updated_at or datetime.now(timezone.utc)
    
    @staticmethod
    def from_dict(data):
        """Create Voucher object from MongoDB document"""
        return Voucher(
            id=str(data['_id']),
            code=data.get('code'),
            name=data.get('name'),
            description=data.get('description'),
            discount_type=data.get('discount_type'),
            discount_value=data.get('discount_value'),
            min_amount=data.get('min_amount'),
            max_discount=data.get('max_discount'),
            valid_from=data.get('valid_from'),
            valid_until=data.get('valid_until'),
            usage_limit=data.get('usage_limit'),
            used_count=data.get('used_count', 0),
            is_active=data.get('is_active', True),
            created_by=str(data.get('created_by')) if data.get('created_by') else None,
            created_at=data.get('created_at'),
            updated_at=data.get('updated_at')
        )
    
    def to_dict(self):
        """Convert Voucher object to MongoDB document"""
        return {
            'code': self.code,
            'name': self.name,
            'description': self.description,
            'discount_type': self.discount_type,
            'discount_value': self.discount_value,
            'min_amount': self.min_amount,
            'max_discount': self.max_discount,
            'valid_from': self.valid_from,
            'valid_until': self.valid_until,
            'usage_limit': self.usage_limit,
            'used_count': self.used_count,
            'is_active': self.is_active,
            'created_by': ObjectId(self.created_by) if self.created_by else None,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
    def is_valid(self, current_time=None):
        """Check if voucher is valid at current time"""
        if current_time is None:
            current_time = datetime.now(timezone.utc)
        
        if not self.is_active:
            return False, 'Voucher đã bị vô hiệu hóa'
        
        if self.valid_from and current_time < self.valid_from:
            return False, 'Voucher chưa có hiệu lực'
        
        if self.valid_until and current_time > self.valid_until:
            return False, 'Voucher đã hết hạn'
        
        if self.usage_limit and self.used_count >= self.usage_limit:
            return False, 'Voucher đã hết lượt sử dụng'
        
        return True, None
    
    def calculate_discount(self, booking_amount):
        """Calculate discount amount for given booking amount"""
        if self.discount_type == 'percentage':
            discount = booking_amount * (self.discount_value / 100)
            if self.max_discount:
                discount = min(discount, self.max_discount)
        elif self.discount_type == 'fixed_amount':
            discount = self.discount_value
        else:
            discount = 0
        
        return discount
    
    @staticmethod
    def validate_code(code):
        """Validate voucher code"""
        if not code:
            return False, 'Mã voucher không được để trống'
        
        if len(code) < 3:
            return False, 'Mã voucher phải có ít nhất 3 ký tự'
        
        if len(code) > 20:
            return False, 'Mã voucher không được quá 20 ký tự'
        
        if not code.replace('-', '').replace('_', '').isalnum():
            return False, 'Mã voucher chỉ được chứa chữ cái, số, dấu gạch ngang và gạch dưới'
        
        return True, None
    
    @staticmethod
    def validate_discount_value(value, discount_type):
        """Validate discount value"""
        if not value:
            return False, 'Giá trị giảm giá không được để trống'
        
        try:
            value_float = float(value)
            if value_float <= 0:
                return False, 'Giá trị giảm giá phải lớn hơn 0'
            
            if discount_type == 'percentage' and value_float > 100:
                return False, 'Phần trăm giảm giá không được vượt quá 100%'
            
            return True, None
        except ValueError:
            return False, 'Giá trị giảm giá không hợp lệ' 