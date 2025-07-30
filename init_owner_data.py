#!/usr/bin/env python3
"""
Script to initialize sample owner data in MongoDB
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from app.extensions import mongo
from app.models.field import Field
from app.models.user import User
from bson import ObjectId
from datetime import datetime
from werkzeug.security import generate_password_hash

def init_owner_data():
    """Initialize sample owner data"""
    app = create_app()
    
    with app.app_context():
        print("🏗️ Initializing Owner Data...")
        
        # Check if owner already exists
        existing_owner = mongo.db.users.find_one({'username': 'owner123'})
        if existing_owner:
            print("✅ Owner 'owner123' already exists")
            owner_id = existing_owner['_id']
        else:
            # Create owner user
            owner_data = {
                'username': 'owner123',
                'email': 'owner@sportslot.com',
                'password_hash': generate_password_hash('owner123'),
                'full_name': 'Nguyễn Văn Chủ Sân',
                'phone': '0901234567',
                'role': 'owner',
                'is_active': True,
                'created_at': datetime.now(),
                'updated_at': datetime.now()
            }
            
            result = mongo.db.users.insert_one(owner_data)
            owner_id = result.inserted_id
            print(f"✅ Created owner user: {owner_data['username']}")
        
        # Check if fields already exist
        existing_fields = mongo.db.fields.count_documents({'owner_id': owner_id})
        if existing_fields > 0:
            print(f"✅ {existing_fields} fields already exist for owner")
            return
        
        # Create sample fields
        sample_fields = [
            {
                'name': 'Sân Bóng Đá A',
                'sport_type': 'football',
                'description': 'Sân cỏ nhân tạo 7 người, có đèn chiếu sáng, đạt chuẩn FIFA mini.',
                'capacity': 14,
                'field_size': '40m x 20m',
                'address': '123 Đường ABC, Quận 1, TP.HCM',
                'district': 'Quận 1',
                'city': 'TP.HCM',
                'latitude': 10.7769,
                'longitude': 106.7009,
                'parking': 'free',
                'transportation': 'Gần trạm xe buýt số 1',
                'amenities': ['lighting', 'changing_room', 'shower', 'equipment'],
                'rules': 'Không mang giày đinh vào sân, giữ gìn vệ sinh chung.',
                'pricing': {
                    'morning_weekday': 180000,
                    'morning_weekend': 200000,
                    'afternoon_weekday': 200000,
                    'afternoon_weekend': 220000,
                    'evening_weekday': 220000,
                    'evening_weekend': 250000
                },
                'weekday_hours': {
                    'start': '06:00',
                    'end': '23:00'
                },
                'weekend_hours': {
                    'start': '05:00',
                    'end': '24:00'
                },
                'deposit': 100000,
                'cancellation': 'partial',
                'owner_id': owner_id,
                'status': 'active',
                'images': [],
                'total_bookings': 45,
                'monthly_revenue': 9000000,
                'created_at': datetime.now(),
                'updated_at': datetime.now()
            },
            {
                'name': 'Sân Mini Football Pro',
                'sport_type': 'football',
                'description': 'Sân mini chuyên nghiệp, mặt cỏ mới, phòng thay đồ hiện đại.',
                'capacity': 10,
                'field_size': '30m x 15m',
                'address': '456 Đường XYZ, Quận 1, TP.HCM',
                'district': 'Quận 1',
                'city': 'TP.HCM',
                'latitude': 10.7869,
                'longitude': 106.7109,
                'parking': 'paid',
                'transportation': 'Gần trạm metro Bến Thành',
                'amenities': ['lighting', 'changing_room', 'equipment', 'cafe', 'wifi'],
                'rules': 'Tôn trọng thời gian, không ăn uống trên sân.',
                'pricing': {
                    'morning_weekday': 160000,
                    'morning_weekend': 180000,
                    'afternoon_weekday': 180000,
                    'afternoon_weekend': 200000,
                    'evening_weekday': 200000,
                    'evening_weekend': 220000
                },
                'weekday_hours': {
                    'start': '07:00',
                    'end': '22:00'
                },
                'weekend_hours': {
                    'start': '06:00',
                    'end': '23:00'
                },
                'deposit': 80000,
                'cancellation': 'free',
                'owner_id': owner_id,
                'status': 'active',
                'images': [],
                'total_bookings': 38,
                'monthly_revenue': 6840000,
                'created_at': datetime.now(),
                'updated_at': datetime.now()
            },
            {
                'name': 'Sân Tennis Elite',
                'sport_type': 'tennis',
                'description': 'Sân tennis cao cấp, mặt sân cứng, có mái che.',
                'capacity': 4,
                'field_size': '23.77m x 10.97m',
                'address': '789 Đường DEF, Quận 2, TP.HCM',
                'district': 'Quận 2',
                'city': 'TP.HCM',
                'latitude': 10.7969,
                'longitude': 106.7209,
                'parking': 'free',
                'transportation': 'Gần trạm xe buýt số 2',
                'amenities': ['lighting', 'changing_room', 'equipment', 'cafe'],
                'rules': 'Mang giày tennis chuyên dụng, giữ gìn vệ sinh.',
                'pricing': {
                    'morning_weekday': 250000,
                    'morning_weekend': 300000,
                    'afternoon_weekday': 300000,
                    'afternoon_weekend': 350000,
                    'evening_weekday': 350000,
                    'evening_weekend': 400000
                },
                'weekday_hours': {
                    'start': '06:00',
                    'end': '22:00'
                },
                'weekend_hours': {
                    'start': '06:00',
                    'end': '22:00'
                },
                'deposit': 150000,
                'cancellation': 'partial',
                'owner_id': owner_id,
                'status': 'pending',
                'images': [],
                'total_bookings': 0,
                'monthly_revenue': 0,
                'created_at': datetime.now(),
                'updated_at': datetime.now()
            }
        ]
        
        # Insert fields
        for field_data in sample_fields:
            mongo.db.fields.insert_one(field_data)
            print(f"✅ Created field: {field_data['name']}")
        
        print(f"✅ Successfully created {len(sample_fields)} sample fields")
        print("\n📋 Owner Login Information:")
        print("Username: owner123")
        print("Password: owner123")
        print("Email: owner@sportslot.com")

if __name__ == '__main__':
    try:
        init_owner_data()
        print("\n🎉 Owner data initialization completed successfully!")
    except Exception as e:
        print(f"❌ Error initializing owner data: {e}")
        sys.exit(1) 