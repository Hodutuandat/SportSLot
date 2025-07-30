#!/usr/bin/env python3
"""
Test script for SportSlot Backend Structure
"""

import sys
import os

def test_imports():
    """Test if all required modules can be imported"""
    print("🔍 Testing Backend Structure...")
    
    try:
        # Test Flask app creation
        from app import create_app
        print("✅ Flask app creation: OK")
        
        # Test models
        from app.models.user import User
        from app.models.field import Field
        from app.models.booking import Booking
        from app.models.payment import Payment
        from app.models.voucher import Voucher
        from app.models.notification import Notification
        from app.models.profile import Profile
        from app.models.review import Review
        print("✅ All models imported: OK")
        
        # Test JWT auth
        from app.utils.jwt_auth import generate_token, verify_token, token_required
        print("✅ JWT auth utilities: OK")
        
        # Test API routes
        from app.routes.api.auth import auth_api_bp
        from app.routes.api.customer import customer_api_bp
        from app.routes.api.owner import owner_api_bp
        print("✅ API routes imported: OK")
        
        # Test extensions
        from app.extensions import mongo, mail
        print("✅ Flask extensions: OK")
        
        return True
        
    except ImportError as e:
        print(f"❌ Import error: {e}")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_models():
    """Test model functionality"""
    print("\n🧪 Testing Models...")
    
    try:
        from app.models.user import User
        from app.models.field import Field
        from app.models.booking import Booking
        
        # Test User model
        user = User(
            username="testuser",
            email="test@example.com",
            user_type="customer"
        )
        user.set_password("password123")
        print("✅ User model: OK")
        
        # Test Field model
        field = Field(
            name="Test Field",
            location="Test Location",
            field_type="football",
            price_per_slot=100000
        )
        print("✅ Field model: OK")
        
        # Test Booking model
        booking = Booking(
            user_id="user123",
            field_id="field123",
            date="2024-12-20",
            start_time="15:00",
            end_time="17:00",
            total_price=200000
        )
        print("✅ Booking model: OK")
        
        return True
        
    except Exception as e:
        print(f"❌ Model test error: {e}")
        return False

def test_jwt_auth():
    """Test JWT authentication"""
    print("\n🔐 Testing JWT Authentication...")
    
    try:
        from app.utils.jwt_auth import generate_token, verify_token
        
        # Test token generation
        token = generate_token("user123", "customer")
        print("✅ Token generation: OK")
        
        # Test token verification
        payload = verify_token(token)
        if payload and payload.get('user_id') == 'user123':
            print("✅ Token verification: OK")
        else:
            print("❌ Token verification: Failed")
            return False
        
        return True
        
    except Exception as e:
        print(f"❌ JWT test error: {e}")
        return False

def test_api_structure():
    """Test API structure"""
    print("\n📡 Testing API Structure...")
    
    try:
        # Test API blueprints
        from app.routes.api.auth import auth_api_bp
        from app.routes.api.customer import customer_api_bp
        from app.routes.api.owner import owner_api_bp
        
        # Check if blueprints have routes
        auth_routes = [rule.rule for rule in auth_api_bp.url_map.iter_rules()]
        customer_routes = [rule.rule for rule in customer_api_bp.url_map.iter_rules()]
        owner_routes = [rule.rule for rule in owner_api_bp.url_map.iter_rules()]
        
        print(f"✅ Auth API routes: {len(auth_routes)}")
        print(f"✅ Customer API routes: {len(customer_routes)}")
        print(f"✅ Owner API routes: {len(owner_routes)}")
        
        return True
        
    except Exception as e:
        print(f"❌ API structure test error: {e}")
        return False

def main():
    """Main test function"""
    print("🚀 SportSlot Backend Structure Testing")
    print("=" * 50)
    
    tests = [
        test_imports,
        test_models,
        test_jwt_auth,
        test_api_structure
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        if test():
            passed += 1
    
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Backend structure is ready.")
    else:
        print("⚠️ Some tests failed. Please check the errors above.")
    
    return passed == total

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 