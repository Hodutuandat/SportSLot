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
    app.register_blueprint(auth_bp)

    return app
