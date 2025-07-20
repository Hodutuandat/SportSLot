// Profile JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeProfile();
});

function initializeProfile() {
    // Initialize modals
    setupModals();
    
    console.log('👤 Profile initialized!');
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

// Edit profile functions
function editProfile() {
    const modal = document.getElementById('edit-profile-modal');
    modal.style.display = 'block';
}

function editPersonalInfo() {
    const modal = document.getElementById('edit-profile-modal');
    modal.style.display = 'block';
}

function closeEditModal() {
    const modal = document.getElementById('edit-profile-modal');
    modal.style.display = 'none';
}

function saveProfile() {
    // Get form data
    const form = document.getElementById('edit-profile-form');
    const formData = new FormData(form);
    
    // Show loading state
    const saveBtn = document.querySelector('.btn-primary');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Đang lưu...';
    saveBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Update UI with new data
        updateProfileDisplay(formData);
        
        // Show success notification
        showNotification('Cập nhật thông tin thành công!', 'success');
        
        // Reset button
        saveBtn.textContent = originalText;
        saveBtn.disabled = false;
        
        // Close modal
        closeEditModal();
    }, 1500);
}

function updateProfileDisplay(formData) {
    // Update profile name
    const fullName = formData.get('full_name');
    if (fullName) {
        const profileName = document.querySelector('.profile-name');
        if (profileName) {
            profileName.textContent = fullName;
        }
        
        // Update avatar initial
        const avatarCircle = document.querySelector('.avatar-circle');
        if (avatarCircle) {
            avatarCircle.textContent = fullName[0].toUpperCase();
        }
    }
    
    // Update info items
    const phone = formData.get('phone');
    if (phone) {
        updateInfoItem('phone', phone);
    }
    
    const address = formData.get('address');
    if (address) {
        updateInfoItem('address', address);
    }
    
    const birthday = formData.get('birthday');
    if (birthday) {
        updateInfoItem('birthday', formatDate(birthday));
    }
    
    const gender = formData.get('gender');
    if (gender) {
        updateInfoItem('gender', getGenderText(gender));
    }
}

function updateInfoItem(field, value) {
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        const label = item.querySelector('.info-label');
        if (label && label.textContent.toLowerCase().includes(field)) {
            const valueElement = item.querySelector('.info-value');
            if (valueElement) {
                valueElement.textContent = value;
            }
        }
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

function getGenderText(gender) {
    const genderMap = {
        'male': 'Nam',
        'female': 'Nữ',
        'other': 'Khác'
    };
    return genderMap[gender] || 'Chưa cập nhật';
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

// Profile stats animation
function animateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
        
        if (!isNaN(numericValue)) {
            animateNumber(stat, 0, numericValue, 1000);
        }
    });
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Initialize animations when page loads
window.addEventListener('load', function() {
    // Animate stats after a short delay
    setTimeout(animateStats, 500);
});

// Navigation functions
function goToBookingHistory() {
    // Get URL from data attribute
    const bookingStat = document.querySelector('.clickable-stat[data-booking-url]');
    const bookingUrl = bookingStat ? bookingStat.getAttribute('data-booking-url') : '/customer/booking-history';
    
    // Redirect to booking history page immediately
    window.location.href = bookingUrl;
}

function scrollToPoints() {
    const pointsSection = document.getElementById('points-section');
    if (pointsSection) {
        // Smooth scroll to points section
        pointsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Add a subtle highlight effect
        pointsSection.style.animation = 'highlightSection 2s ease-in-out';
        setTimeout(() => {
            pointsSection.style.animation = '';
        }, 2000);
    }
}

// Add highlight animation CSS
const highlightStyles = document.createElement('style');
highlightStyles.textContent = `
    @keyframes highlightSection {
        0% { box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        50% { box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3), 0 2px 10px rgba(0,0,0,0.1); }
        100% { box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    }
`;
document.head.appendChild(highlightStyles);

// Smooth scrolling for anchor links
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

// Add hover effects to stat cards
document.addEventListener('DOMContentLoaded', function() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add click effects to action buttons
document.addEventListener('DOMContentLoaded', function() {
    const actionButtons = document.querySelectorAll('.action-btn, .edit-info-btn');
    
    actionButtons.forEach(button => {
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
    .action-btn, .edit-info-btn {
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