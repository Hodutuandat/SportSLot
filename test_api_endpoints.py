#!/usr/bin/env python3
"""
Test script for SportSlot API endpoints
"""

import requests
import json

# API Base URL
BASE_URL = "http://localhost:5000/api"

def test_public_endpoints():
    """Test public API endpoints"""
    print("🔓 Testing Public API Endpoints...")
    
    # Test get featured fields
    print("\n1. Testing Get Featured Fields...")
    response = requests.get(f"{BASE_URL}/customer/fields/featured")
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Success: Found {len(data.get('data', []))} featured fields")
    else:
        print(f"❌ Failed: {response.json()}")

def main():
    """Main test function"""
    print("🚀 SportSlot API Testing")
    print("=" * 50)
    
    try:
        test_public_endpoints()
        print("\n✅ API Testing Completed!")
        
    except requests.exceptions.ConnectionError:
        print("❌ Error: Cannot connect to server. Make sure the Flask app is running on http://localhost:5000")
    except Exception as e:
        print(f"❌ Error: {str(e)}")

if __name__ == "__main__":
    main() 