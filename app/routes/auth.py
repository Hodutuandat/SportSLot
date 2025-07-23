from flask import Blueprint, render_template, redirect, url_for, request, session
from flask_login import login_user, logout_user, login_required, current_user
from app.models.user import User
from flask_mail import Message
from app.extensions import mail

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
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
        
        if not username:
            return render_template('auth/login.html', error='Vui lòng nhập tên đăng nhập')
        
        # Xác định user type và redirect tương ứng
        if username == 'owner123':
            user_id = 2
            user_type = 'owner'
            user = User(user_id, username, user_type)
            login_user(user, remember=request.form.get('remember') == 'on')
            # Redirect to next page if specified, otherwise to dashboard
            next_page = request.args.get('next')
            if next_page and next_page.startswith('/'):
                return redirect(next_page)
            return redirect(url_for('owner.dashboard'))
        elif username == 'admin123':
            user_id = 3
            user_type = 'admin'
            user = User(user_id, username, user_type)
            login_user(user, remember=request.form.get('remember') == 'on')
            next_page = request.args.get('next')
            if next_page and next_page.startswith('/'):
                return redirect(next_page)
            return redirect(url_for('admin.dashboard'))
        else:
            # Mặc định là customer
            user_id = 1
            user_type = 'customer'
            user = User(user_id, username, user_type)
            login_user(user, remember=request.form.get('remember') == 'on')
            next_page = request.args.get('next')
            if next_page and next_page.startswith('/'):
                return redirect(next_page)
            return redirect(url_for('common.home'))
    
    return render_template('auth/login.html')

@auth_bp.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Xử lý đăng ký ở đây (giả lập thành công)
        # ...
        return render_template('auth/register.html', success=True)
    # GET
    return render_template('auth/register.html')

@auth_bp.route('/profile')
@login_required
def profile():
    return render_template('customer/profile.html', user=current_user)

@auth_bp.route('/test-session')
def test_session():
    return f"Session: {session}, Current User: {current_user.is_authenticated if current_user else 'None'}" 

@auth_bp.route('/forgot-password', methods=['GET', 'POST'])
def forgot_password():
    if request.method == 'POST':
        email = request.form.get('email')
        return render_template('auth/forgot_password.html', sent=True, email=email)
    return render_template('auth/forgot_password.html') 

@auth_bp.route('/reset-password', methods=['GET', 'POST'])
def reset_password():
    error = None
    success = False
    if request.method == 'POST':
        email = request.form.get('email')
        old_password = request.form.get('old_password')
        new_password = request.form.get('new_password')
        confirm_password = request.form.get('confirm_password')
        # Giả lập kiểm tra hợp lệ
        if not email or not old_password or not new_password or not confirm_password:
            error = 'Vui lòng nhập đầy đủ thông tin.'
        elif new_password != confirm_password:
            error = 'Mật khẩu mới và xác nhận không khớp.'
        elif old_password == new_password:
            error = 'Mật khẩu mới phải khác mật khẩu cũ.'
        else:
            success = True
    return render_template('auth/reset_password.html', error=error, success=success) 