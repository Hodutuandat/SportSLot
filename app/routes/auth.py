from flask import Blueprint, render_template, redirect, url_for, request, session, flash
from flask_login import login_user, logout_user, login_required, current_user
from app.models.user import User
from app.extensions import mongo, mail
from flask_mail import Message
from bson import ObjectId
from datetime import datetime
import re
from werkzeug.security import generate_password_hash, check_password_hash

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    """Đăng nhập"""
    # Nếu user đã đăng nhập, redirect về trang chủ tương ứng
    if current_user.is_authenticated:
        if current_user.is_owner():
            return redirect(url_for('owner.dashboard'))
        elif current_user.is_admin():
            return redirect(url_for('admin.dashboard'))
        else:
            return redirect(url_for('common.home'))
    
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        remember = request.form.get('remember') == 'on'
        
        # Validation
        if not username:
            flash('Vui lòng nhập tên đăng nhập', 'error')
            return render_template('auth/login.html')
        
        if not password:
            flash('Vui lòng nhập mật khẩu', 'error')
            return render_template('auth/login.html')
        
        try:
            # Tìm user trong database
            user_data = mongo.db.users.find_one({
                '$or': [
                    {'username': username},
                    {'email': username}
                ]
            })
            
            if not user_data:
                flash('Tên đăng nhập hoặc email không tồn tại', 'error')
                return render_template('auth/login.html')
            
            # Tạo user object
            user = User.from_dict(user_data)
            
            # Kiểm tra user có active không
            if not user.is_active:
                flash('Tài khoản đã bị khóa. Vui lòng liên hệ admin.', 'error')
                return render_template('auth/login.html')
            
            # Kiểm tra password
            if not user.check_password(password):
                flash('Mật khẩu không đúng', 'error')
                return render_template('auth/login.html')
            
            # Đăng nhập thành công
            login_user(user, remember=remember)
            flash(f'Chào mừng bạn trở lại, {user.username}!', 'success')
            
            # Redirect to next page if specified, otherwise to dashboard
            next_page = request.args.get('next')
            if next_page and next_page.startswith('/'):
                return redirect(next_page)
            
            # Redirect theo role
            if user.is_owner():
                return redirect(url_for('owner.dashboard'))
            elif user.is_admin():
                return redirect(url_for('admin.dashboard'))
            else:
                return redirect(url_for('common.home'))
                
        except Exception as e:
            print(f"Login error: {e}")
            flash('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.', 'error')
            return render_template('auth/login.html')
    
    return render_template('auth/login.html')

@auth_bp.route('/logout')
@login_required
def logout():
    """Đăng xuất"""
    logout_user()
    flash('Bạn đã đăng xuất thành công', 'success')
    return redirect(url_for('auth.login'))

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    """Đăng ký tài khoản"""
    # Nếu user đã đăng nhập, redirect về trang chủ
    if current_user.is_authenticated:
        return redirect(url_for('common.home'))
    
    if request.method == 'POST':
        # Lấy dữ liệu từ form
        username = request.form.get('username', '').strip()
        email = request.form.get('email', '').strip()
        password = request.form.get('password', '')
        confirm_password = request.form.get('confirm_password', '')
        phone = request.form.get('phone', '').strip()
        full_name = request.form.get('full_name', '').strip()
        user_type = request.form.get('user_type', 'customer')
        
        # Validation
        errors = []
        
        # Validate username
        is_valid, error_msg = User.validate_username(username)
        if not is_valid:
            errors.append(error_msg)
        
        # Validate email
        is_valid, error_msg = User.validate_email(email)
        if not is_valid:
            errors.append(error_msg)
        
        # Validate password
        is_valid, error_msg = User.validate_password(password)
        if not is_valid:
            errors.append(error_msg)
        
        # Validate confirm password
        if password != confirm_password:
            errors.append('Mật khẩu xác nhận không khớp')
        
        # Validate phone
        is_valid, error_msg = User.validate_phone(phone)
        if not is_valid:
            errors.append(error_msg)
        
        # Validate full name
        if not full_name:
            errors.append('Họ tên không được để trống')
        elif len(full_name) < 2:
            errors.append('Họ tên phải có ít nhất 2 ký tự')
        
        # Validate user type
        if user_type not in ['customer', 'owner']:
            errors.append('Loại tài khoản không hợp lệ')
        
        # Kiểm tra username đã tồn tại chưa
        if not errors:
            existing_user = mongo.db.users.find_one({'username': username})
            if existing_user:
                errors.append('Tên đăng nhập đã tồn tại')
        
        # Kiểm tra email đã tồn tại chưa
        if not errors:
            existing_email = mongo.db.users.find_one({'email': email})
            if existing_email:
                errors.append('Email đã được sử dụng')
        
        # Kiểm tra phone đã tồn tại chưa
        if not errors:
            existing_phone = mongo.db.users.find_one({'phone': phone})
            if existing_phone:
                errors.append('Số điện thoại đã được sử dụng')
        
        if errors:
            for error in errors:
                flash(error, 'error')
            return render_template('auth/register.html', 
                                username=username, email=email, phone=phone, 
                                full_name=full_name, user_type=user_type)
        
        try:
            # Tạo user mới
            new_user = User(
                username=username,
                email=email,
                phone=phone,
                full_name=full_name,
                user_type=user_type,
                created_at=datetime.utcnow(),
                is_active=True
            )
            
            # Hash password
            new_user.set_password(password)
            
            # Lưu vào database
            user_data = new_user.to_dict()
            result = mongo.db.users.insert_one(user_data)
            
            # Cập nhật user_id
            new_user.id = str(result.inserted_id)
            
            # Đăng nhập tự động
            login_user(new_user)
            
            flash(f'Đăng ký thành công! Chào mừng bạn đến với SportSlot, {full_name}!', 'success')
            
            # Redirect theo role
            if user_type == 'owner':
                return redirect(url_for('owner.dashboard'))
            else:
                return redirect(url_for('common.home'))
                
        except Exception as e:
            print(f"Registration error: {e}")
            flash('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.', 'error')
            return render_template('auth/register.html', 
                                username=username, email=email, phone=phone, 
                                full_name=full_name, user_type=user_type)
    
    return render_template('auth/register.html')

@auth_bp.route('/forgot-password', methods=['GET', 'POST'])
def forgot_password():
    """Quên mật khẩu"""
    if request.method == 'POST':
        email = request.form.get('email', '').strip()
        
        if not email:
            flash('Vui lòng nhập email', 'error')
            return render_template('auth/forgot_password.html')
        
        # Kiểm tra email có tồn tại không
        user_data = mongo.db.users.find_one({'email': email})
        if not user_data:
            flash('Email không tồn tại trong hệ thống', 'error')
            return render_template('auth/forgot_password.html')
        
        # TODO: Gửi email reset password
        flash('Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn', 'success')
        return render_template('auth/forgot_password.html', sent=True, email=email)
    
    return render_template('auth/forgot_password.html')

@auth_bp.route('/reset-password', methods=['GET', 'POST'])
def reset_password():
    """Đặt lại mật khẩu"""
    if request.method == 'POST':
        email = request.form.get('email', '').strip()
        old_password = request.form.get('old_password', '')
        new_password = request.form.get('new_password', '')
        confirm_password = request.form.get('confirm_password', '')
        
        # Validation
        if not email:
            flash('Vui lòng nhập email', 'error')
            return render_template('auth/reset_password.html')
        
        if not old_password:
            flash('Vui lòng nhập mật khẩu cũ', 'error')
            return render_template('auth/reset_password.html')
        
        if not new_password:
            flash('Vui lòng nhập mật khẩu mới', 'error')
            return render_template('auth/reset_password.html')
        
        if new_password != confirm_password:
            flash('Mật khẩu xác nhận không khớp', 'error')
            return render_template('auth/reset_password.html')
        
        # Validate new password
        is_valid, error_msg = User.validate_password(new_password)
        if not is_valid:
            flash(error_msg, 'error')
            return render_template('auth/reset_password.html')
        
        try:
            # Tìm user
            user_data = mongo.db.users.find_one({'email': email})
            if not user_data:
                flash('Email không tồn tại', 'error')
                return render_template('auth/reset_password.html')
            
            user = User.from_dict(user_data)
            
            # Kiểm tra mật khẩu cũ
            if not user.check_password(old_password):
                flash('Mật khẩu cũ không đúng', 'error')
                return render_template('auth/reset_password.html')
            
            # Cập nhật mật khẩu mới
            new_password_hash = generate_password_hash(new_password)
            mongo.db.users.update_one(
                {'_id': ObjectId(user.id)},
                {'$set': {'password_hash': new_password_hash}}
            )
            
            flash('Đặt lại mật khẩu thành công!', 'success')
            return redirect(url_for('auth.login'))
            
        except Exception as e:
            print(f"Reset password error: {e}")
            flash('Có lỗi xảy ra khi đặt lại mật khẩu', 'error')
            return render_template('auth/reset_password.html')
    
    return render_template('auth/reset_password.html')

@auth_bp.route('/profile')
@login_required
def profile():
    """Trang hồ sơ cá nhân"""
    return redirect(url_for('customer.profile')) 