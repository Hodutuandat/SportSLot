from flask import Blueprint, render_template

test_bp = Blueprint("test", __name__)
customer_bp = Blueprint('customer', __name__)

@test_bp.route("/home")
def mock_home():
    fields = [
        {
            "name": "Sân bóng đá Linh Trung",
            "type": "Football",
            "price": 200000,
            "location": "Thủ Đức",
            "status": "available"
        },
        {
            "name": "Sân Pickleball Văn Lang",
            "type": "Pickleball",
            "price": 120000,
            "location": "Quận 5",
            "status": "maintenance"
        }
    ]
    return render_template("test_base.html", fields=fields)

@test_bp.route("/login")
def login():
    return render_template("auth/login.html")

@test_bp.route("/register")
def mock_register():
    return render_template("auth/register.html")

@customer_bp.route('/home')
def home():
    return render_template("templates/customer/home.html")

