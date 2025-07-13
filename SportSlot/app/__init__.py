from flask import Flask
from flask_pymongo import PyMongo

mongo = PyMongo()

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    # Khởi tạo MongoDB
    mongo.init_app(app)

    # Đăng ký Blueprint
    from app.routes.auth import auth_bp
    from app.routes.customer_routes import customer_bp
    from app.routes.owner_routes import owner_bp
    from app.routes.admin_routes import admin_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(customer_bp)
    app.register_blueprint(owner_bp)
    app.register_blueprint(admin_bp)

    return app
