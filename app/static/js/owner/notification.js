// Notification Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeNotificationPage();
});

function initializeNotificationPage() {
    setupFilters();
    setupSearch();
    setupNotificationActions();
    updateStats();
}

// Filter functionality
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter notifications
            filterNotifications(filter);
        });
    });
}

function filterNotifications(filter) {
    const notifications = document.querySelectorAll('.notification-item');
    let visibleCount = 0;
    
    notifications.forEach(item => {
        const type = item.getAttribute('data-type');
        const subtype = item.getAttribute('data-subtype');
        
        let shouldShow = false;
        
        if (filter === 'all') {
            shouldShow = true;
        } else if (filter === 'urgent') {
            shouldShow = subtype === 'urgent';
        } else {
            shouldShow = type === filter;
        }
        
        if (shouldShow) {
            item.style.display = 'flex';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });
    
    // Show/hide empty state
    const emptyState = document.getElementById('emptyState');
    const notificationsList = document.getElementById('notificationsList');
    
    if (visibleCount === 0) {
        notificationsList.style.display = 'none';
        emptyState.style.display = 'block';
    } else {
        notificationsList.style.display = 'block';
        emptyState.style.display = 'none';
    }
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('notificationSearch');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const notifications = document.querySelectorAll('.notification-item');
        
        notifications.forEach(item => {
            const title = item.querySelector('.notification-title').textContent.toLowerCase();
            const message = item.querySelector('.notification-message').textContent.toLowerCase();
            const details = item.querySelector('.notification-details').textContent.toLowerCase();
            
            const matches = title.includes(searchTerm) || 
                           message.includes(searchTerm) || 
                           details.includes(searchTerm);
            
            if (matches) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Notification actions
function setupNotificationActions() {
    // Add click handlers for notification items
    const notificationItems = document.querySelectorAll('.notification-item');
    
    notificationItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Don't trigger if clicking on action buttons
            if (e.target.closest('.action-btn') || e.target.closest('.status-btn')) {
                return;
            }
            
            const notificationId = this.getAttribute('data-id');
            showNotificationDetail(notificationId);
        });
    });
}

// Mark all as read
function markAllRead() {
    const unreadItems = document.querySelectorAll('.notification-item.unread');
    
    unreadItems.forEach(item => {
        item.classList.remove('unread');
        const statusBtn = item.querySelector('.status-btn');
        if (statusBtn) {
            statusBtn.textContent = '✓';
        }
        const indicator = item.querySelector('.unread-indicator');
        if (indicator) {
            indicator.remove();
        }
    });
    
    updateStats();
    showToast('Đã đánh dấu tất cả thông báo đã đọc', 'success');
}

// Refresh notifications
function refreshNotifications() {
    const refreshBtn = document.querySelector('.btn-primary');
    refreshBtn.innerHTML = '<span class="btn-icon">↻</span> Đang tải...';
    refreshBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        refreshBtn.innerHTML = '<span class="btn-icon">↻</span> Làm mới';
        refreshBtn.disabled = false;
        showToast('Đã làm mới thông báo', 'success');
    }, 2000);
}

// Load more notifications
function loadMoreNotifications() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    loadMoreBtn.innerHTML = '<span class="load-more-icon">↻</span> Đang tải...';
    loadMoreBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        loadMoreBtn.innerHTML = '<span class="load-more-icon">↓</span> Tải thêm thông báo';
        loadMoreBtn.disabled = false;
        showToast('Không có thêm thông báo', 'info');
    }, 1500);
}

// Toggle notification status
function toggleNotificationStatus(notificationId) {
    const notificationItem = document.querySelector(`[data-id="${notificationId}"]`);
    const statusBtn = notificationItem.querySelector('.status-btn');
    
    if (notificationItem.classList.contains('unread')) {
        notificationItem.classList.remove('unread');
        statusBtn.textContent = '✓';
        const indicator = notificationItem.querySelector('.unread-indicator');
        if (indicator) {
            indicator.remove();
        }
        showToast('Đã đánh dấu đã đọc', 'success');
    } else {
        notificationItem.classList.add('unread');
        statusBtn.textContent = '○';
        
        // Add unread indicator
        const statusDiv = notificationItem.querySelector('.notification-status');
        const indicator = document.createElement('div');
        indicator.className = 'unread-indicator';
        statusDiv.insertBefore(indicator, statusBtn);
        
        showToast('Đã đánh dấu chưa đọc', 'info');
    }
    
    updateStats();
}

// Action functions
function approveBooking(bookingId) {
    showToast('Đã duyệt booking #' + bookingId, 'success');
    
    // Remove the notification item
    const notificationItem = document.querySelector(`[data-id="1"]`);
    if (notificationItem) {
        notificationItem.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notificationItem.remove();
            updateStats();
        }, 300);
    }
}

function rejectBooking(bookingId) {
    showToast('Đã từ chối booking #' + bookingId, 'info');
    
    // Remove the notification item
    const notificationItem = document.querySelector(`[data-id="1"]`);
    if (notificationItem) {
        notificationItem.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notificationItem.remove();
            updateStats();
        }, 300);
    }
}

function respondToReview(reviewId) {
    showNotificationModal('Phản hồi đánh giá', `
        <div class="review-detail">
            <h4>Đánh giá từ khách hàng</h4>
            <p><strong>Khách hàng:</strong> Vũ Đức Hùng</p>
            <p><strong>Sân:</strong> Sân Bóng Đá A</p>
            <p><strong>Đánh giá:</strong> 3 sao</p>
            <p><strong>Nội dung:</strong> "Sân hơi ẩm, cần cải thiện"</p>
            
            <div class="response-form">
                <label>Phản hồi của bạn:</label>
                <textarea id="reviewResponse" rows="4" placeholder="Nhập phản hồi..."></textarea>
            </div>
        </div>
    `, 'Gửi phản hồi');
}

function retryPayment(notificationId) {
    showToast('Đang thử lại thanh toán...', 'info');
    
    // Simulate retry
    setTimeout(() => {
        showToast('Thanh toán thành công!', 'success');
        
        // Update notification
        const notificationItem = document.querySelector(`[data-id="${notificationId}"]`);
        if (notificationItem) {
            notificationItem.classList.remove('payment', 'failed');
            notificationItem.classList.add('payment', 'success');
            
            const icon = notificationItem.querySelector('.notification-icon');
            icon.textContent = '💰';
            
            const title = notificationItem.querySelector('.notification-title');
            title.innerHTML = title.innerHTML.replace('Thanh toán thất bại', 'Thanh toán thành công');
            
            const actions = notificationItem.querySelector('.notification-actions');
            if (actions) {
                actions.remove();
            }
        }
    }, 2000);
}

// Modal functions
function showNotificationDetail(notificationId) {
    // This would load detailed information from the server
    showNotificationModal('Chi tiết thông báo', `
        <div class="notification-detail">
            <p>Chi tiết thông báo #${notificationId}</p>
            <p>Thông tin chi tiết sẽ được hiển thị ở đây...</p>
        </div>
    `);
}

function showNotificationModal(title, content, actionText = null) {
    const modal = document.getElementById('notificationModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalActionBtn = document.getElementById('modalActionBtn');
    
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    
    if (actionText) {
        modalActionBtn.textContent = actionText;
        modalActionBtn.style.display = 'inline-block';
    } else {
        modalActionBtn.style.display = 'none';
    }
    
    modal.classList.add('show');
}

function closeNotificationModal() {
    const modal = document.getElementById('notificationModal');
    modal.classList.remove('show');
}

// Update stats
function updateStats() {
    const totalItems = document.querySelectorAll('.notification-item').length;
    const unreadItems = document.querySelectorAll('.notification-item.unread').length;
    const urgentItems = document.querySelectorAll('.notification-item[data-subtype="urgent"]').length;
    
    // Update stat numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers[0]) statNumbers[0].textContent = totalItems;
    if (statNumbers[1]) statNumbers[1].textContent = unreadItems;
    if (statNumbers[2]) statNumbers[2].textContent = urgentItems;
    
    // Update filter counts
    const filterCounts = document.querySelectorAll('.filter-count');
    if (filterCounts[0]) filterCounts[0].textContent = totalItems;
    if (filterCounts[1]) filterCounts[1].textContent = urgentItems;
}

// Toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('notificationModal');
    if (event.target === modal) {
        closeNotificationModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeNotificationModal();
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        0% { 
            opacity: 1;
            transform: translateX(0);
        }
        100% { 
            opacity: 0;
            transform: translateX(-100%);
        }
    }
    
    @keyframes slideInRight {
        0% { 
            opacity: 0;
            transform: translateX(100%);
        }
        100% { 
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        0% { 
            opacity: 1;
            transform: translateX(0);
        }
        100% { 
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style); 