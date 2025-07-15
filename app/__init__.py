from flask import Flask
from .config import Config
from .extensions import mongo, jwt, mail

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    mongo.init_app(app)
    jwt.init_app(app)
    mail.init_app(app)
    # Register blueprints here
    return app
