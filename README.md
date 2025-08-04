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

## Chi tiết Back-end Implementation với Flask

### 1. Kiến trúc Back-end

#### 1.1 Cấu trúc ứng dụng Flask

**Application Factory Pattern:**
```python
# app/__init__.py
from flask import Flask
from flask_login import LoginManager
from flask_mail import Mail
from .config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'
    
    mail = Mail()
    mail.init_app(app)
    
    # Register blueprints
    from .routes import auth, customer, owner, admin, common
    app.register_blueprint(auth.bp)
    app.register_blueprint(customer.bp)
    app.register_blueprint(owner.bp)
    app.register_blueprint(admin.bp)
    app.register_blueprint(common.bp)
    
    return app
```

**Blueprint Structure:**
```
app/routes/
├── __init__.py
├── auth.py          # Authentication routes
├── customer.py      # Customer-specific routes
├── owner.py         # Owner-specific routes
├── admin.py         # Admin-specific routes
├── common.py        # Common/shared routes
└── api/            # REST API endpoints
    ├── auth.py
    ├── customer.py
    └── owner.py
```

#### 1.2 Configuration Management

**Environment-based Configuration:**
```python
# app/config.py
import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    
    # Database configuration
    DATABASE_URL = os.environ.get('DATABASE_URL') or 'sqlite:///sportslot.db'
    
    # Email configuration
    MAIL_SERVER = os.environ.get('MAIL_SERVER') or 'smtp.gmail.com'
    MAIL_PORT = int(os.environ.get('MAIL_PORT') or 587)
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS', 'true').lower() in ['true', 'on', '1']
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = os.environ.get('MAIL_DEFAULT_SENDER')
    
    # Session configuration
    PERMANENT_SESSION_LIFETIME = timedelta(days=7)
    
    # File upload configuration
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    UPLOAD_FOLDER = 'app/static/uploads'
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

class DevelopmentConfig(Config):
    DEBUG = True
    TESTING = False

class ProductionConfig(Config):
    DEBUG = False
    TESTING = False

class TestingConfig(Config):
    TESTING = True
    WTF_CSRF_ENABLED = False
```

### 2. Authentication & Authorization

#### 2.1 User Management System

**User Model với Flask-Login:**
```python
# app/models/user.py
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class User(UserMixin):
    def __init__(self, id, username, email, role, created_at=None):
        self.id = id
        self.username = username
        self.email = email
        self.role = role  # 'customer', 'owner', 'admin'
        self.created_at = created_at or datetime.utcnow()
        self.is_active = True
        self.email_verified = False
        
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
        
    def get_id(self):
        return str(self.id)
        
    def is_authenticated(self):
        return True
        
    def is_anonymous(self):
        return False
```

**Authentication Routes:**
```python
# app/routes/auth.py
from flask import Blueprint, render_template, request, flash, redirect, url_for
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash
from ..models.user import User

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        role = request.form.get('role', 'customer')
        
        # Validate user credentials
        user = validate_user(username, password, role)
        
        if user:
            login_user(user, remember=True)
            flash('Đăng nhập thành công!', 'success')
            
            # Redirect based on role
            if user.role == 'customer':
                return redirect(url_for('customer.home'))
            elif user.role == 'owner':
                return redirect(url_for('owner.dashboard'))
            elif user.role == 'admin':
                return redirect(url_for('admin.dashboard'))
        else:
            flash('Tên đăng nhập hoặc mật khẩu không đúng!', 'error')
    
    return render_template('auth/login.html')

@bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')
        role = request.form.get('role', 'customer')
        
        # Validation
        if password != confirm_password:
            flash('Mật khẩu xác nhận không khớp!', 'error')
            return render_template('auth/register.html')
            
        if len(password) < 6:
            flash('Mật khẩu phải có ít nhất 6 ký tự!', 'error')
            return render_template('auth/register.html')
        
        # Create new user
        user = create_user(username, email, password, role)
        
        if user:
            flash('Đăng ký thành công! Vui lòng đăng nhập.', 'success')
            return redirect(url_for('auth.login'))
        else:
            flash('Tên đăng nhập hoặc email đã tồn tại!', 'error')
    
    return render_template('auth/register.html')

@bp.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Đã đăng xuất thành công!', 'success')
    return redirect(url_for('common.home'))
```

#### 2.2 Role-based Access Control

**Decorator cho Role Protection:**
```python
# app/utils/decorators.py
from functools import wraps
from flask import abort, flash, redirect, url_for
from flask_login import current_user

def role_required(role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if not current_user.is_authenticated:
                return redirect(url_for('auth.login'))
            
            if current_user.role != role:
                flash('Bạn không có quyền truy cập trang này!', 'error')
                return redirect(url_for('common.home'))
            
            return f(*args, **kwargs)
        return decorated_function
    return decorator

def admin_required(f):
    return role_required('admin')(f)

def owner_required(f):
    return role_required('owner')(f)

def customer_required(f):
    return role_required('customer')(f)
```

### 3. Data Models & Business Logic

#### 3.1 Field Management

**Field Model:**
```python
# app/models/field.py
from datetime import datetime, time
from decimal import Decimal

class Field:
    def __init__(self, id, name, field_type, location, price_per_slot, 
                 owner_id, description=None, image_url=None, is_active=True):
        self.id = id
        self.name = name
        self.field_type = field_type  # 'football', 'basketball', 'tennis', etc.
        self.location = location
        self.price_per_slot = Decimal(price_per_slot)
        self.owner_id = owner_id
        self.description = description
        self.image_url = image_url
        self.is_active = is_active
        self.created_at = datetime.utcnow()
        self.rating = 0.0
        self.review_count = 0
        
    def get_availability(self, date):
        """Lấy lịch trống cho ngày cụ thể"""
        # Mock implementation - trong thực tế sẽ query database
        available_slots = []
        start_time = time(6, 0)  # 6:00 AM
        end_time = time(22, 0)   # 10:00 PM
        
        current_time = start_time
        while current_time < end_time:
            # Mock: 50% chance slot is available
            if hash(f"{self.id}-{date}-{current_time}") % 2 == 0:
                available_slots.append(current_time.strftime("%H:%M"))
            current_time = time(current_time.hour + 2, current_time.minute)
            
        return available_slots
    
    def calculate_price(self, duration_hours, voucher_code=None):
        """Tính giá thuê sân"""
        base_price = self.price_per_slot * duration_hours
        
        if voucher_code:
            discount = self.apply_voucher(voucher_code, base_price)
            return base_price - discount
        
        return base_price
    
    def apply_voucher(self, voucher_code, amount):
        """Áp dụng voucher giảm giá"""
        # Mock implementation
        vouchers = {
            'WELCOME10': 0.1,  # 10% discount
            'SPORT20': 0.2,    # 20% discount
            'VIP30': 0.3       # 30% discount
        }
        
        discount_rate = vouchers.get(voucher_code, 0)
        return amount * discount_rate
```

#### 3.2 Booking System

**Booking Model:**
```python
# app/models/booking.py
from datetime import datetime, timedelta
from decimal import Decimal

class Booking:
    def __init__(self, id, field_id, customer_id, booking_date, 
                 start_time, duration_hours, total_amount, status='pending'):
        self.id = id
        self.field_id = field_id
        self.customer_id = customer_id
        self.booking_date = booking_date
        self.start_time = start_time
        self.duration_hours = duration_hours
        self.total_amount = Decimal(total_amount)
        self.status = status  # 'pending', 'approved', 'rejected', 'cancelled'
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()
        self.voucher_code = None
        self.discount_amount = Decimal('0')
        
    def get_end_time(self):
        """Tính thời gian kết thúc"""
        start_dt = datetime.combine(self.booking_date, self.start_time)
        end_dt = start_dt + timedelta(hours=self.duration_hours)
        return end_dt.time()
    
    def is_conflict(self, other_booking):
        """Kiểm tra xung đột thời gian với booking khác"""
        if self.field_id != other_booking.field_id:
            return False
            
        if self.booking_date != other_booking.booking_date:
            return False
            
        self_start = datetime.combine(self.booking_date, self.start_time)
        self_end = self_start + timedelta(hours=self.duration_hours)
        
        other_start = datetime.combine(other_booking.booking_date, other_booking.start_time)
        other_end = other_start + timedelta(hours=other_booking.duration_hours)
        
        return (self_start < other_end and self_end > other_start)
    
    def can_cancel(self):
        """Kiểm tra có thể hủy booking không"""
        booking_datetime = datetime.combine(self.booking_date, self.start_time)
        now = datetime.now()
        
        # Có thể hủy trước 2 giờ
        return (booking_datetime - now) > timedelta(hours=2)
    
    def calculate_refund(self):
        """Tính tiền hoàn lại khi hủy"""
        booking_datetime = datetime.combine(self.booking_date, self.start_time)
        now = datetime.now()
        time_diff = booking_datetime - now
        
        if time_diff > timedelta(hours=24):
            return self.total_amount * Decimal('0.8')  # Hoàn 80%
        elif time_diff > timedelta(hours=2):
            return self.total_amount * Decimal('0.5')  # Hoàn 50%
        else:
            return Decimal('0')  # Không hoàn
```

#### 3.3 Payment Processing

**Payment Model:**
```python
# app/models/payment.py
from datetime import datetime
from decimal import Decimal

class Payment:
    def __init__(self, id, booking_id, amount, payment_method, status='pending'):
        self.id = id
        self.booking_id = booking_id
        self.amount = Decimal(amount)
        self.payment_method = payment_method  # 'cash', 'bank_transfer', 'momo', 'vnpay'
        self.status = status  # 'pending', 'completed', 'failed', 'refunded'
        self.created_at = datetime.utcnow()
        self.completed_at = None
        self.transaction_id = None
        self.gateway_response = None
        
    def process_payment(self):
        """Xử lý thanh toán"""
        # Mock payment processing
        import random
        success = random.choice([True, True, True, False])  # 75% success rate
        
        if success:
            self.status = 'completed'
            self.completed_at = datetime.utcnow()
            self.transaction_id = f"TXN{self.id:06d}"
            return True
        else:
            self.status = 'failed'
            self.gateway_response = 'Payment failed'
            return False
    
    def refund(self, amount=None):
        """Hoàn tiền"""
        refund_amount = amount or self.amount
        self.status = 'refunded'
        return {
            'success': True,
            'amount': refund_amount,
            'transaction_id': f"REF{self.id:06d}"
        }
```

### 4. API Endpoints

#### 4.1 RESTful API Design

**API Authentication:**
```python
# app/routes/api/auth.py
from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, current_user
from functools import wraps

bp = Blueprint('api_auth', __name__, url_prefix='/api/auth')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:
            # Verify token (implement JWT verification)
            user = verify_token(token)
            if not user:
                return jsonify({'message': 'Token is invalid!'}), 401
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
        
        return f(*args, **kwargs)
    return decorated

@bp.route('/login', methods=['POST'])
def api_login():
    data = request.get_json()
    
    username = data.get('username')
    password = data.get('password')
    role = data.get('role', 'customer')
    
    user = validate_user(username, password, role)
    
    if user:
        login_user(user)
        token = generate_token(user)
        return jsonify({
            'success': True,
            'token': token,
            'user': {
                'id': user.id,
                'username': user.username,
                'role': user.role
            }
        })
    else:
        return jsonify({
            'success': False,
            'message': 'Invalid credentials'
        }), 401
```

**Field API Endpoints:**
```python
# app/routes/api/customer.py
from flask import Blueprint, request, jsonify
from ..models.field import Field
from ..models.booking import Booking

bp = Blueprint('api_customer', __name__, url_prefix='/api/customer')

@bp.route('/fields', methods=['GET'])
def get_fields():
    """Lấy danh sách sân thể thao"""
    # Query parameters
    field_type = request.args.get('type')
    location = request.args.get('location')
    date = request.args.get('date')
    time = request.args.get('time')
    
    # Filter fields based on parameters
    fields = filter_fields(field_type, location, date, time)
    
    return jsonify({
        'success': True,
        'fields': [field.to_dict() for field in fields]
    })

@bp.route('/fields/<int:field_id>', methods=['GET'])
def get_field_detail(field_id):
    """Lấy chi tiết sân thể thao"""
    field = get_field_by_id(field_id)
    
    if not field:
        return jsonify({
            'success': False,
            'message': 'Field not found'
        }), 404
    
    # Get availability for next 7 days
    availability = {}
    from datetime import date, timedelta
    for i in range(7):
        check_date = date.today() + timedelta(days=i)
        availability[check_date.isoformat()] = field.get_availability(check_date)
    
    return jsonify({
        'success': True,
        'field': field.to_dict(),
        'availability': availability
    })

@bp.route('/bookings', methods=['POST'])
@token_required
def create_booking():
    """Tạo booking mới"""
    data = request.get_json()
    
    field_id = data.get('field_id')
    booking_date = data.get('booking_date')
    start_time = data.get('start_time')
    duration_hours = data.get('duration_hours', 1)
    voucher_code = data.get('voucher_code')
    
    # Validate booking
    validation_result = validate_booking(
        field_id, booking_date, start_time, duration_hours, current_user.id
    )
    
    if not validation_result['valid']:
        return jsonify({
            'success': False,
            'message': validation_result['message']
        }), 400
    
    # Create booking
    booking = create_booking_record(
        field_id, current_user.id, booking_date, 
        start_time, duration_hours, voucher_code
    )
    
    return jsonify({
        'success': True,
        'booking': booking.to_dict()
    })

@bp.route('/bookings/<int:booking_id>', methods=['PUT'])
@token_required
def update_booking(booking_id):
    """Cập nhật booking"""
    booking = get_booking_by_id(booking_id)
    
    if not booking or booking.customer_id != current_user.id:
        return jsonify({
            'success': False,
            'message': 'Booking not found'
        }), 404
    
    data = request.get_json()
    action = data.get('action')
    
    if action == 'cancel':
        if not booking.can_cancel():
            return jsonify({
                'success': False,
                'message': 'Cannot cancel booking less than 2 hours before start time'
            }), 400
        
        booking.status = 'cancelled'
        refund_amount = booking.calculate_refund()
        
        return jsonify({
            'success': True,
            'message': 'Booking cancelled successfully',
            'refund_amount': float(refund_amount)
        })
    
    return jsonify({
        'success': False,
        'message': 'Invalid action'
    }), 400
```

### 5. Business Logic Implementation

#### 5.1 Booking Validation Logic

```python
# app/services/booking_service.py
from datetime import datetime, timedelta
from ..models.field import Field
from ..models.booking import Booking

class BookingService:
    @staticmethod
    def validate_booking(field_id, booking_date, start_time, duration_hours, customer_id):
        """Validate booking request"""
        errors = []
        
        # Check if field exists and is active
        field = get_field_by_id(field_id)
        if not field or not field.is_active:
            errors.append("Sân thể thao không tồn tại hoặc đã bị vô hiệu hóa")
        
        # Check if booking date is in the future
        booking_datetime = datetime.combine(booking_date, start_time)
        if booking_datetime <= datetime.now():
            errors.append("Thời gian đặt sân phải trong tương lai")
        
        # Check if booking is within allowed time range
        if start_time < time(6, 0) or start_time > time(22, 0):
            errors.append("Thời gian đặt sân phải từ 6:00 đến 22:00")
        
        # Check if duration is valid
        if duration_hours < 1 or duration_hours > 4:
            errors.append("Thời lượng đặt sân phải từ 1-4 giờ")
        
        # Check for time conflicts
        if field:
            conflicts = BookingService.check_time_conflicts(
                field_id, booking_date, start_time, duration_hours
            )
            if conflicts:
                errors.append("Thời gian đã được đặt trước")
        
        # Check customer booking limit
        customer_bookings = get_customer_bookings_today(customer_id, booking_date)
        if len(customer_bookings) >= 3:
            errors.append("Bạn đã đạt giới hạn 3 booking mỗi ngày")
        
        return {
            'valid': len(errors) == 0,
            'errors': errors
        }
    
    @staticmethod
    def check_time_conflicts(field_id, booking_date, start_time, duration_hours):
        """Kiểm tra xung đột thời gian"""
        existing_bookings = get_bookings_by_field_date(field_id, booking_date)
        
        new_start = datetime.combine(booking_date, start_time)
        new_end = new_start + timedelta(hours=duration_hours)
        
        for booking in existing_bookings:
            if booking.status in ['pending', 'approved']:
                booking_start = datetime.combine(booking_date, booking.start_time)
                booking_end = booking_start + timedelta(hours=booking.duration_hours)
                
                if (new_start < booking_end and new_end > booking_start):
                    return True
        
        return False
    
    @staticmethod
    def calculate_booking_price(field, duration_hours, voucher_code=None):
        """Tính giá booking"""
        base_price = field.price_per_slot * duration_hours
        
        if voucher_code:
            discount = BookingService.apply_voucher(voucher_code, base_price)
            return base_price - discount
        
        return base_price
    
    @staticmethod
    def apply_voucher(voucher_code, amount):
        """Áp dụng voucher giảm giá"""
        voucher = get_voucher_by_code(voucher_code)
        
        if not voucher or not voucher.is_valid():
            return Decimal('0')
        
        if voucher.discount_type == 'percentage':
            return amount * (voucher.discount_value / 100)
        else:
            return min(voucher.discount_value, amount)
```

#### 5.2 Notification System

```python
# app/services/notification_service.py
from datetime import datetime
from ..models.notification import Notification

class NotificationService:
    @staticmethod
    def send_booking_confirmation(booking):
        """Gửi thông báo xác nhận booking"""
        notification = Notification(
            user_id=booking.customer_id,
            title="Xác nhận đặt sân",
            message=f"Đặt sân của bạn cho {booking.booking_date} đã được xác nhận",
            type="booking_confirmation",
            data={'booking_id': booking.id}
        )
        
        save_notification(notification)
        send_email_notification(notification)
    
    @staticmethod
    def send_booking_reminder(booking):
        """Gửi thông báo nhắc nhở booking"""
        notification = Notification(
            user_id=booking.customer_id,
            title="Nhắc nhở đặt sân",
            message=f"Bạn có lịch đặt sân vào ngày mai lúc {booking.start_time}",
            type="booking_reminder",
            data={'booking_id': booking.id}
        )
        
        save_notification(notification)
        send_email_notification(notification)
    
    @staticmethod
    def send_payment_confirmation(payment):
        """Gửi thông báo xác nhận thanh toán"""
        notification = Notification(
            user_id=payment.booking.customer_id,
            title="Xác nhận thanh toán",
            message=f"Thanh toán {payment.amount:,.0f} VNĐ đã được xác nhận",
            type="payment_confirmation",
            data={'payment_id': payment.id}
        )
        
        save_notification(notification)
        send_email_notification(notification)
    
    @staticmethod
    def send_system_notification(user_ids, title, message, notification_type="system"):
        """Gửi thông báo hệ thống cho nhiều người dùng"""
        notifications = []
        
        for user_id in user_ids:
            notification = Notification(
                user_id=user_id,
                title=title,
                message=message,
                type=notification_type
            )
            notifications.append(notification)
        
        save_notifications_bulk(notifications)
```

### 6. Error Handling & Logging

#### 6.1 Custom Error Handlers

```python
# app/utils/error_handlers.py
from flask import render_template, jsonify
from werkzeug.exceptions import HTTPException
import logging

def register_error_handlers(app):
    @app.errorhandler(404)
    def not_found_error(error):
        if request.path.startswith('/api/'):
            return jsonify({
                'success': False,
                'message': 'Resource not found'
            }), 404
        return render_template('shared/404.html'), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        # Log the error
        logging.error(f'Internal server error: {error}')
        
        if request.path.startswith('/api/'):
            return jsonify({
                'success': False,
                'message': 'Internal server error'
            }), 500
        return render_template('shared/500.html'), 500
    
    @app.errorhandler(403)
    def forbidden_error(error):
        if request.path.startswith('/api/'):
            return jsonify({
                'success': False,
                'message': 'Access forbidden'
            }), 403
        return render_template('shared/403.html'), 403
```

#### 6.2 Logging Configuration

```python
# app/utils/logging_config.py
import logging
from logging.handlers import RotatingFileHandler
import os

def setup_logging(app):
    if not app.debug and not app.testing:
        # Create logs directory if it doesn't exist
        if not os.path.exists('logs'):
            os.mkdir('logs')
        
        # File handler for general logs
        file_handler = RotatingFileHandler(
            'logs/sportslot.log', 
            maxBytes=10240000, 
            backupCount=10
        )
        file_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
        ))
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)
        
        # File handler for error logs
        error_handler = RotatingFileHandler(
            'logs/error.log', 
            maxBytes=10240000, 
            backupCount=10
        )
        error_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
        ))
        error_handler.setLevel(logging.ERROR)
        app.logger.addHandler(error_handler)
        
        app.logger.setLevel(logging.INFO)
        app.logger.info('SportSlot startup')
```

### 7. Security Implementation

#### 7.1 CSRF Protection

```python
# app/utils/security.py
from flask_wtf.csrf import CSRFProtect
from flask import request, abort

csrf = CSRFProtect()

def init_csrf(app):
    csrf.init_app(app)
    
    @app.before_request
    def csrf_protect():
        if request.method == "POST":
            token = request.form.get('csrf_token')
            if not token or not csrf.validate_token(token):
                abort(400, description="CSRF token missing or invalid")

def generate_csrf_token():
    return csrf._get_token()
```

#### 7.2 Input Validation & Sanitization

```python
# app/utils/validation.py
import re
from werkzeug.security import safe_str_cmp

class InputValidator:
    @staticmethod
    def validate_email(email):
        """Validate email format"""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None
    
    @staticmethod
    def validate_phone(phone):
        """Validate Vietnamese phone number"""
        pattern = r'^(0|\+84)[3|5|7|8|9][0-9]{8}$'
        return re.match(pattern, phone) is not None
    
    @staticmethod
    def validate_password(password):
        """Validate password strength"""
        if len(password) < 8:
            return False, "Mật khẩu phải có ít nhất 8 ký tự"
        
        if not re.search(r'[A-Z]', password):
            return False, "Mật khẩu phải có ít nhất 1 chữ hoa"
        
        if not re.search(r'[a-z]', password):
            return False, "Mật khẩu phải có ít nhất 1 chữ thường"
        
        if not re.search(r'\d', password):
            return False, "Mật khẩu phải có ít nhất 1 số"
        
        return True, "Mật khẩu hợp lệ"
    
    @staticmethod
    def sanitize_input(text):
        """Sanitize user input"""
        # Remove potentially dangerous characters
        dangerous_chars = ['<', '>', '"', "'", '&']
        for char in dangerous_chars:
            text = text.replace(char, '')
        
        # Limit length
        if len(text) > 1000:
            text = text[:1000]
        
        return text.strip()
```

### 8. Performance Optimization

#### 8.1 Database Query Optimization

```python
# app/utils/db_optimization.py
from functools import wraps
import time

def cache_result(ttl=300):  # 5 minutes default
    """Cache decorator for expensive operations"""
    def decorator(func):
        cache = {}
        
        @wraps(func)
        def wrapper(*args, **kwargs):
            key = str(args) + str(sorted(kwargs.items()))
            
            if key in cache:
                result, timestamp = cache[key]
                if time.time() - timestamp < ttl:
                    return result
            
            result = func(*args, **kwargs)
            cache[key] = (result, time.time())
            return result
        
        return wrapper
    return decorator

@cache_result(ttl=600)  # Cache for 10 minutes
def get_popular_fields():
    """Get popular fields with caching"""
    # Expensive database query
    return query_popular_fields()

def optimize_booking_query(field_id, date):
    """Optimized booking query with proper indexing"""
    # Use database indexes for faster queries
    return Booking.query.filter_by(
        field_id=field_id,
        booking_date=date
    ).options(
        joinedload(Booking.field),
        joinedload(Booking.customer)
    ).all()
```

#### 8.2 Background Task Processing

```python
# app/utils/background_tasks.py
from celery import Celery
from datetime import datetime, timedelta

# Configure Celery
celery = Celery('sportslot', broker='redis://localhost:6379/0')

@celery.task
def send_booking_reminders():
    """Send booking reminders for tomorrow's bookings"""
    tomorrow = datetime.now().date() + timedelta(days=1)
    bookings = get_bookings_for_date(tomorrow)
    
    for booking in bookings:
        send_reminder_email(booking)

@celery.task
def cleanup_expired_bookings():
    """Clean up expired pending bookings"""
    expired_bookings = get_expired_pending_bookings()
    
    for booking in expired_bookings:
        booking.status = 'cancelled'
        save_booking(booking)

@celery.task
def generate_daily_reports():
    """Generate daily revenue and booking reports"""
    yesterday = datetime.now().date() - timedelta(days=1)
    
    # Generate reports
    revenue_report = generate_revenue_report(yesterday)
    booking_report = generate_booking_report(yesterday)
    
    # Send reports to admins
    send_reports_to_admins(revenue_report, booking_report)
```

### 9. Testing Implementation

#### 9.1 Unit Tests

```python
# tests/test_models.py
import unittest
from app.models.booking import Booking
from app.models.field import Field
from datetime import datetime, time, date

class TestBookingModel(unittest.TestCase):
    def setUp(self):
        self.field = Field(
            id=1,
            name="Sân Bóng Đá A",
            field_type="football",
            location="Quận 1, TP.HCM",
            price_per_slot=200000
        )
        
        self.booking = Booking(
            id=1,
            field_id=1,
            customer_id=1,
            booking_date=date(2024, 1, 15),
            start_time=time(18, 0),
            duration_hours=2,
            total_amount=400000
        )
    
    def test_booking_end_time_calculation(self):
        """Test end time calculation"""
        end_time = self.booking.get_end_time()
        expected_time = time(20, 0)
        self.assertEqual(end_time, expected_time)
    
    def test_booking_conflict_detection(self):
        """Test booking conflict detection"""
        other_booking = Booking(
            id=2,
            field_id=1,
            customer_id=2,
            booking_date=date(2024, 1, 15),
            start_time=time(19, 0),
            duration_hours=2,
            total_amount=400000
        )
        
        self.assertTrue(self.booking.is_conflict(other_booking))
    
    def test_booking_cancellation_eligibility(self):
        """Test booking cancellation eligibility"""
        # Booking is in the future, should be cancellable
        self.assertTrue(self.booking.can_cancel())
        
        # Modify booking to be in the past
        self.booking.booking_date = date(2024, 1, 1)
        self.assertFalse(self.booking.can_cancel())

class TestFieldModel(unittest.TestCase):
    def setUp(self):
        self.field = Field(
            id=1,
            name="Sân Tennis Pro",
            field_type="tennis",
            location="Quận 2, TP.HCM",
            price_per_slot=300000
        )
    
    def test_price_calculation(self):
        """Test price calculation with voucher"""
        price = self.field.calculate_price(2, "WELCOME10")
        expected_price = 300000 * 2 * 0.9  # 10% discount
        self.assertEqual(price, expected_price)
    
    def test_availability_generation(self):
        """Test availability generation"""
        availability = self.field.get_availability(date(2024, 1, 15))
        self.assertIsInstance(availability, list)
        self.assertTrue(len(availability) > 0)
```

#### 9.2 Integration Tests

```python
# tests/test_api.py
import unittest
from app import create_app
from app.models.user import User

class TestAPIEndpoints(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()
    
    def tearDown(self):
        self.app_context.pop()
    
    def test_get_fields_api(self):
        """Test GET /api/customer/fields endpoint"""
        response = self.client.get('/api/customer/fields')
        data = response.get_json()
        
        self.assertEqual(response.status_code, 200)
        self.assertTrue(data['success'])
        self.assertIn('fields', data)
    
    def test_create_booking_api(self):
        """Test POST /api/customer/bookings endpoint"""
        booking_data = {
            'field_id': 1,
            'booking_date': '2024-01-15',
            'start_time': '18:00',
            'duration_hours': 2
        }
        
        response = self.client.post(
            '/api/customer/bookings',
            json=booking_data,
            headers={'Authorization': 'Bearer test_token'}
        )
        
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertTrue(data['success'])
    
    def test_invalid_booking_api(self):
        """Test booking with invalid data"""
        booking_data = {
            'field_id': 999,  # Non-existent field
            'booking_date': '2024-01-15',
            'start_time': '18:00',
            'duration_hours': 2
        }
        
        response = self.client.post(
            '/api/customer/bookings',
            json=booking_data,
            headers={'Authorization': 'Bearer test_token'}
        )
        
        data = response.get_json()
        self.assertEqual(response.status_code, 400)
        self.assertFalse(data['success'])
```

### 10. Deployment & Production Configuration

#### 10.1 Production WSGI Configuration

```python
# wsgi.py
from app import create_app
from app.config import ProductionConfig

app = create_app(ProductionConfig)

if __name__ == "__main__":
    app.run()
```

#### 10.2 Docker Configuration

```dockerfile
# Dockerfile
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user
RUN useradd -m -u 1000 sportslot && chown -R sportslot:sportslot /app
USER sportslot

# Expose port
EXPOSE 5000

# Run application
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "wsgi:app"]
```

#### 10.3 Environment Configuration

```bash
# .env.production
FLASK_ENV=production
SECRET_KEY=your-super-secret-production-key-here
DATABASE_URL=postgresql://user:password@localhost/sportslot_prod
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
REDIS_URL=redis://localhost:6379/0
```

## Triển khai

### Development
```# #   C h i   t i �t   B a c k - e n d   I m p l e m e n t a t i o n   v �i   F l a s k 
 
 
 
 # # #   1 .   K i �n   t r � c   B a c k - e n d 
 
 
 
 # # # #   1 . 1   C �u   t r � c   �n g   d �n g   F l a s k 
 
 # #   C h i   t i � � � t   B a c k - e n d   I m p l e m e n t a t i o n   v � � : i   F l a s k 
 
 
 
 # # #   1 .   K i � � � n   t r � � c   B a c k - e n d 
 
 
 
 # # # #   1 . 1   C � � � u   t r � � c   � � � n g   d � � � n g   F l a s k 
 
 
 
 * * A p p l i c a t i o n   F a c t o r y   P a t t e r n : * * 
 
 ` ` ` p y t h o n 
 
 #   a p p / _ _ i n i t _ _ . p y 
 
 f r o m   f l a s k   i m p o r t   F l a s k 
 
 f r o m   f l a s k _ l o g i n   i m p o r t   L o g i n M a n a g e r 
 
 f r o m   f l a s k _ m a i l   i m p o r t   M a i l 
 
 f r o m   . c o n f i g   i m p o r t   C o n f i g 
 
 
 
 d e f   c r e a t e _ a p p ( c o n f i g _ c l a s s = C o n f i g ) : 
 
         a p p   =   F l a s k ( _ _ n a m e _ _ ) 
 
         a p p . c o n f i g . f r o m _ o b j e c t ( c o n f i g _ c l a s s ) 
 
         
 
         #   I n i t i a l i z e   e x t e n s i o n s 
 
         l o g i n _ m a n a g e r   =   L o g i n M a n a g e r ( ) 
 
         l o g i n _ m a n a g e r . i n i t _ a p p ( a p p ) 
 
         l o g i n _ m a n a g e r . l o g i n _ v i e w   =   ' a u t h . l o g i n ' 
 
         
 
         m a i l   =   M a i l ( ) 
 
         m a i l . i n i t _ a p p ( a p p ) 
 
         
 
         #   R e g i s t e r   b l u e p r i n t s 
 
         f r o m   . r o u t e s   i m p o r t   a u t h ,   c u s t o m e r ,   o w n e r ,   a d m i n ,   c o m m o n 
 
         a p p . r e g i s t e r _ b l u e p r i n t ( a u t h . b p ) 
 
         a p p . r e g i s t e r _ b l u e p r i n t ( c u s t o m e r . b p ) 
 
         a p p . r e g i s t e r _ b l u e p r i n t ( o w n e r . b p ) 
 
         a p p . r e g i s t e r _ b l u e p r i n t ( a d m i n . b p ) 
 
         a p p . r e g i s t e r _ b l u e p r i n t ( c o m m o n . b p ) 
 
         
 
         r e t u r n   a p p 
 
 ` ` ` 
 
 
 
 * * B l u e p r i n t   S t r u c t u r e : * * 
 
 ` ` ` 
 
 a p p / r o u t e s / 
 
 �  S�  � �  �   _ _ i n i t _ _ . p y 
 
 �  S�  � �  �   a u t h . p y                     #   A u t h e n t i c a t i o n   r o u t e s 
 
 �  S�  � �  �   c u s t o m e r . p y             #   C u s t o m e r - s p e c i f i c   r o u t e s 
 
 �  S�  � �  �   o w n e r . p y                   #   O w n e r - s p e c i f i c   r o u t e s 
 
 �  S�  � �  �   a d m i n . p y                   #   A d m i n - s p e c i f i c   r o u t e s 
 
 �  S�  � �  �   c o m m o n . p y                 #   C o m m o n / s h a r e d   r o u t e s 
 
 �   �  � �  �   a p i /                         #   R E S T   A P I   e n d p o i n t s 
 
         �  S�  � �  �   a u t h . p y 
 
         �  S�  � �  �   c u s t o m e r . p y 
 
         �   �  � �  �   o w n e r . p y 
 
 ` ` ` 
 
 
 
 # # # #   1 . 2   C o n f i g u r a t i o n   M a n a g e m e n t 
 
 
 
 * * E n v i r o n m e n t - b a s e d   C o n f i g u r a t i o n : * * 
 
 ` ` ` p y t h o n 
 
 #   a p p / c o n f i g . p y 
 
 i m p o r t   o s 
 
 f r o m   d a t e t i m e   i m p o r t   t i m e d e l t a 
 
 
 
 c l a s s   C o n f i g : 
 
         S E C R E T _ K E Y   =   o s . e n v i r o n . g e t ( ' S E C R E T _ K E Y ' )   o r   ' d e v - s e c r e t - k e y - c h a n g e - i n - p r o d u c t i o n ' 
 
         
 
         #   D a t a b a s e   c o n f i g u r a t i o n 
 
         D A T A B A S E _ U R L   =   o s . e n v i r o n . g e t ( ' D A T A B A S E _ U R L ' )   o r   ' s q l i t e : / / / s p o r t s l o t . d b ' 
 
         
 
         #   E m a i l   c o n f i g u r a t i o n 
 
         M A I L _ S E R V E R   =   o s . e n v i r o n . g e t ( ' M A I L _ S E R V E R ' )   o r   ' s m t p . g m a i l . c o m ' 
 
         M A I L _ P O R T   =   i n t ( o s . e n v i r o n . g e t ( ' M A I L _ P O R T ' )   o r   5 8 7 ) 
 
         M A I L _ U S E _ T L S   =   o s . e n v i r o n . g e t ( ' M A I L _ U S E _ T L S ' ,   ' t r u e ' ) . l o w e r ( )   i n   [ ' t r u e ' ,   ' o n ' ,   ' 1 ' ] 
 
         M A I L _ U S E R N A M E   =   o s . e n v i r o n . g e t ( ' M A I L _ U S E R N A M E ' ) 
 
         M A I L _ P A S S W O R D   =   o s . e n v i r o n . g e t ( ' M A I L _ P A S S W O R D ' ) 
 
         M A I L _ D E F A U L T _ S E N D E R   =   o s . e n v i r o n . g e t ( ' M A I L _ D E F A U L T _ S E N D E R ' ) 
 
         
 
         #   S e s s i o n   c o n f i g u r a t i o n 
 
         P E R M A N E N T _ S E S S I O N _ L I F E T I M E   =   t i m e d e l t a ( d a y s = 7 ) 
 
         
 
         #   F i l e   u p l o a d   c o n f i g u r a t i o n 
 
         M A X _ C O N T E N T _ L E N G T H   =   1 6   *   1 0 2 4   *   1 0 2 4     #   1 6 M B   m a x   f i l e   s i z e 
 
         U P L O A D _ F O L D E R   =   ' a p p / s t a t i c / u p l o a d s ' 
 
         A L L O W E D _ E X T E N S I O N S   =   { ' p n g ' ,   ' j p g ' ,   ' j p e g ' ,   ' g i f ' } 
 
 
 
 c l a s s   D e v e l o p m e n t C o n f i g ( C o n f i g ) : 
 
         D E B U G   =   T r u e 
 
         T E S T I N G   =   F a l s e 
 
 
 
 c l a s s   P r o d u c t i o n C o n f i g ( C o n f i g ) : 
 
         D E B U G   =   F a l s e 
 
         T E S T I N G   =   F a l s e 
 
 
 
 c l a s s   T e s t i n g C o n f i g ( C o n f i g ) : 
 
         T E S T I N G   =   T r u e 
 
         W T F _ C S R F _ E N A B L E D   =   F a l s e 
 
 ` ` ` 
 
 
 
 # # #   2 .   A u t h e n t i c a t i o n   &   A u t h o r i z a t i o n 
 
 
 
 # # # #   2 . 1   U s e r   M a n a g e m e n t   S y s t e m 
 
 
 
 * * U s e r   M o d e l   v � � : i   F l a s k - L o g i n : * * 
 
 ` ` ` p y t h o n 
 
 #   a p p / m o d e l s / u s e r . p y 
 
 f r o m   f l a s k _ l o g i n   i m p o r t   U s e r M i x i n 
 
 f r o m   w e r k z e u g . s e c u r i t y   i m p o r t   g e n e r a t e _ p a s s w o r d _ h a s h ,   c h e c k _ p a s s w o r d _ h a s h 
 
 f r o m   d a t e t i m e   i m p o r t   d a t e t i m e 
 
 
 
 c l a s s   U s e r ( U s e r M i x i n ) : 
 
         d e f   _ _ i n i t _ _ ( s e l f ,   i d ,   u s e r n a m e ,   e m a i l ,   r o l e ,   c r e a t e d _ a t = N o n e ) : 
 
                 s e l f . i d   =   i d 
 
                 s e l f . u s e r n a m e   =   u s e r n a m e 
 
                 s e l f . e m a i l   =   e m a i l 
 
                 s e l f . r o l e   =   r o l e     #   ' c u s t o m e r ' ,   ' o w n e r ' ,   ' a d m i n ' 
 
                 s e l f . c r e a t e d _ a t   =   c r e a t e d _ a t   o r   d a t e t i m e . u t c n o w ( ) 
 
                 s e l f . i s _ a c t i v e   =   T r u e 
 
                 s e l f . e m a i l _ v e r i f i e d   =   F a l s e 
 
                 
 
         d e f   s e t _ p a s s w o r d ( s e l f ,   p a s s w o r d ) : 
 
                 s e l f . p a s s w o r d _ h a s h   =   g e n e r a t e _ p a s s w o r d _ h a s h ( p a s s w o r d ) 
 
                 
 
         d e f   c h e c k _ p a s s w o r d ( s e l f ,   p a s s w o r d ) : 
 
                 r e t u r n   c h e c k _ p a s s w o r d _ h a s h ( s e l f . p a s s w o r d _ h a s h ,   p a s s w o r d ) 
 
                 
 
         d e f   g e t _ i d ( s e l f ) : 
 
                 r e t u r n   s t r ( s e l f . i d ) 
 
                 
 
         d e f   i s _ a u t h e n t i c a t e d ( s e l f ) : 
 
                 r e t u r n   T r u e 
 
                 
 
         d e f   i s _ a n o n y m o u s ( s e l f ) : 
 
                 r e t u r n   F a l s e 
 
 ` ` ` 
 
 
 
 * * A u t h e n t i c a t i o n   R o u t e s : * * 
 
 ` ` ` p y t h o n 
 
 #   a p p / r o u t e s / a u t h . p y 
 
 f r o m   f l a s k   i m p o r t   B l u e p r i n t ,   r e n d e r _ t e m p l a t e ,   r e q u e s t ,   f l a s h ,   r e d i r e c t ,   u r l _ f o r 
 
 f r o m   f l a s k _ l o g i n   i m p o r t   l o g i n _ u s e r ,   l o g o u t _ u s e r ,   l o g i n _ r e q u i r e d ,   c u r r e n t _ u s e r 
 
 f r o m   w e r k z e u g . s e c u r i t y   i m p o r t   g e n e r a t e _ p a s s w o r d _ h a s h 
 
 f r o m   . . m o d e l s . u s e r   i m p o r t   U s e r 
 
 
 
 b p   =   B l u e p r i n t ( ' a u t h ' ,   _ _ n a m e _ _ ,   u r l _ p r e f i x = ' / a u t h ' ) 
 
 
 
 @ b p . r o u t e ( ' / l o g i n ' ,   m e t h o d s = [ ' G E T ' ,   ' P O S T ' ] ) 
 
 d e f   l o g i n ( ) : 
 
         i f   r e q u e s t . m e t h o d   = =   ' P O S T ' : 
 
                 u s e r n a m e   =   r e q u e s t . f o r m . g e t ( ' u s e r n a m e ' ) 
 
                 p a s s w o r d   =   r e q u e s t . f o r m . g e t ( ' p a s s w o r d ' ) 
 
                 r o l e   =   r e q u e s t . f o r m . g e t ( ' r o l e ' ,   ' c u s t o m e r ' ) 
 
                 
 
                 #   V a l i d a t e   u s e r   c r e d e n t i a l s 
 
                 u s e r   =   v a l i d a t e _ u s e r ( u s e r n a m e ,   p a s s w o r d ,   r o l e ) 
 
                 
 
                 i f   u s e r : 
 
                         l o g i n _ u s e r ( u s e r ,   r e m e m b e r = T r u e ) 
 
                         f l a s h ( ' � � � �n g   n h � � � p   t h � � n h   c � � n g ! ' ,   ' s u c c e s s ' ) 
 
                         
 
                         #   R e d i r e c t   b a s e d   o n   r o l e 
 
                         i f   u s e r . r o l e   = =   ' c u s t o m e r ' : 
 
                                 r e t u r n   r e d i r e c t ( u r l _ f o r ( ' c u s t o m e r . h o m e ' ) ) 
 
                         e l i f   u s e r . r o l e   = =   ' o w n e r ' : 
 
                                 r e t u r n   r e d i r e c t ( u r l _ f o r ( ' o w n e r . d a s h b o a r d ' ) ) 
 
                         e l i f   u s e r . r o l e   = =   ' a d m i n ' : 
 
                                 r e t u r n   r e d i r e c t ( u r l _ f o r ( ' a d m i n . d a s h b o a r d ' ) ) 
 
                 e l s e : 
 
                         f l a s h ( ' T � � n   �  � �n g   n h � � � p   h o � � � c   m � � � t   k h � � � u   k h � � n g   �  � � n g ! ' ,   ' e r r o r ' ) 
 
         
 
         r e t u r n   r e n d e r _ t e m p l a t e ( ' a u t h / l o g i n . h t m l ' ) 
 
 
 
 @ b p . r o u t e ( ' / r e g i s t e r ' ,   m e t h o d s = [ ' G E T ' ,   ' P O S T ' ] ) 
 
 d e f   r e g i s t e r ( ) : 
 
         i f   r e q u e s t . m e t h o d   = =   ' P O S T ' : 
 
                 u s e r n a m e   =   r e q u e s t . f o r m . g e t ( ' u s e r n a m e ' ) 
 
                 e m a i l   =   r e q u e s t . f o r m . g e t ( ' e m a i l ' ) 
 
                 p a s s w o r d   =   r e q u e s t . f o r m . g e t ( ' p a s s w o r d ' ) 
 
                 c o n f i r m _ p a s s w o r d   =   r e q u e s t . f o r m . g e t ( ' c o n f i r m _ p a s s w o r d ' ) 
 
                 r o l e   =   r e q u e s t . f o r m . g e t ( ' r o l e ' ,   ' c u s t o m e r ' ) 
 
                 
 
                 #   V a l i d a t i o n 
 
                 i f   p a s s w o r d   ! =   c o n f i r m _ p a s s w o r d : 
 
                         f l a s h ( ' M � � � t   k h � � � u   x � � c   n h � � � n   k h � � n g   k h � � : p ! ' ,   ' e r r o r ' ) 
 
                         r e t u r n   r e n d e r _ t e m p l a t e ( ' a u t h / r e g i s t e r . h t m l ' ) 
 
                         
 
                 i f   l e n ( p a s s w o r d )   <   6 : 
 
                         f l a s h ( ' M � � � t   k h � � � u   p h � � � i   c � �   � � t   n h � � � t   6   k � �   t � � � ! ' ,   ' e r r o r ' ) 
 
                         r e t u r n   r e n d e r _ t e m p l a t e ( ' a u t h / r e g i s t e r . h t m l ' ) 
 
                 
 
                 #   C r e a t e   n e w   u s e r 
 
                 u s e r   =   c r e a t e _ u s e r ( u s e r n a m e ,   e m a i l ,   p a s s w o r d ,   r o l e ) 
 
                 
 
                 i f   u s e r : 
 
                         f l a s h ( ' � � � �n g   k � �   t h � � n h   c � � n g !   V u i   l � � n g   �  � �n g   n h � � � p . ' ,   ' s u c c e s s ' ) 
 
                         r e t u r n   r e d i r e c t ( u r l _ f o r ( ' a u t h . l o g i n ' ) ) 
 
                 e l s e : 
 
                         f l a s h ( ' T � � n   �  � �n g   n h � � � p   h o � � � c   e m a i l   �  � �   t � �  n   t � � � i ! ' ,   ' e r r o r ' ) 
 
         
 
         r e t u r n   r e n d e r _ t e m p l a t e ( ' a u t h / r e g i s t e r . h t m l ' ) 
 
 
 
 @ b p . r o u t e ( ' / l o g o u t ' ) 
 
 @ l o g i n _ r e q u i r e d 
 
 d e f   l o g o u t ( ) : 
 
         l o g o u t _ u s e r ( ) 
 
         f l a s h ( ' � � � �   �  � �n g   x u � � � t   t h � � n h   c � � n g ! ' ,   ' s u c c e s s ' ) 
 
         r e t u r n   r e d i r e c t ( u r l _ f o r ( ' c o m m o n . h o m e ' ) ) 
 
 ` ` ` 
 
 
 
 # # # #   2 . 2   R o l e - b a s e d   A c c e s s   C o n t r o l 
 
 
 
 * * D e c o r a t o r   c h o   R o l e   P r o t e c t i o n : * * 
 
 ` ` ` p y t h o n 
 
 #   a p p / u t i l s / d e c o r a t o r s . p y 
 
 f r o m   f u n c t o o l s   i m p o r t   w r a p s 
 
 f r o m   f l a s k   i m p o r t   a b o r t ,   f l a s h ,   r e d i r e c t ,   u r l _ f o r 
 
 f r o m   f l a s k _ l o g i n   i m p o r t   c u r r e n t _ u s e r 
 
 
 
 d e f   r o l e _ r e q u i r e d ( r o l e ) : 
 
         d e f   d e c o r a t o r ( f ) : 
 
                 @ w r a p s ( f ) 
 
                 d e f   d e c o r a t e d _ f u n c t i o n ( * a r g s ,   * * k w a r g s ) : 
 
                         i f   n o t   c u r r e n t _ u s e r . i s _ a u t h e n t i c a t e d : 
 
                                 r e t u r n   r e d i r e c t ( u r l _ f o r ( ' a u t h . l o g i n ' ) ) 
 
                         
 
                         i f   c u r r e n t _ u s e r . r o l e   ! =   r o l e : 
 
                                 f l a s h ( ' B � � � n   k h � � n g   c � �   q u y � � � n   t r u y   c � � � p   t r a n g   n � � y ! ' ,   ' e r r o r ' ) 
 
                                 r e t u r n   r e d i r e c t ( u r l _ f o r ( ' c o m m o n . h o m e ' ) ) 
 
                         
 
                         r e t u r n   f ( * a r g s ,   * * k w a r g s ) 
 
                 r e t u r n   d e c o r a t e d _ f u n c t i o n 
 
         r e t u r n   d e c o r a t o r 
 
 
 
 d e f   a d m i n _ r e q u i r e d ( f ) : 
 
         r e t u r n   r o l e _ r e q u i r e d ( ' a d m i n ' ) ( f ) 
 
 
 
 d e f   o w n e r _ r e q u i r e d ( f ) : 
 
         r e t u r n   r o l e _ r e q u i r e d ( ' o w n e r ' ) ( f ) 
 
 
 
 d e f   c u s t o m e r _ r e q u i r e d ( f ) : 
 
         r e t u r n   r o l e _ r e q u i r e d ( ' c u s t o m e r ' ) ( f ) 
 
 ` ` ` 
 
 
 
 # # #   3 .   D a t a   M o d e l s   &   B u s i n e s s   L o g i c 
 
 
 
 # # # #   3 . 1   F i e l d   M a n a g e m e n t 
 
 
 
 * * F i e l d   M o d e l : * * 
 
 ` ` ` p y t h o n 
 
 #   a p p / m o d e l s / f i e l d . p y 
 
 f r o m   d a t e t i m e   i m p o r t   d a t e t i m e ,   t i m e 
 
 f r o m   d e c i m a l   i m p o r t   D e c i m a l 
 
 
 
 c l a s s   F i e l d : 
 
         d e f   _ _ i n i t _ _ ( s e l f ,   i d ,   n a m e ,   f i e l d _ t y p e ,   l o c a t i o n ,   p r i c e _ p e r _ s l o t ,   
 
                                   o w n e r _ i d ,   d e s c r i p t i o n = N o n e ,   i m a g e _ u r l = N o n e ,   i s _ a c t i v e = T r u e ) : 
 
                 s e l f . i d   =   i d 
 
                 s e l f . n a m e   =   n a m e 
 
                 s e l f . f i e l d _ t y p e   =   f i e l d _ t y p e     #   ' f o o t b a l l ' ,   ' b a s k e t b a l l ' ,   ' t e n n i s ' ,   e t c . 
 
                 s e l f . l o c a t i o n   =   l o c a t i o n 
 
                 s e l f . p r i c e _ p e r _ s l o t   =   D e c i m a l ( p r i c e _ p e r _ s l o t ) 
 
                 s e l f . o w n e r _ i d   =   o w n e r _ i d 
 
                 s e l f . d e s c r i p t i o n   =   d e s c r i p t i o n 
 
                 s e l f . i m a g e _ u r l   =   i m a g e _ u r l 
 
                 s e l f . i s _ a c t i v e   =   i s _ a c t i v e 
 
                 s e l f . c r e a t e d _ a t   =   d a t e t i m e . u t c n o w ( ) 
 
                 s e l f . r a t i n g   =   0 . 0 
 
                 s e l f . r e v i e w _ c o u n t   =   0 
 
                 
 
         d e f   g e t _ a v a i l a b i l i t y ( s e l f ,   d a t e ) : 
 
                 " " " L � � � y   l � � 9 c h   t r � �  n g   c h o   n g � � y   c � � �   t h � � �" " " 
 
                 #   M o c k   i m p l e m e n t a t i o n   -   t r o n g   t h � � � c   t � � �   s � � �   q u e r y   d a t a b a s e 
 
                 a v a i l a b l e _ s l o t s   =   [ ] 
 
                 s t a r t _ t i m e   =   t i m e ( 6 ,   0 )     #   6 : 0 0   A M 
 
                 e n d _ t i m e   =   t i m e ( 2 2 ,   0 )       #   1 0 : 0 0   P M 
 
                 
 
                 c u r r e n t _ t i m e   =   s t a r t _ t i m e 
 
                 w h i l e   c u r r e n t _ t i m e   <   e n d _ t i m e : 
 
                         #   M o c k :   5 0 %   c h a n c e   s l o t   i s   a v a i l a b l e 
 
                         i f   h a s h ( f " { s e l f . i d } - { d a t e } - { c u r r e n t _ t i m e } " )   %   2   = =   0 : 
 
                                 a v a i l a b l e _ s l o t s . a p p e n d ( c u r r e n t _ t i m e . s t r f t i m e ( " % H : % M " ) ) 
 
                         c u r r e n t _ t i m e   =   t i m e ( c u r r e n t _ t i m e . h o u r   +   2 ,   c u r r e n t _ t i m e . m i n u t e ) 
 
                         
 
                 r e t u r n   a v a i l a b l e _ s l o t s 
 
         
 
         d e f   c a l c u l a t e _ p r i c e ( s e l f ,   d u r a t i o n _ h o u r s ,   v o u c h e r _ c o d e = N o n e ) : 
 
                 " " " T � � n h   g i � �   t h u � �   s � � n " " " 
 
                 b a s e _ p r i c e   =   s e l f . p r i c e _ p e r _ s l o t   *   d u r a t i o n _ h o u r s 
 
                 
 
                 i f   v o u c h e r _ c o d e : 
 
                         d i s c o u n t   =   s e l f . a p p l y _ v o u c h e r ( v o u c h e r _ c o d e ,   b a s e _ p r i c e ) 
 
                         r e t u r n   b a s e _ p r i c e   -   d i s c o u n t 
 
                 
 
                 r e t u r n   b a s e _ p r i c e 
 
         
 
         d e f   a p p l y _ v o u c h e r ( s e l f ,   v o u c h e r _ c o d e ,   a m o u n t ) : 
 
                 " " " � � p   d � � � n g   v o u c h e r   g i � � � m   g i � � " " " 
 
                 #   M o c k   i m p l e m e n t a t i o n 
 
                 v o u c h e r s   =   { 
 
                         ' W E L C O M E 1 0 ' :   0 . 1 ,     #   1 0 %   d i s c o u n t 
 
                         ' S P O R T 2 0 ' :   0 . 2 ,         #   2 0 %   d i s c o u n t 
 
                         ' V I P 3 0 ' :   0 . 3               #   3 0 %   d i s c o u n t 
 
                 } 
 
                 
 
                 d i s c o u n t _ r a t e   =   v o u c h e r s . g e t ( v o u c h e r _ c o d e ,   0 ) 
 
                 r e t u r n   a m o u n t   *   d i s c o u n t _ r a t e 
 
 ` ` ` 
 
 
 
 # # # #   3 . 2   B o o k i n g   S y s t e m 
 
 
 
 * * B o o k i n g   M o d e l : * * 
 
 ` ` ` p y t h o n 
 
 #   a p p / m o d e l s / b o o k i n g . p y 
 
 f r o m   d a t e t i m e   i m p o r t   d a t e t i m e ,   t i m e d e l t a 
 
 f r o m   d e c i m a l   i m p o r t   D e c i m a l 
 
 
 
 c l a s s   B o o k i n g : 
 
         d e f   _ _ i n i t _ _ ( s e l f ,   i d ,   f i e l d _ i d ,   c u s t o m e r _ i d ,   b o o k i n g _ d a t e ,   
 
                                   s t a r t _ t i m e ,   d u r a t i o n _ h o u r s ,   t o t a l _ a m o u n t ,   s t a t u s = ' p e n d i n g ' ) : 
 
                 s e l f . i d   =   i d 
 
                 s e l f . f i e l d _ i d   =   f i e l d _ i d 
 
                 s e l f . c u s t o m e r _ i d   =   c u s t o m e r _ i d 
 
                 s e l f . b o o k i n g _ d a t e   =   b o o k i n g _ d a t e 
 
                 s e l f . s t a r t _ t i m e   =   s t a r t _ t i m e 
 
                 s e l f . d u r a t i o n _ h o u r s   =   d u r a t i o n _ h o u r s 
 
                 s e l f . t o t a l _ a m o u n t   =   D e c i m a l ( t o t a l _ a m o u n t ) 
 
                 s e l f . s t a t u s   =   s t a t u s     #   ' p e n d i n g ' ,   ' a p p r o v e d ' ,   ' r e j e c t e d ' ,   ' c a n c e l l e d ' 
 
                 s e l f . c r e a t e d _ a t   =   d a t e t i m e . u t c n o w ( ) 
 
                 s e l f . u p d a t e d _ a t   =   d a t e t i m e . u t c n o w ( ) 
 
                 s e l f . v o u c h e r _ c o d e   =   N o n e 
 
                 s e l f . d i s c o u n t _ a m o u n t   =   D e c i m a l ( ' 0 ' ) 
 
                 
 
         d e f   g e t _ e n d _ t i m e ( s e l f ) : 
 
                 " " " T � � n h   t h � � � i   g i a n   k � � � t   t h � � c " " " 
 
                 s t a r t _ d t   =   d a t e t i m e . c o m b i n e ( s e l f . b o o k i n g _ d a t e ,   s e l f . s t a r t _ t i m e ) 
 
                 e n d _ d t   =   s t a r t _ d t   +   t i m e d e l t a ( h o u r s = s e l f . d u r a t i o n _ h o u r s ) 
 
                 r e t u r n   e n d _ d t . t i m e ( ) 
 
         
 
         d e f   i s _ c o n f l i c t ( s e l f ,   o t h e r _ b o o k i n g ) : 
 
                 " " " K i � � �m   t r a   x u n g   �  � � "!t   t h � � � i   g i a n   v � � : i   b o o k i n g   k h � � c " " " 
 
                 i f   s e l f . f i e l d _ i d   ! =   o t h e r _ b o o k i n g . f i e l d _ i d : 
 
                         r e t u r n   F a l s e 
 
                         
 
                 i f   s e l f . b o o k i n g _ d a t e   ! =   o t h e r _ b o o k i n g . b o o k i n g _ d a t e : 
 
                         r e t u r n   F a l s e 
 
                         
 
                 s e l f _ s t a r t   =   d a t e t i m e . c o m b i n e ( s e l f . b o o k i n g _ d a t e ,   s e l f . s t a r t _ t i m e ) 
 
                 s e l f _ e n d   =   s e l f _ s t a r t   +   t i m e d e l t a ( h o u r s = s e l f . d u r a t i o n _ h o u r s ) 
 
                 
 
                 o t h e r _ s t a r t   =   d a t e t i m e . c o m b i n e ( o t h e r _ b o o k i n g . b o o k i n g _ d a t e ,   o t h e r _ b o o k i n g . s t a r t _ t i m e ) 
 
                 o t h e r _ e n d   =   o t h e r _ s t a r t   +   t i m e d e l t a ( h o u r s = o t h e r _ b o o k i n g . d u r a t i o n _ h o u r s ) 
 
                 
 
                 r e t u r n   ( s e l f _ s t a r t   <   o t h e r _ e n d   a n d   s e l f _ e n d   >   o t h e r _ s t a r t ) 
 
         
 
         d e f   c a n _ c a n c e l ( s e l f ) : 
 
                 " " " K i � � �m   t r a   c � �   t h � � �  h � � � y   b o o k i n g   k h � � n g " " " 
 
                 b o o k i n g _ d a t e t i m e   =   d a t e t i m e . c o m b i n e ( s e l f . b o o k i n g _ d a t e ,   s e l f . s t a r t _ t i m e ) 
 
                 n o w   =   d a t e t i m e . n o w ( ) 
 
                 
 
                 #   C � �   t h � � �  h � � � y   t r � � � � : c   2   g i � � � 
 
                 r e t u r n   ( b o o k i n g _ d a t e t i m e   -   n o w )   >   t i m e d e l t a ( h o u r s = 2 ) 
 
         
 
         d e f   c a l c u l a t e _ r e f u n d ( s e l f ) : 
 
                 " " " T � � n h   t i � � � n   h o � � n   l � � � i   k h i   h � � � y " " " 
 
                 b o o k i n g _ d a t e t i m e   =   d a t e t i m e . c o m b i n e ( s e l f . b o o k i n g _ d a t e ,   s e l f . s t a r t _ t i m e ) 
 
                 n o w   =   d a t e t i m e . n o w ( ) 
 
                 t i m e _ d i f f   =   b o o k i n g _ d a t e t i m e   -   n o w 
 
                 
 
                 i f   t i m e _ d i f f   >   t i m e d e l t a ( h o u r s = 2 4 ) : 
 
                         r e t u r n   s e l f . t o t a l _ a m o u n t   *   D e c i m a l ( ' 0 . 8 ' )     #   H o � � n   8 0 % 
 
                 e l i f   t i m e _ d i f f   >   t i m e d e l t a ( h o u r s = 2 ) : 
 
                         r e t u r n   s e l f . t o t a l _ a m o u n t   *   D e c i m a l ( ' 0 . 5 ' )     #   H o � � n   5 0 % 
 
                 e l s e : 
 
                         r e t u r n   D e c i m a l ( ' 0 ' )     #   K h � � n g   h o � � n 
 
 ` ` ` 
 
 
 
 # # #   4 .   A P I   E n d p o i n t s 
 
 
 
 # # # #   4 . 1   R E S T f u l   A P I   D e s i g n 
 
 
 
 * * A P I   A u t h e n t i c a t i o n : * * 
 
 ` ` ` p y t h o n 
 
 #   a p p / r o u t e s / a p i / a u t h . p y 
 
 f r o m   f l a s k   i m p o r t   B l u e p r i n t ,   r e q u e s t ,   j s o n i f y 
 
 f r o m   f l a s k _ l o g i n   i m p o r t   l o g i n _ u s e r ,   l o g o u t _ u s e r ,   c u r r e n t _ u s e r 
 
 f r o m   f u n c t o o l s   i m p o r t   w r a p s 
 
 
 
 b p   =   B l u e p r i n t ( ' a p i _ a u t h ' ,   _ _ n a m e _ _ ,   u r l _ p r e f i x = ' / a p i / a u t h ' ) 
 
 
 
 d e f   t o k e n _ r e q u i r e d ( f ) : 
 
         @ w r a p s ( f ) 
 
         d e f   d e c o r a t e d ( * a r g s ,   * * k w a r g s ) : 
 
                 t o k e n   =   r e q u e s t . h e a d e r s . g e t ( ' A u t h o r i z a t i o n ' ) 
 
                 
 
                 i f   n o t   t o k e n : 
 
                         r e t u r n   j s o n i f y ( { ' m e s s a g e ' :   ' T o k e n   i s   m i s s i n g ! ' } ) ,   4 0 1 
 
                 
 
                 t r y : 
 
                         #   V e r i f y   t o k e n   ( i m p l e m e n t   J W T   v e r i f i c a t i o n ) 
 
                         u s e r   =   v e r i f y _ t o k e n ( t o k e n ) 
 
                         i f   n o t   u s e r : 
 
                                 r e t u r n   j s o n i f y ( { ' m e s s a g e ' :   ' T o k e n   i s   i n v a l i d ! ' } ) ,   4 0 1 
 
                 e x c e p t : 
 
                         r e t u r n   j s o n i f y ( { ' m e s s a g e ' :   ' T o k e n   i s   i n v a l i d ! ' } ) ,   4 0 1 
 
                 
 
                 r e t u r n   f ( * a r g s ,   * * k w a r g s ) 
 
         r e t u r n   d e c o r a t e d 
 
 
 
 @ b p . r o u t e ( ' / l o g i n ' ,   m e t h o d s = [ ' P O S T ' ] ) 
 
 d e f   a p i _ l o g i n ( ) : 
 
         d a t a   =   r e q u e s t . g e t _ j s o n ( ) 
 
         
 
         u s e r n a m e   =   d a t a . g e t ( ' u s e r n a m e ' ) 
 
         p a s s w o r d   =   d a t a . g e t ( ' p a s s w o r d ' ) 
 
         r o l e   =   d a t a . g e t ( ' r o l e ' ,   ' c u s t o m e r ' ) 
 
         
 
         u s e r   =   v a l i d a t e _ u s e r ( u s e r n a m e ,   p a s s w o r d ,   r o l e ) 
 
         
 
         i f   u s e r : 
 
                 l o g i n _ u s e r ( u s e r ) 
 
                 t o k e n   =   g e n e r a t e _ t o k e n ( u s e r ) 
 
                 r e t u r n   j s o n i f y ( { 
 
                         ' s u c c e s s ' :   T r u e , 
 
                         ' t o k e n ' :   t o k e n , 
 
                         ' u s e r ' :   { 
 
                                 ' i d ' :   u s e r . i d , 
 
                                 ' u s e r n a m e ' :   u s e r . u s e r n a m e , 
 
                                 ' r o l e ' :   u s e r . r o l e 
 
                         } 
 
                 } ) 
 
         e l s e : 
 
                 r e t u r n   j s o n i f y ( { 
 
                         ' s u c c e s s ' :   F a l s e , 
 
                         ' m e s s a g e ' :   ' I n v a l i d   c r e d e n t i a l s ' 
 
                 } ) ,   4 0 1 
 
 ` ` ` 
 
 
 
 * * F i e l d   A P I   E n d p o i n t s : * * 
 
 ` ` ` p y t h o n 
 
 #   a p p / r o u t e s / a p i / c u s t o m e r . p y 
 
 f r o m   f l a s k   i m p o r t   B l u e p r i n t ,   r e q u e s t ,   j s o n i f y 
 
 f r o m   . . m o d e l s . f i e l d   i m p o r t   F i e l d 
 
 f r o m   . . m o d e l s . b o o k i n g   i m p o r t   B o o k i n g 
 
 
 
 b p   =   B l u e p r i n t ( ' a p i _ c u s t o m e r ' ,   _ _ n a m e _ _ ,   u r l _ p r e f i x = ' / a p i / c u s t o m e r ' ) 
 
 
 
 @ b p . r o u t e ( ' / f i e l d s ' ,   m e t h o d s = [ ' G E T ' ] ) 
 
 d e f   g e t _ f i e l d s ( ) : 
 
         " " " L � � � y   d a n h   s � � c h   s � � n   t h � � �  t h a o " " " 
 
         #   Q u e r y   p a r a m e t e r s 
 
         f i e l d _ t y p e   =   r e q u e s t . a r g s . g e t ( ' t y p e ' ) 
 
         l o c a t i o n   =   r e q u e s t . a r g s . g e t ( ' l o c a t i o n ' ) 
 
         d a t e   =   r e q u e s t . a r g s . g e t ( ' d a t e ' ) 
 
         t i m e   =   r e q u e s t . a r g s . g e t ( ' t i m e ' ) 
 
         
 
         #   F i l t e r   f i e l d s   b a s e d   o n   p a r a m e t e r s 
 
         f i e l d s   =   f i l t e r _ f i e l d s ( f i e l d _ t y p e ,   l o c a t i o n ,   d a t e ,   t i m e ) 
 
         
 
         r e t u r n   j s o n i f y ( { 
 
                 ' s u c c e s s ' :   T r u e , 
 
                 ' f i e l d s ' :   [ f i e l d . t o _ d i c t ( )   f o r   f i e l d   i n   f i e l d s ] 
 
         } ) 
 
 
 
 @ b p . r o u t e ( ' / f i e l d s / < i n t : f i e l d _ i d > ' ,   m e t h o d s = [ ' G E T ' ] ) 
 
 d e f   g e t _ f i e l d _ d e t a i l ( f i e l d _ i d ) : 
 
         " " " L � � � y   c h i   t i � � � t   s � � n   t h � � �  t h a o " " " 
 
         f i e l d   =   g e t _ f i e l d _ b y _ i d ( f i e l d _ i d ) 
 
         
 
         i f   n o t   f i e l d : 
 
                 r e t u r n   j s o n i f y ( { 
 
                         ' s u c c e s s ' :   F a l s e , 
 
                         ' m e s s a g e ' :   ' F i e l d   n o t   f o u n d ' 
 
                 } ) ,   4 0 4 
 
         
 
         #   G e t   a v a i l a b i l i t y   f o r   n e x t   7   d a y s 
 
         a v a i l a b i l i t y   =   { } 
 
         f r o m   d a t e t i m e   i m p o r t   d a t e ,   t i m e d e l t a 
 
         f o r   i   i n   r a n g e ( 7 ) : 
 
                 c h e c k _ d a t e   =   d a t e . t o d a y ( )   +   t i m e d e l t a ( d a y s = i ) 
 
                 a v a i l a b i l i t y [ c h e c k _ d a t e . i s o f o r m a t ( ) ]   =   f i e l d . g e t _ a v a i l a b i l i t y ( c h e c k _ d a t e ) 
 
         
 
         r e t u r n   j s o n i f y ( { 
 
                 ' s u c c e s s ' :   T r u e , 
 
                 ' f i e l d ' :   f i e l d . t o _ d i c t ( ) , 
 
                 ' a v a i l a b i l i t y ' :   a v a i l a b i l i t y 
 
         } ) 
 
 
 
 @ b p . r o u t e ( ' / b o o k i n g s ' ,   m e t h o d s = [ ' P O S T ' ] ) 
 
 @ t o k e n _ r e q u i r e d 
 
 d e f   c r e a t e _ b o o k i n g ( ) : 
 
         " " " T � � � o   b o o k i n g   m � � : i " " " 
 
         d a t a   =   r e q u e s t . g e t _ j s o n ( ) 
 
         
 
         f i e l d _ i d   =   d a t a . g e t ( ' f i e l d _ i d ' ) 
 
         b o o k i n g _ d a t e   =   d a t a . g e t ( ' b o o k i n g _ d a t e ' ) 
 
         s t a r t _ t i m e   =   d a t a . g e t ( ' s t a r t _ t i m e ' ) 
 
         d u r a t i o n _ h o u r s   =   d a t a . g e t ( ' d u r a t i o n _ h o u r s ' ,   1 ) 
 
         v o u c h e r _ c o d e   =   d a t a . g e t ( ' v o u c h e r _ c o d e ' ) 
 
         
 
         #   V a l i d a t e   b o o k i n g 
 
         v a l i d a t i o n _ r e s u l t   =   v a l i d a t e _ b o o k i n g ( 
 
                 f i e l d _ i d ,   b o o k i n g _ d a t e ,   s t a r t _ t i m e ,   d u r a t i o n _ h o u r s ,   c u r r e n t _ u s e r . i d 
 
         ) 
 
         
 
         i f   n o t   v a l i d a t i o n _ r e s u l t [ ' v a l i d ' ] : 
 
                 r e t u r n   j s o n i f y ( { 
 
                         ' s u c c e s s ' :   F a l s e , 
 
                         ' m e s s a g e ' :   v a l i d a t i o n _ r e s u l t [ ' m e s s a g e ' ] 
 
                 } ) ,   4 0 0 
 
         
 
         #   C r e a t e   b o o k i n g 
 
         b o o k i n g   =   c r e a t e _ b o o k i n g _ r e c o r d ( 
 
                 f i e l d _ i d ,   c u r r e n t _ u s e r . i d ,   b o o k i n g _ d a t e ,   
 
                 s t a r t _ t i m e ,   d u r a t i o n _ h o u r s ,   v o u c h e r _ c o d e 
 
         ) 
 
         
 
         r e t u r n   j s o n i f y ( { 
 
                 ' s u c c e s s ' :   T r u e , 
 
                 ' b o o k i n g ' :   b o o k i n g . t o _ d i c t ( ) 
 
         } ) 
 
 
 
 @ b p . r o u t e ( ' / b o o k i n g s / < i n t : b o o k i n g _ i d > ' ,   m e t h o d s = [ ' P U T ' ] ) 
 
 @ t o k e n _ r e q u i r e d 
 
 d e f   u p d a t e _ b o o k i n g ( b o o k i n g _ i d ) : 
 
         " " " C � � � p   n h � � � t   b o o k i n g " " " 
 
         b o o k i n g   =   g e t _ b o o k i n g _ b y _ i d ( b o o k i n g _ i d ) 
 
         
 
         i f   n o t   b o o k i n g   o r   b o o k i n g . c u s t o m e r _ i d   ! =   c u r r e n t _ u s e r . i d : 
 
                 r e t u r n   j s o n i f y ( { 
 
                         ' s u c c e s s ' :   F a l s e , 
 
                         ' m e s s a g e ' :   ' B o o k i n g   n o t   f o u n d ' 
 
                 } ) ,   4 0 4 
 
         
 
         d a t a   =   r e q u e s t . g e t _ j s o n ( ) 
 
         a c t i o n   =   d a t a . g e t ( ' a c t i o n ' ) 
 
         
 
         i f   a c t i o n   = =   ' c a n c e l ' : 
 
                 i f   n o t   b o o k i n g . c a n _ c a n c e l ( ) : 
 
                         r e t u r n   j s o n i f y ( { 
 
                                 ' s u c c e s s ' :   F a l s e , 
 
                                 ' m e s s a g e ' :   ' C a n n o t   c a n c e l   b o o k i n g   l e s s   t h a n   2   h o u r s   b e f o r e   s t a r t   t i m e ' 
 
                         } ) ,   4 0 0 
 
                 
 
                 b o o k i n g . s t a t u s   =   ' c a n c e l l e d ' 
 
                 r e f u n d _ a m o u n t   =   b o o k i n g . c a l c u l a t e _ r e f u n d ( ) 
 
                 
 
                 r e t u r n   j s o n i f y ( { 
 
                         ' s u c c e s s ' :   T r u e , 
 
                         ' m e s s a g e ' :   ' B o o k i n g   c a n c e l l e d   s u c c e s s f u l l y ' , 
 
                         ' r e f u n d _ a m o u n t ' :   f l o a t ( r e f u n d _ a m o u n t ) 
 
                 } ) 
 
         
 
         r e t u r n   j s o n i f y ( { 
 
                 ' s u c c e s s ' :   F a l s e , 
 
                 ' m e s s a g e ' :   ' I n v a l i d   a c t i o n ' 
 
         } ) ,   4 0 0 
 
 ` ` ` 
 
 
 
 # # #   5 .   B u s i n e s s   L o g i c   I m p l e m e n t a t i o n 
 
 
 
 # # # #   5 . 1   B o o k i n g   V a l i d a t i o n   L o g i c 
 
 
 
 ` ` ` p y t h o n 
 
 #   a p p / s e r v i c e s / b o o k i n g _ s e r v i c e . p y 
 
 f r o m   d a t e t i m e   i m p o r t   d a t e t i m e ,   t i m e d e l t a 
 
 f r o m   . . m o d e l s . f i e l d   i m p o r t   F i e l d 
 
 f r o m   . . m o d e l s . b o o k i n g   i m p o r t   B o o k i n g 
 
 
 
 c l a s s   B o o k i n g S e r v i c e : 
 
         @ s t a t i c m e t h o d 
 
         d e f   v a l i d a t e _ b o o k i n g ( f i e l d _ i d ,   b o o k i n g _ d a t e ,   s t a r t _ t i m e ,   d u r a t i o n _ h o u r s ,   c u s t o m e r _ i d ) : 
 
                 " " " V a l i d a t e   b o o k i n g   r e q u e s t " " " 
 
                 e r r o r s   =   [ ] 
 
                 
 
                 #   C h e c k   i f   f i e l d   e x i s t s   a n d   i s   a c t i v e 
 
                 f i e l d   =   g e t _ f i e l d _ b y _ i d ( f i e l d _ i d ) 
 
                 i f   n o t   f i e l d   o r   n o t   f i e l d . i s _ a c t i v e : 
 
                         e r r o r s . a p p e n d ( " S � � n   t h � � �  t h a o   k h � � n g   t � �  n   t � � � i   h o � � � c   �  � �   b � � 9   v � �   h i � � ! u   h � � a " ) 
 
                 
 
                 #   C h e c k   i f   b o o k i n g   d a t e   i s   i n   t h e   f u t u r e 
 
                 b o o k i n g _ d a t e t i m e   =   d a t e t i m e . c o m b i n e ( b o o k i n g _ d a t e ,   s t a r t _ t i m e ) 
 
                 i f   b o o k i n g _ d a t e t i m e   < =   d a t e t i m e . n o w ( ) : 
 
                         e r r o r s . a p p e n d ( " T h � � � i   g i a n   �  � � � t   s � � n   p h � � � i   t r o n g   t � � � � n g   l a i " ) 
 
                 
 
                 #   C h e c k   i f   b o o k i n g   i s   w i t h i n   a l l o w e d   t i m e   r a n g e 
 
                 i f   s t a r t _ t i m e   <   t i m e ( 6 ,   0 )   o r   s t a r t _ t i m e   >   t i m e ( 2 2 ,   0 ) : 
 
                         e r r o r s . a p p e n d ( " T h � � � i   g i a n   �  � � � t   s � � n   p h � � � i   t � � �   6 : 0 0   �  � � � n   2 2 : 0 0 " ) 
 
                 
 
                 #   C h e c k   i f   d u r a t i o n   i s   v a l i d 
 
                 i f   d u r a t i o n _ h o u r s   <   1   o r   d u r a t i o n _ h o u r s   >   4 : 
 
                         e r r o r s . a p p e n d ( " T h � � � i   l � � � � � n g   �  � � � t   s � � n   p h � � � i   t � � �   1 - 4   g i � � � " ) 
 
                 
 
                 #   C h e c k   f o r   t i m e   c o n f l i c t s 
 
                 i f   f i e l d : 
 
                         c o n f l i c t s   =   B o o k i n g S e r v i c e . c h e c k _ t i m e _ c o n f l i c t s ( 
 
                                 f i e l d _ i d ,   b o o k i n g _ d a t e ,   s t a r t _ t i m e ,   d u r a t i o n _ h o u r s 
 
                         ) 
 
                         i f   c o n f l i c t s : 
 
                                 e r r o r s . a p p e n d ( " T h � � � i   g i a n   �  � �   �  � � � � � c   �  � � � t   t r � � � � : c " ) 
 
                 
 
                 #   C h e c k   c u s t o m e r   b o o k i n g   l i m i t 
 
                 c u s t o m e r _ b o o k i n g s   =   g e t _ c u s t o m e r _ b o o k i n g s _ t o d a y ( c u s t o m e r _ i d ,   b o o k i n g _ d a t e ) 
 
                 i f   l e n ( c u s t o m e r _ b o o k i n g s )   > =   3 : 
 
                         e r r o r s . a p p e n d ( " B � � � n   �  � �   �  � � � t   g i � � : i   h � � � n   3   b o o k i n g   m � �  i   n g � � y " ) 
 
                 
 
                 r e t u r n   { 
 
                         ' v a l i d ' :   l e n ( e r r o r s )   = =   0 , 
 
                         ' e r r o r s ' :   e r r o r s 
 
                 } 
 
         
 
         @ s t a t i c m e t h o d 
 
         d e f   c h e c k _ t i m e _ c o n f l i c t s ( f i e l d _ i d ,   b o o k i n g _ d a t e ,   s t a r t _ t i m e ,   d u r a t i o n _ h o u r s ) : 
 
                 " " " K i � � �m   t r a   x u n g   �  � � "!t   t h � � � i   g i a n " " " 
 
                 e x i s t i n g _ b o o k i n g s   =   g e t _ b o o k i n g s _ b y _ f i e l d _ d a t e ( f i e l d _ i d ,   b o o k i n g _ d a t e ) 
 
                 
 
                 n e w _ s t a r t   =   d a t e t i m e . c o m b i n e ( b o o k i n g _ d a t e ,   s t a r t _ t i m e ) 
 
                 n e w _ e n d   =   n e w _ s t a r t   +   t i m e d e l t a ( h o u r s = d u r a t i o n _ h o u r s ) 
 
                 
 
                 f o r   b o o k i n g   i n   e x i s t i n g _ b o o k i n g s : 
 
                         i f   b o o k i n g . s t a t u s   i n   [ ' p e n d i n g ' ,   ' a p p r o v e d ' ] : 
 
                                 b o o k i n g _ s t a r t   =   d a t e t i m e . c o m b i n e ( b o o k i n g _ d a t e ,   b o o k i n g . s t a r t _ t i m e ) 
 
                                 b o o k i n g _ e n d   =   b o o k i n g _ s t a r t   +   t i m e d e l t a ( h o u r s = b o o k i n g . d u r a t i o n _ h o u r s ) 
 
                                 
 
                                 i f   ( n e w _ s t a r t   <   b o o k i n g _ e n d   a n d   n e w _ e n d   >   b o o k i n g _ s t a r t ) : 
 
                                         r e t u r n   T r u e 
 
                 
 
                 r e t u r n   F a l s e 
 
         
 
         @ s t a t i c m e t h o d 
 
         d e f   c a l c u l a t e _ b o o k i n g _ p r i c e ( f i e l d ,   d u r a t i o n _ h o u r s ,   v o u c h e r _ c o d e = N o n e ) : 
 
                 " " " T � � n h   g i � �   b o o k i n g " " " 
 
                 b a s e _ p r i c e   =   f i e l d . p r i c e _ p e r _ s l o t   *   d u r a t i o n _ h o u r s 
 
                 
 
                 i f   v o u c h e r _ c o d e : 
 
                         d i s c o u n t   =   B o o k i n g S e r v i c e . a p p l y _ v o u c h e r ( v o u c h e r _ c o d e ,   b a s e _ p r i c e ) 
 
                         r e t u r n   b a s e _ p r i c e   -   d i s c o u n t 
 
                 
 
                 r e t u r n   b a s e _ p r i c e 
 
         
 
         @ s t a t i c m e t h o d 
 
         d e f   a p p l y _ v o u c h e r ( v o u c h e r _ c o d e ,   a m o u n t ) : 
 
                 " " " � � p   d � � � n g   v o u c h e r   g i � � � m   g i � � " " " 
 
                 v o u c h e r   =   g e t _ v o u c h e r _ b y _ c o d e ( v o u c h e r _ c o d e ) 
 
                 
 
                 i f   n o t   v o u c h e r   o r   n o t   v o u c h e r . i s _ v a l i d ( ) : 
 
                         r e t u r n   D e c i m a l ( ' 0 ' ) 
 
                 
 
                 i f   v o u c h e r . d i s c o u n t _ t y p e   = =   ' p e r c e n t a g e ' : 
 
                         r e t u r n   a m o u n t   *   ( v o u c h e r . d i s c o u n t _ v a l u e   /   1 0 0 ) 
 
                 e l s e : 
 
                         r e t u r n   m i n ( v o u c h e r . d i s c o u n t _ v a l u e ,   a m o u n t ) 
 
 ` ` ` 
 
 
 
 # # #   6 .   S e c u r i t y   I m p l e m e n t a t i o n 
 
 
 
 # # # #   6 . 1   C S R F   P r o t e c t i o n 
 
 
 
 ` ` ` p y t h o n 
 
 #   a p p / u t i l s / s e c u r i t y . p y 
 
 f r o m   f l a s k _ w t f . c s r f   i m p o r t   C S R F P r o t e c t 
 
 f r o m   f l a s k   i m p o r t   r e q u e s t ,   a b o r t 
 
 
 
 c s r f   =   C S R F P r o t e c t ( ) 
 
 
 
 d e f   i n i t _ c s r f ( a p p ) : 
 
         c s r f . i n i t _ a p p ( a p p ) 
 
         
 
         @ a p p . b e f o r e _ r e q u e s t 
 
         d e f   c s r f _ p r o t e c t ( ) : 
 
                 i f   r e q u e s t . m e t h o d   = =   " P O S T " : 
 
                         t o k e n   =   r e q u e s t . f o r m . g e t ( ' c s r f _ t o k e n ' ) 
 
                         i f   n o t   t o k e n   o r   n o t   c s r f . v a l i d a t e _ t o k e n ( t o k e n ) : 
 
                                 a b o r t ( 4 0 0 ,   d e s c r i p t i o n = " C S R F   t o k e n   m i s s i n g   o r   i n v a l i d " ) 
 
 
 
 d e f   g e n e r a t e _ c s r f _ t o k e n ( ) : 
 
         r e t u r n   c s r f . _ g e t _ t o k e n ( ) 
 
 ` ` ` 
 
 
 
 # # # #   6 . 2   I n p u t   V a l i d a t i o n   &   S a n i t i z a t i o n 
 
 
 
 ` ` ` p y t h o n 
 
 #   a p p / u t i l s / v a l i d a t i o n . p y 
 
 i m p o r t   r e 
 
 f r o m   w e r k z e u g . s e c u r i t y   i m p o r t   s a f e _ s t r _ c m p 
 
 
 
 c l a s s   I n p u t V a l i d a t o r : 
 
         @ s t a t i c m e t h o d 
 
         d e f   v a l i d a t e _ e m a i l ( e m a i l ) : 
 
                 " " " V a l i d a t e   e m a i l   f o r m a t " " " 
 
                 p a t t e r n   =   r ' ^ [ a - z A - Z 0 - 9 . _ % + - ] + @ [ a - z A - Z 0 - 9 . - ] + \ . [ a - z A - Z ] { 2 , } $ ' 
 
                 r e t u r n   r e . m a t c h ( p a t t e r n ,   e m a i l )   i s   n o t   N o n e 
 
         
 
         @ s t a t i c m e t h o d 
 
         d e f   v a l i d a t e _ p h o n e ( p h o n e ) : 
 
                 " " " V a l i d a t e   V i e t n a m e s e   p h o n e   n u m b e r " " " 
 
                 p a t t e r n   =   r ' ^ ( 0 | \ + 8 4 ) [ 3 | 5 | 7 | 8 | 9 ] [ 0 - 9 ] { 8 } $ ' 
 
                 r e t u r n   r e . m a t c h ( p a t t e r n ,   p h o n e )   i s   n o t   N o n e 
 
         
 
         @ s t a t i c m e t h o d 
 
         d e f   v a l i d a t e _ p a s s w o r d ( p a s s w o r d ) : 
 
                 " " " V a l i d a t e   p a s s w o r d   s t r e n g t h " " " 
 
                 i f   l e n ( p a s s w o r d )   <   8 : 
 
                         r e t u r n   F a l s e ,   " M � � � t   k h � � � u   p h � � � i   c � �   � � t   n h � � � t   8   k � �   t � � � " 
 
                 
 
                 i f   n o t   r e . s e a r c h ( r ' [ A - Z ] ' ,   p a s s w o r d ) : 
 
                         r e t u r n   F a l s e ,   " M � � � t   k h � � � u   p h � � � i   c � �   � � t   n h � � � t   1   c h � � �   h o a " 
 
                 
 
                 i f   n o t   r e . s e a r c h ( r ' [ a - z ] ' ,   p a s s w o r d ) : 
 
                         r e t u r n   F a l s e ,   " M � � � t   k h � � � u   p h � � � i   c � �   � � t   n h � � � t   1   c h � � �   t h � � � � � n g " 
 
                 
 
                 i f   n o t   r e . s e a r c h ( r ' \ d ' ,   p a s s w o r d ) : 
 
                         r e t u r n   F a l s e ,   " M � � � t   k h � � � u   p h � � � i   c � �   � � t   n h � � � t   1   s � �  " 
 
                 
 
                 r e t u r n   T r u e ,   " M � � � t   k h � � � u   h � � � p   l � � ! " 
 
         
 
         @ s t a t i c m e t h o d 
 
         d e f   s a n i t i z e _ i n p u t ( t e x t ) : 
 
                 " " " S a n i t i z e   u s e r   i n p u t " " " 
 
                 #   R e m o v e   p o t e n t i a l l y   d a n g e r o u s   c h a r a c t e r s 
 
                 d a n g e r o u s _ c h a r s   =   [ ' < ' ,   ' > ' ,   ' " ' ,   " ' " ,   ' & ' ] 
 
                 f o r   c h a r   i n   d a n g e r o u s _ c h a r s : 
 
                         t e x t   =   t e x t . r e p l a c e ( c h a r ,   ' ' ) 
 
                 
 
                 #   L i m i t   l e n g t h 
 
                 i f   l e n ( t e x t )   >   1 0 0 0 : 
 
                         t e x t   =   t e x t [ : 1 0 0 0 ] 
 
                 
 
                 r e t u r n   t e x t . s t r i p ( ) 
 
 ` ` ` 
 
 
 
 # # #   7 .   T e s t i n g   I m p l e m e n t a t i o n 
 
 
 
 # # # #   7 . 1   U n i t   T e s t s 
 
 
 
 ` ` ` p y t h o n 
 
 #   t e s t s / t e s t _ m o d e l s . p y 
 
 i m p o r t   u n i t t e s t 
 
 f r o m   a p p . m o d e l s . b o o k i n g   i m p o r t   B o o k i n g 
 
 f r o m   a p p . m o d e l s . f i e l d   i m p o r t   F i e l d 
 
 f r o m   d a t e t i m e   i m p o r t   d a t e t i m e ,   t i m e ,   d a t e 
 
 
 
 c l a s s   T e s t B o o k i n g M o d e l ( u n i t t e s t . T e s t C a s e ) : 
 
         d e f   s e t U p ( s e l f ) : 
 
                 s e l f . f i e l d   =   F i e l d ( 
 
                         i d = 1 , 
 
                         n a m e = " S � � n   B � � n g   � � � �   A " , 
 
                         f i e l d _ t y p e = " f o o t b a l l " , 
 
                         l o c a t i o n = " Q u � � � n   1 ,   T P . H C M " , 
 
                         p r i c e _ p e r _ s l o t = 2 0 0 0 0 0 
 
                 ) 
 
                 
 
                 s e l f . b o o k i n g   =   B o o k i n g ( 
 
                         i d = 1 , 
 
                         f i e l d _ i d = 1 , 
 
                         c u s t o m e r _ i d = 1 , 
 
                         b o o k i n g _ d a t e = d a t e ( 2 0 2 4 ,   1 ,   1 5 ) , 
 
                         s t a r t _ t i m e = t i m e ( 1 8 ,   0 ) , 
 
                         d u r a t i o n _ h o u r s = 2 , 
 
                         t o t a l _ a m o u n t = 4 0 0 0 0 0 
 
                 ) 
 
         
 
         d e f   t e s t _ b o o k i n g _ e n d _ t i m e _ c a l c u l a t i o n ( s e l f ) : 
 
                 " " " T e s t   e n d   t i m e   c a l c u l a t i o n " " " 
 
                 e n d _ t i m e   =   s e l f . b o o k i n g . g e t _ e n d _ t i m e ( ) 
 
                 e x p e c t e d _ t i m e   =   t i m e ( 2 0 ,   0 ) 
 
                 s e l f . a s s e r t E q u a l ( e n d _ t i m e ,   e x p e c t e d _ t i m e ) 
 
         
 
         d e f   t e s t _ b o o k i n g _ c o n f l i c t _ d e t e c t i o n ( s e l f ) : 
 
                 " " " T e s t   b o o k i n g   c o n f l i c t   d e t e c t i o n " " " 
 
                 o t h e r _ b o o k i n g   =   B o o k i n g ( 
 
                         i d = 2 , 
 
                         f i e l d _ i d = 1 , 
 
                         c u s t o m e r _ i d = 2 , 
 
                         b o o k i n g _ d a t e = d a t e ( 2 0 2 4 ,   1 ,   1 5 ) , 
 
                         s t a r t _ t i m e = t i m e ( 1 9 ,   0 ) , 
 
                         d u r a t i o n _ h o u r s = 2 , 
 
                         t o t a l _ a m o u n t = 4 0 0 0 0 0 
 
                 ) 
 
                 
 
                 s e l f . a s s e r t T r u e ( s e l f . b o o k i n g . i s _ c o n f l i c t ( o t h e r _ b o o k i n g ) ) 
 
         
 
         d e f   t e s t _ b o o k i n g _ c a n c e l l a t i o n _ e l i g i b i l i t y ( s e l f ) : 
 
                 " " " T e s t   b o o k i n g   c a n c e l l a t i o n   e l i g i b i l i t y " " " 
 
                 #   B o o k i n g   i s   i n   t h e   f u t u r e ,   s h o u l d   b e   c a n c e l l a b l e 
 
                 s e l f . a s s e r t T r u e ( s e l f . b o o k i n g . c a n _ c a n c e l ( ) ) 
 
                 
 
                 #   M o d i f y   b o o k i n g   t o   b e   i n   t h e   p a s t 
 
                 s e l f . b o o k i n g . b o o k i n g _ d a t e   =   d a t e ( 2 0 2 4 ,   1 ,   1 ) 
 
                 s e l f . a s s e r t F a l s e ( s e l f . b o o k i n g . c a n _ c a n c e l ( ) ) 
 
 
 
 c l a s s   T e s t F i e l d M o d e l ( u n i t t e s t . T e s t C a s e ) : 
 
         d e f   s e t U p ( s e l f ) : 
 
                 s e l f . f i e l d   =   F i e l d ( 
 
                         i d = 1 , 
 
                         n a m e = " S � � n   T e n n i s   P r o " , 
 
                         f i e l d _ t y p e = " t e n n i s " , 
 
                         l o c a t i o n = " Q u � � � n   2 ,   T P . H C M " , 
 
                         p r i c e _ p e r _ s l o t = 3 0 0 0 0 0 
 
                 ) 
 
         
 
         d e f   t e s t _ p r i c e _ c a l c u l a t i o n ( s e l f ) : 
 
                 " " " T e s t   p r i c e   c a l c u l a t i o n   w i t h   v o u c h e r " " " 
 
                 p r i c e   =   s e l f . f i e l d . c a l c u l a t e _ p r i c e ( 2 ,   " W E L C O M E 1 0 " ) 
 
                 e x p e c t e d _ p r i c e   =   3 0 0 0 0 0   *   2   *   0 . 9     #   1 0 %   d i s c o u n t 
 
                 s e l f . a s s e r t E q u a l ( p r i c e ,   e x p e c t e d _ p r i c e ) 
 
         
 
         d e f   t e s t _ a v a i l a b i l i t y _ g e n e r a t i o n ( s e l f ) : 
 
                 " " " T e s t   a v a i l a b i l i t y   g e n e r a t i o n " " " 
 
                 a v a i l a b i l i t y   =   s e l f . f i e l d . g e t _ a v a i l a b i l i t y ( d a t e ( 2 0 2 4 ,   1 ,   1 5 ) ) 
 
                 s e l f . a s s e r t I s I n s t a n c e ( a v a i l a b i l i t y ,   l i s t ) 
 
                 s e l f . a s s e r t T r u e ( l e n ( a v a i l a b i l i t y )   >   0 ) 
 
 ` ` ` 
 
 
 
 # # #   8 .   D e p l o y m e n t   &   P r o d u c t i o n   C o n f i g u r a t i o n 
 
 
 
 # # # #   8 . 1   P r o d u c t i o n   W S G I   C o n f i g u r a t i o n 
 
 
 
 ` ` ` p y t h o n 
 
 #   w s g i . p y 
 
 f r o m   a p p   i m p o r t   c r e a t e _ a p p 
 
 f r o m   a p p . c o n f i g   i m p o r t   P r o d u c t i o n C o n f i g 
 
 
 
 a p p   =   c r e a t e _ a p p ( P r o d u c t i o n C o n f i g ) 
 
 
 
 i f   _ _ n a m e _ _   = =   " _ _ m a i n _ _ " : 
 
         a p p . r u n ( ) 
 
 ` ` ` 
 
 
 
 # # # #   8 . 2   D o c k e r   C o n f i g u r a t i o n 
 
 
 
 ` ` ` d o c k e r f i l e 
 
 #   D o c k e r f i l e 
 
 F R O M   p y t h o n : 3 . 9 - s l i m 
 
 
 
 #   S e t   w o r k i n g   d i r e c t o r y 
 
 W O R K D I R   / a p p 
 
 
 
 #   I n s t a l l   s y s t e m   d e p e n d e n c i e s 
 
 R U N   a p t - g e t   u p d a t e   & &   a p t - g e t   i n s t a l l   - y   \ 
 
         g c c   \ 
 
         & &   r m   - r f   / v a r / l i b / a p t / l i s t s / * 
 
 
 
 #   C o p y   r e q u i r e m e n t s   a n d   i n s t a l l   P y t h o n   d e p e n d e n c i e s 
 
 C O P Y   r e q u i r e m e n t s . t x t   . 
 
 R U N   p i p   i n s t a l l   - - n o - c a c h e - d i r   - r   r e q u i r e m e n t s . t x t 
 
 
 
 #   C o p y   a p p l i c a t i o n   c o d e 
 
 C O P Y   .   . 
 
 
 
 #   C r e a t e   n o n - r o o t   u s e r 
 
 R U N   u s e r a d d   - m   - u   1 0 0 0   s p o r t s l o t   & &   c h o w n   - R   s p o r t s l o t : s p o r t s l o t   / a p p 
 
 U S E R   s p o r t s l o t 
 
 
 
 #   E x p o s e   p o r t 
 
 E X P O S E   5 0 0 0 
 
 
 
 #   R u n   a p p l i c a t i o n 
 
 C M D   [ " g u n i c o r n " ,   " - - b i n d " ,   " 0 . 0 . 0 . 0 : 5 0 0 0 " ,   " - - w o r k e r s " ,   " 4 " ,   " w s g i : a p p " ] 
 
 ` ` ` 
 
 
 
 # # # #   8 . 3   E n v i r o n m e n t   C o n f i g u r a t i o n 
 
 
 
 ` ` ` b a s h 
 
 #   . e n v . p r o d u c t i o n 
 
 F L A S K _ E N V = p r o d u c t i o n 
 
 S E C R E T _ K E Y = y o u r - s u p e r - s e c r e t - p r o d u c t i o n - k e y - h e r e 
 
 D A T A B A S E _ U R L = p o s t g r e s q l : / / u s e r : p a s s w o r d @ l o c a l h o s t / s p o r t s l o t _ p r o d 
 
 M A I L _ S E R V E R = s m t p . g m a i l . c o m 
 
 M A I L _ P O R T = 5 8 7 
 
 M A I L _ U S E _ T L S = T r u e 
 
 M A I L _ U S E R N A M E = y o u r - e m a i l @ g m a i l . c o m 
 
 M A I L _ P A S S W O R D = y o u r - a p p - p a s s w o r d 
 
 R E D I S _ U R L = r e d i s : / / l o c a l h o s t : 6 3 7 9 / 0 
 
 ` ` ` 
 
 
 
 # #   T � � m   t � � � t   B a c k - e n d   I m p l e m e n t a t i o n 
 
 
 
 # # #   C � � c   t � � n h   n � �n g   c h � � n h   �  � �   t r i � � �n   k h a i : 
 
 
 
 1 .   * * K i � � � n   t r � � c   F l a s k   A p p l i c a t i o n   F a c t o r y   P a t t e r n * *   -   T � � � o   � � � n g   d � � � n g   l i n h   h o � � � t   v � � : i   c � � � u   h � � n h   t h e o   m � � i   t r � � � � � n g 
 
 2 .   * * A u t h e n t i c a t i o n   &   A u t h o r i z a t i o n * *   -   H � � !   t h � �  n g   �  � �n g   n h � � � p   v � � : i   F l a s k - L o g i n   v � �   r o l e - b a s e d   a c c e s s   c o n t r o l 
 
 3 .   * * D a t a   M o d e l s * *   -   C � � c   m o d e l   c h o   U s e r ,   F i e l d ,   B o o k i n g ,   P a y m e n t   v � � : i   b u s i n e s s   l o g i c   �  � � � y   �  � � � 
 
 4 .   * * R E S T f u l   A P I * *   -   A P I   e n d p o i n t s   c h o   c u s t o m e r ,   o w n e r   v � � : i   a u t h e n t i c a t i o n   v � �   v a l i d a t i o n 
 
 5 .   * * B u s i n e s s   L o g i c * *   -   B o o k i n g   v a l i d a t i o n ,   p a y m e n t   p r o c e s s i n g ,   n o t i f i c a t i o n   s y s t e m 
 
 6 .   * * S e c u r i t y * *   -   C S R F   p r o t e c t i o n ,   i n p u t   v a l i d a t i o n ,   p a s s w o r d   h a s h i n g 
 
 7 .   * * E r r o r   H a n d l i n g   &   L o g g i n g * *   -   C u s t o m   e r r o r   h a n d l e r s   v � �   l o g g i n g   c o n f i g u r a t i o n 
 
 8 .   * * P e r f o r m a n c e   O p t i m i z a t i o n * *   -   C a c h i n g ,   d a t a b a s e   q u e r y   o p t i m i z a t i o n ,   b a c k g r o u n d   t a s k s 
 
 9 .   * * T e s t i n g * *   -   U n i t   t e s t s   v � �   i n t e g r a t i o n   t e s t s   c h o   m o d e l s   v � �   A P I   e n d p o i n t s 
 
 1 0 .   * * D e p l o y m e n t * *   -   P r o d u c t i o n   c o n f i g u r a t i o n   v � � : i   D o c k e r   v � �   e n v i r o n m e n t   s e t u p 
 
 
 
 # # #   C � � n g   n g h � � !   s � � �   d � � � n g : 
 
 
 
 -   * * F l a s k * *   -   W e b   f r a m e w o r k   c h � � n h 
 
 -   * * F l a s k - L o g i n * *   -   U s e r   s e s s i o n   m a n a g e m e n t 
 
 -   * * F l a s k - M a i l * *   -   E m a i l   f u n c t i o n a l i t y 
 
 -   * * W e r k z e u g * *   -   S e c u r i t y   u t i l i t i e s 
 
 -   * * C e l e r y * *   -   B a c k g r o u n d   t a s k   p r o c e s s i n g 
 
 -   * * S Q L A l c h e m y * *   -   D a t a b a s e   O R M   ( c h o   p r o d u c t i o n ) 
 
 -   * * J W T * *   -   T o k e n - b a s e d   a u t h e n t i c a t i o n   c h o   A P I 
 
 -   * * R e d i s * *   -   C a c h i n g   v � �   m e s s a g e   b r o k e r 
 
 -   * * G u n i c o r n * *   -   W S G I   s e r v e r   c h o   p r o d u c t i o n 
 
 -   * * D o c k e r * *   -   C o n t a i n e r i z a t i o n 
 
 
 
 # # #   M � �   h � � n h   d � � �   l i � � ! u : 
 
 
 
 1 .   * * U s e r   M o d e l * *   -   Q u � � � n   l � �   n g � � � � � i   d � � n g   v � � : i   r o l e s   ( c u s t o m e r ,   o w n e r ,   a d m i n ) 
 
 2 .   * * F i e l d   M o d e l * *   -   Q u � � � n   l � �   s � � n   t h � � �  t h a o   v � � : i   a v a i l a b i l i t y   v � �   p r i c i n g 
 
 3 .   * * B o o k i n g   M o d e l * *   -   Q u � � � n   l � �   �  � � � t   s � � n   v � � : i   c o n f l i c t   d e t e c t i o n   v � �   c a n c e l l a t i o n   l o g i c 
 
 4 .   * * P a y m e n t   M o d e l * *   -   X � � �   l � �   t h a n h   t o � � n   v � � : i   m u l t i p l e   p a y m e n t   m e t h o d s 
 
 5 .   * * N o t i f i c a t i o n   M o d e l * *   -   H � � !   t h � �  n g   t h � � n g   b � � o   r e a l - t i m e 
 
 
 
 # # #   A P I   E n d p o i n t s : 
 
 
 
 1 .   * * A u t h e n t i c a t i o n   A P I * *   -   L o g i n ,   r e g i s t e r ,   t o k e n   m a n a g e m e n t 
 
 2 .   * * C u s t o m e r   A P I * *   -   F i e l d   l i s t i n g ,   b o o k i n g   m a n a g e m e n t ,   p a y m e n t   p r o c e s s i n g 
 
 3 .   * * O w n e r   A P I * *   -   F i e l d   m a n a g e m e n t ,   b o o k i n g   a p p r o v a l ,   r e v e n u e   t r a c k i n g 
 
 4 .   * * A d m i n   A P I * *   -   U s e r   m a n a g e m e n t ,   s y s t e m   m o n i t o r i n g ,   r e p o r t i n g 
 
 
 
 # # #   S e c u r i t y   F e a t u r e s : 
 
 
 
 1 .   * * P a s s w o r d   H a s h i n g * *   -   B c r y p t   h a s h i n g   c h o   m � � � t   k h � � � u 
 
 2 .   * * C S R F   P r o t e c t i o n * *   -   C r o s s - s i t e   r e q u e s t   f o r g e r y   p r o t e c t i o n 
 
 3 .   * * I n p u t   V a l i d a t i o n * *   -   S a n i t i z a t i o n   v � �   v a l i d a t i o n   c h o   u s e r   i n p u t 
 
 4 .   * * R o l e - b a s e d   A c c e s s * *   -   A u t h o r i z a t i o n   t h e o   v a i   t r � �   n g � � � � � i   d � � n g 
 
 5 .   * * S e s s i o n   M a n a g e m e n t * *   -   S e c u r e   s e s s i o n   h a n d l i n g 
 
 
 
 # # #   P e r f o r m a n c e   F e a t u r e s : 
 
 
 
 1 .   * * C a c h i n g * *   -   R e d i s   c a c h i n g   c h o   e x p e n s i v e   o p e r a t i o n s 
 
 2 .   * * D a t a b a s e   O p t i m i z a t i o n * *   -   Q u e r y   o p t i m i z a t i o n   v � � : i   p r o p e r   i n d e x i n g 
 
 3 .   * * B a c k g r o u n d   T a s k s * *   -   C e l e r y   c h o   n o n - b l o c k i n g   o p e r a t i o n s 
 
 4 .   * * C o n n e c t i o n   P o o l i n g * *   -   D a t a b a s e   c o n n e c t i o n   m a n a g e m e n t 
 
 5 .   * * L o a d   B a l a n c i n g * *   -   M u l t i p l e   w o r k e r   p r o c e s s e s   v � � : i   G u n i c o r n 
 
 
 
 # # #   T e s t i n g   S t r a t e g y : 
 
 
 
 1 .   * * U n i t   T e s t s * *   -   T e s t i n g   i n d i v i d u a l   m o d e l s   v � �   b u s i n e s s   l o g i c 
 
 2 .   * * I n t e g r a t i o n   T e s t s * *   -   T e s t i n g   A P I   e n d p o i n t s   v � �   d a t a b a s e   o p e r a t i o n s 
 
 3 .   * * M o c k   T e s t i n g * *   -   M o c k   e x t e r n a l   s e r v i c e s   v � �   d e p e n d e n c i e s 
 
 4 .   * * P e r f o r m a n c e   T e s t i n g * *   -   L o a d   t e s t i n g   c h o   c r i t i c a l   e n d p o i n t s 
 
 
 
 # # #   D e p l o y m e n t   S t r a t e g y : 
 
 
 
 1 .   * * E n v i r o n m e n t   C o n f i g u r a t i o n * *   -   S e p a r a t e   c o n f i g s   c h o   d e v e l o p m e n t ,   t e s t i n g ,   p r o d u c t i o n 
 
 2 .   * * C o n t a i n e r i z a t i o n * *   -   D o c k e r   c h o   c o n s i s t e n t   d e p l o y m e n t 
 
 3 .   * * P r o c e s s   M a n a g e m e n t * *   -   G u n i c o r n   v � � : i   m u l t i p l e   w o r k e r s 
 
 4 .   * * M o n i t o r i n g * *   -   L o g g i n g   v � �   e r r o r   t r a c k i n g 
 
 5 .   * * B a c k u p   S t r a t e g y * *   -   D a t a b a s e   b a c k u p   v � �   r e c o v e r y   p r o c e d u r e s   
 
 