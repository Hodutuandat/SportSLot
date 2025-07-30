import jwt
from datetime import datetime, timezone, timedelta
from functools import wraps
from flask import request, jsonify, current_app
from app.models.user import User
from app.extensions import mongo
from bson import ObjectId

def generate_token(user_id, user_type, expires_in=24*60*60):  # 24 hours default
    """Generate JWT token for user"""
    payload = {
        'user_id': str(user_id),
        'user_type': user_type,
        'exp': datetime.now(timezone.utc) + timedelta(seconds=expires_in),
        'iat': datetime.now(timezone.utc)
    }
    return jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')

def verify_token(token):
    """Verify JWT token and return user data"""
    try:
        payload = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None, 'Token đã hết hạn'
    except jwt.InvalidTokenError:
        return None, 'Token không hợp lệ'

def get_current_user_from_token(token):
    """Get current user from JWT token"""
    payload = verify_token(token)
    if not payload or isinstance(payload, tuple):
        return None
    
    try:
        user_id = payload.get('user_id')
        if not user_id or not ObjectId.is_valid(user_id):
            return None
        
        user_data = mongo.db.users.find_one({'_id': ObjectId(user_id)})
        if user_data:
            user = User.from_dict(user_data)
            if user.is_active:
                return user
        return None
    except Exception as e:
        print(f"Error getting user from token: {e}")
        return None

def token_required(f):
    """Decorator to require JWT token for API endpoints"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        # Get token from header
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                token = auth_header.split(" ")[1]  # Bearer <token>
            except IndexError:
                return jsonify({'message': 'Token không hợp lệ'}), 401
        
        if not token:
            return jsonify({'message': 'Token bị thiếu'}), 401
        
        try:
            payload = verify_token(token)
            if not payload or isinstance(payload, tuple):
                return jsonify({'message': payload[1] if isinstance(payload, tuple) else 'Token không hợp lệ'}), 401
            
            current_user = get_current_user_from_token(token)
            if not current_user:
                return jsonify({'message': 'Người dùng không tồn tại hoặc đã bị khóa'}), 401
            
        except Exception as e:
            return jsonify({'message': 'Token không hợp lệ'}), 401
        
        return f(current_user, *args, **kwargs)
    
    return decorated

def role_required(allowed_roles):
    """Decorator to require specific user roles"""
    def decorator(f):
        @wraps(f)
        def decorated(current_user, *args, **kwargs):
            if current_user.user_type not in allowed_roles:
                return jsonify({'message': 'Không có quyền truy cập'}), 403
            return f(current_user, *args, **kwargs)
        return decorated
    return decorator

def customer_required(f):
    """Decorator to require customer role"""
    return role_required(['customer'])(f)

def owner_required(f):
    """Decorator to require owner role"""
    return role_required(['owner'])(f)

def admin_required(f):
    """Decorator to require admin role"""
    return role_required(['admin'])(f)

def customer_or_owner_required(f):
    """Decorator to require customer or owner role"""
    return role_required(['customer', 'owner'])(f) 