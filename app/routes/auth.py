from flask import Blueprint, render_template, redirect, url_for, request
from flask_login import login_user, logout_user, login_required, current_user
from app.models.user import User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST' or (request.method == 'GET' and ('email' in request.args or 'username' in request.args)):
        email = request.form.get('email') or request.args.get('email')
        username = request.form.get('username') or request.args.get('username')
        # Ưu tiên username, nếu không có thì lấy email
        user_name = username or email or 'testuser'
        
        # Xác định user type và redirect tương ứng
        if user_name == 'owner123':
            user_id = 2
            user_type = 'owner'
            user = User(user_id, user_name, user_type)
            login_user(user)
            return redirect(url_for('owner.dashboard'))
        elif user_name == 'admin123':
            user_id = 3
            user_type = 'admin'
            user = User(user_id, user_name, user_type)
            login_user(user)
            return redirect(url_for('admin.dashboard'))
        else:
            # Mặc định là customer
            user_id = 1
            user_type = 'customer'
            user = User(user_id, user_name, user_type)
            login_user(user)
            return redirect(url_for('common.home'))
    return render_template('auth/login.html')

@auth_bp.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    # Chỉ render giao diện, chưa xử lý đăng ký thực tế
    return render_template('auth/register.html')

@auth_bp.route('/profile')
@login_required
def profile():
    return render_template('customer/profile.html', user=current_user) 