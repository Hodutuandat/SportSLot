# SportSlot - Hệ Thống Đặt Sân Thể Thao

![SportSlot Logo](app/static/images/SportSlot_Logo.png)

## Mô tả dự án

SportSlot là một hệ thống đặt sân thể thao trực tuyến được phát triển bằng Flask, hỗ trợ 3 vai trò người dùng chính: Khách hàng (Customer), Chủ sân (Owner) và Quản trị viên (Admin). Hệ thống cho phép người dùng tìm kiếm, đặt sân thể thao các loại như bóng đá, bóng chuyền, bóng rổ, tennis, cầu lông với giao diện thân thiện và dễ sử dụng.

## Tính năng chính

### Khách hàng (Customer)
- Tìm kiếm và xem danh sách sân thể thao
- Xem chi tiết sân và lịch đặt sân
- Đặt sân trực tuyến với thanh toán
- Quản lý lịch sử đặt sân
- Quản lý voucher và khuyến mãi
- Xem lịch sử giao dịch
- Cập nhật thông tin cá nhân

### Chủ sân (Owner)
- Quản lý danh sách sân thể thao
- Thêm/sửa/xóa thông tin sân
- Xem lịch đặt sân và quản lý booking
- Duyệt/từ chối yêu cầu đặt sân
- Xem thống kê doanh thu
- Quản lý thông báo
- Xem lịch sử giao dịch

### Quản trị viên (Admin)
- Quản lý người dùng (khách hàng, chủ sân)
- Quản lý sân thể thao toàn hệ thống
- Xem thống kê tổng quan
- Quản lý giao dịch và doanh thu
- Quản lý voucher và khuyến mãi
- Xem nhật ký hoạt động
- Cài đặt hệ thống

## Công nghệ sử dụng

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **Authentication**: Flask-Login
- **Email**: Flask-Mail
- **Database**: SQLite (development) / MongoDB (production)
- **UI Framework**: Bootstrap 5
- **Icons**: Font Awesome

## Cài đặt môi trường

### Yêu cầu hệ thống
- Python 3.8+
- pip (Python package manager)
- Git

### Bước 1: Clone dự án
```bash
git clone https://github.com/Hodutuandat/SportSlot.git
cd SportSlot
```

### Bước 2: Tạo môi trường ảo
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### Bước 3: Cài đặt dependencies
```bash
pip install -r requirements.txt
```

### Bước 4: Cấu hình môi trường
Tạo file `.env` trong thư mục gốc:
```env
FLASK_APP=run.py
FLASK_ENV=development
SECRET_KEY=your_secret_key_here_make_it_long_and_random_12345
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your_gmail@gmail.com
MAIL_PASSWORD=your_app_password
MAIL_DEFAULT_SENDER=your_gmail@gmail.com
```

### Bước 5: Khởi chạy ứng dụng
```bash
python run.py
```

Ứng dụng sẽ chạy tại: `http://localhost:5000`

## Tài khoản demo

### Khách hàng (Customer)
- **Username**: `testuser` hoặc bất kỳ username khác
- **Password**: Không cần (demo mode)

### Chủ sân (Owner)
- **Username**: `owner123`
- **Password**: Không cần (demo mode)

### Quản trị viên (Admin)
- **Username**: `admin123`
- **Password**: Không cần (demo mode)

## Flow hoạt động của hệ thống

### 1. Flow đăng nhập và phân quyền
```
Người dùng truy cập → Chọn vai trò → Đăng nhập → Redirect đến dashboard tương ứng
```

### 2. Flow đặt sân (Customer)
```
1. Xem danh sách sân → 2. Chọn sân → 3. Xem chi tiết → 4. Chọn thời gian → 5. Đặt sân → 6. Thanh toán → 7. Xác nhận
```

### 3. Flow quản lý sân (Owner)
```
1. Đăng nhập → 2. Xem dashboard → 3. Quản lý sân → 4. Xem booking → 5. Duyệt/từ chối → 6. Cập nhật trạng thái
```

### 4. Flow quản trị (Admin)
```
1. Đăng nhập → 2. Xem tổng quan → 3. Quản lý người dùng/sân → 4. Xem báo cáo → 5. Cài đặt hệ thống
```

## Chi tiết vai trò người dùng

### Khách hàng (Customer)

#### Chức năng chính:
- **Trang chủ**: Xem sân nổi bật, khuyến mãi
- **Danh sách sân**: Tìm kiếm và lọc sân theo loại, địa điểm
- **Chi tiết sân**: Xem thông tin, hình ảnh, lịch đặt sân
- **Đặt sân**: Chọn thời gian, thanh toán trực tuyến
- **Lịch sử đặt sân**: Xem các booking đã thực hiện
- **Voucher**: Quản lý voucher và khuyến mãi
- **Giao dịch**: Xem lịch sử thanh toán
- **Hồ sơ**: Cập nhật thông tin cá nhân

#### Quyền hạn:
- Xem danh sách sân công khai
- Đặt sân cho bản thân
- Quản lý booking cá nhân
- Sử dụng voucher
- Xem lịch sử giao dịch

### Chủ sân (Owner)

#### Chức năng chính:
- **Dashboard**: Thống kê doanh thu, booking, sân
- **Quản lý sân**: Thêm/sửa/xóa thông tin sân
- **Lịch đặt sân**: Xem và quản lý booking
- **Duyệt booking**: Chấp nhận/từ chối yêu cầu đặt sân
- **Thống kê**: Doanh thu theo thời gian
- **Thông báo**: Quản lý thông báo hệ thống
- **Giao dịch**: Xem lịch sử thanh toán
- **Hồ sơ**: Cập nhật thông tin cá nhân

#### Quyền hạn:
- Quản lý sân thuộc sở hữu
- Duyệt booking cho sân của mình
- Xem thống kê doanh thu
- Nhận thông báo booking mới
- Cập nhật thông tin sân

### Quản trị viên (Admin)

#### Chức năng chính:
- **Dashboard**: Thống kê tổng quan hệ thống
- **Quản lý người dùng**: Xem, khóa/mở khóa tài khoản
- **Quản lý sân**: Giám sát tất cả sân trong hệ thống
- **Quản lý giao dịch**: Xem tất cả giao dịch
- **Quản lý voucher**: Tạo và quản lý khuyến mãi
- **Nhật ký hoạt động**: Xem log hệ thống
- **Cài đặt**: Cấu hình hệ thống
- **Báo cáo**: Xuất báo cáo thống kê

#### Quyền hạn:
- Quản lý tất cả người dùng
- Giám sát toàn bộ hệ thống
- Tạo voucher và khuyến mãi
- Xem nhật ký hoạt động
- Cấu hình hệ thống

## Cấu trúc dự án

```
SportSlot/
├── app/
│   ├── __init__.py              # Flask app factory
│   ├── config.py                # Cấu hình ứng dụng
│   ├── extensions.py            # Flask extensions
│   ├── models/
│   │   └── user.py              # User model
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── admin.py             # Admin routes
│   │   ├── auth.py              # Authentication routes
│   │   ├── common.py            # Common routes
│   │   ├── customer.py          # Customer routes
│   │   └── owner.py             # Owner routes
│   ├── static/
│   │   ├── css/                 # Stylesheets
│   │   ├── js/                  # JavaScript files
│   │   └── images/              # Images and logos
│   └── templates/
│       ├── admin/               # Admin templates
│       ├── auth/                # Authentication templates
│       ├── customer/            # Customer templates
│       ├── owner/               # Owner templates
│       └── shared/              # Shared templates
├── requirements.txt             # Python dependencies
├── run.py                      # Application entry point
└── README.md                   # Project documentation
```

## Triển khai

### Development
```bash
python run.py
```

### Production
```bash
# Sử dụng Gunicorn
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 run:app

# Hoặc sử dụng uWSGI
pip install uwsgi
uwsgi --socket 0.0.0.0:5000 --protocol=http -w run:app
```

## Cấu hình

### Email Configuration
Để sử dụng tính năng gửi email, cần cấu hình trong `app/config.py`:
```python
MAIL_SERVER = 'smtp.gmail.com'
MAIL_PORT = 587
MAIL_USE_TLS = True
MAIL_USERNAME = 'your_gmail@gmail.com'
MAIL_PASSWORD = 'your_app_password'
MAIL_DEFAULT_SENDER = 'your_gmail@gmail.com'
```

### Database Configuration
Hiện tại hệ thống sử dụng mock data. Để tích hợp database thực:
1. Cài đặt database driver (SQLAlchemy, PyMongo)
2. Cấu hình connection string
3. Tạo models và migrations

## Troubleshooting

### Lỗi thường gặp:

1. **ModuleNotFoundError**: Cài đặt lại dependencies
   ```bash
   pip install -r requirements.txt
   ```

2. **Port already in use**: Thay đổi port
   ```bash
   python run.py --port 5001
   ```

3. **Email không gửi được**: Kiểm tra cấu hình SMTP
   - Đảm bảo đã bật "Less secure app access" hoặc sử dụng App Password
   - Kiểm tra firewall và antivirus

## Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## License

Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

## Liên hệ

- **Email**: support@sportslot.vn
- **Website**: https://sportslot.vn
- **Hotline**: 1900-xxxx

---

**SportSlot** - Hệ thống đặt sân thể thao thông minh, kết nối người chơi với sân thể thao chất lượng!
