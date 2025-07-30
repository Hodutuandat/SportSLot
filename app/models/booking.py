from datetime import datetime
from bson import ObjectId

class Booking:
    def __init__(self, id=None, user_id=None, field_id=None, date=None, start_time=None, 
                 end_time=None, duration=None, total_price=None, status=None, payment_method=None, created_at=None):
        self.id = id
        self.user_id = user_id
        self.field_id = field_id
        self.date = date
        self.start_time = start_time
        self.end_time = end_time
        self.duration = duration
        self.total_price = total_price
        self.status = status  # 'pending', 'confirmed', 'completed', 'cancelled'
        self.payment_method = payment_method
        self.created_at = created_at or datetime.utcnow()
    
    @staticmethod
    def from_dict(data):
        """Create Booking object from MongoDB document"""
        return Booking(
            id=str(data['_id']),
            user_id=str(data.get('user_id')) if data.get('user_id') else None,
            field_id=str(data.get('field_id')) if data.get('field_id') else None,
            date=data.get('date'),
            start_time=data.get('start_time'),
            end_time=data.get('end_time'),
            duration=data.get('duration'),
            total_price=data.get('total_price'),
            status=data.get('status'),
            payment_method=data.get('payment_method'),
            created_at=data.get('created_at')
        )
    
    def to_dict(self):
        """Convert Booking object to MongoDB document"""
        return {
            'user_id': ObjectId(self.user_id) if self.user_id else None,
            'field_id': ObjectId(self.field_id) if self.field_id else None,
            'date': self.date,
            'start_time': self.start_time,
            'end_time': self.end_time,
            'duration': self.duration,
            'total_price': self.total_price,
            'status': self.status,
            'payment_method': self.payment_method,
            'created_at': self.created_at
        } 