from flask import Blueprint, render_template

customer_bp = Blueprint('customer', __name__)

@customer_bp.route('/')
def home():
    return render_template('customer/court_list.html')

@customer_bp.route('/dashboard')
def dashboard():
    return render_template('customer/dashboard.html', user={'username': 'Demo'})

@customer_bp.route('/history')
def history():
    return render_template('customer/history.html')

@customer_bp.route('/book', methods=['GET', 'POST'])
def book():
    return render_template('customer/booking_form.html')
