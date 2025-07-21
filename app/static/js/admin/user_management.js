// User Management Admin JS
function showUserToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `user-toast ${type}`;
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
    document.querySelectorAll('.aum-btn.view').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = btn.closest('tr');
            document.getElementById('modalUserId').textContent = row.children[0].textContent;
            document.getElementById('modalUserUsername').textContent = row.children[1].textContent;
            document.getElementById('modalUserFullName').textContent = row.children[2].textContent;
            document.getElementById('modalUserEmail').textContent = row.children[3].textContent;
            document.getElementById('modalUserPhone').textContent = row.children[4].textContent;
            document.getElementById('modalUserRole').textContent = row.children[5].textContent;
            document.getElementById('modalUserStatus').textContent = row.children[6].textContent;
            document.getElementById('modalUserJoin').textContent = row.children[7].textContent;
            document.getElementById('modalUserLastLogin').textContent = row.children[8].textContent;
            // Mock data chi tiết
            document.getElementById('modalUserAddress').textContent = '123 Đường ABC, Quận 1, TP.HCM';
            document.getElementById('modalUserBirthday').textContent = '1990-05-15';
            document.getElementById('modalUserGender').textContent = 'Nam';
            document.getElementById('modalUserTotalBookings').textContent = '15';
            document.getElementById('modalUserTotalPoints').textContent = '1250';
            document.getElementById('modalUserActiveVouchers').textContent = '3';
            document.getElementById('modalUserTotalSpent').textContent = '2,500,000 VNĐ';
            // Lịch sử điểm thưởng
            const pointsHistory = [
                { description: 'Đặt sân bóng đá - Sân A', date: '15/12/2024', amount: 50, balance: 1250 },
                { description: 'Đặt sân tennis - Sân Pro', date: '10/12/2024', amount: 30, balance: 1200 },
                { description: 'Đặt sân cầu lông - Sân Vip', date: '05/12/2024', amount: 20, balance: 1170 },
                { description: 'Đăng ký thành viên', date: '01/12/2024', amount: 100, balance: 1150 }
            ];
            const pointsList = document.getElementById('modalUserPointsHistory');
            pointsList.innerHTML = '';
            pointsHistory.forEach(p => {
                const li = document.createElement('li');
                li.textContent = `${p.date}: ${p.description} (+${p.amount} điểm, tổng: ${p.balance})`;
                pointsList.appendChild(li);
            });
            // Hoạt động gần đây
            const activities = [
                { title: 'Đặt sân thành công', description: 'Sân Bóng Đá A - 20/12/2024 18:00', time: '2 giờ trước', status: 'Hoàn thành' },
                { title: 'Thanh toán thành công', description: '400,000 VNĐ - Chuyển khoản', time: '1 ngày trước', status: 'Thành công' },
                { title: 'Nhận voucher mới', description: 'Giảm 20% cho lần đặt sân tiếp theo', time: '3 ngày trước', status: 'Chờ sử dụng' }
            ];
            const activitiesList = document.getElementById('modalUserRecentActivities');
            activitiesList.innerHTML = '';
            activities.forEach(a => {
                const li = document.createElement('li');
                li.textContent = `${a.time}: ${a.title} - ${a.description} (${a.status})`;
                activitiesList.appendChild(li);
            });
            document.getElementById('userDetailModal').classList.add('show');
        });
    });
    document.getElementById('closeUserModal').onclick = function() {
        document.getElementById('userDetailModal').classList.remove('show');
    };
    window.onclick = function(event) {
        const modal = document.getElementById('userDetailModal');
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    };
    // Toast cho tạm khóa/mở khóa + cập nhật trạng thái/nút trên bảng
    document.querySelectorAll('.aum-table').forEach(table => {
        table.addEventListener('click', function(e) {
            const btn = e.target.closest('.aum-btn.suspend, .aum-btn.activate');
            if (!btn) return;
            e.preventDefault();
            const row = btn.closest('tr');
            const statusCell = row.children[6];
            const actionCell = row.children[9];
            if (btn.classList.contains('suspend')) {
                // Đổi sang trạng thái tạm khóa
                statusCell.innerHTML = '<span class="aum-status suspended">Tạm khóa</span>';
                btn.outerHTML = '<a href="#" class="aum-btn activate">Mở khóa</a>';
                showUserToast('Đã tạm khóa người dùng!', 'warning');
            } else if (btn.classList.contains('activate')) {
                // Đổi sang trạng thái hoạt động
                statusCell.innerHTML = '<span class="aum-status active">Đang hoạt động</span>';
                btn.outerHTML = '<a href="#" class="aum-btn suspend">Tạm khóa</a>';
                showUserToast('Đã mở khóa người dùng!', 'success');
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