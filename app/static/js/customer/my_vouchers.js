// My Vouchers JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeMyVouchers();
});

function initializeMyVouchers() {
    // Initialize filter functionality
    setupFilters();
    
    // Initialize modals
    setupModals();
    
    console.log('🎫 My Vouchers initialized!');
}

// Filter functionality
function setupFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const voucherCards = document.querySelectorAll('.voucher-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter vouchers
            filterVouchers(filter, voucherCards);
        });
    });
}

function filterVouchers(filter, voucherCards) {
    voucherCards.forEach(card => {
        const status = card.getAttribute('data-status');
        
        if (filter === 'all') {
            card.style.display = 'block';
        } else if (filter === status) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update count display
    updateFilterCount(filter);
}

function updateFilterCount(filter) {
    const voucherCards = document.querySelectorAll('.voucher-card');
    let visibleCount = 0;
    
    voucherCards.forEach(card => {
        const status = card.getAttribute('data-status');
        if (filter === 'all' || filter === status) {
            visibleCount++;
        }
    });
    
    // Update active tab text
    const activeTab = document.querySelector('.filter-tab.active');
    const originalText = activeTab.innerHTML.split('(')[0];
    activeTab.innerHTML = `${originalText}(${visibleCount})`;
}

// Copy voucher code functionality
function copyVoucherCode(code) {
    navigator.clipboard.writeText(code).then(function() {
        showNotification(`Đã sao chép mã voucher: ${code}`, 'success');
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
        showNotification('Không thể sao chép mã voucher', 'error');
    });
}

// Use voucher functionality
let selectedVoucherCode = '';

function useVoucher(code) {
    selectedVoucherCode = code;
    const modal = document.getElementById('use-voucher-modal');
    const modalCode = document.getElementById('modal-voucher-code');
    
    modalCode.textContent = code;
    modal.style.display = 'block';
}

function closeUseModal() {
    const modal = document.getElementById('use-voucher-modal');
    modal.style.display = 'none';
    selectedVoucherCode = '';
}

function confirmUseVoucher() {
    if (!selectedVoucherCode) {
        showNotification('Không có voucher nào được chọn', 'error');
        return;
    }
    
    // Show loading state
    const confirmBtn = document.querySelector('.btn-primary');
    const originalText = confirmBtn.textContent;
    confirmBtn.textContent = 'Đang xử lý...';
    confirmBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Success - redirect to booking page
        showNotification(`Voucher ${selectedVoucherCode} đã được áp dụng!`, 'success');
        
        // Reset button
        confirmBtn.textContent = originalText;
        confirmBtn.disabled = false;
        
        // Close modal
        closeUseModal();
        
        // Redirect to booking page after a short delay
        setTimeout(() => {
            window.location.href = typeof field_list_url !== 'undefined' ? field_list_url : '/customer/fields';
        }, 1500);
    }, 1000);
}

// Modal functionality
function setupModals() {
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Close modals with escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add some CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(notificationStyles);

// Voucher card animations
function animateVoucherCards() {
    const voucherCards = document.querySelectorAll('.voucher-card');
    
    voucherCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize animations when page loads
window.addEventListener('load', function() {
    // Animate voucher cards after a short delay
    setTimeout(animateVoucherCards, 300);
});

// Voucher expiry countdown (if needed)
function updateExpiryCountdown() {
    const expiryElements = document.querySelectorAll('.voucher-expiry span');
    
    expiryElements.forEach(element => {
        const expiryText = element.textContent;
        if (expiryText.includes('HSD:')) {
            // You can add countdown logic here if needed
            // For now, just display the expiry date as is
        }
    });
}

// Update countdown every minute
setInterval(updateExpiryCountdown, 60000); 