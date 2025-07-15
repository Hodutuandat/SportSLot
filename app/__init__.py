from flask import Flask

def create_app():
    app = Flask(__name__)
    app.secret_key = "test_secret"

    from .routes import test_bp
    app.register_blueprint(test_bp)

    return app
