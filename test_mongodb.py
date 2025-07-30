#!/usr/bin/env python3
"""
Script test MongoDB connection cho SportSlot
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from app.extensions import mongo

def test_mongodb_connection():
    """Test kết nối MongoDB"""
    app = create_app()
    
    with app.app_context():
        try:
            # Test connection
            mongo.db.command('ping')
            print("✅ MongoDB connection successful!")
            
            # Test collections
            collections = mongo.db.list_collection_names()
            print(f"📚 Available collections: {collections}")
            
            # Test users collection
            users_count = mongo.db.users.count_documents({})
            print(f"👥 Users count: {users_count}")
            
            # Test fields collection
            fields_count = mongo.db.fields.count_documents({})
            print(f"🏟️ Fields count: {fields_count}")
            
            # Test bookings collection
            bookings_count = mongo.db.bookings.count_documents({})
            print(f"📅 Bookings count: {bookings_count}")
            
            return True
            
        except Exception as e:
            print(f"❌ MongoDB connection failed: {e}")
            print("💡 Make sure MongoDB is running on localhost:27017")
            return False

if __name__ == '__main__':
    print("🔍 Testing MongoDB connection...")
    success = test_mongodb_connection()
    if success:
        print("🎉 MongoDB test completed successfully!")
    else:
        print("💥 MongoDB test failed!")
        sys.exit(1) 