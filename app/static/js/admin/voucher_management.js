// Voucher Management Admin JS
function showVoucherToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `voucher-toast ${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #1e3a8a;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 300);
    }, 2500);
}

document.addEventListener('DOMContentLoaded', function() {
    // Xem chi tiết voucher
    document.querySelectorAll('.avm-btn.view').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = btn.closest('tr');
            document.getElementById('modalVoucherCode').textContent = row.children[0].textContent;
            document.getElementById('modalVoucherName').textContent = row.children[1].textContent;
            document.getElementById('modalVoucherType').textContent = row.children[2].textContent;
            document.getElementById('modalVoucherValue').textContent = row.children[3].textContent;
            document.getElementById('modalVoucherStatus').textContent = row.children[4].textContent;
            document.getElementById('modalVoucherUsed').textContent = row.children[5].textContent;
            document.getElementById('modalVoucherStart').textContent = row.children[6].textContent;
            document.getElementById('modalVoucherEnd').textContent = row.children[7].textContent;
            document.getElementById('modalVoucherCreator').textContent = 'admin';
            document.getElementById('voucherDetailModal').classList.add('show');
        });
    });
    document.getElementById('closeVoucherModal').onclick = function() {
        document.getElementById('voucherDetailModal').classList.remove('show');
    };
    window.onclick = function(event) {
        const modal = document.getElementById('voucherDetailModal');
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    };
    // Thêm voucher
    document.getElementById('addVoucherBtn').onclick = function() {
        openVoucherEditModal('add');
    };
    // Sửa voucher
    document.querySelectorAll('.avm-btn.edit').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = btn.closest('tr');
            openVoucherEditModal('edit', row);
        });
    });
    // Đổi loại voucher thì đổi đơn vị giá trị
    document.getElementById('editVoucherType').onchange = function() {
        if (this.value === 'percentage') {
            document.getElementById('editVoucherValueUnit').textContent = '%';
            document.getElementById('editVoucherMaxDiscountWrap').style.display = '';
        } else {
            document.getElementById('editVoucherValueUnit').textContent = 'đ';
            document.getElementById('editVoucherMaxDiscountWrap').style.display = 'none';
        }
    };
    // Lưu voucher (mock, cập nhật bảng trực tiếp)
    document.getElementById('voucherEditForm').onsubmit = function(e) {
        e.preventDefault();
        const code = document.getElementById('editVoucherCode').value;
        const name = document.getElementById('editVoucherName').value;
        const type = document.getElementById('editVoucherType').value;
        const value = document.getElementById('editVoucherValue').value;
        const maxDiscount = document.getElementById('editVoucherMaxDiscount').value;
        const status = document.getElementById('editVoucherStatus').value;
        const used = document.getElementById('editVoucherUsed').value;
        const start = document.getElementById('editVoucherStart').value;
        const end = document.getElementById('editVoucherEnd').value;
        const creator = document.getElementById('editVoucherCreator').value;
        let row = document.querySelector('.avm-table tr.editing');
        if (row) {
            // Sửa voucher
            row.children[0].textContent = code;
            row.children[1].textContent = name;
            row.children[2].textContent = (type === 'percentage' ? 'Phần trăm' : 'Giảm tiền');
            row.children[3].textContent = type === 'percentage' ? value + '%' + (maxDiscount ? ' (Tối đa ' + maxDiscount + 'k)' : '') : parseInt(value).toLocaleString() + 'đ';
            row.children[4].innerHTML = status === 'active' ? '<span class="avm-status active">Đang hoạt động</span>' : '<span class="avm-status expired">Đã hết hạn</span>';
            row.children[5].textContent = used;
            row.children[6].textContent = start;
            row.children[7].textContent = end;
            // Không cập nhật creator (chỉ hiển thị trong modal)
            row.classList.remove('editing');
            showVoucherToast('Đã cập nhật voucher!', 'success');
        } else {
            // Thêm mới voucher
            const table = document.querySelector('.avm-table tbody');
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${code}</td>
                <td>${name}</td>
                <td>${type === 'percentage' ? 'Phần trăm' : 'Giảm tiền'}</td>
                <td>${type === 'percentage' ? value + '%' + (maxDiscount ? ' (Tối đa ' + maxDiscount + 'k)' : '') : parseInt(value).toLocaleString() + 'đ'}</td>
                <td>${status === 'active' ? '<span class="avm-status active">Đang hoạt động</span>' : '<span class="avm-status expired">Đã hết hạn</span>'}</td>
                <td>${used}</td>
                <td>${start}</td>
                <td>${end}</td>
                <td>
                    <a href="#" class="avm-btn view">Xem</a>
                    <a href="#" class="avm-btn edit">Sửa</a>
                    <a href="#" class="avm-btn delete">Xóa</a>
                </td>`;
            table.appendChild(tr);
            showVoucherToast('Đã thêm voucher mới!', 'success');
        }
        document.getElementById('voucherEditModal').classList.remove('show');
        document.getElementById('voucherEditForm').reset();
        document.getElementById('editVoucherCreator').value = 'admin';
        document.getElementById('editVoucherType').dispatchEvent(new Event('change'));
    };
    // Đóng modal
    document.getElementById('closeVoucherEditModal').onclick = function() {
        document.getElementById('voucherEditModal').classList.remove('show');
    };
    // Hàm mở modal thêm/sửa
    window.openVoucherEditModal = function(mode, row) {
        document.getElementById('voucherEditModal').classList.add('show');
        document.getElementById('voucherEditForm').reset();
        document.getElementById('editVoucherCreator').value = 'admin';
        document.getElementById('editVoucherType').dispatchEvent(new Event('change'));
        if (mode === 'add') {
            document.getElementById('voucherEditTitle').textContent = 'Thêm voucher';
            document.querySelectorAll('.avm-table tr.editing').forEach(r => r.classList.remove('editing'));
        } else if (mode === 'edit' && row) {
            document.getElementById('voucherEditTitle').textContent = 'Sửa voucher';
            row.classList.add('editing');
            document.getElementById('editVoucherCode').value = row.children[0].textContent;
            document.getElementById('editVoucherName').value = row.children[1].textContent;
            document.getElementById('editVoucherType').value = row.children[2].textContent === 'Phần trăm' ? 'percentage' : 'fixed';
            document.getElementById('editVoucherType').dispatchEvent(new Event('change'));
            if (row.children[2].textContent === 'Phần trăm') {
                const match = row.children[3].textContent.match(/(\d+)%/);
                document.getElementById('editVoucherValue').value = match ? match[1] : '';
                const maxMatch = row.children[3].textContent.match(/Tối đa (\d+)k/);
                document.getElementById('editVoucherMaxDiscount').value = maxMatch ? maxMatch[1] : '';
            } else {
                document.getElementById('editVoucherValue').value = row.children[3].textContent.replace(/\D/g, '');
                document.getElementById('editVoucherMaxDiscount').value = '';
            }
            document.getElementById('editVoucherStatus').value = row.children[4].textContent.includes('Đang hoạt động') ? 'active' : 'expired';
            document.getElementById('editVoucherUsed').value = row.children[5].textContent;
            document.getElementById('editVoucherStart').value = row.children[6].textContent;
            document.getElementById('editVoucherEnd').value = row.children[7].textContent;
        }
    };
});
// CSS animation
const style = document.createElement('style');
style.textContent = `
@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}
@keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}`;
document.head.appendChild(style); 