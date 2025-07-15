
from flask import Blueprint, render_template

test_bp = Blueprint('test', __name__)

@test_bp.route('/test-layout')
def test_layout():
    return render_template('base.html')

@test_bp.route('/test-404')
def test_404():
    return render_template('errors/404.html'), 404

@test_bp.route('/test-401')
def test_401():
    return render_template('errors/401.html'), 401

@test_bp.route('/test-403')
def test_403():
    return render_template('errors/403.html'), 403

@test_bp.route('/test-500')
def test_500():
    return render_template('errors/500.html'), 500

@test_bp.route('/test-maintenance')
def test_maintenance():
    return render_template('errors/maintenance.html')
