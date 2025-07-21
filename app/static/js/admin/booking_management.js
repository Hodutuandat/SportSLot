// Booking Management Admin JS
function showBookingToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `booking-toast ${type}`;
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
    // Xem chi tiết booking
    document.querySelectorAll('.abm-btn.view').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = btn.closest('tr');
            document.getElementById('modalBookingCode').textContent = row.children[0].textContent;
            document.getElementById('modalBookingCustomer').textContent = row.children[1].textContent;
            document.getElementById('modalBookingField').textContent = row.children[2].textContent;
            document.getElementById('modalBookingOwner').textContent = row.children[3].textContent;
            document.getElementById('modalBookingDate').textContent = row.children[4].textContent;
            document.getElementById('modalBookingTime').textContent = row.children[5].textContent;
            const statusText = row.children[6].textContent.trim();
            document.getElementById('modalBookingStatus').textContent = statusText;
            document.getElementById('modalBookingPayment').textContent = row.children[7].textContent;
            document.getElementById('modalBookingTotal').textContent = '400,000 VNĐ';
            document.getElementById('modalBookingNote').textContent = 'Không có ghi chú.';
            // Lịch sử trạng thái (mock)
            const history = [
                { time: '2024-06-01 10:00', status: 'Chờ xác nhận' },
                { time: '2024-06-01 10:10', status: statusText }
            ];
            const historyList = document.getElementById('modalBookingHistory');
            historyList.innerHTML = '';
            history.forEach(h => {
                const li = document.createElement('li');
                li.textContent = `${h.time}: ${h.status}`;
                historyList.appendChild(li);
            });
            // Hỗ trợ lỗi/tranh chấp
            const supportSection = document.getElementById('modalBookingSupportSection');
            if (['Lỗi', 'Tranh chấp'].includes(statusText)) {
                supportSection.style.display = '';
                document.getElementById('modalBookingSupportNote').textContent = window._bookingSupportNotes?.[row.children[0].textContent] || 'Chưa có ghi chú.';
                document.getElementById('openSupportModal').onclick = function() {
                    document.getElementById('supportModalBookingCode').textContent = row.children[0].textContent;
                    document.getElementById('supportModalBookingCustomer').textContent = row.children[1].textContent;
                    document.getElementById('supportNoteInput').value = window._bookingSupportNotes?.[row.children[0].textContent] || '';
                    document.getElementById('supportBookingModal').classList.add('show');
                };
            } else {
                supportSection.style.display = 'none';
            }
            document.getElementById('bookingDetailModal').classList.add('show');
        });
    });
    document.getElementById('closeBookingModal').onclick = function() {
        document.getElementById('bookingDetailModal').classList.remove('show');
    };
    window.onclick = function(event) {
        const modal = document.getElementById('bookingDetailModal');
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    };
    // Hỗ trợ xử lý booking
    window._bookingSupportNotes = {};
    document.querySelectorAll('.abm-btn.support').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = btn.closest('tr');
            document.getElementById('supportModalBookingCode').textContent = row.children[0].textContent;
            document.getElementById('supportModalBookingCustomer').textContent = row.children[1].textContent;
            document.getElementById('supportNoteInput').value = window._bookingSupportNotes?.[row.children[0].textContent] || '';
            document.getElementById('supportBookingModal').classList.add('show');
        });
    });
    document.getElementById('closeSupportModal').onclick = function() {
        document.getElementById('supportBookingModal').classList.remove('show');
    };
    document.getElementById('saveSupportNote').onclick = function() {
        const code = document.getElementById('supportModalBookingCode').textContent;
        const note = document.getElementById('supportNoteInput').value;
        window._bookingSupportNotes[code] = note;
        document.getElementById('supportBookingModal').classList.remove('show');
        showBookingToast('Đã lưu ghi chú hỗ trợ!', 'success');
    };
    window.onclick = function(event) {
        [document.getElementById('bookingDetailModal'), document.getElementById('supportBookingModal')].forEach(modal => {
            if (event.target === modal) {
                modal.classList.remove('show');
            }
        });
    };
    // Xác nhận/hủy booking
    document.querySelectorAll('.abm-table').forEach(table => {
        table.addEventListener('click', function(e) {
            const btn = e.target.closest('.abm-btn.confirm, .abm-btn.cancel');
            if (!btn) return;
            e.preventDefault();
            const row = btn.closest('tr');
            const statusCell = row.children[6];
            const actionCell = row.children[8];
            if (btn.classList.contains('confirm')) {
                statusCell.innerHTML = '<span class="abm-status confirmed">Đã xác nhận</span>';
                actionCell.innerHTML = '<a href="#" class="abm-btn view">Xem</a>';
                showBookingToast('Đã xác nhận booking!', 'success');
            } else if (btn.classList.contains('cancel')) {
                statusCell.innerHTML = '<span class="abm-status cancelled">Đã hủy</span>';
                actionCell.innerHTML = '<a href="#" class="abm-btn view">Xem</a>';
                showBookingToast('Đã hủy booking!', 'warning');
            }
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