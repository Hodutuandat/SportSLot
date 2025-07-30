from datetime import datetime
from bson import ObjectId

class Field:
    def __init__(self, id=None, name=None, location=None, field_type=None, price_per_slot=None, 
                 is_indoor=False, owner_id=None, images=None, description=None, created_at=None):
        self.id = id
        self.name = name
        self.location = location
        self.field_type = field_type  # 'football', 'basketball', 'volleyball', 'tennis', 'badminton'
        self.price_per_slot = price_per_slot
        self.is_indoor = is_indoor
        self.owner_id = owner_id
        self.images = images or []
        self.description = description
        self.created_at = created_at or datetime.utcnow()
    
    @staticmethod
    def from_dict(data):
        """Create Field object from MongoDB document"""
        return Field(
            id=str(data['_id']),
            name=data.get('name'),
            location=data.get('location'),
            field_type=data.get('field_type'),
            price_per_slot=data.get('price_per_slot'),
            is_indoor=data.get('is_indoor', False),
            owner_id=str(data.get('owner_id')) if data.get('owner_id') else None,
            images=data.get('images', []),
            description=data.get('description'),
            created_at=data.get('created_at')
        )
    
    def to_dict(self):
        """Convert Field object to MongoDB document"""
        return {
            'name': self.name,
            'location': self.location,
            'field_type': self.field_type,
            'price_per_slot': self.price_per_slot,
            'is_indoor': self.is_indoor,
            'owner_id': ObjectId(self.owner_id) if self.owner_id else None,
            'images': self.images,
            'description': self.description,
            'created_at': self.created_at
        } 