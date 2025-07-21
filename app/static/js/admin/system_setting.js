// System Setting Admin JS

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('systemSettingForm');
    const statusDot = document.querySelector('.ass-dot');
    const statusText = document.querySelector('.ass-status-text');
    const maintenanceSelect = document.getElementById('maintenance');

    // Cập nhật trạng thái bảo trì khi chọn
    maintenanceSelect.addEventListener('change', function() {
        if (this.value === '1') {
            statusDot.classList.add('offline');
            statusText.textContent = 'Bảo trì';
            statusText.style.color = '#dc2626';
        } else {
            statusDot.classList.remove('offline');
            statusText.textContent = 'Đang hoạt động';
            statusText.style.color = '#166534';
        }
    });

    // Xử lý submit form (mock)
    form.onsubmit = function(e) {
        e.preventDefault();
        showSettingToast('Đã lưu thay đổi cài đặt hệ thống!', 'success');
    };
    form.onreset = function() {
        showSettingToast('Đã đặt lại thông tin!', 'info');
    };
});

function showSettingToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `setting-toast ${type}`;
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
    }, 2000);
}
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