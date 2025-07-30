from flask import Flask
from flask_login import LoginManager
from app.extensions import mail, mongo
from app.routes.common import common_bp
from app.routes.auth import auth_bp
from app.routes.customer import customer_bp
from app.routes.owner import owner_bp
from app.routes.admin import admin_bp
from app.models.user import User
from app.config import Config
from bson import ObjectId

login_manager = LoginManager()

@login_manager.user_loader
def load_user(user_id):
    """Load user từ MongoDB database"""
    try:
        # Kiểm tra user_id có phải ObjectId hợp lệ không
        if not ObjectId.is_valid(user_id):
            return None
        
        # Tìm user trong database
        user_data = mongo.db.users.find_one({'_id': ObjectId(user_id)})
        if user_data:
            user = User.from_dict(user_data)
            # Kiểm tra user có active không
            if user.is_active:
                return user
        return None
    except Exception as e:
        print(f"Error loading user {user_id}: {e}")
        return None

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Register blueprints
    app.register_blueprint(common_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(customer_bp)
    app.register_blueprint(owner_bp)
    app.register_blueprint(admin_bp)
    
    # Initialize extensions
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'
    login_manager.login_message = 'Vui lòng đăng nhập để truy cập trang này.'
    login_manager.login_message_category = 'info'
    login_manager.session_protection = None  # Disable session protection for development

    mail.init_app(app)
    mongo.init_app(app)
    
    return app 