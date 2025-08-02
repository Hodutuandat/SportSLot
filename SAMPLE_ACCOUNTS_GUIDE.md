# 📋 Hướng Dẫn Sử Dụng Tài Khoản Mẫu SportSlot

## 🎯 Tổng Quan
Dự án SportSlot đã được tạo sẵn 3 tài khoản mẫu để bạn có thể test các chức năng khác nhau của hệ thống.

## 👥 Danh Sách Tài Khoản Mẫu

### 1. 🏃‍♂️ Customer (Khách Hàng)
- **Username:** `customer_demo`
- **Password:** `customer123`
- **Email:** `customer@sportslot.com`
- **Họ tên:** Nguyễn Văn Khách Hàng
- **Chức năng:** Đặt sân, thanh toán, xem lịch sử, đánh giá

### 2. 🏟️ Owner (Chủ Sân)
- **Username:** `owner_demo`
- **Password:** `owner123`
- **Email:** `owner@sportslot.com`
- **Họ tên:** Trần Thị Chủ Sân
- **Chức năng:** Quản lý sân, xem đặt sân, quản lý doanh thu

### 3. 👨‍💼 Admin (Quản Trị Viên)
- **Username:** `admin_demo`
- **Password:** `admin123`
- **Email:** `admin@sportslot.com`
- **Họ tên:** Lê Văn Quản Trị
- **Chức năng:** Quản lý toàn bộ hệ thống, người dùng, báo cáo

## 🚀 Cách Sử Dụng

### Bước 1: Khởi động ứng dụng
```bash
python run.py
```

### Bước 2: Truy cập ứng dụng
Mở trình duyệt và truy cập: `http://localhost:5000`

### Bước 3: Đăng nhập
1. Click vào nút "Đăng nhập" trên trang chủ
2. Nhập thông tin tài khoản tương ứng
3. Click "Đăng nhập"

## 🔧 Test Các Chức Năng

### Với tài khoản Customer:
- ✅ Xem danh sách sân bóng
- ✅ Đặt sân bóng
- ✅ Thanh toán online
- ✅ Xem lịch sử đặt sân
- ✅ Viết đánh giá
- ✅ Quản lý profile

### Với tài khoản Owner:
- ✅ Thêm/sửa/xóa sân bóng
- ✅ Xem lịch đặt sân
- ✅ Quản lý doanh thu
- ✅ Xem thống kê

### Với tài khoản Admin:
- ✅ Quản lý tất cả người dùng
- ✅ Xem báo cáo hệ thống
- ✅ Quản lý voucher
- ✅ Xem activity log

## ⚠️ Lưu Ý Quan Trọng

1. **Bảo mật:** Đây là tài khoản demo, không nên sử dụng trong môi trường production
2. **Database:** Đảm bảo MongoDB đang chạy trước khi sử dụng
3. **Môi trường:** Script này chỉ chạy được trong môi trường development

## 🔄 Tạo Lại Tài Khoản Mẫu

Nếu bạn muốn tạo lại các tài khoản mẫu, chạy lệnh:
```bash
python create_sample_accounts.py
```

## 📞 Hỗ Trợ

Nếu gặp vấn đề khi sử dụng các tài khoản mẫu, hãy kiểm tra:
1. MongoDB có đang chạy không
2. Các dependencies đã được cài đặt chưa
3. File `.env` đã được cấu hình đúng chưa

---
*Tạo bởi: SportSlot Development Team* 