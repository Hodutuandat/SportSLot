from datetime import datetime, timezone
from bson import ObjectId

class Payment:
    def __init__(self, id=None, booking_id=None, user_id=None, field_id=None, owner_id=None,
                 amount=None, payment_method=None, status=None, transaction_id=None,
                 payment_date=None, created_at=None, updated_at=None):
        self.id = id
        self.booking_id = booking_id
        self.user_id = user_id
        self.field_id = field_id
        self.owner_id = owner_id
        self.amount = amount
        self.payment_method = payment_method  # 'cash', 'vnpay', 'momo', 'zalopay', 'bank_transfer'
        self.status = status  # 'pending', 'completed', 'failed', 'refunded'
        self.transaction_id = transaction_id
        self.payment_date = payment_date
        self.created_at = created_at or datetime.now(timezone.utc)
        self.updated_at = updated_at or datetime.now(timezone.utc)
    
    @staticmethod
    def from_dict(data):
        """Create Payment object from MongoDB document"""
        return Payment(
            id=str(data['_id']),
            booking_id=str(data.get('booking_id')) if data.get('booking_id') else None,
            user_id=str(data.get('user_id')) if data.get('user_id') else None,
            field_id=str(data.get('field_id')) if data.get('field_id') else None,
            owner_id=str(data.get('owner_id')) if data.get('owner_id') else None,
            amount=data.get('amount'),
            payment_method=data.get('payment_method'),
            status=data.get('status'),
            transaction_id=data.get('transaction_id'),
            payment_date=data.get('payment_date'),
            created_at=data.get('created_at'),
            updated_at=data.get('updated_at')
        )
    
    def to_dict(self):
        """Convert Payment object to MongoDB document"""
        return {
            'booking_id': ObjectId(self.booking_id) if self.booking_id else None,
            'user_id': ObjectId(self.user_id) if self.user_id else None,
            'field_id': ObjectId(self.field_id) if self.field_id else None,
            'owner_id': ObjectId(self.owner_id) if self.owner_id else None,
            'amount': self.amount,
            'payment_method': self.payment_method,
            'status': self.status,
            'transaction_id': self.transaction_id,
            'payment_date': self.payment_date,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
    @staticmethod
    def validate_amount(amount):
        """Validate payment amount"""
        if not amount:
            return False, 'Số tiền không được để trống'
        
        try:
            amount_float = float(amount)
            if amount_float <= 0:
                return False, 'Số tiền phải lớn hơn 0'
            return True, None
        except ValueError:
            return False, 'Số tiền không hợp lệ'
    
    @staticmethod
    def validate_payment_method(method):
        """Validate payment method"""
        valid_methods = ['cash', 'vnpay', 'momo', 'zalopay', 'bank_transfer']
        if not method:
            return False, 'Phương thức thanh toán không được để trống'
        
        if method not in valid_methods:
            return False, 'Phương thức thanh toán không hợp lệ'
        
        return True, None
    
    @staticmethod
    def validate_status(status):
        """Validate payment status"""
        valid_statuses = ['pending', 'completed', 'failed', 'refunded']
        if not status:
            return False, 'Trạng thái thanh toán không được để trống'
        
        if status not in valid_statuses:
            return False, 'Trạng thái thanh toán không hợp lệ'
        
        return True, None 