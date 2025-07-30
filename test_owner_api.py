#!/usr/bin/env python3
"""
Test script for Owner API endpoints
"""

import requests
import json
import sys

# API Base URL
BASE_URL = "http://localhost:5000/api"

def test_owner_login():
    """Test owner login to get JWT token"""
    print("🔐 Testing Owner Login...")
    
    login_data = {
        'username': 'owner123',
        'password': 'owner123'
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                token = data['data']['token']
                print(f"✅ Login successful! Token: {token[:20]}...")
                return token
            else:
                print(f"❌ Login failed: {data.get('message')}")
                return None
        else:
            print(f"❌ Login failed: {response.text}")
            return None
            
    except requests.exceptions.ConnectionError:
        print("❌ Error: Cannot connect to server. Make sure the Flask app is running on http://localhost:5000")
        return None
    except Exception as e:
        print(f"❌ An unexpected error occurred: {e}")
        return None

def test_owner_dashboard(token):
    """Test owner dashboard API"""
    print("\n📊 Testing Owner Dashboard...")
    
    headers = {'Authorization': f'Bearer {token}'}
    
    try:
        response = requests.get(f"{BASE_URL}/owner/dashboard", headers=headers)
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                dashboard_data = data['data']
                print(f"✅ Dashboard loaded successfully!")
                print(f"   - Total fields: {dashboard_data.get('total_fields', 0)}")
                print(f"   - Active fields: {dashboard_data.get('active_fields', 0)}")
                print(f"   - Total bookings: {dashboard_data.get('total_bookings', 0)}")
                print(f"   - Monthly revenue: {dashboard_data.get('monthly_revenue', 0):,} VNĐ")
                print(f"   - Pending bookings: {dashboard_data.get('pending_bookings', 0)}")
            else:
                print(f"❌ Dashboard failed: {data.get('message')}")
        else:
            print(f"❌ Dashboard failed: {response.text}")
            
    except Exception as e:
        print(f"❌ An unexpected error occurred: {e}")

def test_owner_fields(token):
    """Test owner fields API"""
    print("\n🏟️ Testing Owner Fields...")
    
    headers = {'Authorization': f'Bearer {token}'}
    
    try:
        response = requests.get(f"{BASE_URL}/owner/fields", headers=headers)
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                fields = data['data']
                print(f"✅ Fields loaded successfully! Found {len(fields)} fields")
                
                for i, field in enumerate(fields[:3], 1):  # Show first 3 fields
                    print(f"   {i}. {field['name']} ({field['sport_type']}) - {field['status']}")
                    print(f"      Address: {field['address']}")
                    print(f"      Price: {field['price']:,} VNĐ")
                    print(f"      Bookings: {field['total_bookings']}")
            else:
                print(f"❌ Fields failed: {data.get('message')}")
        else:
            print(f"❌ Fields failed: {response.text}")
            
    except Exception as e:
        print(f"❌ An unexpected error occurred: {e}")

def test_create_field(token):
    """Test creating a new field"""
    print("\n➕ Testing Create Field...")
    
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    
    field_data = {
        'name': 'Sân Test API',
        'sport_type': 'basketball',
        'description': 'Sân bóng rổ test được tạo qua API',
        'capacity': 10,
        'field_size': '28m x 15m',
        'address': '123 Test Street, Quận 1, TP.HCM',
        'district': 'Quận 1',
        'city': 'TP.HCM',
        'latitude': 10.7769,
        'longitude': 106.7009,
        'parking': 'free',
        'transportation': 'Gần trạm xe buýt',
        'amenities': ['lighting', 'changing_room'],
        'rules': 'Quy định sử dụng sân test',
        'pricing': {
            'morning_weekday': 200000,
            'morning_weekend': 250000,
            'afternoon_weekday': 250000,
            'afternoon_weekend': 300000,
            'evening_weekday': 300000,
            'evening_weekend': 350000
        },
        'weekday_hours': {
            'start': '06:00',
            'end': '22:00'
        },
        'weekend_hours': {
            'start': '06:00',
            'end': '22:00'
        },
        'deposit': 100000,
        'cancellation': 'partial'
    }
    
    try:
        response = requests.post(f"{BASE_URL}/owner/fields", headers=headers, json=field_data)
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                print(f"✅ Field created successfully!")
                print(f"   Field ID: {data.get('field_id')}")
                print(f"   Message: {data.get('message')}")
                return data.get('field_id')
            else:
                print(f"❌ Field creation failed: {data.get('message')}")
                if data.get('errors'):
                    print(f"   Errors: {data['errors']}")
        else:
            print(f"❌ Field creation failed: {response.text}")
            
    except Exception as e:
        print(f"❌ An unexpected error occurred: {e}")
    
    return None

def test_get_field(token, field_id):
    """Test getting a specific field"""
    if not field_id:
        return
        
    print(f"\n🔍 Testing Get Field (ID: {field_id})...")
    
    headers = {'Authorization': f'Bearer {token}'}
    
    try:
        response = requests.get(f"{BASE_URL}/owner/fields/{field_id}", headers=headers)
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                field = data['data']
                print(f"✅ Field loaded successfully!")
                print(f"   Name: {field['name']}")
                print(f"   Sport Type: {field['sport_type']}")
                print(f"   Status: {field['status']}")
                print(f"   Address: {field['address']}")
            else:
                print(f"❌ Get field failed: {data.get('message')}")
        else:
            print(f"❌ Get field failed: {response.text}")
            
    except Exception as e:
        print(f"❌ An unexpected error occurred: {e}")

def test_toggle_field_status(token, field_id):
    """Test toggling field status"""
    if not field_id:
        return
        
    print(f"\n🔄 Testing Toggle Field Status (ID: {field_id})...")
    
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    
    # Toggle to inactive
    status_data = {'status': 'inactive'}
    
    try:
        response = requests.put(f"{BASE_URL}/owner/fields/{field_id}/status", headers=headers, json=status_data)
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                print(f"✅ Field status updated successfully!")
                print(f"   New status: {data.get('status')}")
                print(f"   Message: {data.get('message')}")
            else:
                print(f"❌ Status update failed: {data.get('message')}")
        else:
            print(f"❌ Status update failed: {response.text}")
            
    except Exception as e:
        print(f"❌ An unexpected error occurred: {e}")

def main():
    print("🚀 SportSlot Owner API Testing")
    print("=" * 50)
    
    # Test login
    token = test_owner_login()
    if not token:
        print("\n❌ Cannot proceed without authentication token")
        return
    
    # Test dashboard
    test_owner_dashboard(token)
    
    # Test fields
    test_owner_fields(token)
    
    # Test create field
    field_id = test_create_field(token)
    
    # Test get field
    test_get_field(token, field_id)
    
    # Test toggle status
    test_toggle_field_status(token, field_id)
    
    print("\n✅ Owner API Testing Completed!")

if __name__ == "__main__":
    main() 