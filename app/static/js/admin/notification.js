// Notification Management Admin JS
function showNotiToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `noti-toast ${type}`;
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
    // Xem chi tiết thông báo
    document.querySelectorAll('.anm-btn.view').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = btn.closest('tr');
            document.getElementById('modalNotiType').textContent = row.children[0].textContent;
            document.getElementById('modalNotiTitle').textContent = row.children[1].textContent;
            document.getElementById('modalNotiMessage').textContent = row.children[2].textContent;
            document.getElementById('modalNotiDate').textContent = row.children[3].textContent;
            document.getElementById('modalNotiStatus').textContent = row.children[4].textContent;
            document.getElementById('modalNotiDetails').textContent = 'Chi tiết bổ sung (mock)';
            document.getElementById('notificationDetailModal').classList.add('show');
        });
    });
    document.getElementById('closeNotificationModal').onclick = function() {
        document.getElementById('notificationDetailModal').classList.remove('show');
    };
    window.onclick = function(event) {
        const modal = document.getElementById('notificationDetailModal');
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    };
    // Đánh dấu đã đọc
    document.querySelectorAll('.anm-btn.mark-read').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = btn.closest('tr');
            row.classList.remove('unread');
            row.children[4].innerHTML = '<span class="anm-status read">Đã đọc</span>';
            btn.remove();
            showNotiToast('Đã đánh dấu đã đọc!', 'success');
        });
    });
    // Xóa thông báo
    document.querySelectorAll('.anm-btn.delete').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = btn.closest('tr');
            row.remove();
            showNotiToast('Đã xóa thông báo!', 'warning');
        });
    });
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