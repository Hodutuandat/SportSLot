from flask import Flask
from .config import Config
from .extensions import mongo, bcrypt, login_manager

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Khởi tạo extension
    mongo.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)

    # Import và đăng ký các blueprint
    from .routes.auth import auth_bp
    from .routes.customer import customer_bp
    from .routes.field_owner import owner_bp
    from .routes.admin import admin_bp
    from .routes.booking import booking_bp
    from .routes.field import field_bp
    from .routes.payment import payment_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(customer_bp)
    app.register_blueprint(owner_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(booking_bp)
    app.register_blueprint(field_bp)
    app.register_blueprint(payment_bp)

    # Xử lý lỗi (nếu muốn custom page lỗi)
    from .routes.errors import errors_bp
    app.register_blueprint(errors_bp)

    # Đặt tên site (tuỳ thích)
    app.config['SITE_NAME'] = "SportSlot"

    return app
