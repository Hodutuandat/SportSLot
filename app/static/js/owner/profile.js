// Owner Profile Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize profile features
    setupProfileInteractions();
    setupLogoutFunctionality();
    updateCurrentTime();
    setupSecurityActions();
    
    // Gắn sự kiện xác nhận popup cho nút đăng xuất ở drop box
    const ownerLogoutBtn = document.getElementById('owner-logout-btn');
    if (ownerLogoutBtn) {
        ownerLogoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            confirmLogout();
        });
    }
    
    console.log('Owner profile page loaded successfully');
});

function setupProfileInteractions() {
    // Change avatar button
    const changeAvatarBtn = document.querySelector('.change-avatar-btn');
    if (changeAvatarBtn) {
        changeAvatarBtn.addEventListener('click', function() {
            showToast('Tính năng thay đổi avatar sẽ có sớm!');
        });
    }
    
    // Edit profile button
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            toggleEditMode();
        });
    }
    
    // Profile stats hover effects
    const statItems = document.querySelectorAll('.profile-stats .stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

function setupLogoutFunctionality() {
    // Setup logout modal
    setupLogoutModal();
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const logoutModal = document.getElementById('logoutModal');
        if (event.target === logoutModal) {
            closeLogoutModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeLogoutModal();
        }
    });
}

function setupLogoutModal() {
    // Modal close button
    const closeBtn = document.querySelector('#logoutModal .close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLogoutModal);
    }
    
    // Cancel button
    const cancelBtn = document.querySelector('#logoutModal .cancel-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeLogoutModal);
    }
    
    // Confirm button
    const confirmBtn = document.querySelector('#logoutModal .confirm-btn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', confirmLogout);
    }
}

function confirmLogout() {
    showModal(
        'Xác nhận đăng xuất',
        `<div class="logout-confirm-content" style="text-align:center;">
            <div class="logout-icon" style="font-size:48px;">🚪</div>
            <p style="margin: 20px 0 16px 0; font-size:1.1rem;">Bạn có chắc chắn muốn đăng xuất khỏi tài khoản không?</p>
            <div class="logout-options" style="margin-bottom: 18px;">
                <label class="checkbox-container" style="font-size:0.98rem; color:#6b7280;">
                    <input type="checkbox" id="rememberMe">
                    <span class="checkmark"></span>
                    Ghi nhớ phiên đăng nhập lần sau
                </label>
            </div>
        </div>`,
        'Đăng xuất',
        performLogout
    );
}

function logoutAllDevices() {
    // Show confirmation for logout all devices
    const confirmed = confirm('Bạn có chắc chắn muốn đăng xuất khỏi tất cả thiết bị không? Thao tác này sẽ yêu cầu bạn đăng nhập lại trên tất cả thiết bị.');
    
    if (confirmed) {
        showToast('Đang đăng xuất khỏi tất cả thiết bị...', 'info');
        
        // Simulate logout all devices
        setTimeout(() => {
            performLogout();
        }, 2000);
    }
}

function closeLogoutModal() {
    const modal = document.getElementById('logoutModal');
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.animation = 'slideUp 0.3s ease';
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

function performLogout() {
    const rememberMe = document.getElementById('rememberMe');
    const shouldRemember = rememberMe ? rememberMe.checked : false;
    
    // Show logout process
    showToast('Đang đăng xuất...', 'info');
    
    // Add loading effect to logout button
    const confirmBtn = document.querySelector('#logoutModal .confirm-btn');
    if (confirmBtn) {
        confirmBtn.innerHTML = '<span class="loading-spinner"></span>Đang đăng xuất...';
        confirmBtn.disabled = true;
    }
    
    // Store remember preference
    if (shouldRemember) {
        localStorage.setItem('rememberSession', 'true');
    } else {
        localStorage.removeItem('rememberSession');
    }
    
    // Simulate logout delay
    setTimeout(() => {
        // Redirect to logout endpoint
        window.location.href = '/logout';
    }, 1500);
}

function updateCurrentTime() {
    const currentTimeElement = document.getElementById('currentTime');
    if (currentTimeElement) {
        const now = new Date();
        const formattedTime = now.toLocaleDateString('vi-VN') + ' ' + 
                            now.toLocaleTimeString('vi-VN', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                            });
        currentTimeElement.textContent = formattedTime;
    }
}

function setupSecurityActions() {
    const securityBtns = document.querySelectorAll('.security-btn');
    securityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const securityItem = this.closest('.security-item');
            const actionType = securityItem.querySelector('h4').textContent;
            
            switch(actionType) {
                case 'Mật khẩu':
                    handlePasswordChange();
                    break;
                case 'Xác thực 2 bước':
                    handleTwoFactorAuth();
                    break;
                case 'Email khôi phục':
                    handleRecoveryEmail();
                    break;
                default:
                    showToast('Tính năng đang được phát triển!');
            }
        });
    });
}

function handlePasswordChange() {
    showModal('Thay đổi mật khẩu', `
        <div class="password-change-form">
            <div class="form-group">
                <label>Mật khẩu hiện tại:</label>
                <input type="password" id="currentPassword" class="form-input" placeholder="Nhập mật khẩu hiện tại">
            </div>
            <div class="form-group">
                <label>Mật khẩu mới:</label>
                <input type="password" id="newPassword" class="form-input" placeholder="Nhập mật khẩu mới">
            </div>
            <div class="form-group">
                <label>Xác nhận mật khẩu mới:</label>
                <input type="password" id="confirmPassword" class="form-input" placeholder="Xác nhận mật khẩu mới">
            </div>
        </div>
    `, 'Cập nhật', function() {
        // Validate and update password
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (!currentPassword || !newPassword || !confirmPassword) {
            showToast('Vui lòng điền đầy đủ thông tin!', 'error');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            showToast('Mật khẩu xác nhận không khớp!', 'error');
            return;
        }
        
        if (newPassword.length < 6) {
            showToast('Mật khẩu phải có ít nhất 6 ký tự!', 'error');
            return;
        }
        
        showToast('Đã cập nhật mật khẩu thành công!', 'success');
        closeCustomModal();
    });
}

function handleTwoFactorAuth() {
    showModal('Kích hoạt xác thực 2 bước', `
        <div class="two-factor-setup">
            <p>Xác thực 2 bước sẽ tăng cường bảo mật cho tài khoản của bạn.</p>
            <div class="auth-options">
                <div class="auth-option">
                    <input type="radio" name="authMethod" value="sms" id="smsAuth">
                    <label for="smsAuth">📱 SMS</label>
                </div>
                <div class="auth-option">
                    <input type="radio" name="authMethod" value="email" id="emailAuth">
                    <label for="emailAuth">📧 Email</label>
                </div>
                <div class="auth-option">
                    <input type="radio" name="authMethod" value="app" id="appAuth">
                    <label for="appAuth">📲 Ứng dụng xác thực</label>
                </div>
            </div>
        </div>
    `, 'Kích hoạt', function() {
        const selectedMethod = document.querySelector('input[name="authMethod"]:checked');
        if (!selectedMethod) {
            showToast('Vui lòng chọn phương thức xác thực!', 'error');
            return;
        }
        
        showToast(`Đã kích hoạt xác thực 2 bước qua ${selectedMethod.value}!`, 'success');
        closeCustomModal();
    });
}

function handleRecoveryEmail() {
    showModal('Cập nhật Email khôi phục', `
        <div class="recovery-email-form">
            <div class="form-group">
                <label>Email khôi phục hiện tại:</label>
                <input type="email" value="recovery@******.com" disabled class="form-input">
            </div>
            <div class="form-group">
                <label>Email khôi phục mới:</label>
                <input type="email" id="newRecoveryEmail" class="form-input" placeholder="Nhập email khôi phục mới">
            </div>
        </div>
    `, 'Cập nhật', function() {
        const newEmail = document.getElementById('newRecoveryEmail').value;
        if (!newEmail) {
            showToast('Vui lòng nhập email khôi phục mới!', 'error');
            return;
        }
        
        if (!isValidEmail(newEmail)) {
            showToast('Email không hợp lệ!', 'error');
            return;
        }
        
        showToast('Đã cập nhật email khôi phục thành công!', 'success');
        closeCustomModal();
    });
}

function toggleEditMode() {
    const detailItems = document.querySelectorAll('.detail-item');
    const editBtn = document.querySelector('.edit-profile-btn');
    
    // Check if already in edit mode
    const isEditMode = editBtn.textContent.includes('Lưu');
    
    if (isEditMode) {
        // Save changes
        saveProfileChanges();
        editBtn.innerHTML = '<span class="btn-icon">✏️</span>Chỉnh sửa';
    } else {
        // Enter edit mode
        enableEditMode(detailItems);
        editBtn.innerHTML = '<span class="btn-icon">💾</span>Lưu thay đổi';
    }
}

function enableEditMode(detailItems) {
    detailItems.forEach(item => {
        const span = item.querySelector('span');
        if (span && !span.classList.contains('status')) {
            const value = span.textContent;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = value;
            input.className = 'edit-input';
            input.style.cssText = `
                padding: 5px 8px;
                border: 1px solid #d1d5db;
                border-radius: 4px;
                width: 100%;
                font-size: 0.9rem;
            `;
            span.replaceWith(input);
        }
    });
}

function saveProfileChanges() {
    const editInputs = document.querySelectorAll('.edit-input');
    editInputs.forEach(input => {
        const span = document.createElement('span');
        span.textContent = input.value;
        span.style.cssText = `
            color: #6b7280;
            text-align: right;
            flex: 1;
        `;
        input.replaceWith(span);
    });
    
    showToast('Đã lưu thông tin thành công!', 'success');
}

function showModal(title, content, actionText, actionCallback) {
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="modal-content" style="
            background: white;
            border-radius: 15px;
            padding: 0;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: slideDown 0.3s ease;
        ">
            <div class="modal-header" style="
                padding: 20px 25px;
                border-bottom: 1px solid #e5e7eb;
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <h3 style="margin: 0; font-size: 1.3rem; font-weight: 700; color: #232a34;">${title}</h3>
                <button class="close-btn" onclick="closeCustomModal()" style="
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #6b7280;
                    padding: 5px;
                ">×</button>
            </div>
            <div class="modal-body" style="padding: 25px;">
                ${content}
                <div class="modal-actions" style="
                    display: flex;
                    gap: 10px;
                    justify-content: flex-end;
                    margin-top: 20px;
                ">
                    <button onclick="closeCustomModal()" style="
                        background: #e5e7eb;
                        color: #374151;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 600;
                    ">Hủy</button>
                    <button id="customModalAction" style="
                        background: linear-gradient(135deg, #1e90ff, #0066cc);
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 600;
                    ">${actionText}</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Setup action button
    const actionBtn = document.getElementById('customModalAction');
    if (actionBtn && actionCallback) {
        actionBtn.addEventListener('click', actionCallback);
    }
    
    window.currentCustomModal = modal;
}

function closeCustomModal() {
    if (window.currentCustomModal) {
        window.currentCustomModal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (window.currentCustomModal && window.currentCustomModal.parentNode) {
                document.body.removeChild(window.currentCustomModal);
            }
            window.currentCustomModal = null;
        }, 300);
    }
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    
    let bgColor = '#1e90ff';
    let icon = 'ℹ️';
    
    switch(type) {
        case 'success':
            bgColor = '#10b981';
            icon = '✅';
            break;
        case 'error':
            bgColor = '#ef4444';
            icon = '❌';
            break;
        case 'warning':
            bgColor = '#f59e0b';
            icon = '⚠️';
            break;
    }
    
    toast.className = 'toast';
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 3000;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideInRight 0.3s ease;
        max-width: 350px;
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    toast.innerHTML = `${icon} ${message}`;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    .form-group {
        margin-bottom: 15px;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: 600;
        color: #374151;
    }
    
    .form-input {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 0.95rem;
        transition: border-color 0.3s ease;
    }
    
    .form-input:focus {
        outline: none;
        border-color: #1e90ff;
        box-shadow: 0 0 0 3px rgba(30,144,255,0.1);
    }
    
    .auth-options {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 20px 0;
    }
    
    .auth-option {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        cursor: pointer;
        transition: background 0.3s ease;
    }
    
    .auth-option:hover {
        background: #f3f4f6;
    }
    
    .auth-option input[type="radio"] {
        margin: 0;
    }
    
    .loading-spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s linear infinite;
        margin-right: 8px;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style); 