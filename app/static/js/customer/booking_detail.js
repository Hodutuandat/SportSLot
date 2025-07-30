// Booking Detail JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeBookingDetail();
});

function initializeBookingDetail() {
    // Initialize modals
    setupModals();
    
    console.log('📋 Booking detail initialized!');
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

// Cancel booking functions
function cancelBooking(bookingId) {
    const modal = document.getElementById('cancel-modal');
    modal.style.display = 'block';
    
    // Store booking ID for confirmation
    modal.setAttribute('data-booking-id', bookingId);
}

function closeCancelModal() {
    const modal = document.getElementById('cancel-modal');
    modal.style.display = 'none';
}

function confirmCancel() {
    const modal = document.getElementById('cancel-modal');
    const bookingId = modal.getAttribute('data-booking-id');
    
    // Show loading state
    const confirmBtn = modal.querySelector('.btn-danger');
    const originalText = confirmBtn.textContent;
    confirmBtn.textContent = 'Đang hủy...';
    confirmBtn.disabled = true;
    
    // Send cancel request
    fetch(`/customer/booking-history/${bookingId}/cancel`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (response.ok) {
            showNotification('Hủy đặt sân thành công!', 'success');
            setTimeout(() => {
                window.location.href = '/customer/booking-history';
            }, 1500);
        } else {
            throw new Error('Có lỗi xảy ra khi hủy đặt sân');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Có lỗi xảy ra khi hủy đặt sân', 'error');
    })
    .finally(() => {
        // Reset button
        confirmBtn.textContent = originalText;
        confirmBtn.disabled = false;
        closeCancelModal();
    });
}

// Contact owner function
function contactOwner() {
    showNotification('Đang kết nối với chủ sân...', 'info');
    
    // Simulate contact process
    setTimeout(() => {
        showNotification('Đã kết nối! Chủ sân sẽ liên hệ với bạn sớm nhất.', 'success');
    }, 2000);
}

// Rate booking function
function rateBooking() {
    showNotification('Tính năng đánh giá sẽ được cập nhật sớm!', 'info');
}

// Book again function
function bookAgain() {
    // Redirect to field detail page
    const fieldId = document.querySelector('[data-field-id]')?.getAttribute('data-field-id');
    if (fieldId) {
        window.location.href = `/customer/fields/${fieldId}`;
    } else {
        window.location.href = '/customer/fields';
    }
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

// Add hover effects to action buttons
document.addEventListener('DOMContentLoaded', function() {
    const actionButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-danger');
    
    actionButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple effect CSS
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    .btn-primary, .btn-secondary, .btn-danger {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation for page elements
window.addEventListener('load', function() {
    const elements = document.querySelectorAll('.field-item, .detail-item, .info-card');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add copy functionality for booking code
document.addEventListener('DOMContentLoaded', function() {
    const bookingCode = document.querySelector('.booking-code h2');
    if (bookingCode) {
        bookingCode.style.cursor = 'pointer';
        bookingCode.title = 'Click để copy mã đặt sân';
        
        bookingCode.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                showNotification('Đã copy mã đặt sân!', 'success');
            }).catch(() => {
                showNotification('Không thể copy mã đặt sân', 'error');
            });
        });
    }
});

// Add print functionality
function printBooking() {
    window.print();
}

// Add share functionality
function shareBooking() {
    if (navigator.share) {
        navigator.share({
            title: 'Chi tiết đặt sân - SportSlot',
            text: 'Xem chi tiết đặt sân của tôi trên SportSlot',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        showNotification('Tính năng chia sẻ sẽ được cập nhật sớm!', 'info');
    }
} 