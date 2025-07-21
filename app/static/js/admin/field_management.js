// Field Management Admin JS
function showFieldToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `field-toast ${type}`;
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
    document.querySelectorAll('.afm-btn.approve').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showFieldToast('Đã duyệt sân thành công!', 'success');
        });
    });
    document.querySelectorAll('.afm-btn.reject').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showFieldToast('Đã từ chối sân!', 'warning');
        });
    });
    document.querySelectorAll('.afm-btn.view').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // Lấy dữ liệu từ dòng bảng
            const row = btn.closest('tr');
            document.getElementById('modalFieldId').textContent = row.children[0].textContent;
            document.getElementById('modalFieldName').textContent = row.children[1].textContent;
            document.getElementById('modalFieldOwner').textContent = row.children[2].textContent;
            document.getElementById('modalFieldType').textContent = row.children[3].textContent;
            document.getElementById('modalFieldAddress').textContent = row.children[4].textContent;
            document.getElementById('modalFieldStatus').textContent = row.children[5].textContent;
            document.getElementById('modalFieldCreated').textContent = row.children[6].textContent;
            document.getElementById('modalFieldBookings').textContent = row.children[7].textContent;
            document.getElementById('modalFieldRevenue').textContent = row.children[8].textContent;
            document.getElementById('modalFieldRating').textContent = row.children[9].querySelector('.afm-rating').textContent;
            document.getElementById('modalFieldReviews').textContent = row.children[9].querySelector('.afm-reviews').textContent;
            // Hiện modal
            document.getElementById('fieldDetailModal').classList.add('show');
        });
    });
    // Đóng modal
    document.getElementById('closeFieldModal').onclick = function() {
        document.getElementById('fieldDetailModal').classList.remove('show');
    };
    window.onclick = function(event) {
        const modal = document.getElementById('fieldDetailModal');
        if (event.target === modal) {
            modal.classList.remove('show');
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