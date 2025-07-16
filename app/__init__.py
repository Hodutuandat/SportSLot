from flask import Flask
from flask_login import LoginManager
from app.routes.common import common_bp
from app.routes.auth import auth_bp
from app.routes.customer import customer_bp
from app.models.user import User

login_manager = LoginManager()

@login_manager.user_loader
def load_user(user_id):
    # Giả lập user, thực tế sẽ lấy từ DB
    if user_id == '1':
        return User(1, 'testuser')
    return None

def create_app():
    app = Flask(__name__)
    app.secret_key = 'your_secret_key'
    app.register_blueprint(common_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(customer_bp)
    login_manager.init_app(app)
    return app 