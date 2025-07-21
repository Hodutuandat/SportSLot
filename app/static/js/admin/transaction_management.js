// Transaction Management Admin JS
function showTxToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `tx-toast ${type}`;
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
    // Xem chi tiết giao dịch
    document.querySelectorAll('.atm-btn.view').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = btn.closest('tr');
            document.getElementById('modalTxCode').textContent = row.children[0].textContent;
            document.getElementById('modalTxBooking').textContent = row.children[1].textContent;
            document.getElementById('modalTxCustomer').textContent = row.children[2].textContent;
            document.getElementById('modalTxOwner').textContent = row.children[3].textContent;
            document.getElementById('modalTxAmount').textContent = row.children[4].textContent;
            document.getElementById('modalTxCommission').textContent = row.children[5].textContent;
            document.getElementById('modalTxStatus').textContent = row.children[6].textContent;
            document.getElementById('modalTxPayment').textContent = row.children[7].textContent;
            document.getElementById('modalTxDate').textContent = row.children[8].textContent;
            document.getElementById('modalTxNote').textContent = 'Không có ghi chú.';
            document.getElementById('transactionDetailModal').classList.add('show');
        });
    });
    document.getElementById('closeTransactionModal').onclick = function() {
        document.getElementById('transactionDetailModal').classList.remove('show');
    };
    window.onclick = function(event) {
        const modal = document.getElementById('transactionDetailModal');
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