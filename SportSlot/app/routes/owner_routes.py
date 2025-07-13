from flask import Blueprint, render_template

owner_bp = Blueprint('owner', __name__, url_prefix='/owner')

@owner_bp.route('/dashboard')
def dashboard():
    return render_template('owner/dashboard.html')

@owner_bp.route('/courts')
def courts():
    return render_template('owner/manage_courts.html')

@owner_bp.route('/bookings')
def bookings():
    return render_template('owner/booking_list.html')
