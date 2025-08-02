#!/usr/bin/env python3
"""
Script tạo tài khoản mẫu cho SportSlot
Tạo 3 tài khoản: 1 customer, 1 owner, 1 admin
"""

import sys
import os
from datetime import datetime, timezone

# Thêm thư mục app vào path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from app import create_app
from app.extensions import mongo
from app.models.user import User

def create_sample_accounts():
    """Tạo 3 tài khoản mẫu"""
    
    app = create_app()
    
    with app.app_context():
        # Kiểm tra kết nối database
        try:
            mongo.db.command('ping')
            print("✅ Kết nối MongoDB thành công!")
        except Exception as e:
            print(f"❌ Lỗi kết nối MongoDB: {e}")
            return
        
        # Danh sách tài khoản mẫu
        sample_accounts = [
            {
                'username': 'customer_demo',
                'user_type': 'customer',
                'email': 'customer@sportslot.com',
                'phone': '0123456789',
                'password': 'customer123',
                'full_name': 'Nguyễn Văn Khách Hàng',
                'address': '123 Đường ABC, Quận 1, TP.HCM',
                'birthday': '1990-05-15',
                'gender': 'male'
            },
            {
                'username': 'owner_demo',
                'user_type': 'owner',
                'email': 'owner@sportslot.com',
                'phone': '0987654321',
                'password': 'owner123',
                'full_name': 'Trần Thị Chủ Sân',
                'address': '456 Đường XYZ, Quận 3, TP.HCM',
                'birthday': '1985-08-20',
                'gender': 'female'
            },
            {
                'username': 'admin_demo',
                'user_type': 'admin',
                'email': 'admin@sportslot.com',
                'phone': '0369852147',
                'password': 'admin123',
                'full_name': 'Lê Văn Quản Trị',
                'address': '789 Đường DEF, Quận 7, TP.HCM',
                'birthday': '1980-12-10',
                'gender': 'male'
            }
        ]
        
        created_count = 0
        
        for account in sample_accounts:
            try:
                # Kiểm tra xem tài khoản đã tồn tại chưa
                existing_user = mongo.db.users.find_one({'username': account['username']})
                if existing_user:
                    print(f"⚠️  Tài khoản {account['username']} đã tồn tại, bỏ qua...")
                    continue
                
                # Tạo user object
                user = User(
                    username=account['username'],
                    user_type=account['user_type'],
                    email=account['email'],
                    phone=account['phone'],
                    full_name=account['full_name'],
                    address=account['address'],
                    birthday=account['birthday'],
                    gender=account['gender'],
                    created_at=datetime.now(timezone.utc)
                )
                
                # Set password
                user.set_password(account['password'])
                
                # Lưu vào database
                result = mongo.db.users.insert_one(user.to_dict())
                user.id = str(result.inserted_id)
                
                print(f"✅ Đã tạo tài khoản {account['user_type']}: {account['username']}")
                print(f"   - Email: {account['email']}")
                print(f"   - Password: {account['password']}")
                print(f"   - Họ tên: {account['full_name']}")
                print()
                
                created_count += 1
                
            except Exception as e:
                print(f"❌ Lỗi khi tạo tài khoản {account['username']}: {e}")
        
        print(f"🎉 Hoàn thành! Đã tạo {created_count} tài khoản mẫu.")
        print("\n📋 Thông tin đăng nhập:")
        print("=" * 50)
        
        for account in sample_accounts:
            print(f"👤 {account['user_type'].upper()}:")
            print(f"   Username: {account['username']}")
            print(f"   Password: {account['password']}")
            print(f"   Email: {account['email']}")
            print()

if __name__ == '__main__':
    print("🚀 Bắt đầu tạo tài khoản mẫu cho SportSlot...")
    print("=" * 50)
    create_sample_accounts() 