from flask import Blueprint, request, jsonify
from app.models.user import User
from app.extensions import mongo
from app.utils.jwt_auth import generate_token
from bson import ObjectId
from datetime import datetime, timezone
import re

auth_api_bp = Blueprint('auth_api', __name__)

@auth_api_bp.route('/login', methods=['POST'])
def api_login():
    """API login with JWT token"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'message': 'Dữ liệu không hợp lệ'
            }), 400
        
        username = data.get('username')
        password = data.get('password')
        
        # Validation
        if not username:
            return jsonify({
                'success': False,
                'message': 'Tên đăng nhập không được để trống'
            }), 400
        
        if not password:
            return jsonify({
                'success': False,
                'message': 'Mật khẩu không được để trống'
            }), 400
        
        # Find user in database
        user_data = mongo.db.users.find_one({
            '$or': [
                {'username': username},
                {'email': username}
            ]
        })
        
        if not user_data:
            return jsonify({
                'success': False,
                'message': 'Tên đăng nhập hoặc email không tồn tại'
            }), 401
        
        # Create user object
        user = User.from_dict(user_data)
        
        # Check if user is active
        if not user.is_active:
            return jsonify({
                'success': False,
                'message': 'Tài khoản đã bị khóa. Vui lòng liên hệ admin.'
            }), 401
        
        # Check password
        if not user.check_password(password):
            return jsonify({
                'success': False,
                'message': 'Mật khẩu không đúng'
            }), 401
        
        # Generate JWT token
        token = generate_token(user.id, user.user_type)
        
        return jsonify({
            'success': True,
            'data': {
                'token': token,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'full_name': user.full_name,
                    'user_type': user.user_type,
                    'phone': user.phone
                }
            },
            'message': 'Đăng nhập thành công'
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Lỗi: {str(e)}'
        }), 500

@auth_api_bp.route('/register', methods=['POST'])
def api_register():
    """API register with JWT token"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'message': 'Dữ liệu không hợp lệ'
            }), 400
        
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        confirm_password = data.get('confirm_password')
        phone = data.get('phone')
        full_name = data.get('full_name')
        user_type = data.get('user_type', 'customer')
        
        # Validation
        if not username:
            return jsonify({
                'success': False,
                'message': 'Tên đăng nhập không được để trống'
            }), 400
        
        if not email:
            return jsonify({
                'success': False,
                'message': 'Email không được để trống'
            }), 400
        
        if not password:
            return jsonify({
                'success': False,
                'message': 'Mật khẩu không được để trống'
            }), 400
        
        if not confirm_password:
            return jsonify({
                'success': False,
                'message': 'Xác nhận mật khẩu không được để trống'
            }), 400
        
        if not phone:
            return jsonify({
                'success': False,
                'message': 'Số điện thoại không được để trống'
            }), 400
        
        if not full_name:
            return jsonify({
                'success': False,
                'message': 'Họ tên không được để trống'
            }), 400
        
        if password != confirm_password:
            return jsonify({
                'success': False,
                'message': 'Mật khẩu xác nhận không khớp'
            }), 400
        
        # Validate user type
        if user_type not in ['customer', 'owner']:
            return jsonify({
                'success': False,
                'message': 'Loại tài khoản không hợp lệ'
            }), 400
        
        # Validate input data
        is_valid, message = User.validate_username(username)
        if not is_valid:
            return jsonify({
                'success': False,
                'message': message
            }), 400
        
        is_valid, message = User.validate_email(email)
        if not is_valid:
            return jsonify({
                'success': False,
                'message': message
            }), 400
        
        is_valid, message = User.validate_password(password)
        if not is_valid:
            return jsonify({
                'success': False,
                'message': message
            }), 400
        
        is_valid, message = User.validate_phone(phone)
        if not is_valid:
            return jsonify({
                'success': False,
                'message': message
            }), 400
        
        # Check for existing username
        existing_user = mongo.db.users.find_one({'username': username})
        if existing_user:
            return jsonify({
                'success': False,
                'message': 'Tên đăng nhập đã tồn tại'
            }), 400
        
        # Check for existing email
        existing_user = mongo.db.users.find_one({'email': email})
        if existing_user:
            return jsonify({
                'success': False,
                'message': 'Email đã tồn tại'
            }), 400
        
        # Check for existing phone
        existing_user = mongo.db.users.find_one({'phone': phone})
        if existing_user:
            return jsonify({
                'success': False,
                'message': 'Số điện thoại đã tồn tại'
            }), 400
        
        # Create new user
        user = User(
            username=username,
            email=email,
            phone=phone,
            full_name=full_name,
            user_type=user_type
        )
        
        # Hash password
        user.set_password(password)
        
        # Save to database
        user_data = user.to_dict()
        user_data['created_at'] = datetime.now(timezone.utc)
        
        result = mongo.db.users.insert_one(user_data)
        user.id = str(result.inserted_id)
        
        # Generate JWT token
        token = generate_token(user.id, user.user_type)
        
        return jsonify({
            'success': True,
            'data': {
                'token': token,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'full_name': user.full_name,
                    'user_type': user.user_type,
                    'phone': user.phone
                }
            },
            'message': 'Đăng ký thành công'
        }), 201
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Lỗi: {str(e)}'
        }), 500

@auth_api_bp.route('/profile', methods=['GET'])
def api_get_profile():
    """Get current user profile from JWT token"""
    try:
        # Get token from header
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({
                'success': False,
                'message': 'Token bị thiếu'
            }), 401
        
        try:
            token = auth_header.split(" ")[1]  # Bearer <token>
        except IndexError:
            return jsonify({
                'success': False,
                'message': 'Token không hợp lệ'
            }), 401
        
        # Verify token and get user
        from app.utils.jwt_auth import get_current_user_from_token
        current_user = get_current_user_from_token(token)
        
        if not current_user:
            return jsonify({
                'success': False,
                'message': 'Token không hợp lệ hoặc đã hết hạn'
            }), 401
        
        # Get profile data
        profile_data = mongo.db.profiles.find_one({'user_id': ObjectId(current_user.id)})
        
        profile = None
        if profile_data:
            profile = Profile.from_dict(profile_data)
        
        return jsonify({
            'success': True,
            'data': {
                'user': {
                    'id': current_user.id,
                    'username': current_user.username,
                    'email': current_user.email,
                    'full_name': current_user.full_name,
                    'user_type': current_user.user_type,
                    'phone': current_user.phone,
                    'created_at': current_user.created_at.isoformat() if current_user.created_at else None
                },
                'profile': {
                    'full_name': profile.full_name if profile else None,
                    'phone': profile.phone if profile else None,
                    'address': profile.address if profile else None,
                    'birthday': profile.birthday.isoformat() if profile and profile.birthday else None,
                    'gender': profile.gender if profile else None,
                    'bio': profile.bio if profile else None,
                    'avatar': profile.avatar if profile else None
                } if profile else None
            },
            'message': 'Lấy thông tin hồ sơ thành công'
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Lỗi: {str(e)}'
        }), 500 