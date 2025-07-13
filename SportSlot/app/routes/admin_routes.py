from flask import Blueprint, render_template

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

@admin_bp.route('/dashboard')
def dashboard():
    return render_template('admin/dashboard.html')

@admin_bp.route('/users')
def users():
    return render_template('admin/manage_users.html')

@admin_bp.route('/revenue')
def revenue():
    return render_template('admin/revenue_report.html')
