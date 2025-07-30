from datetime import datetime, timezone
from bson import ObjectId

class Notification:
    def __init__(self, id=None, user_id=None, title=None, message=None, type=None,
                 subtype=None, data=None, is_read=None, action_required=None,
                 created_at=None, read_at=None):
        self.id = id
        self.user_id = user_id
        self.title = title
        self.message = message
        self.type = type  # 'booking', 'payment', 'review', 'system', 'voucher'
        self.subtype = subtype  # 'urgent', 'success', 'failed', 'warning', 'info'
        self.data = data or {}  # Additional data for the notification
        self.is_read = is_read if is_read is not None else False
        self.action_required = action_required if action_required is not None else False
        self.created_at = created_at or datetime.now(timezone.utc)
        self.read_at = read_at
    
    @staticmethod
    def from_dict(data):
        """Create Notification object from MongoDB document"""
        return Notification(
            id=str(data['_id']),
            user_id=str(data.get('user_id')) if data.get('user_id') else None,
            title=data.get('title'),
            message=data.get('message'),
            type=data.get('type'),
            subtype=data.get('subtype'),
            data=data.get('data', {}),
            is_read=data.get('is_read', False),
            action_required=data.get('action_required', False),
            created_at=data.get('created_at'),
            read_at=data.get('read_at')
        )
    
    def to_dict(self):
        """Convert Notification object to MongoDB document"""
        return {
            'user_id': ObjectId(self.user_id) if self.user_id else None,
            'title': self.title,
            'message': self.message,
            'type': self.type,
            'subtype': self.subtype,
            'data': self.data,
            'is_read': self.is_read,
            'action_required': self.action_required,
            'created_at': self.created_at,
            'read_at': self.read_at
        }
    
    def mark_as_read(self):
        """Mark notification as read"""
        self.is_read = True
        self.read_at = datetime.now(timezone.utc)
    
    def mark_as_unread(self):
        """Mark notification as unread"""
        self.is_read = False
        self.read_at = None
    
    @staticmethod
    def validate_title(title):
        """Validate notification title"""
        if not title:
            return False, 'Tiêu đề thông báo không được để trống'
        
        if len(title.strip()) < 5:
            return False, 'Tiêu đề thông báo phải có ít nhất 5 ký tự'
        
        if len(title.strip()) > 100:
            return False, 'Tiêu đề thông báo không được quá 100 ký tự'
        
        return True, None
    
    @staticmethod
    def validate_message(message):
        """Validate notification message"""
        if not message:
            return False, 'Nội dung thông báo không được để trống'
        
        if len(message.strip()) < 10:
            return False, 'Nội dung thông báo phải có ít nhất 10 ký tự'
        
        if len(message.strip()) > 500:
            return False, 'Nội dung thông báo không được quá 500 ký tự'
        
        return True, None
    
    @staticmethod
    def validate_type(notification_type):
        """Validate notification type"""
        valid_types = ['booking', 'payment', 'review', 'system', 'voucher']
        if not notification_type:
            return False, 'Loại thông báo không được để trống'
        
        if notification_type not in valid_types:
            return False, 'Loại thông báo không hợp lệ'
        
        return True, None
    
    @staticmethod
    def validate_subtype(subtype):
        """Validate notification subtype"""
        valid_subtypes = ['urgent', 'success', 'failed', 'warning', 'info']
        if not subtype:
            return False, 'Phân loại thông báo không được để trống'
        
        if subtype not in valid_subtypes:
            return False, 'Phân loại thông báo không hợp lệ'
        
        return True, None
    
    def get_icon_class(self):
        """Get Bootstrap icon class based on type and subtype"""
        icon_map = {
            'booking': {
                'urgent': 'fas fa-exclamation-triangle text-warning',
                'success': 'fas fa-check-circle text-success',
                'failed': 'fas fa-times-circle text-danger',
                'warning': 'fas fa-exclamation-triangle text-warning',
                'info': 'fas fa-info-circle text-info'
            },
            'payment': {
                'urgent': 'fas fa-exclamation-triangle text-warning',
                'success': 'fas fa-check-circle text-success',
                'failed': 'fas fa-times-circle text-danger',
                'warning': 'fas fa-exclamation-triangle text-warning',
                'info': 'fas fa-info-circle text-info'
            },
            'review': {
                'urgent': 'fas fa-star text-warning',
                'success': 'fas fa-star text-success',
                'failed': 'fas fa-star text-danger',
                'warning': 'fas fa-star text-warning',
                'info': 'fas fa-star text-info'
            },
            'system': {
                'urgent': 'fas fa-cog text-warning',
                'success': 'fas fa-cog text-success',
                'failed': 'fas fa-cog text-danger',
                'warning': 'fas fa-cog text-warning',
                'info': 'fas fa-cog text-info'
            },
            'voucher': {
                'urgent': 'fas fa-ticket-alt text-warning',
                'success': 'fas fa-ticket-alt text-success',
                'failed': 'fas fa-ticket-alt text-danger',
                'warning': 'fas fa-ticket-alt text-warning',
                'info': 'fas fa-ticket-alt text-info'
            }
        }
        
        return icon_map.get(self.type, {}).get(self.subtype, 'fas fa-bell text-info') 