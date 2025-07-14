from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_login import LoginManager

# Khởi tạo instance extension, chưa gắn vào app
mongo = PyMongo()
bcrypt = Bcrypt()
login_manager = LoginManager()
login_manager.login_view = 'auth.login'  # Route endpoint dùng để login khi chưa đăng nhập

# Nếu muốn có thêm extension khác thì thêm dưới đây (VD: Mail, CORS, ...)

# from flask_mail import Mail
# mail = Mail()

# from flask_cors import CORS
# cors = CORS()
