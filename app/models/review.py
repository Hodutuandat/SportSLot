from datetime import datetime, timezone
from bson import ObjectId

class Review:
    def __init__(self, id=None, booking_id=None, user_id=None, field_id=None, 
                 rating=None, comment=None, created_at=None, updated_at=None):
        self.id = id
        self.booking_id = booking_id
        self.user_id = user_id
        self.field_id = field_id
        self.rating = rating  # 1-5 stars
        self.comment = comment
        self.created_at = created_at or datetime.now(timezone.utc)
        self.updated_at = updated_at or datetime.now(timezone.utc)
    
    @staticmethod
    def from_dict(data):
        """Create Review object from MongoDB document"""
        return Review(
            id=str(data['_id']),
            booking_id=str(data.get('booking_id')) if data.get('booking_id') else None,
            user_id=str(data.get('user_id')) if data.get('user_id') else None,
            field_id=str(data.get('field_id')) if data.get('field_id') else None,
            rating=data.get('rating'),
            comment=data.get('comment'),
            created_at=data.get('created_at'),
            updated_at=data.get('updated_at')
        )
    
    def to_dict(self):
        """Convert Review object to MongoDB document"""
        return {
            'booking_id': ObjectId(self.booking_id) if self.booking_id else None,
            'user_id': ObjectId(self.user_id) if self.user_id else None,
            'field_id': ObjectId(self.field_id) if self.field_id else None,
            'rating': self.rating,
            'comment': self.comment,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
    @staticmethod
    def validate_rating(rating):
        """Validate rating (1-5 stars)"""
        if not rating:
            return False, 'Vui lòng chọn số sao đánh giá'
        
        try:
            rating_int = int(rating)
            if rating_int < 1 or rating_int > 5:
                return False, 'Số sao phải từ 1-5'
            return True, None
        except ValueError:
            return False, 'Số sao không hợp lệ'
    
    @staticmethod
    def validate_comment(comment):
        """Validate comment"""
        if not comment:
            return False, 'Vui lòng viết nhận xét'
        
        if len(comment.strip()) < 10:
            return False, 'Nhận xét phải có ít nhất 10 ký tự'
        
        if len(comment.strip()) > 500:
            return False, 'Nhận xét không được quá 500 ký tự'
        
        return True, None 