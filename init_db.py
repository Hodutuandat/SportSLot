#!/usr/bin/env python3
"""
Script khởi tạo dữ liệu MongoDB cho SportSlot
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from app.extensions import mongo
from app.models.user import User
from app.models.field import Field
from app.models.booking import Booking
from datetime import datetime, date, timezone
from bson import ObjectId

def init_database():
    """Khởi tạo dữ liệu mẫu cho MongoDB"""
    app = create_app()
    
    with app.app_context():
        try:
            # Clear existing data
            mongo.db.users.delete_many({})
            mongo.db.fields.delete_many({})
            mongo.db.bookings.delete_many({})
            
            print("🗑️ Cleared existing data")
            
            # Create test users
            users_data = [
                {
                    'username': 'testuser',
                    'user_type': 'customer',
                    'email': 'testuser@sportslot.com',
                    'phone': '0912345678',
                    'password_hash': User(1, 'testuser', 'customer').set_password('password123'),
                    'created_at': datetime.now(timezone.utc)
                },
                {
                    'username': 'owner123',
                    'user_type': 'owner',
                    'email': 'owner123@sportslot.com',
                    'phone': '0987654321',
                    'password_hash': User(2, 'owner123', 'owner').set_password('password123'),
                    'created_at': datetime.now(timezone.utc)
                },
                {
                    'username': 'admin123',
                    'user_type': 'admin',
                    'email': 'admin123@sportslot.com',
                    'phone': '0123456789',
                    'password_hash': User(3, 'admin123', 'admin').set_password('password123'),
                    'created_at': datetime.now(timezone.utc)
                }
            ]
            
            # Insert users
            user_ids = []
            for user_data in users_data:
                result = mongo.db.users.insert_one(user_data)
                user_ids.append(str(result.inserted_id))
                print(f"👤 Created user: {user_data['username']} ({user_data['user_type']})")
            
            # Create test fields
            fields_data = [
                {
                    'name': 'Sân Bóng Đá A',
                    'location': 'Quận 1, TP.HCM',
                    'field_type': 'football',
                    'price_per_slot': 200000,
                    'is_indoor': False,
                    'owner_id': ObjectId(user_ids[1]),  # owner123
                    'images': ['field1.jpg', 'field1b.jpg'],
                    'description': 'Sân bóng đá chất lượng cao với cỏ nhân tạo',
                    'created_at': datetime.now(timezone.utc)
                },
                {
                    'name': 'Sân Bóng Đá B',
                    'location': 'Quận 7, TP.HCM',
                    'field_type': 'football',
                    'price_per_slot': 180000,
                    'is_indoor': False,
                    'owner_id': ObjectId(user_ids[1]),
                    'images': ['field2.jpg'],
                    'description': 'Sân bóng đá ngoài trời với đèn chiếu sáng',
                    'created_at': datetime.now(timezone.utc)
                },
                {
                    'name': 'Sân Bóng Chuyền 1',
                    'location': 'Quận Bình Thạnh, TP.HCM',
                    'field_type': 'volleyball',
                    'price_per_slot': 150000,
                    'is_indoor': True,
                    'owner_id': ObjectId(user_ids[1]),
                    'images': ['field3.jpg'],
                    'description': 'Sân bóng chuyền trong nhà với sàn gỗ',
                    'created_at': datetime.now(timezone.utc)
                },
                {
                    'name': 'Sân Bóng Rổ Central',
                    'location': 'Quận 3, TP.HCM',
                    'field_type': 'basketball',
                    'price_per_slot': 170000,
                    'is_indoor': True,
                    'owner_id': ObjectId(user_ids[1]),
                    'images': ['field4.jpg'],
                    'description': 'Sân bóng rổ chuyên nghiệp với rổ tiêu chuẩn',
                    'created_at': datetime.now(timezone.utc)
                },
                {
                    'name': 'Sân Tennis Pro',
                    'location': 'Quận 2, TP.HCM',
                    'field_type': 'tennis',
                    'price_per_slot': 250000,
                    'is_indoor': False,
                    'owner_id': ObjectId(user_ids[1]),
                    'images': ['field5.jpg'],
                    'description': 'Sân tennis cao cấp với mặt sân cứng',
                    'created_at': datetime.now(timezone.utc)
                },
                {
                    'name': 'Sân Cầu Lông Vip',
                    'location': 'Quận 10, TP.HCM',
                    'field_type': 'badminton',
                    'price_per_slot': 120000,
                    'is_indoor': True,
                    'owner_id': ObjectId(user_ids[1]),
                    'images': ['field6.jpg'],
                    'description': 'Sân cầu lông trong nhà với điều hòa',
                    'created_at': datetime.now(timezone.utc)
                }
            ]
            
            # Insert fields
            field_ids = []
            for field_data in fields_data:
                result = mongo.db.fields.insert_one(field_data)
                field_ids.append(str(result.inserted_id))
                print(f"🏟️ Created field: {field_data['name']} ({field_data['field_type']})")
            
            # Create test bookings
            bookings_data = [
                {
                    'user_id': ObjectId(user_ids[0]),  # testuser
                    'field_id': ObjectId(field_ids[0]),  # Sân Bóng Đá A
                    'date': datetime(2024, 1, 15),
                    'start_time': '18:00',
                    'end_time': '20:00',
                    'duration': 2,
                    'total_price': 400000,
                    'status': 'completed',
                    'payment_method': 'Chuyển khoản',
                    'created_at': datetime.now(timezone.utc)
                },
                {
                    'user_id': ObjectId(user_ids[0]),
                    'field_id': ObjectId(field_ids[1]),  # Sân Bóng Đá B
                    'date': datetime(2024, 1, 20),
                    'start_time': '19:00',
                    'end_time': '21:00',
                    'duration': 2,
                    'total_price': 360000,
                    'status': 'confirmed',
                    'payment_method': 'Tiền mặt',
                    'created_at': datetime.now(timezone.utc)
                },
                {
                    'user_id': ObjectId(user_ids[0]),
                    'field_id': ObjectId(field_ids[2]),  # Sân Bóng Chuyền 1
                    'date': datetime(2024, 1, 25),
                    'start_time': '20:00',
                    'end_time': '22:00',
                    'duration': 2,
                    'total_price': 300000,
                    'status': 'pending',
                    'payment_method': 'Chuyển khoản',
                    'created_at': datetime.now(timezone.utc)
                }
            ]
            
            # Insert bookings
            for booking_data in bookings_data:
                result = mongo.db.bookings.insert_one(booking_data)
                print(f"📅 Created booking: {booking_data['date']} - {booking_data['status']}")
            
            print("\n✅ Database initialized successfully!")
            print(f"📊 Created {len(users_data)} users, {len(fields_data)} fields, {len(bookings_data)} bookings")
            
        except Exception as e:
            print(f"❌ Error initializing database: {e}")
            return False
    
    return True

if __name__ == '__main__':
    print("🚀 Initializing SportSlot MongoDB database...")
    success = init_database()
    if success:
        print("🎉 Database initialization completed!")
    else:
        print("💥 Database initialization failed!")
        sys.exit(1) 