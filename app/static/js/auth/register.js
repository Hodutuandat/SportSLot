document.addEventListener('DOMContentLoaded', function() {
    const btnCustomer = document.getElementById('btn-customer');
    const btnOwner = document.getElementById('btn-owner');
    const ownerNameField = document.getElementById('owner-name-field');
    const fieldAddressField = document.getElementById('field-address-field');

    btnCustomer.addEventListener('click', function() {
        btnCustomer.classList.add('active');
        btnOwner.classList.remove('active');
        ownerNameField.style.display = 'none';
        fieldAddressField.style.display = 'none';
    });

    btnOwner.addEventListener('click', function() {
        btnOwner.classList.add('active');
        btnCustomer.classList.remove('active');
        ownerNameField.style.display = '';
        fieldAddressField.style.display = '';
    });

    // Bắt sự kiện submit form đăng ký
    const registerForm = document.querySelector('.register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // TODO: Gửi dữ liệu thực tế bằng fetch/ajax nếu cần
            showModal(
                'Đăng ký thành công!',
                `<div style=\"text-align:center;\">
                    <div style=\"font-size:48px;margin-bottom:16px;\">🎉</div>
                    <p style=\"font-size:1.1rem;\">Bạn đã đăng ký tài khoản thành công!<br>Hãy đăng nhập để sử dụng dịch vụ.</p>
                </div>`,
                'Xác nhận',
                function() { window.location.href = '/login'; }
            );
        });
    }

    // Quên mật khẩu cho trang đăng nhập
    const forgotLink = document.getElementById('forgot-password-link');
    if (forgotLink) {
        forgotLink.addEventListener('click', function(e) {
            e.preventDefault();
            showModal(
                'Quên mật khẩu',
                `<div style=\"text-align:center;\">
                    <p style=\"font-size:1.05rem;\">Nhập email bạn đã đăng ký để nhận hướng dẫn đặt lại mật khẩu.</p>
                    <input type=\"email\" id=\"forgot-email\" placeholder=\"Email của bạn\" style=\"width:90%;margin:16px 0;padding:10px;border-radius:6px;border:1px solid #ccc;font-size:1rem;\" required />
                </div>`,
                'Gửi email',
                function() {
                    const email = document.getElementById('forgot-email').value;
                    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
                        alert('Vui lòng nhập email hợp lệ!');
                        return;
                    }
                    closeCustomModal();
                    showModal(
                        'Đã gửi email!',
                        `<div style=\"text-align:center;\"><p>Hướng dẫn đặt lại mật khẩu đã được gửi tới <b>${email}</b>.<br>Vui lòng kiểm tra hộp thư của bạn.</p></div>`,
                        'Đóng',
                        closeCustomModal
                    );
                }
            );
        });
    }
}); 