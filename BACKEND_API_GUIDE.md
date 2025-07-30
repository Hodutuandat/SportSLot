# 🚀 SportSlot Backend API Guide

## ✅ **HỆ THỐNG BACKEND ĐÃ HOÀN THIỆN!**

SportSlot đã được cập nhật với hệ thống backend toàn diện sử dụng **Flask + MongoDB** và **JWT Authentication**.

---

## 🏗️ **KIẾN TRÚC HỆ THỐNG**

### **📁 Cấu Trúc Backend:**
```
app/
├── models/                 # MongoDB Models
│   ├── user.py            # User model với authentication
│   ├── field.py           # Field model cho sân thể thao
│   ├── booking.py         # Booking model cho đặt sân
│   ├── payment.py         # Payment model cho thanh toán
│   ├── voucher.py         # Voucher model cho khuyến mãi
│   ├── notification.py    # Notification model cho thông báo
│   ├── profile.py         # Profile model cho hồ sơ cá nhân
│   └── review.py          # Review model cho đánh giá
├── routes/
│   ├── api/               # RESTful API Routes
│   │   ├── auth.py        # Authentication API
│   │   ├── customer.py    # Customer API
│   │   └── owner.py       # Owner API
├── utils/
│   └── jwt_auth.py        # JWT Authentication Helpers
```

---

## 🔐 **AUTHENTICATION SYSTEM**

### **JWT Token Authentication:**
- **Token Generation:** `generate_token(user_id, user_type, expires_in=24*60*60)`
- **Token Verification:** `verify_token(token)`
- **Role-based Access:** Customer, Owner, Admin decorators

### **API Authentication Endpoints:**
```http
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/profile
```

---

## 👤 **CUSTOMER API ENDPOINTS**

### **🏟️ Fields Management:**
```http
GET  /api/customer/fields/featured     # Sân nổi bật cho homepage
GET  /api/customer/fields              # Danh sách sân với filter
GET  /api/customer/fields/<field_id>   # Chi tiết sân và availability
```

### **📅 Booking Management:**
```http
POST /api/customer/bookings                    # Tạo booking mới
GET  /api/customer/users/<user_id>/bookings    # Lịch sử đặt sân
```

### **🎫 Voucher Management:**
```http
GET  /api/customer/vouchers/active             # Voucher đang hoạt động
GET  /api/customer/users/<user_id>/vouchers    # Voucher của user
```

### **💳 Payment Management:**
```http
POST /api/customer/payments                    # Tạo thanh toán
GET  /api/customer/users/<user_id>/payments    # Lịch sử thanh toán
```

### **👤 Profile Management:**
```http
PUT  /api/customer/users/<user_id>             # Cập nhật hồ sơ
```

---

## 🏢 **OWNER API ENDPOINTS**

### **📊 Dashboard & Statistics:**
```http
GET  /api/owner/owners/<owner_id>/dashboard    # Thống kê dashboard
GET  /api/owner/owners/<owner_id>/stats        # Thống kê doanh thu
```

### **🏟️ Field Management:**
```http
POST   /api/owner/fields                       # Tạo sân mới
PUT    /api/owner/fields/<field_id>            # Cập nhật sân
DELETE /api/owner/fields/<field_id>            # Xóa sân
```

### **📅 Booking Management:**
```http
GET  /api/owner/owners/<owner_id>/bookings     # Danh sách booking
PUT  /api/owner/bookings/<booking_id>/status   # Duyệt booking
```

### **🔔 Notification Management:**
```http
GET  /api/owner/owners/<owner_id>/notifications # Thông báo
```

### **💳 Payment Management:**
```http
GET  /api/owner/owners/<owner_id>/payments     # Lịch sử thanh toán
```

### **👤 Profile Management:**
```http
PUT  /api/owner/owners/<owner_id>              # Cập nhật hồ sơ
```

---

## 🗃️ **MONGODB SCHEMA DESIGN**

### **📋 Collections:**
- **`users`** - Người dùng (customer, owner, admin)
- **`fields`** - Sân thể thao
- **`bookings`** - Lịch đặt sân
- **`payments`** - Giao dịch thanh toán
- **`vouchers`** - Voucher và khuyến mãi
- **`notifications`** - Thông báo hệ thống
- **`profiles`** - Hồ sơ cá nhân
- **`reviews`** - Đánh giá và nhận xét

---

## 🔧 **TECHNICAL FEATURES**

### **✅ Đã Triển Khai:**
- **JWT Authentication** với role-based access control
- **RESTful API Design** với JSON responses
- **MongoDB Integration** với PyMongo
- **Input Validation** cho tất cả endpoints
- **Error Handling** với meaningful messages
- **CORS Support** cho cross-origin requests
- **Pagination** cho danh sách dữ liệu
- **Search & Filtering** cho fields và bookings

---

## 🚀 **CÁCH SỬ DỤNG**

### **1. Cài Đặt Dependencies:**
```bash
pip install -r requirements.txt
```

### **2. Chạy Application:**
```bash
python run.py
```

### **3. Test API:**
```bash
python test_api_endpoints.py
```

---

## 📡 **API RESPONSE FORMAT**

### **✅ Success Response:**
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful"
}
```

### **❌ Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 🔒 **SECURITY FEATURES**

### **Authentication:**
- JWT tokens với expiration
- Role-based access control
- Secure password hashing (bcrypt)
- Input sanitization và validation

### **Authorization:**
- Customer endpoints: `@customer_required`
- Owner endpoints: `@owner_required`
- Admin endpoints: `@admin_required`

---

**🎉 Hệ thống backend SportSlot đã sẵn sàng cho production với đầy đủ tính năng cho cả Customer và Owner roles!** 