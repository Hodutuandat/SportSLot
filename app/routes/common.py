from flask import Blueprint, render_template

common_bp = Blueprint('common', __name__)

@common_bp.route('/')
def home():
    return render_template('customer/home.html')

@common_bp.route('/contact')
def contact():
    return render_template('customer/contact.html')

@common_bp.route('/about')
def about():
    return render_template('about.html')

# ĐÃ XÓA ROUTE /fields ở đây để tránh trùng với customer_bp

@common_bp.route('/voucher')
def voucher():
    return render_template('customer/voucher_promotions.html') 