// Activity Log Admin JS

document.addEventListener('DOMContentLoaded', function() {
    // Highlight filter
    document.querySelectorAll('.aal-filters select, .aal-filters button').forEach(el => {
        el.addEventListener('change', function() {
            document.querySelector('.aal-filters button[type="submit"]').classList.add('active');
        });
        el.addEventListener('input', function() {
            document.querySelector('.aal-filters button[type="submit"]').classList.add('active');
        });
    });
    // Phân trang mock
    document.querySelectorAll('.aal-page').forEach(page => {
        page.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.classList.contains('active')) return;
            document.querySelectorAll('.aal-page').forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            showActivityToast('Chuyển đến trang ' + this.textContent);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
});

function showActivityToast(message) {
    const toast = document.createElement('div');
    toast.className = 'activity-toast';
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