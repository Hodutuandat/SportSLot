
from flask import Blueprint, render_template, request, redirect, url_for, flash
# from app.models import User  # Uncomment and adjust when User model is ready
# from app.extensions import db  # Uncomment and adjust when using Flask-SQLAlchemy

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Xử lý đăng nhập
        email = request.form['email']
        password = request.form['password']
        # TODO: Kiểm tra thông tin đăng nhập
        flash('Đăng nhập thành công!', 'success')
        return redirect(url_for('index'))
    return render_template('auth/login.html')

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
        phone = request.form['phone']
        # TODO: Kiểm tra và tạo user mới
        flash('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.', 'success')
        return redirect(url_for('auth.login'))
    return render_template('auth/register.html')

@auth_bp.route('/forgot-password', methods=['GET', 'POST'])
def forgot_password():
    if request.method == 'POST':
        email = request.form['email']
        # TODO: Gửi email đặt lại mật khẩu
        flash('Đã gửi email đặt lại mật khẩu!', 'success')
        return redirect(url_for('auth.login'))
    return render_template('auth/forgot_password.html')

@auth_bp.route('/set-new-password', methods=['GET', 'POST'])
def set_new_password():
    if request.method == 'POST':
        new_password = request.form['new_password']
        confirm_password = request.form['confirm_password']
        # TODO: Kiểm tra và cập nhật mật khẩu mới
        flash('Đặt mật khẩu mới thành công!', 'success')
        return redirect(url_for('auth.login'))
    return render_template('auth/set_new_password.html')

@auth_bp.route('/change-password', methods=['GET', 'POST'])
def change_password():
    if request.method == 'POST':
        old_password = request.form['old_password']
        new_password = request.form['new_password']
        confirm_password = request.form['confirm_password']
        # TODO: Kiểm tra và đổi mật khẩu
        flash('Đổi mật khẩu thành công!', 'success')
        return redirect(url_for('profile'))
    return render_template('auth/change_password.html')

@auth_bp.route('/confirm-email', methods=['GET'])
def confirm_email():
    # TODO: Xác nhận email từ link
    return render_template('auth/confirm_email.html')
