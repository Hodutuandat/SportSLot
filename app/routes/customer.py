from flask import Blueprint, render_template

customer_bp = Blueprint('customer', __name__)

fields_data = [
    {"id": 1, "name": "Sân Bóng Đá A", "phone": "0901234567", "address": "Quận 1, TP.HCM", "image": None, "sport": "Bóng đá", "price": "200.000", "owner": "Anh Nguyễn Văn A", "type": "Sân cỏ nhân tạo 7 người", "description": "Sân cỏ nhân tạo 7 người, có đèn chiếu sáng, đạt chuẩn FIFA mini."},
    {"id": 2, "name": "Sân Bóng Đá B", "phone": "0902345678", "address": "Quận 7, TP.HCM", "image": None, "sport": "Bóng đá", "price": "180.000", "owner": "Chị Trần Thị B", "type": "Sân cỏ nhân tạo 5 người", "description": "Sân cỏ nhân tạo 5 người, mặt cỏ mới, có phòng thay đồ."},
    {"id": 3, "name": "Sân Bóng Chuyền 1", "phone": "0903456789", "address": "Quận Bình Thạnh, TP.HCM", "image": None, "sport": "Bóng chuyền", "price": "150.000", "owner": "Anh Lê Văn C", "type": "Sân bóng chuyền tiêu chuẩn", "description": "Sân bóng chuyền tiêu chuẩn, lưới mới, có khu vực khán giả."},
]

@customer_bp.route('/fields')
def field_list():
    return render_template('customer/field_list.html', fields=fields_data)

@customer_bp.route('/fields/<int:field_id>')
def field_detail(field_id):
    field = next((f for f in fields_data if f["id"] == field_id), None)
    if not field:
        return "Không tìm thấy sân", 404
    return render_template('customer/field_detail.html', field=field) 