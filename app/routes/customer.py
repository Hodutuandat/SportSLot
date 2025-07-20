from flask import Blueprint, render_template
from flask_login import login_required, current_user

customer_bp = Blueprint('customer', __name__)

fields_data = [
    {"id": 1, "name": "Sân Bóng Đá A", "phone": "0901234567", "address": "Quận 1, TP.HCM", "image": None, "sport": "Bóng đá", "sport_type": "football", "price": 200000, "owner": "Anh Nguyễn Văn A", "type": "Sân cỏ nhân tạo 7 người", "description": "Sân cỏ nhân tạo 7 người, có đèn chiếu sáng, đạt chuẩn FIFA mini."},
    {"id": 2, "name": "Sân Bóng Đá B", "phone": "0902345678", "address": "Quận 7, TP.HCM", "image": None, "sport": "Bóng đá", "sport_type": "football", "price": 180000, "owner": "Chị Trần Thị B", "type": "Sân cỏ nhân tạo 5 người", "description": "Sân cỏ nhân tạo 5 người, mặt cỏ mới, có phòng thay đồ."},
    {"id": 3, "name": "Sân Bóng Chuyền 1", "phone": "0903456789", "address": "Quận Bình Thạnh, TP.HCM", "image": None, "sport": "Bóng chuyền", "sport_type": "volleyball", "price": 150000, "owner": "Anh Lê Văn C", "type": "Sân bóng chuyền tiêu chuẩn", "description": "Sân bóng chuyền tiêu chuẩn, lưới mới, có khu vực khán giả."},
    {"id": 4, "name": "Sân Bóng Rổ Central", "phone": "0904567890", "address": "Quận 3, TP.HCM", "image": None, "sport": "Bóng rổ", "sport_type": "basketball", "price": 170000, "owner": "Anh Phạm Văn D", "type": "Sân bóng rổ tiêu chuẩn", "description": "Sân bóng rổ tiêu chuẩn FIBA, có hệ thống âm thanh hiện đại."},
    {"id": 5, "name": "Sân Tennis Pro", "phone": "0905678901", "address": "Quận 2, TP.HCM", "image": None, "sport": "Tennis", "sport_type": "tennis", "price": 250000, "owner": "Chị Nguyễn Thị E", "type": "Sân tennis cứng", "description": "Sân tennis cứng chất lượng cao, có ghế ngồi và căng tin."},
    {"id": 6, "name": "Sân Cầu Lông Vip", "phone": "0906789012", "address": "Quận 10, TP.HCM", "image": None, "sport": "Cầu lông", "sport_type": "badminton", "price": 120000, "owner": "Anh Lý Văn F", "type": "Sân cầu lông tiêu chuẩn", "description": "Sân cầu lông tiêu chuẩn BWF, sàn gỗ chuyên dụng, ánh sáng tốt."},
]

@customer_bp.route('/fields')
def field_list():
    return render_template('customer/field_list.html', fields=fields_data)

@customer_bp.route('/fields/<int:field_id>')
@login_required
def field_detail(field_id):
    field = next((f for f in fields_data if f["id"] == field_id), None)
    if not field:
        return "Không tìm thấy sân", 404
    return render_template('customer/field_detail.html', field=field)

@customer_bp.route('/transaction-history')
@login_required
def transaction_history():
    return render_template('customer/transaction_history.html', user=current_user) 