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
│   │   ├── user.py              # User model
│   │   ├── field.py             # Field model
│   │   ├── booking.py           # Booking model
│   │   ├── payment.py           # Payment model
│   │   ├── voucher.py           # Voucher model
│   │   ├── review.py            # Review model
│   │   ├── notification.py      # Notification model
│   │   └── profile.py           # Profile model
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── admin.py             # Admin routes
│   │   ├── auth.py              # Authentication routes
│   │   ├── common.py            # Common routes
│   │   ├── customer.py          # Customer routes
│   │   ├── owner.py             # Owner routes
│   │   └── api/                 # API routes
│   │       ├── auth.py          # Authentication API
│   │       ├── customer.py      # Customer API
│   │       └── owner.py         # Owner API
│   ├── static/
│   │   ├── css/                 # Stylesheets
│   │   │   ├── customer/        # Customer styles
│   │   │   ├── owner/           # Owner styles
│   │   │   ├── admin/           # Admin styles
│   │   │   ├── auth/            # Authentication styles
│   │   │   └── shared/          # Shared styles
│   │   ├── js/                  # JavaScript files
│   │   │   ├── customer/        # Customer scripts
│   │   │   ├── owner/           # Owner scripts
│   │   │   ├── admin/           # Admin scripts
│   │   │   ├── auth/            # Authentication scripts
│   │   │   └── shared/          # Shared scripts
│   │   └── images/              # Images and logos
│   └── templates/
│       ├── admin/               # Admin templates
│       ├── auth/                # Authentication templates
│       ├── customer/            # Customer templates
│       ├── owner/               # Owner templates
│       ├── shared/              # Shared templates
│       └── email/               # Email templates
├── requirements.txt             # Python dependencies
├── run.py                      # Application entry point
└── README.md                   # Project documentation
```

## Chi tiết Front-end Implementation

### 1. Customer Front-end Implementation

#### 1.1 Cấu trúc Templates (HTML)

**Base Template (`base.html`)**
- Sử dụng Jinja2 template inheritance
- Responsive design với Bootstrap 5
- Dynamic navigation bar theo vai trò người dùng
- Footer chung với các link quan trọng
- Meta tags cho SEO và mobile optimization

**Customer Templates:**

**1. Home Page (`home.html`)**
```html
<!-- Hero Section -->
<section class="hero-section">
    <div class="hero-content">
        <h1 class="hero-title">Đặt Sân Thể Thao Dễ Dàng</h1>
        <p class="hero-subtitle">Tìm và đặt sân thể thao yêu thích của bạn chỉ trong vài phút</p>
        <div class="hero-buttons">
            <a href="{{ url_for('customer.field_list') }}" class="btn btn-primary">Đặt Sân Ngay</a>
            <a href="#how-it-works" class="btn btn-outline">Tìm Hiểu Thêm</a>
        </div>
    </div>
    <div class="hero-visual">
        <div class="phone-mockup">
            <div class="phone-screen active" data-screen="home">
                <img src="{{ url_for('static', filename='images/phone-home.png') }}" alt="Home Screen">
            </div>
            <div class="phone-screen" data-screen="booking">
                <img src="{{ url_for('static', filename='images/phone-booking.png') }}" alt="Booking Screen">
            </div>
            <div class="phone-screen" data-screen="success">
                <img src="{{ url_for('static', filename='images/phone-success.png') }}" alt="Success Screen">
            </div>
        </div>
    </div>
</section>

<!-- Features Section -->
<section class="features-section">
    <div class="container">
        <h2 class="section-title">Tại Sao Chọn SportSlot?</h2>
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-search"></i>
                </div>
                <h3>Tìm Kiếm Dễ Dàng</h3>
                <p>Tìm sân thể thao phù hợp với vị trí và thời gian của bạn</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-clock"></i>
                </div>
                <h3>Đặt Sân 24/7</h3>
                <p>Đặt sân bất cứ lúc nào, không cần gọi điện hay đến tận nơi</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <h3>Thanh Toán An Toàn</h3>
                <p>Thanh toán trực tuyến an toàn với nhiều phương thức</p>
            </div>
        </div>
    </div>
</section>

<!-- How It Works Section -->
<section id="how-it-works" class="how-it-works-section">
    <div class="container">
        <h2 class="section-title">Cách Thức Hoạt Động</h2>
        <div class="steps-grid">
            <div class="step-card">
                <div class="step-number">1</div>
                <h3>Tìm Sân</h3>
                <p>Tìm kiếm sân thể thao theo loại, địa điểm và thời gian</p>
            </div>
            <div class="step-card">
                <div class="step-number">2</div>
                <h3>Chọn Thời Gian</h3>
                <p>Chọn khung giờ phù hợp và kiểm tra tính khả dụng</p>
            </div>
            <div class="step-card">
                <div class="step-number">3</div>
                <h3>Đặt Sân</h3>
                <p>Xác nhận thông tin và thanh toán để hoàn tất đặt sân</p>
            </div>
        </div>
    </div>
</section>

<!-- FAQ Section -->
<section class="faq-section">
    <div class="container">
        <h2 class="section-title">Câu Hỏi Thường Gặp</h2>
        <div class="faq-accordion">
            <div class="faq-item">
                <div class="faq-question">
                    <h3>Làm thế nào để đặt sân?</h3>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                    <p>Bạn chỉ cần tìm sân phù hợp, chọn thời gian và thanh toán trực tuyến.</p>
                </div>
            </div>
            <!-- More FAQ items... -->
        </div>
    </div>
</section>

<!-- Statistics Section -->
<section class="statistics-section">
    <div class="container">
        <div class="stats-grid">
            <div class="stat-item">
                <div class="stat-number" data-target="150">0</div>
                <div class="stat-label">Sân Thể Thao</div>
            </div>
            <div class="stat-item">
                <div class="stat-number" data-target="5000">0</div>
                <div class="stat-label">Khách Hàng</div>
            </div>
            <div class="stat-item">
                <div class="stat-number" data-target="10000">0</div>
                <div class="stat-label">Lượt Đặt Sân</div>
            </div>
            <div class="stat-item">
                <div class="stat-number" data-target="98">0</div>
                <div class="stat-label">% Hài Lòng</div>
            </div>
        </div>
    </div>
</section>
```

**2. Field List (`field_list.html`)**
```html
<!-- Filter Section -->
<section class="filter-section">
    <div class="container">
        <div class="filter-grid">
            <div class="filter-group">
                <label for="sport-type">Loại Sân</label>
                <select id="sport-type" class="form-select">
                    <option value="">Tất cả</option>
                    <option value="football">Bóng đá</option>
                    <option value="basketball">Bóng rổ</option>
                    <option value="tennis">Tennis</option>
                    <option value="badminton">Cầu lông</option>
                    <option value="volleyball">Bóng chuyền</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="location">Địa Điểm</label>
                <select id="location" class="form-select">
                    <option value="">Tất cả</option>
                    <option value="district1">Quận 1</option>
                    <option value="district2">Quận 2</option>
                    <option value="district3">Quận 3</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="date">Ngày</label>
                <input type="date" id="date" class="form-control">
            </div>
            <div class="filter-group">
                <label for="time">Giờ</label>
                <select id="time" class="form-select">
                    <option value="">Tất cả</option>
                    <option value="06:00">06:00</option>
                    <option value="08:00">08:00</option>
                    <option value="10:00">10:00</option>
                    <option value="14:00">14:00</option>
                    <option value="16:00">16:00</option>
                    <option value="18:00">18:00</option>
                    <option value="20:00">20:00</option>
                </select>
            </div>
            <div class="filter-group">
                <button class="btn btn-primary" onclick="applyFilters()">Lọc</button>
                <button class="btn btn-outline" onclick="clearFilters()">Xóa Lọc</button>
            </div>
        </div>
    </div>
</section>

<!-- Statistics Bar -->
<section class="statistics-bar">
    <div class="container">
        <div class="stats-grid">
            <div class="stat-item">
                <div class="stat-number">{{ total_fields }}</div>
                <div class="stat-label">Sân Thể Thao</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">{{ sports_types }}</div>
                <div class="stat-label">Loại Sân</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">24/7</div>
                <div class="stat-label">Hỗ Trợ</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">{{ total_bookings }}</div>
                <div class="stat-label">Lượt Đặt</div>
            </div>
        </div>
    </div>
</section>

<!-- Fields Grid -->
<section class="fields-section">
    <div class="container">
        <div class="search-bar">
            <input type="text" id="search-field" class="form-control" placeholder="Tìm kiếm sân thể thao...">
            <button class="btn btn-primary" onclick="searchFields()">
                <i class="fas fa-search"></i>
            </button>
        </div>
        
        <div class="fields-grid" id="fields-container">
            {% for field in fields %}
            <div class="field-card" data-sport="{{ field.field_type }}" data-location="{{ field.location }}" data-price="{{ field.price_per_slot }}">
                <div class="field-image">
                    <img src="{{ field.image_url or url_for('static', filename='images/field-placeholder.jpg') }}" 
                         alt="{{ field.name }}" loading="lazy">
                    <div class="field-status {{ 'available' if field.is_available else 'unavailable' }}">
                        {{ 'Có sẵn' if field.is_available else 'Hết chỗ' }}
                    </div>
                </div>
                <div class="field-content">
                    <h3 class="field-name">{{ field.name or 'Tên sân không xác định' }}</h3>
                    <p class="field-location">
                        <i class="fas fa-map-marker-alt"></i>
                        {{ field.location or 'Địa chỉ không xác định' }}
                    </p>
                    <p class="field-type">
                        <i class="fas fa-futbol"></i>
                        {{ field.field_type or 'Loại sân không xác định' }}
                    </p>
                    <div class="field-price">
                        <span class="price">{{ "{:,.0f}".format(field.price_per_slot or 0) }} VNĐ</span>
                        <span class="per-slot">/giờ</span>
                    </div>
                    <div class="field-actions">
                        <a href="{{ url_for('customer.field_detail', field_id=field.id) }}" 
                           class="btn btn-primary">Xem Chi Tiết</a>
                        <button class="btn btn-outline" onclick="addToFavorites({{ field.id }})">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
            {% else %}
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-search"></i>
                </div>
                <h3>Không tìm thấy sân phù hợp</h3>
                <p>Hãy thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác</p>
                <button class="btn btn-primary" onclick="clearFilters()">Xóa Bộ Lọc</button>
            </div>
            {% endfor %}
        </div>
        
        <!-- Loading State -->
        <div class="loading-state" id="loading-state" style="display: none;">
            <div class="spinner"></div>
            <p>Đang tải sân thể thao...</p>
        </div>
    </div>
</section>
```

**3. Field Detail (`field_detail.html`)**
```html
<!-- Field Information Section -->
<section class="field-detail-section">
    <div class="container">
        <div class="field-detail-grid">
            <!-- Field Images -->
            <div class="field-images">
                <div class="main-image">
                    <img src="{{ field.image_url or url_for('static', filename='images/field-placeholder.jpg') }}" 
                         alt="{{ field.name or 'Tên sân không xác định' }}" id="main-field-image">
                </div>
                <div class="image-gallery" id="image-gallery">
                    <div class="gallery-item active" onclick="changeMainImage(this)">
                        <img src="{{ field.image_url or url_for('static', filename='images/field-placeholder.jpg') }}" 
                             alt="Hình ảnh 1">
                    </div>
                    <div class="gallery-item" onclick="changeMainImage(this)">
                        <img src="{{ url_for('static', filename='images/field-detail-2.jpg') }}" alt="Hình ảnh 2">
                    </div>
                    <div class="gallery-item" onclick="changeMainImage(this)">
                        <img src="{{ url_for('static', filename='images/field-detail-3.jpg') }}" alt="Hình ảnh 3">
                    </div>
                </div>
            </div>

            <!-- Field Information -->
            <div class="field-info">
                <h1 class="field-title">{{ field.name or 'Tên sân không xác định' }}</h1>
                <div class="field-meta">
                    <div class="meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>{{ field.location or 'Địa chỉ không xác định' }}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-futbol"></i>
                        <span>{{ field.field_type or 'Loại sân không xác định' }}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-star"></i>
                        <span>{{ field.rating or '4.5' }} ({{ field.review_count or '120' }} đánh giá)</span>
                    </div>
                </div>

                <div class="field-description">
                    <h3>Mô tả</h3>
                    <p>{{ field.description or 'Sân thể thao chất lượng cao với đầy đủ tiện nghi. Phù hợp cho các hoạt động thể thao và giải trí.' }}</p>
                </div>

                <div class="field-amenities">
                    <h3>Tiện nghi</h3>
                    <div class="amenities-grid">
                        <div class="amenity-item">
                            <i class="fas fa-parking"></i>
                            <span>Bãi đỗ xe</span>
                        </div>
                        <div class="amenity-item">
                            <i class="fas fa-shower"></i>
                            <span>Phòng tắm</span>
                        </div>
                        <div class="amenity-item">
                            <i class="fas fa-lightbulb"></i>
                            <span>Ánh sáng</span>
                        </div>
                        <div class="amenity-item">
                            <i class="fas fa-umbrella-beach"></i>
                            <span>Mái che</span>
                        </div>
                    </div>
                </div>

                <div class="field-pricing">
                    <h3>Giá thuê</h3>
                    <div class="price-display">
                        <span class="price">{{ "{:,.0f}".format(field.price_per_slot or 0) }} VNĐ</span>
                        <span class="per-slot">/giờ</span>
                    </div>
                </div>

                <div class="field-actions">
                    <button class="btn btn-primary btn-large" onclick="openBookingModal()">
                        <i class="fas fa-calendar-plus"></i>
                        Đặt Sân Ngay
                    </button>
                    <button class="btn btn-outline" onclick="addToFavorites({{ field.id }})">
                        <i class="far fa-heart"></i>
                        Yêu Thích
                    </button>
                    <button class="btn btn-outline" onclick="shareField()">
                        <i class="fas fa-share"></i>
                        Chia Sẻ
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Booking Modal -->
<div class="modal" id="booking-modal">
    <div class="modal-content">
        <div class="modal-header">
            <h2>Đặt Sân</h2>
            <button class="close-btn" onclick="closeBookingModal()">&times;</button>
        </div>
        <div class="modal-body">
            <form id="booking-form">
                <div class="form-group">
                    <label for="booking-date">Ngày đặt</label>
                    <input type="date" id="booking-date" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="start-time">Giờ bắt đầu</label>
                    <select id="start-time" class="form-control" required>
                        <option value="">Chọn giờ</option>
                        <option value="06:00">06:00</option>
                        <option value="08:00">08:00</option>
                        <option value="10:00">10:00</option>
                        <option value="14:00">14:00</option>
                        <option value="16:00">16:00</option>
                        <option value="18:00">18:00</option>
                        <option value="20:00">20:00</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="duration">Thời lượng (giờ)</label>
                    <select id="duration" class="form-control" required>
                        <option value="1">1 giờ</option>
                        <option value="2">2 giờ</option>
                        <option value="3">3 giờ</option>
                        <option value="4">4 giờ</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="voucher-code">Mã giảm giá (nếu có)</label>
                    <input type="text" id="voucher-code" class="form-control" placeholder="Nhập mã giảm giá">
                    <button type="button" class="btn btn-outline" onclick="applyVoucher()">Áp dụng</button>
                </div>
                <div class="price-summary">
                    <div class="price-item">
                        <span>Giá gốc:</span>
                        <span id="original-price">0 VNĐ</span>
                    </div>
                    <div class="price-item" id="discount-item" style="display: none;">
                        <span>Giảm giá:</span>
                        <span id="discount-amount">0 VNĐ</span>
                    </div>
                    <div class="price-total">
                        <span>Tổng cộng:</span>
                        <span id="total-price">0 VNĐ</span>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Xác Nhận Đặt Sân</button>
                    <button type="button" class="btn btn-outline" onclick="closeBookingModal()">Hủy</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Reviews Section -->
<section class="reviews-section">
    <div class="container">
        <h2>Đánh giá từ khách hàng</h2>
        <div class="reviews-grid">
            <div class="review-card">
                <div class="review-header">
                    <div class="reviewer-info">
                        <img src="{{ url_for('static', filename='images/avatar-1.jpg') }}" alt="User Avatar">
                        <div>
                            <h4>Nguyễn Văn A</h4>
                            <div class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                        </div>
                    </div>
                    <span class="review-date">2 ngày trước</span>
                </div>
                <p class="review-text">Sân rất đẹp và sạch sẽ. Nhân viên phục vụ nhiệt tình. Sẽ quay lại!</p>
            </div>
            <!-- More review cards... -->
        </div>
    </div>
</section>
```

**4. Booking History (`booking_history.html`)**
```html
- Advanced filtering (status, date, field)
- Booking cards với status indicators
- Action buttons (view detail, cancel, rate)
- Statistics summary
- Pagination support
```

**5. Profile (`profile.html`)**
```html
- User information display với avatar
- Statistics cards (bookings, points, vouchers, spending)
- Edit profile modal
- Activity timeline
- Settings section
```

**6. Voucher Promotions (`voucher_promotions.html`)**
```html
- Voucher grid layout
- Category filtering
- Usage instructions
- Expiry date handling
- Apply voucher functionality
```

**7. Write Review (`write_review.html`)**
```html
- Star rating system
- Comment form
- Image upload support
- Preview functionality
```

#### 1.2 CSS Implementation

**Design System:**
```css
/* Color Variables */
:root {
    --primary-dark: #1F2937;
    --primary-dark-light: #374151;
    --primary-dark-darker: #111827;
    --gradient-primary: linear-gradient(135deg, #1F2937 0%, #111827 100%);
    --text-primary: #1E293B;
    --text-secondary: #64748B;
    --bg-primary: #F8FAFC;
    --bg-secondary: #FFFFFF;
    --shadow-primary: 0 10px 25px rgba(31, 41, 55, 0.15);
}
```

**Key CSS Files:**

**1. Home CSS (`home.css`) - 1140 lines**
```css
/* Hero Section */
.hero-section {
    background: var(--gradient-primary);
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.hero-content {
    flex: 1;
    padding: 0 4rem;
    z-index: 2;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1.5rem;
    animation: fadeInUp 1s ease-out;
}

.hero-subtitle {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 2rem;
    animation: fadeInUp 1s ease-out 0.2s both;
}

.hero-buttons {
    display: flex;
    gap: 1rem;
    animation: fadeInUp 1s ease-out 0.4s both;
}

.btn-primary {
    background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
    border: none;
    padding: 1rem 2rem;
    border-radius: 50px;
    color: white;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}

/* Phone Mockup */
.phone-mockup {
    position: relative;
    width: 300px;
    height: 600px;
    margin: 0 auto;
}

.phone-screen {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.5s ease;
}

.phone-screen.active {
    opacity: 1;
    transform: scale(1);
}

.phone-screen img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Features Section */
.features-section {
    padding: 6rem 0;
    background: var(--bg-primary);
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.feature-card {
    background: white;
    padding: 2rem;
    border-radius: 20px;
    text-align: center;
    box-shadow: var(--shadow-primary);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.feature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
}

.feature-card:hover::before {
    left: 100%;
}

.feature-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.feature-icon {
    width: 80px;
    height: 80px;
    background: var(--gradient-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    font-size: 2rem;
    color: white;
}

/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes sparkle {
    0%, 100% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.2) rotate(180deg); }
}

/* Responsive Design */
@media (max-width: 1024px) {
    .hero-title {
        font-size: 2.5rem;
    }
    
    .hero-content {
        padding: 0 2rem;
    }
    
    .phone-mockup {
        width: 250px;
        height: 500px;
    }
}

@media (max-width: 768px) {
    .hero-section {
        flex-direction: column;
        text-align: center;
        padding: 2rem 0;
    }
    
    .hero-title {
        font-size: 2rem;
    }
    
    .hero-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .features-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .hero-title {
        font-size: 1.5rem;
    }
    
    .hero-subtitle {
        font-size: 1rem;
    }
    
    .phone-mockup {
        width: 200px;
        height: 400px;
    }
}
```

**2. Field List CSS (`field_list.css`) - 573 lines**
- Grid layout cho field cards
- Filter system styling
- Loading states và skeletons
- Empty state design
- Search functionality styling

**3. Field Detail CSS (`field_detail.css`) - 994 lines**
- Image gallery với zoom effects
- Booking modal styling
- Voucher integration design
- Review system styling
- Responsive image handling

**4. Booking History CSS (`booking_history.css`) - 597 lines**
- Status badge styling
- Filter controls design
- Booking card layouts
- Action button styling
- Statistics display

**5. Profile CSS (`profile.css`) - 847 lines**
- Profile card design
- Statistics grid layout
- Edit modal styling
- Avatar circle design
- Activity timeline

**6. Voucher Promotions CSS (`voucher_promotions.css`) - 571 lines**
- Voucher card design
- Category filter styling
- Discount display
- Expiry date indicators

**7. Write Review CSS (`write_review.css`) - 373 lines**
- Star rating system
- Form styling
- Image upload design
- Preview functionality

#### 1.3 JavaScript Implementation

**Key JavaScript Files:**

**1. Home JS (`home.js`) - 672 lines**
```javascript
// Core Functions
function initializeSportsHomepage() {
    initializeHeroAnimations();
    initializeFeatureCards();
    initializeStepCards();
    initializeFAQ();
    initializeScrollAnimations();
    initializePhoneDemo();
    initializeStatistics();
}

function initializeHeroAnimations() {
    // Animate hero elements on page load
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons');
    heroElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add sparkle effects
    createSparkles();
}

function initializePhoneDemo() {
    const screens = ['home', 'booking', 'success'];
    let currentScreen = 0;
    
    function cycleScreens() {
        // Remove active class from current screen
        document.querySelector('.phone-screen.active').classList.remove('active');
        
        // Move to next screen
        currentScreen = (currentScreen + 1) % screens.length;
        
        // Add active class to new screen
        document.querySelector(`[data-screen="${screens[currentScreen]}"]`).classList.add('active');
    }
    
    // Cycle screens every 3 seconds
    setInterval(cycleScreens, 3000);
}

function initializeFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            const isOpen = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = '0';
            });
            
            // Toggle current item
            if (!isOpen) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

function initializeStatistics() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateNumber(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 20);
    }
    
    // Animate numbers when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateNumber(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    statNumbers.forEach(number => observer.observe(number));
}

function createSparkles() {
    const heroSection = document.querySelector('.hero-section');
    
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        
        heroSection.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            sparkle.remove();
        }, 3000);
    }
    
    // Create sparkles periodically
    setInterval(createSparkle, 500);
}

// Scroll-triggered animations
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    const animatedElements = document.querySelectorAll('.feature-card, .step-card, .faq-item');
    animatedElements.forEach(el => observer.observe(el));
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSportsHomepage();
});
```

**2. Field Detail JS (`field_detail.js`) - 598 lines**
```javascript
// Core Functions:
- initializeFieldDetail()
- initializeBookingModal()
- initializeVoucherSystem()
- initializeReviewSystem()

// Features:
- Time slot selection
- Voucher application
- Price calculation
- Image gallery
- Booking confirmation
- Review submission
```

**3. Booking History JS (`booking_history.js`) - 328 lines**
```javascript
// Core Functions:
- initializeBookingHistory()
- applyFilters()
- clearFilters()
- cancelBooking()
- rateBooking()

// Features:
- Real-time filtering
- AJAX booking cancellation
- Status updates
- Pagination handling
```

**4. Profile JS (`profile.js`) - 341 lines**
```javascript
// Core Functions:
- initializeProfile()
- editProfile()
- updateProfile()
- uploadAvatar()

// Features:
- Form validation
- Image upload preview
- Statistics updates
- Activity tracking
```

**5. Voucher Promotions JS (`voucher_promotions.js`) - 286 lines**
```javascript
// Core Functions:
- initializeVoucherPromotions()
- applyVoucher()
- filterVouchers()
- copyVoucherCode()

// Features:
- Category filtering
- Search functionality
- Copy to clipboard
- Usage tracking
```

**6. Write Review JS (`write_review.js`) - 311 lines**
```javascript
// Core Functions:
- initializeReviewForm()
- handleStarRating()
- previewReview()
- submitReview()

// Features:
- Interactive star rating
- Image upload
- Form validation
- Preview functionality
```

#### 1.4 Responsive Design Implementation

**Breakpoints:**
```css
/* Desktop First Approach */
@media (max-width: 1024px) { /* Tablet Landscape */ }
@media (max-width: 768px)  { /* Tablet Portrait */ }
@media (max-width: 480px)  { /* Mobile */ }
```

**Key Responsive Features:**
- Flexible grid systems
- Mobile-first navigation
- Touch-friendly buttons
- Optimized images
- Readable typography
- Proper spacing

#### 1.5 Interactive Features

**1. Booking System:**
- Real-time time slot availability
- Dynamic price calculation
- Voucher integration
- Booking confirmation flow

**2. Search & Filter:**
- Real-time search results
- Multi-criteria filtering
- Sort options
- Pagination

**3. User Experience:**
- Loading states
- Error handling
- Success notifications
- Form validation
- Image lazy loading

**4. Animations:**
- Smooth transitions
- Hover effects
- Loading animations
- Scroll-triggered animations
- Particle effects

#### 1.6 Performance Optimization

**1. CSS Optimization:**
- CSS variables cho consistent theming
- Efficient selectors
- Minimal reflows
- Optimized animations

**2. JavaScript Optimization:**
- Event delegation
- Debounced search
- Lazy loading
- Efficient DOM manipulation

**3. Image Optimization:**
- Lazy loading
- Responsive images
- Placeholder handling
- Compression

#### 1.7 Accessibility Features

**1. Semantic HTML:**
- Proper heading hierarchy
- ARIA labels
- Alt text for images
- Form labels

**2. Keyboard Navigation:**
- Tab order
- Focus indicators
- Keyboard shortcuts
- Skip links

**3. Screen Reader Support:**
- ARIA roles
- Live regions
- Status announcements
- Descriptive text

#### 1.8 Browser Compatibility

**Supported Browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Fallbacks:**
- CSS Grid fallbacks
- JavaScript polyfills
- Feature detection
- Progressive enhancement

### 2. Owner Front-end Implementation

#### 2.1 Cấu trúc Templates (HTML)

**Owner Templates:**

**1. Dashboard (`dashboard.html`)**
```html
<!-- Hero Section -->
<section class="dashboard-hero">
    <div class="container">
        <div class="hero-content">
            <h1 class="welcome-title">Chào mừng trở lại, {{ user.name }}!</h1>
            <p class="welcome-subtitle">Quản lý sân thể thao của bạn một cách hiệu quả</p>
            <div class="current-time" id="current-time">
                <i class="fas fa-clock"></i>
                <span id="time-display"></span>
            </div>
        </div>
    </div>
</section>

<!-- Statistics Cards -->
<section class="statistics-section">
    <div class="container">
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-futbol"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number" id="total-fields">{{ total_fields }}</div>
                    <div class="stat-label">Tổng Sân</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>+2 tháng này</span>
                    </div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-calendar-check"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number" id="total-bookings">{{ total_bookings }}</div>
                    <div class="stat-label">Đặt Sân</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>+15% so với tháng trước</span>
                    </div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-money-bill-wave"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number" id="total-revenue">{{ "{:,.0f}".format(total_revenue) }} VNĐ</div>
                    <div class="stat-label">Doanh Thu</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>+8% so với tháng trước</span>
                    </div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-clock"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number" id="pending-bookings">{{ pending_bookings }}</div>
                    <div class="stat-label">Chờ Duyệt</div>
                    <div class="stat-change neutral">
                        <i class="fas fa-minus"></i>
                        <span>Không thay đổi</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Quick Actions -->
<section class="quick-actions-section">
    <div class="container">
        <h2 class="section-title">Thao Tác Nhanh</h2>
        <div class="actions-grid">
            <div class="action-card" onclick="location.href='{{ url_for('owner.add_field') }}'">
                <div class="action-icon">
                    <i class="fas fa-plus"></i>
                </div>
                <h3>Thêm Sân Mới</h3>
                <p>Tạo sân thể thao mới cho hệ thống</p>
            </div>
            
            <div class="action-card" onclick="location.href='{{ url_for('owner.booking_schedule') }}'">
                <div class="action-icon">
                    <i class="fas fa-calendar-alt"></i>
                </div>
                <h3>Duyệt Đặt Sân</h3>
                <p>Xem và duyệt các yêu cầu đặt sân</p>
            </div>
            
            <div class="action-card" onclick="location.href='{{ url_for('owner.transaction_history') }}'">
                <div class="action-icon">
                    <i class="fas fa-chart-line"></i>
                </div>
                <h3>Xem Báo Cáo</h3>
                <p>Phân tích doanh thu và hiệu suất</p>
            </div>
            
            <div class="action-card" onclick="location.href='{{ url_for('owner.notification') }}'">
                <div class="action-icon">
                    <i class="fas fa-bell"></i>
                </div>
                <h3>Thông Báo</h3>
                <p>Quản lý thông báo hệ thống</p>
            </div>
        </div>
    </div>
</section>

<!-- Revenue Chart -->
<section class="revenue-chart-section">
    <div class="container">
        <div class="chart-header">
            <h2 class="section-title">Doanh Thu Theo Thời Gian</h2>
            <div class="chart-controls">
                <button class="btn btn-outline active" data-period="week">Tuần</button>
                <button class="btn btn-outline" data-period="month">Tháng</button>
                <button class="btn btn-outline" data-period="year">Năm</button>
            </div>
        </div>
        <div class="chart-container">
            <canvas id="revenue-chart"></canvas>
        </div>
    </div>
</section>

<!-- Recent Activities -->
<section class="activities-section">
    <div class="container">
        <h2 class="section-title">Hoạt Động Gần Đây</h2>
        <div class="activities-timeline">
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas fa-calendar-plus"></i>
                </div>
                <div class="activity-content">
                    <h4>Đặt sân mới</h4>
                    <p>Sân Bóng Đá A - 15/01/2024 18:00-20:00</p>
                    <span class="activity-time">2 phút trước</span>
                </div>
            </div>
            
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="activity-content">
                    <h4>Duyệt đặt sân</h4>
                    <p>Sân Tennis Pro - 14/01/2024 16:00-18:00</p>
                    <span class="activity-time">15 phút trước</span>
                </div>
            </div>
            
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas fa-money-bill-wave"></i>
                </div>
                <div class="activity-content">
                    <h4>Thanh toán thành công</h4>
                    <p>400,000 VNĐ - Sân Bóng Rổ X</p>
                    <span class="activity-time">1 giờ trước</span>
                </div>
            </div>
            
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas fa-star"></i>
                </div>
                <div class="activity-content">
                    <h4>Đánh giá mới</h4>
                    <p>5 sao - Sân Cầu Lông Y</p>
                    <span class="activity-time">2 giờ trước</span>
                </div>
            </div>
        </div>
    </div>
</section>
```

**2. My Fields (`my_fields.html`)**
```html
- Fields overview statistics
- Field cards với status indicators
- Field management actions (edit, view bookings, toggle status)
- Field performance metrics
- Bulk operations
- Search và filtering
```

**3. Booking Schedule (`booking_schedule.html`)**
```html
- Weekly calendar view
- Time slot management
- Booking status indicators
- Drag-and-drop booking management
- Date navigation
- Legend cho different statuses
```

**4. Add Field (`add_field.html`)**
```html
- Multi-step form wizard
- Field information input
- Image upload functionality
- Pricing configuration
- Schedule setup
- Preview functionality
```

**5. Transaction History (`transaction_history.html`)**
```html
- Advanced filtering system
- Transaction details modal
- Export functionality
- Revenue analytics
- Payment status tracking
```

**6. Notifications (`notification.html`)**
```html
- Notification center
- Real-time updates
- Mark as read functionality
- Notification preferences
- Filter by type
```

**7. Profile (`profile.html`)**
```html
- Owner information management
- Business settings
- Account security
- Notification preferences
- Activity log
```

#### 2.2 CSS Implementation

**Design System:**
```css
/* Owner-specific Variables */
:root {
    --primary-dark: #1F2937;
    --primary-dark-light: #374151;
    --primary-dark-darker: #111827;
    --text-primary: #1E293B;
    --text-secondary: #64748B;
    --text-light: #94A3B8;
    --bg-primary: #F8FAFC;
    --bg-secondary: #FFFFFF;
    --shadow-light: 0 4px 15px rgba(0, 0, 0, 0.05);
    --shadow-medium: 0 8px 25px rgba(0, 0, 0, 0.1);
    --shadow-hover: 0 12px 30px rgba(0, 0, 0, 0.15);
    --border-light: #E5E7EB;
    --success: #10B981;
    --warning: #F59E0B;
    --danger: #EF4444;
}
```

**Key CSS Files:**

**1. Dashboard CSS (`dashboard.css`) - 398 lines**
- Hero section styling
- Statistics cards layout
- Quick actions grid
- Activities timeline
- Responsive breakpoints
- Hover effects và transitions

**2. My Fields CSS (`my_fields.css`) - 1022 lines**
- Field cards design
- Status indicators
- Action buttons styling
- Statistics overview
- Search và filter controls
- Modal designs
- Responsive grid layout

**3. Booking Schedule CSS (`booking_schedule.css`) - 620 lines**
- Calendar grid layout
- Time slot styling
- Booking status colors
- Navigation controls
- Legend design
- Drag-and-drop indicators
- Responsive calendar

**4. Add Field CSS (`add_field.css`) - 897 lines**
- Multi-step form wizard
- Form validation styling
- Image upload design
- Progress indicators
- Preview functionality
- Responsive form layout

**5. Transaction History CSS (`transaction_history.css`) - 721 lines**
- Data table styling
- Filter controls
- Export button design
- Modal layouts
- Status badges
- Responsive table

**6. Notifications CSS (`notification.css`) - 686 lines**
- Notification cards
- Real-time indicators
- Filter controls
- Mark as read functionality
- Responsive layout

**7. Profile CSS (`profile.css`) - 503 lines**
- Profile card design
- Form styling
- Security settings
- Activity timeline
- Responsive layout

#### 2.3 JavaScript Implementation

**Key JavaScript Files:**

**1. Dashboard JS (`dashboard.js`) - 282 lines**
```javascript
// Core Functions
function initializeDashboard() {
    initializeCharts();
    setupNavigation();
    setupRealtimeUpdates();
    updateNotificationIndicator();
    updateCurrentTime();
}

function initializeCharts() {
    const ctx = document.getElementById('revenue-chart').getContext('2d');
    
    // Sample data for revenue chart
    const revenueData = {
        week: [1200000, 1500000, 1800000, 1400000, 2000000, 1600000, 1900000],
        month: [4500000, 5200000, 4800000, 5500000, 6000000, 5800000],
        year: [50000000, 55000000, 60000000, 65000000, 70000000, 75000000]
    };
    
    const labels = {
        week: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        month: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
        year: ['2019', '2020', '2021', '2022', '2023', '2024']
    };
    
    let currentPeriod = 'week';
    let chart = null;
    
    function createChart(period) {
        if (chart) {
            chart.destroy();
        }
        
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels[period],
                datasets: [{
                    label: 'Doanh Thu (VNĐ)',
                    data: revenueData[period],
                    borderColor: '#3B82F6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return formatCurrency(value);
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Initialize with week data
    createChart('week');
    
    // Handle period changes
    document.querySelectorAll('[data-period]').forEach(button => {
        button.addEventListener('click', function() {
            const period = this.dataset.period;
            
            // Update active button
            document.querySelectorAll('[data-period]').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update chart
            createChart(period);
        });
    });
}

function setupNavigation() {
    // Sidebar toggle
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
        });
    }
    
    // Navigation highlighting
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

function setupRealtimeUpdates() {
    // Update statistics every 30 seconds
    setInterval(updateStatistics, 30000);
    
    // Update activities every minute
    setInterval(updateActivities, 60000);
}

function updateStatistics() {
    // Simulate real-time updates
    const totalBookings = document.getElementById('total-bookings');
    const pendingBookings = document.getElementById('pending-bookings');
    
    if (totalBookings) {
        const current = parseInt(totalBookings.textContent);
        totalBookings.textContent = current + Math.floor(Math.random() * 3);
    }
    
    if (pendingBookings) {
        const current = parseInt(pendingBookings.textContent);
        pendingBookings.textContent = Math.max(0, current + Math.floor(Math.random() * 2) - 1);
    }
}

function updateActivities() {
    const activitiesContainer = document.querySelector('.activities-timeline');
    if (!activitiesContainer) return;
    
    // Add new activity (simulated)
    const newActivity = document.createElement('div');
    newActivity.className = 'activity-item';
    newActivity.innerHTML = `
        <div class="activity-icon">
            <i class="fas fa-calendar-plus"></i>
        </div>
        <div class="activity-content">
            <h4>Đặt sân mới</h4>
            <p>Sân mới - ${new Date().toLocaleTimeString()}</p>
            <span class="activity-time">Vừa xong</span>
        </div>
    `;
    
    activitiesContainer.insertBefore(newActivity, activitiesContainer.firstChild);
    
    // Remove old activities if too many
    const activities = activitiesContainer.querySelectorAll('.activity-item');
    if (activities.length > 10) {
        activities[activities.length - 1].remove();
    }
}

function updateNotificationIndicator() {
    const notificationIcon = document.querySelector('.notification-icon');
    if (notificationIcon) {
        // Simulate new notifications
        const hasNewNotifications = Math.random() > 0.7;
        
        if (hasNewNotifications) {
            notificationIcon.classList.add('has-notifications');
        } else {
            notificationIcon.classList.remove('has-notifications');
        }
    }
}

function updateCurrentTime() {
    function updateTime() {
        const timeDisplay = document.getElementById('time-display');
        if (timeDisplay) {
            const now = new Date();
            timeDisplay.textContent = now.toLocaleString('vi-VN');
        }
    }
    
    updateTime();
    setInterval(updateTime, 1000);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    }).format(amount);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});
```

**2. My Fields JS (`my_fields.js`) - 1006 lines**
```javascript
// Core Functions:
- initializeFieldsManagement()
- handleFieldActions()
- toggleFieldStatus()
- editField()
- viewBookings()
- deleteField()

// Features:
- Field status management
- Bulk operations
- Search và filtering
- Modal management
- AJAX operations
- Image handling
```

**3. Booking Schedule JS (`booking_schedule.js`) - 467 lines**
```javascript
// Core Functions:
- initializeBookingSchedule()
- navigateWeek()
- goToToday()
- handleBookingClick()
- updateBookingStatus()

// Features:
- Calendar navigation
- Booking management
- Drag-and-drop functionality
- Status updates
- Real-time refresh
```

**4. Add Field JS (`add_field.js`) - 828 lines**
```javascript
// Core Functions:
- initializeAddField()
- handleFormSteps()
- uploadImages()
- validateForm()
- submitField()

// Features:
- Multi-step form wizard
- Image upload với preview
- Form validation
- Progress tracking
- AJAX submission
```

**5. Transaction History JS (`transaction_history.js`) - 470 lines**
```javascript
// Core Functions:
- initializeTransactionHistory()
- applyFilters()
- exportData()
- viewTransactionDetails()
- updateStatus()

// Features:
- Advanced filtering
- Data export
- Modal management
- Status updates
- Search functionality
```

**6. Notifications JS (`notification.js`) - 399 lines**
```javascript
// Core Functions:
- initializeNotifications()
- markAsRead()
- filterNotifications()
- updatePreferences()
- handleRealTimeUpdates()

// Features:
- Real-time notifications
- Mark as read functionality
- Filter controls
- Preferences management
- WebSocket integration
```

**7. Profile JS (`profile.js`) - 596 lines**
```javascript
// Core Functions:
- initializeProfile()
- updateProfile()
- changePassword()
- updatePreferences()
- uploadAvatar()

// Features:
- Form validation
- Image upload
- Security settings
- Activity tracking
- AJAX operations
```

#### 2.4 Dashboard Analytics Implementation

**1. Revenue Charts:**
- Line chart cho doanh thu theo thời gian
- Bar chart cho số lượng booking
- Pie chart cho phân bố môn thể thao
- Real-time data updates

**2. Statistics Cards:**
- Total fields count
- Total bookings
- Monthly revenue
- Pending approvals
- Real-time counters

**3. Quick Actions:**
- Add new field
- Approve bookings
- View reports
- Check notifications

#### 2.5 Field Management Features

**1. Field Operations:**
- Add new field với multi-step form
- Edit field information
- Toggle field status
- Delete field với confirmation
- Bulk operations

**2. Field Analytics:**
- Booking statistics
- Revenue tracking
- Performance metrics
- Utilization rates

**3. Image Management:**
- Multiple image upload
- Image preview
- Image cropping
- Gallery management

#### 2.6 Booking Management Features

**1. Schedule View:**
- Weekly calendar layout
- Time slot management
- Booking status indicators
- Drag-and-drop functionality

**2. Booking Operations:**
- Approve/reject bookings
- Modify booking details
- Cancel bookings
- Send notifications

**3. Real-time Updates:**
- Live booking notifications
- Status changes
- Revenue updates
- Activity feed

#### 2.7 Responsive Design Implementation

**Breakpoints:**
```css
/* Desktop First Approach */
@media (max-width: 1024px) { /* Tablet Landscape */ }
@media (max-width: 768px)  { /* Tablet Portrait */ }
@media (max-width: 480px)  { /* Mobile */ }
```

**Key Responsive Features:**
- Flexible dashboard layout
- Mobile-optimized calendar
- Touch-friendly controls
- Collapsible navigation
- Optimized forms

#### 2.8 Performance Optimization

**1. Data Loading:**
- Lazy loading cho field images
- Pagination cho transaction history
- Debounced search
- Cached chart data

**2. Real-time Updates:**
- WebSocket integration
- Efficient DOM updates
- Optimized AJAX calls
- Background sync

**3. Image Optimization:**
- Compressed uploads
- Responsive images
- Lazy loading
- CDN integration

#### 2.9 Security Features

**1. Form Validation:**
- Client-side validation
- Server-side verification
- CSRF protection
- Input sanitization

**2. Access Control:**
- Role-based permissions
- Session management
- Secure file uploads
- API authentication

**3. Data Protection:**
- Encrypted storage
- Secure transmission
- Audit logging
- Backup systems

### 3. Admin Front-end Implementation

#### 3.1 Cấu trúc Templates (HTML)

**Admin Templates:**

**1. Dashboard (`dashboard.html`)**
```html
<!-- System Overview -->
<section class="system-overview">
    <div class="container">
        <div class="overview-header">
            <h1 class="page-title">Tổng Quan Hệ Thống</h1>
            <div class="current-time" id="current-time">
                <i class="fas fa-clock"></i>
                <span id="time-display"></span>
            </div>
        </div>
        
        <!-- System Health Status -->
        <div class="system-health">
            <div class="health-indicator">
                <div class="health-icon">
                    <i class="fas fa-server"></i>
                </div>
                <div class="health-info">
                    <h3>Trạng Thái Hệ Thống</h3>
                    <div class="health-status online">
                        <span class="status-dot"></span>
                        <span>Hoạt động bình thường</span>
                    </div>
                </div>
            </div>
            
            <div class="health-metrics">
                <div class="metric-item">
                    <span class="metric-label">CPU Usage</span>
                    <div class="metric-bar">
                        <div class="metric-fill" style="width: 45%"></div>
                    </div>
                    <span class="metric-value">45%</span>
                </div>
                <div class="metric-item">
                    <span class="metric-label">Memory Usage</span>
                    <div class="metric-bar">
                        <div class="metric-fill" style="width: 62%"></div>
                    </div>
                    <span class="metric-value">62%</span>
                </div>
                <div class="metric-item">
                    <span class="metric-label">Disk Usage</span>
                    <div class="metric-bar">
                        <div class="metric-fill" style="width: 78%"></div>
                    </div>
                    <span class="metric-value">78%</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Statistics Cards -->
<section class="statistics-section">
    <div class="container">
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-users"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number" id="total-users">{{ total_users }}</div>
                    <div class="stat-label">Tổng Người Dùng</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>+12% tháng này</span>
                    </div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-building"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number" id="total-owners">{{ total_owners }}</div>
                    <div class="stat-label">Chủ Sân</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>+5% tháng này</span>
                    </div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-futbol"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number" id="total-fields">{{ total_fields }}</div>
                    <div class="stat-label">Sân Thể Thao</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>+8% tháng này</span>
                    </div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-calendar-check"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number" id="total-bookings">{{ total_bookings }}</div>
                    <div class="stat-label">Lượt Đặt Sân</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>+15% tháng này</span>
                    </div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-money-bill-wave"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number" id="total-revenue">{{ "{:,.0f}".format(total_revenue) }} VNĐ</div>
                    <div class="stat-label">Tổng Doanh Thu</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>+20% tháng này</span>
                    </div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-chart-line"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number" id="growth-rate">+18%</div>
                    <div class="stat-label">Tốc Độ Tăng Trưởng</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>So với tháng trước</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Revenue Analytics -->
<section class="revenue-analytics">
    <div class="container">
        <div class="analytics-header">
            <h2 class="section-title">Phân Tích Doanh Thu</h2>
            <div class="chart-controls">
                <button class="btn btn-outline active" data-period="month">Tháng</button>
                <button class="btn btn-outline" data-period="quarter">Quý</button>
                <button class="btn btn-outline" data-period="year">Năm</button>
            </div>
        </div>
        
        <div class="charts-grid">
            <div class="chart-container">
                <h3>Doanh Thu Theo Thời Gian</h3>
                <canvas id="revenue-chart"></canvas>
            </div>
            
            <div class="chart-container">
                <h3>Phân Bố Theo Loại Sân</h3>
                <canvas id="field-type-chart"></canvas>
            </div>
        </div>
    </div>
</section>

<!-- Quick Actions -->
<section class="quick-actions-section">
    <div class="container">
        <h2 class="section-title">Thao Tác Nhanh</h2>
        <div class="actions-grid">
            <div class="action-card" onclick="location.href='{{ url_for('admin.user_management') }}'">
                <div class="action-icon">
                    <i class="fas fa-user-cog"></i>
                </div>
                <h3>Quản Lý Người Dùng</h3>
                <p>Xem và quản lý tất cả người dùng hệ thống</p>
            </div>
            
            <div class="action-card" onclick="location.href='{{ url_for('admin.field_management') }}'">
                <div class="action-icon">
                    <i class="fas fa-futbol"></i>
                </div>
                <h3>Quản Lý Sân</h3>
                <p>Giám sát và quản lý tất cả sân thể thao</p>
            </div>
            
            <div class="action-card" onclick="location.href='{{ url_for('admin.voucher_management') }}'">
                <div class="action-icon">
                    <i class="fas fa-ticket-alt"></i>
                </div>
                <h3>Quản Lý Voucher</h3>
                <p>Tạo và quản lý voucher khuyến mãi</p>
            </div>
            
            <div class="action-card" onclick="location.href='{{ url_for('admin.system_setting') }}'">
                <div class="action-icon">
                    <i class="fas fa-cog"></i>
                </div>
                <h3>Cài Đặt Hệ Thống</h3>
                <p>Cấu hình và bảo trì hệ thống</p>
            </div>
        </div>
    </div>
</section>

<!-- Recent Activities & Alerts -->
<section class="activities-alerts-section">
    <div class="container">
        <div class="activities-alerts-grid">
            <!-- Recent Activities -->
            <div class="activities-panel">
                <h3 class="panel-title">Hoạt Động Gần Đây</h3>
                <div class="activities-list">
                    <div class="activity-item">
                        <div class="activity-icon">
                            <i class="fas fa-user-plus"></i>
                        </div>
                        <div class="activity-content">
                            <h4>Người dùng mới đăng ký</h4>
                            <p>Nguyễn Văn A - Khách hàng</p>
                            <span class="activity-time">2 phút trước</span>
                        </div>
                    </div>
                    
                    <div class="activity-item">
                        <div class="activity-icon">
                            <i class="fas fa-futbol"></i>
                        </div>
                        <div class="activity-content">
                            <h4>Sân mới được thêm</h4>
                            <p>Sân Bóng Đá XYZ - Chủ sân: Trần Thị B</p>
                            <span class="activity-time">15 phút trước</span>
                        </div>
                    </div>
                    
                    <div class="activity-item">
                        <div class="activity-icon">
                            <i class="fas fa-money-bill-wave"></i>
                        </div>
                        <div class="activity-content">
                            <h4>Giao dịch lớn</h4>
                            <p>2,500,000 VNĐ - Sân Tennis Pro</p>
                            <span class="activity-time">1 giờ trước</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- System Alerts -->
            <div class="alerts-panel">
                <h3 class="panel-title">Cảnh Báo Hệ Thống</h3>
                <div class="alerts-list">
                    <div class="alert-item warning">
                        <div class="alert-icon">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <div class="alert-content">
                            <h4>Disk Usage High</h4>
                            <p>Disk usage đã đạt 78% - Cần dọn dẹp</p>
                            <span class="alert-time">30 phút trước</span>
                        </div>
                    </div>
                    
                    <div class="alert-item info">
                        <div class="alert-icon">
                            <i class="fas fa-info-circle"></i>
                        </div>
                        <div class="alert-content">
                            <h4>Backup Completed</h4>
                            <p>Backup dữ liệu hàng ngày đã hoàn thành</p>
                            <span class="alert-time">2 giờ trước</span>
                        </div>
                    </div>
                    
                    <div class="alert-item success">
                        <div class="alert-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="alert-content">
                            <h4>System Update</h4>
                            <p>Cập nhật hệ thống đã hoàn thành thành công</p>
                            <span class="alert-time">4 giờ trước</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Top Performers -->
<section class="top-performers-section">
    <div class="container">
        <h2 class="section-title">Top Thành Viên</h2>
        <div class="performers-grid">
            <div class="performer-card">
                <h3>Top Chủ Sân</h3>
                <div class="performer-list">
                    <div class="performer-item">
                        <div class="performer-rank">1</div>
                        <div class="performer-info">
                            <h4>Trần Văn C</h4>
                            <p>15 sân - 2,500,000 VNĐ/tháng</p>
                        </div>
                    </div>
                    <div class="performer-item">
                        <div class="performer-rank">2</div>
                        <div class="performer-info">
                            <h4>Lê Thị D</h4>
                            <p>12 sân - 2,100,000 VNĐ/tháng</p>
                        </div>
                    </div>
                    <div class="performer-item">
                        <div class="performer-rank">3</div>
                        <div class="performer-info">
                            <h4>Nguyễn Văn E</h4>
                            <p>10 sân - 1,800,000 VNĐ/tháng</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="performer-card">
                <h3>Top Khách Hàng</h3>
                <div class="performer-list">
                    <div class="performer-item">
                        <div class="performer-rank">1</div>
                        <div class="performer-info">
                            <h4>Phạm Văn F</h4>
                            <p>25 lượt đặt - 1,200,000 VNĐ/tháng</p>
                        </div>
                    </div>
                    <div class="performer-item">
                        <div class="performer-rank">2</div>
                        <div class="performer-info">
                            <h4>Hoàng Thị G</h4>
                            <p>20 lượt đặt - 980,000 VNĐ/tháng</p>
                        </div>
                    </div>
                    <div class="performer-item">
                        <div class="performer-rank">3</div>
                        <div class="performer-info">
                            <h4>Vũ Văn H</h4>
                            <p>18 lượt đặt - 850,000 VNĐ/tháng</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

**2. User Management (`user_management.html`)**
```html
- Advanced user filtering (role, status, search)
- User statistics overview
- User table với detailed information
- User detail modal
- Bulk operations (suspend, activate)
- User activity tracking
```

**3. Field Management (`field_management.html`)**
```html
- Field overview statistics
- Field listing với status indicators
- Field approval workflow
- Field performance metrics
- Bulk field operations
- Field detail modal
```

**4. Booking Management (`booking_management.html`)**
```html
- Booking statistics overview
- Booking table với filters
- Booking approval workflow
- Booking detail modal
- Revenue tracking
- Booking analytics
```

**5. Transaction Management (`transaction_history.html`)**
```html
- Transaction overview statistics
- Transaction table với filters
- Payment status tracking
- Revenue analytics
- Export functionality
- Transaction detail modal
```

**6. Voucher Management (`voucher_management.html`)**
```html
- Voucher creation form
- Voucher listing với status
- Voucher usage analytics
- Bulk voucher operations
- Voucher detail modal
```

**7. Notification System (`notification.html`)**
```html
- System notifications center
- Notification creation form
- Notification history
- User notification preferences
- Bulk notification sending
```

**8. System Settings (`system_setting.html`)**
```html
- System configuration forms
- Security settings
- Email configuration
- Payment gateway settings
- System maintenance tools
```

**9. Activity Log (`activity_log.html`)**
```html
- System activity timeline
- User activity tracking
- Error logging
- Security audit trail
- Log filtering và search
```

#### 3.2 CSS Implementation

**Design System:**
```css
/* Admin-specific Variables */
:root {
    --admin-primary: #1e3a8a;
    --admin-secondary: #3b82f6;
    --admin-success: #10b981;
    --admin-warning: #f59e0b;
    --admin-danger: #ef4444;
    --admin-info: #06b6d4;
    --admin-dark: #1e293b;
    --admin-light: #f8fafc;
    --admin-border: #e2e8f0;
    --admin-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    --admin-shadow-hover: 0 4px 20px rgba(0, 0, 0, 0.1);
}
```

**Key CSS Files:**

**1. Dashboard CSS (`dashboard.css`) - 712 lines**
- Dashboard layout với grid system
- Statistics cards design
- Chart containers styling
- Activity feed layout
- Alert system design
- Responsive breakpoints
- System health indicators

**2. User Management CSS (`user_management.css`) - 214 lines**
- User table styling
- Filter controls design
- User detail modal
- Status indicators
- Action buttons
- Responsive table layout

**3. Field Management CSS (`field_management.css`) - 224 lines**
- Field cards design
- Approval workflow styling
- Performance metrics
- Bulk operations
- Field detail modal
- Status indicators

**4. Booking Management CSS (`booking_management.css`) - 238 lines**
- Booking table styling
- Approval workflow
- Revenue tracking
- Booking analytics
- Detail modal design
- Status badges

**5. Transaction Management CSS (`transaction_management.css`) - 205 lines**
- Transaction table design
- Revenue analytics
- Export functionality
- Payment status indicators
- Detail modal styling

**6. Voucher Management CSS (`voucher_management.css`) - 241 lines**
- Voucher creation form
- Voucher listing design
- Usage analytics
- Bulk operations
- Status indicators

**7. Notification CSS (`notification.css`) - 220 lines**
- Notification center design
- Creation form styling
- History layout
- Preferences management
- Bulk sending interface

**8. System Setting CSS (`system_setting.css`) - 119 lines**
- Configuration forms
- Security settings
- Maintenance tools
- System status indicators

**9. Activity Log CSS (`activity_log.css`) - 154 lines**
- Activity timeline design
- Log filtering
- Search functionality
- Audit trail styling

#### 3.3 JavaScript Implementation

**Key JavaScript Files:**

**1. Dashboard JS (`dashboard.js`) - 426 lines**
```javascript
// Core Functions
function initializeAdminDashboard() {
    updateCurrentTime();
    initializeRevenueChart();
    initializeChartFilters();
    initializePerformerFilters();
    initializeAlertActions();
    initializeSystemHealth();
    setupRealtimeUpdates();
}

function updateCurrentTime() {
    function updateTime() {
        const timeDisplay = document.getElementById('time-display');
        if (timeDisplay) {
            const now = new Date();
            timeDisplay.textContent = now.toLocaleString('vi-VN');
        }
    }
    
    updateTime();
    setInterval(updateTime, 1000);
}

function initializeRevenueChart() {
    const ctx = document.getElementById('revenue-chart').getContext('2d');
    
    // Sample data for different periods
    const revenueData = {
        month: [45000000, 52000000, 48000000, 55000000, 60000000, 58000000],
        quarter: [150000000, 180000000, 200000000, 220000000],
        year: [500000000, 550000000, 600000000, 650000000, 700000000, 750000000]
    };
    
    const labels = {
        month: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
        quarter: ['Q1', 'Q2', 'Q3', 'Q4'],
        year: ['2019', '2020', '2021', '2022', '2023', '2024']
    };
    
    let currentPeriod = 'month';
    let chart = null;
    
    function createChart(period) {
        if (chart) {
            chart.destroy();
        }
        
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels[period],
                datasets: [{
                    label: 'Doanh Thu (VNĐ)',
                    data: revenueData[period],
                    borderColor: '#1e3a8a',
                    backgroundColor: 'rgba(30, 58, 138, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return formatCurrency(value);
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Initialize with month data
    createChart('month');
    
    // Handle period changes
    document.querySelectorAll('[data-period]').forEach(button => {
        button.addEventListener('click', function() {
            const period = this.dataset.period;
            
            // Update active button
            document.querySelectorAll('[data-period]').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update chart
            createChart(period);
        });
    });
}

function initializeFieldTypeChart() {
    const ctx = document.getElementById('field-type-chart').getContext('2d');
    
    const fieldTypeChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Bóng đá', 'Bóng rổ', 'Tennis', 'Cầu lông', 'Bóng chuyền'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    '#3B82F6',
                    '#10B981',
                    '#F59E0B',
                    '#EF4444',
                    '#8B5CF6'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function initializeChartFilters() {
    // Revenue chart period filters
    document.querySelectorAll('.chart-controls button').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.chart-controls button').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update chart data based on selected period
            updateChartData(this.dataset.period);
        });
    });
}

function initializePerformerFilters() {
    // Top performers filter buttons
    document.querySelectorAll('.performer-filter button').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.performer-filter button').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update performers list
            updatePerformersList(this.dataset.type);
        });
    });
}

function initializeAlertActions() {
    // Alert action buttons
    document.querySelectorAll('.alert-action').forEach(button => {
        button.addEventListener('click', function() {
            const alertId = this.dataset.alertId;
            const action = this.dataset.action;
            
            handleAlertAction(alertId, action);
        });
    });
}

function initializeSystemHealth() {
    // Update system health metrics
    function updateHealthMetrics() {
        const cpuUsage = Math.floor(Math.random() * 30) + 40; // 40-70%
        const memoryUsage = Math.floor(Math.random() * 20) + 55; // 55-75%
        const diskUsage = Math.floor(Math.random() * 15) + 70; // 70-85%
        
        // Update CPU usage
        const cpuBar = document.querySelector('.metric-item:nth-child(1) .metric-fill');
        const cpuValue = document.querySelector('.metric-item:nth-child(1) .metric-value');
        if (cpuBar && cpuValue) {
            cpuBar.style.width = cpuUsage + '%';
            cpuValue.textContent = cpuUsage + '%';
        }
        
        // Update Memory usage
        const memoryBar = document.querySelector('.metric-item:nth-child(2) .metric-fill');
        const memoryValue = document.querySelector('.metric-item:nth-child(2) .metric-value');
        if (memoryBar && memoryValue) {
            memoryBar.style.width = memoryUsage + '%';
            memoryValue.textContent = memoryUsage + '%';
        }
        
        // Update Disk usage
        const diskBar = document.querySelector('.metric-item:nth-child(3) .metric-fill');
        const diskValue = document.querySelector('.metric-item:nth-child(3) .metric-value');
        if (diskBar && diskValue) {
            diskBar.style.width = diskUsage + '%';
            diskValue.textContent = diskUsage + '%';
        }
        
        // Update system status
        updateSystemStatus(cpuUsage, memoryUsage, diskUsage);
    }
    
    updateHealthMetrics();
    setInterval(updateHealthMetrics, 30000); // Update every 30 seconds
}

function updateSystemStatus(cpu, memory, disk) {
    const statusElement = document.querySelector('.health-status');
    const statusText = document.querySelector('.health-status span:last-child');
    
    if (cpu > 80 || memory > 85 || disk > 90) {
        statusElement.className = 'health-status critical';
        statusText.textContent = 'Cần chú ý';
    } else if (cpu > 60 || memory > 70 || disk > 80) {
        statusElement.className = 'health-status warning';
        statusText.textContent = 'Hoạt động bình thường';
    } else {
        statusElement.className = 'health-status online';
        statusText.textContent = 'Hoạt động tốt';
    }
}

function setupRealtimeUpdates() {
    // Update statistics every 30 seconds
    setInterval(updateStatistics, 30000);
    
    // Update activities every minute
    setInterval(updateActivities, 60000);
    
    // Check for new alerts every 2 minutes
    setInterval(checkNewAlerts, 120000);
}

function updateStatistics() {
    // Simulate real-time updates for statistics
    const statElements = document.querySelectorAll('.stat-number');
    
    statElements.forEach(element => {
        const currentValue = parseInt(element.textContent.replace(/[^\d]/g, ''));
        const change = Math.floor(Math.random() * 5) + 1; // 1-5% change
        
        if (element.id === 'growth-rate') {
            element.textContent = '+' + change + '%';
        } else {
            element.textContent = formatNumber(currentValue + Math.floor(currentValue * change / 100));
        }
    });
}

function updateActivities() {
    const activitiesContainer = document.querySelector('.activities-list');
    if (!activitiesContainer) return;
    
    // Add new activity (simulated)
    const activities = [
        {
            icon: 'fas fa-user-plus',
            title: 'Người dùng mới đăng ký',
            description: 'Nguyễn Văn X - Khách hàng',
            time: 'Vừa xong'
        },
        {
            icon: 'fas fa-futbol',
            title: 'Sân mới được thêm',
            description: 'Sân Bóng Đá ABC - Chủ sân: Trần Thị Y',
            time: 'Vừa xong'
        },
        {
            icon: 'fas fa-money-bill-wave',
            title: 'Giao dịch lớn',
            description: '3,200,000 VNĐ - Sân Tennis Elite',
            time: 'Vừa xong'
        }
    ];
    
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    
    const newActivity = document.createElement('div');
    newActivity.className = 'activity-item';
    newActivity.innerHTML = `
        <div class="activity-icon">
            <i class="${randomActivity.icon}"></i>
        </div>
        <div class="activity-content">
            <h4>${randomActivity.title}</h4>
            <p>${randomActivity.description}</p>
            <span class="activity-time">${randomActivity.time}</span>
        </div>
    `;
    
    activitiesContainer.insertBefore(newActivity, activitiesContainer.firstChild);
    
    // Remove old activities if too many
    const activityItems = activitiesContainer.querySelectorAll('.activity-item');
    if (activityItems.length > 10) {
        activityItems[activityItems.length - 1].remove();
    }
}

function checkNewAlerts() {
    // Simulate new system alerts
    const alertsContainer = document.querySelector('.alerts-list');
    if (!alertsContainer) return;
    
    const alertTypes = [
        {
            type: 'warning',
            icon: 'fas fa-exclamation-triangle',
            title: 'High Memory Usage',
            description: 'Memory usage đã đạt 85% - Cần tối ưu',
            time: 'Vừa xong'
        },
        {
            type: 'info',
            icon: 'fas fa-info-circle',
            title: 'Database Backup',
            description: 'Backup cơ sở dữ liệu đã hoàn thành',
            time: 'Vừa xong'
        },
        {
            type: 'success',
            icon: 'fas fa-check-circle',
            title: 'Security Scan',
            description: 'Quét bảo mật đã hoàn thành - Không có vấn đề',
            time: 'Vừa xong'
        }
    ];
    
    // Randomly add new alert (30% chance)
    if (Math.random() < 0.3) {
        const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        
        const newAlert = document.createElement('div');
        newAlert.className = `alert-item ${randomAlert.type}`;
        newAlert.innerHTML = `
            <div class="alert-icon">
                <i class="${randomAlert.icon}"></i>
            </div>
            <div class="alert-content">
                <h4>${randomAlert.title}</h4>
                <p>${randomAlert.description}</p>
                <span class="alert-time">${randomAlert.time}</span>
            </div>
        `;
        
        alertsContainer.insertBefore(newAlert, alertsContainer.firstChild);
        
        // Remove old alerts if too many
        const alertItems = alertsContainer.querySelectorAll('.alert-item');
        if (alertItems.length > 8) {
            alertItems[alertItems.length - 1].remove();
        }
    }
}

function handleAlertAction(alertId, action) {
    // Handle alert actions (dismiss, resolve, etc.)
    console.log(`Handling alert ${alertId} with action ${action}`);
    
    // Remove alert from DOM
    const alertElement = document.querySelector(`[data-alert-id="${alertId}"]`);
    if (alertElement) {
        alertElement.remove();
    }
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    }).format(amount);
}

function formatNumber(number) {
    return new Intl.NumberFormat('vi-VN').format(number);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminDashboard();
});
```

**2. User Management JS (`user_management.js`) - 122 lines**
```javascript
// Core Functions:
- initializeUserManagement()
- handleUserActions()
- showUserDetail()
- suspendUser()
- activateUser()
- searchUsers()

// Features:
- User status management
- Detail modal handling
- Search và filtering
- Bulk operations
- AJAX operations
```

**3. Field Management JS (`field_management.js`) - 83 lines**
```javascript
// Core Functions:
- initializeFieldManagement()
- handleFieldActions()
- approveField()
- rejectField()
- showFieldDetail()

// Features:
- Field approval workflow
- Status management
- Detail modal
- Bulk operations
```

**4. Booking Management JS (`booking_management.js`) - 143 lines**
```javascript
// Core Functions:
- initializeBookingManagement()
- handleBookingActions()
- approveBooking()
- rejectBooking()
- showBookingDetail()

// Features:
- Booking approval workflow
- Revenue tracking
- Analytics display
- Detail modal
- Status updates
```

**5. Transaction Management JS (`transaction_management.js`) - 67 lines**
```javascript
// Core Functions:
- initializeTransactionManagement()
- exportTransactions()
- showTransactionDetail()
- updatePaymentStatus()

// Features:
- Data export
- Payment tracking
- Revenue analytics
- Detail modal
```

**6. Voucher Management JS (`voucher_management.js`) - 176 lines**
```javascript
// Core Functions:
- initializeVoucherManagement()
- createVoucher()
- editVoucher()
- deleteVoucher()
- showVoucherDetail()

// Features:
- Voucher CRUD operations
- Usage analytics
- Bulk operations
- Detail modal
- Form validation
```

**7. Notification JS (`notification.js`) - 83 lines**
```javascript
// Core Functions:
- initializeNotifications()
- createNotification()
- sendBulkNotifications()
- showNotificationHistory()

// Features:
- Notification creation
- Bulk sending
- History tracking
- User preferences
```

**8. System Setting JS (`system_setting.js`) - 67 lines**
```javascript
// Core Functions:
- initializeSystemSettings()
- saveSettings()
- testEmailConfiguration()
- performMaintenance()

// Features:
- Configuration management
- Email testing
- System maintenance
- Security settings
```

**9. Activity Log JS (`activity_log.js`) - 61 lines**
```javascript
// Core Functions:
- initializeActivityLog()
- filterLogs()
- searchLogs()
- exportLogs()

// Features:
- Log filtering
- Search functionality
- Export capabilities
- Real-time updates
```

#### 3.4 Dashboard Analytics Implementation

**1. Revenue Analytics:**
- Monthly/Quarterly/Yearly revenue charts
- Revenue growth tracking
- Revenue breakdown by field type
- Revenue forecasting

**2. System Statistics:**
- Total users, owners, fields, bookings
- Growth percentages
- System health metrics
- Performance indicators

**3. Real-time Monitoring:**
- System status indicators
- Current time display
- Live activity feed
- Alert notifications

#### 3.5 Administrative Features

**1. User Management:**
- User search và filtering
- User status management
- User activity tracking
- Bulk user operations
- User detail views

**2. Field Management:**
- Field approval workflow
- Field performance tracking
- Field status management
- Field analytics
- Bulk field operations

**3. Booking Management:**
- Booking approval workflow
- Revenue tracking
- Booking analytics
- Status management
- Detail views

**4. Transaction Management:**
- Payment tracking
- Revenue analytics
- Export functionality
- Status updates
- Detail views

**5. Voucher Management:**
- Voucher creation
- Usage analytics
- Bulk operations
- Status management
- Detail views

#### 3.6 System Administration Features

**1. Notification System:**
- System-wide notifications
- User-specific notifications
- Bulk notification sending
- Notification history
- User preferences

**2. System Settings:**
- Configuration management
- Security settings
- Email configuration
- Payment gateway settings
- System maintenance

**3. Activity Logging:**
- System activity tracking
- User activity monitoring
- Error logging
- Security audit trail
- Log filtering và search

#### 3.7 Security Features

**1. Access Control:**
- Role-based permissions
- Admin authentication
- Session management
- IP whitelisting
- Two-factor authentication

**2. Audit Trail:**
- User action logging
- System change tracking
- Security event monitoring
- Compliance reporting
- Data integrity checks

**3. Data Protection:**
- Encrypted data storage
- Secure data transmission
- Backup systems
- Data retention policies
- Privacy compliance

#### 3.8 Performance Optimization

**1. Dashboard Performance:**
- Lazy loading cho charts
- Cached statistics
- Optimized queries
- Real-time updates
- Efficient rendering

**2. Data Management:**
- Pagination cho large datasets
- Efficient filtering
- Optimized search
- Cached results
- Background processing

**3. System Monitoring:**
- Performance metrics
- Resource usage tracking
- Error monitoring
- Health checks
- Alert systems

#### 3.9 Responsive Design Implementation

**Breakpoints:**
```css
/* Desktop First Approach */
@media (max-width: 1200px) { /* Large Tablet */ }
@media (max-width: 768px)  { /* Tablet Portrait */ }
@media (max-width: 480px)  { /* Mobile */ }
```

**Key Responsive Features:**
- Flexible dashboard layout
- Mobile-optimized tables
- Touch-friendly controls
- Collapsible navigation
- Optimized forms
- Responsive charts

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

## 👨‍💻 Thành viên & Phân công công việc

### 1. [Hồ Du Tuấn Đạt_2374802010097](https://github.com/Hodutuandat) (Leader)
- **Lên ý tưởng hệ thống:**
  - Đề xuất mô hình hoạt động tổng thể của hệ thống đặt sân thể thao trực tuyến.
  - Xây dựng các flow nghiệp vụ chính: đăng nhập, đặt sân, quản lý sân, quản trị hệ thống.
  - Phân tích các vai trò (Customer, Owner, Admin) và xác định chức năng cho từng vai trò.
- **Setup cấu trúc dự án:**
  - Khởi tạo repository, thiết lập cấu trúc thư mục chuẩn cho Flask (app, routes, models, templates, static...).
  - Tạo các blueprint cho từng module (auth, customer, owner, admin, common).
  - Thiết lập các file cấu hình (`config.py`, `.env`), tích hợp Flask-Login, Flask-Mail.
  - Xây dựng các mock data và flow mẫu cho phát triển nhanh.
- **Cấu trúc lại toàn bộ front-end:**
  - Chuẩn hóa lại các template HTML theo từng vai trò, sử dụng Jinja2 inheritance (`base.html`, `shared/navbar.html`, `footer.html`...).
  - Thiết kế lại hệ thống CSS: tách riêng từng file cho từng module, xây dựng file theme.css dùng biến màu toàn cục.
  - Đảm bảo responsive, tối ưu trải nghiệm người dùng trên desktop và mobile.
  - Tích hợp logo, favicon, đồng bộ hóa giao diện theo màu chủ đạo trắng-xám-đen.
  - Review, refactor và tối ưu code front-end cho các thành viên khác.

---

### 2. [Nguyễn Minh Chính_2275106050051](https://github.com/F4ol4n)
- **Liên kết backend với MongoDB:**
  - Nghiên cứu, lựa chọn thư viện phù hợp (PyMongo hoặc Flask-PyMongo) để kết nối Flask với MongoDB.
  - Thiết lập cấu hình kết nối database trong `config.py` và `.env`.
  - Thiết kế các schema cho các collection: users, fields, bookings, transactions, vouchers...
  - Refactor các route backend để thao tác dữ liệu thực tế với MongoDB thay cho mock data (CRUD cho sân, booking, user...).
  - Xây dựng các hàm truy vấn, filter, phân trang dữ liệu lớn.
  - Đảm bảo bảo mật thông tin người dùng, mã hóa password, kiểm soát quyền truy cập.
  - Viết tài liệu hướng dẫn cài đặt MongoDB local và deploy cloud (MongoDB Atlas).

---

### 3. [Nguyễn Thị Phương Nhung_2374802013554](https://github.com/NguyenThiPhuongNhung2005)
- **Thiết kế giao diện Customer:**
  - Phân tích nghiệp vụ và xây dựng wireframe cho các trang dành cho khách hàng: Trang chủ, Danh sách sân, Chi tiết sân, Đặt sân, Lịch sử đặt sân, Quản lý voucher, Giao dịch, Hồ sơ cá nhân.
  - Thiết kế giao diện HTML/CSS cho từng trang, đảm bảo đồng bộ với theme chung.
  - Sử dụng Bootstrap 5 và custom CSS để tối ưu trải nghiệm người dùng, hỗ trợ responsive.
  - Tích hợp các component động: modal đặt sân, filter tìm kiếm, hiển thị lịch booking.
  - Kết nối front-end với backend qua Flask template, truyền dữ liệu động từ server.
  - Kiểm thử giao diện trên nhiều thiết bị, trình duyệt, tối ưu hiệu năng và accessibility.
  - Viết hướng dẫn sử dụng giao diện cho khách hàng.

---

### 4. [Lê Quang Minh_2374802010310](https://github.com/leminh05)
- **Thiết kế giao diện Owner:**
  - Phân tích nghiệp vụ dành cho chủ sân: Dashboard, Quản lý sân, Thêm/sửa/xóa sân, Lịch đặt sân, Duyệt booking, Thống kê doanh thu, Thông báo, Giao dịch, Hồ sơ cá nhân.
  - Thiết kế layout dashboard trực quan, hiển thị các chỉ số quan trọng (doanh thu, số booking, trạng thái sân...).
  - Xây dựng các form nhập liệu, bảng dữ liệu, modal xác nhận, filter nâng cao cho quản lý sân và booking.
  - Đảm bảo giao diện dễ sử dụng, thao tác nhanh, hỗ trợ responsive trên mobile/tablet.
  - Tích hợp các thông báo realtime (nếu có), hiển thị trạng thái booking, cập nhật trạng thái sân.
  - Kết nối dữ liệu động từ backend, kiểm thử các luồng thao tác của chủ sân.
  - Viết tài liệu hướng dẫn sử dụng giao diện Owner.

---

## Liên hệ

- **Email**: support@sportslot.vn
- **Website**: https://sportslot.vn
- **Hotline**: 1900-xxxx

---

**SportSlot** - Hệ thống đặt sân thể thao thông minh, kết nối người chơi với sân thể thao chất lượng!



---- test