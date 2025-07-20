from flask import Blueprint, render_template

common_bp = Blueprint('common', __name__)

@common_bp.route('/')
def home():
    return render_template('customer/home.html')

@common_bp.route('/contact')
def contact():
    return render_template('customer/contact.html') 