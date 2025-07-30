from datetime import datetime
from bson import ObjectId

class Field:
    def __init__(self, id=None, name=None, sport_type=None, description=None, capacity=None, 
                 field_size=None, address=None, district=None, city=None, latitude=None, 
                 longitude=None, parking=None, transportation=None, amenities=None, rules=None,
                 pricing=None, weekday_hours=None, weekend_hours=None, deposit=None, 
                 cancellation=None, owner_id=None, status='pending', images=None, 
                 total_bookings=0, monthly_revenue=0, created_at=None, updated_at=None):
        self.id = id
        self.name = name
        self.sport_type = sport_type  # 'football', 'basketball', 'tennis', 'badminton', 'volleyball', 'futsal', 'ping-pong', 'other'
        self.description = description
        self.capacity = capacity
        self.field_size = field_size
        self.address = address
        self.district = district
        self.city = city
        self.latitude = latitude
        self.longitude = longitude
        self.parking = parking  # 'free', 'paid', 'none'
        self.transportation = transportation
        self.amenities = amenities or []  # ['lighting', 'changing_room', 'shower', 'equipment', 'cafe', 'wifi', etc.]
        self.rules = rules
        self.pricing = pricing or {}  # {'morning_weekday': 200000, 'morning_weekend': 250000, etc.}
        self.weekday_hours = weekday_hours or {}  # {'start': '06:00', 'end': '23:00'}
        self.weekend_hours = weekend_hours or {}  # {'start': '05:00', 'end': '24:00'}
        self.deposit = deposit
        self.cancellation = cancellation  # 'free', 'partial', 'full'
        self.owner_id = owner_id
        self.status = status  # 'pending', 'active', 'inactive', 'rejected'
        self.images = images or []
        self.total_bookings = total_bookings
        self.monthly_revenue = monthly_revenue
        self.created_at = created_at or datetime.now()
        self.updated_at = updated_at or datetime.now()
    
    @staticmethod
    def from_dict(data):
        """Create Field object from MongoDB document"""
        return Field(
            id=str(data['_id']),
            name=data.get('name'),
            sport_type=data.get('sport_type'),
            description=data.get('description'),
            capacity=data.get('capacity'),
            field_size=data.get('field_size'),
            address=data.get('address'),
            district=data.get('district'),
            city=data.get('city'),
            latitude=data.get('latitude'),
            longitude=data.get('longitude'),
            parking=data.get('parking'),
            transportation=data.get('transportation'),
            amenities=data.get('amenities', []),
            rules=data.get('rules'),
            pricing=data.get('pricing', {}),
            weekday_hours=data.get('weekday_hours', {}),
            weekend_hours=data.get('weekend_hours', {}),
            deposit=data.get('deposit'),
            cancellation=data.get('cancellation'),
            owner_id=str(data.get('owner_id')) if data.get('owner_id') else None,
            status=data.get('status', 'pending'),
            images=data.get('images', []),
            total_bookings=data.get('total_bookings', 0),
            monthly_revenue=data.get('monthly_revenue', 0),
            created_at=data.get('created_at'),
            updated_at=data.get('updated_at')
        )
    
    def to_dict(self):
        """Convert Field object to MongoDB document"""
        return {
            'name': self.name,
            'sport_type': self.sport_type,
            'description': self.description,
            'capacity': self.capacity,
            'field_size': self.field_size,
            'address': self.address,
            'district': self.district,
            'city': self.city,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'parking': self.parking,
            'transportation': self.transportation,
            'amenities': self.amenities,
            'rules': self.rules,
            'pricing': self.pricing,
            'weekday_hours': self.weekday_hours,
            'weekend_hours': self.weekend_hours,
            'deposit': self.deposit,
            'cancellation': self.cancellation,
            'owner_id': ObjectId(self.owner_id) if self.owner_id else None,
            'status': self.status,
            'images': self.images,
            'total_bookings': self.total_bookings,
            'monthly_revenue': self.monthly_revenue,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
    @staticmethod
    def validate_field_data(data):
        """Validate field data before saving"""
        errors = []
        
        if not data.get('name') or len(data['name'].strip()) < 5:
            errors.append('Tên sân phải có ít nhất 5 ký tự')
        
        if not data.get('sport_type'):
            errors.append('Vui lòng chọn loại sân')
        
        if not data.get('address') or len(data['address'].strip()) < 10:
            errors.append('Địa chỉ cần chi tiết hơn')
        
        if not data.get('city'):
            errors.append('Vui lòng chọn thành phố')
        
        if not data.get('district'):
            errors.append('Vui lòng chọn quận/huyện')
        
        # Validate pricing
        pricing = data.get('pricing', {})
        if not any(pricing.values()):
            errors.append('Vui lòng nhập ít nhất 1 mức giá')
        
        return errors
    
    def get_average_price(self):
        """Calculate average price from pricing structure"""
        if not self.pricing:
            return 0
        
        prices = [price for price in self.pricing.values() if price and price > 0]
        if not prices:
            return 0
        
        return sum(prices) // len(prices)
    
    def get_sport_name(self):
        """Get Vietnamese sport name"""
        sport_names = {
            'football': 'Bóng đá',
            'basketball': 'Bóng rổ',
            'tennis': 'Tennis',
            'badminton': 'Cầu lông',
            'volleyball': 'Bóng chuyền',
            'futsal': 'Futsal',
            'ping-pong': 'Ping Pong',
            'other': 'Khác'
        }
        return sport_names.get(self.sport_type, 'Khác')
    
    def is_active(self):
        """Check if field is active"""
        return self.status == 'active'
    
    def can_be_booked(self):
        """Check if field can be booked"""
        return self.status == 'active' 