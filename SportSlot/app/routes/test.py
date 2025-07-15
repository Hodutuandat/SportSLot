from flask import Blueprint, render_template

test_bp = Blueprint('test', __name__)

@test_bp.route('/test-base')
def test_base():
    return render_template('test_base.html')
