// Booking History JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeBookingHistory();
});

function initializeBookingHistory() {
    // Initialize filters
    setupFilters();
    
    // Initialize modals
    setupModals();
    
    console.log('📅 Booking History initialized!');
}

// Filter functionality
function setupFilters() {
    const statusFilter = document.getElementById('status-filter');
    const dateFilter = document.getElementById('date-filter');
    const fieldFilter = document.getElementById('field-filter');
    
    if (statusFilter) {
        statusFilter.addEventListener('change', filterBookings);
    }
    
    if (dateFilter) {
        dateFilter.addEventListener('change', filterBookings);
    }
    
    if (fieldFilter) {
        fieldFilter.addEventListener('change', filterBookings);
    }
}

function filterBookings() {
    const statusFilter = document.getElementById('status-filter').value;
    const dateFilter = document.getElementById('date-filter').value;
    const fieldFilter = document.getElementById('field-filter').value;
    
    const bookingCards = document.querySelectorAll('.booking-card');
    
    bookingCards.forEach(card => {
        let showCard = true;
        
        // Status filter
        if (statusFilter !== 'all') {
            const cardStatus = card.getAttribute('data-status');
            if (cardStatus !== statusFilter) {
                showCard = false;
            }
        }
        
        // Field filter
        if (fieldFilter !== 'all' && showCard) {
            const cardField = card.getAttribute('data-field');
            if (cardField !== fieldFilter) {
                showCard = false;
            }
        }
        
        // Date filter
        if (dateFilter !== 'all' && showCard) {
            const cardDate = new Date(card.getAttribute('data-date'));
            const today = new Date();
            
            switch (dateFilter) {
                case 'today':
                    if (!isSameDay(cardDate, today)) {
                        showCard = false;
                    }
                    break;
                case 'week':
                    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                    if (cardDate < weekAgo) {
                        showCard = false;
                    }
                    break;
                case 'month':
                    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                    if (cardDate < monthAgo) {
                        showCard = false;
                    }
                    break;
                case 'year':
                    const yearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
                    if (cardDate < yearAgo) {
                        showCard = false;
                    }
                    break;
            }
        }
        
        // Show/hide card with animation
        if (showCard) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    // Show/hide empty state
    const visibleCards = document.querySelectorAll('.booking-card[style*="display: block"], .booking-card:not([style*="display: none"])');
    const emptyState = document.querySelector('.empty-state');
    
    if (visibleCards.length === 0 && emptyState) {
        emptyState.style.display = 'block';
    } else if (emptyState) {
        emptyState.style.display = 'none';
    }
}

function clearFilters() {
    document.getElementById('status-filter').value = 'all';
    document.getElementById('date-filter').value = 'all';
    document.getElementById('field-filter').value = 'all';
    
    // Show all cards
    const bookingCards = document.querySelectorAll('.booking-card');
    bookingCards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
    
    // Hide empty state
    const emptyState = document.querySelector('.empty-state');
    if (emptyState) {
        emptyState.style.display = 'none';
    }
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

// QR Code functionality
let currentBookingId = null;

function showQRCode(bookingId) {
    currentBookingId = bookingId;
    const modal = document.getElementById('qr-modal');
    const container = document.getElementById('qr-code-container');
    
    // Generate QR code (you can use a library like qrcode.js)
    // For now, we'll show a placeholder
    container.innerHTML = `
        <div class="qr-placeholder">
            <div class="qr-code">
                <i class="fas fa-qrcode" style="font-size: 120px; color: #3b82f6;"></i>
            </div>
            <p class="qr-text">Mã QR cho đặt sân #${bookingId}</p>
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeQRModal() {
    const modal = document.getElementById('qr-modal');
    modal.style.display = 'none';
    currentBookingId = null;
}

// Cancel booking functionality
function cancelBooking(bookingId) {
    currentBookingId = bookingId;
    const modal = document.getElementById('cancel-modal');
    modal.style.display = 'block';
}

function closeCancelModal() {
    const modal = document.getElementById('cancel-modal');
    modal.style.display = 'none';
    currentBookingId = null;
}

function confirmCancelBooking() {
    if (!currentBookingId) return;
    
    // Show loading state
    const confirmBtn = document.querySelector('.btn-danger');
    const originalText = confirmBtn.textContent;
    confirmBtn.textContent = 'Đang hủy...';
    confirmBtn.disabled = true;
    
    // Send cancel request
    fetch(`/customer/booking/${currentBookingId}/cancel`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Update UI
            const bookingCard = document.querySelector(`[data-booking-id="${currentBookingId}"]`);
            if (bookingCard) {
                bookingCard.remove();
                showNotification('Hủy đặt sân thành công!', 'success');
            }
        } else {
            showNotification('Có lỗi xảy ra khi hủy đặt sân', 'error');
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

// Other action functions
function viewBookingDetails(bookingId) {
    // Navigate to booking details page
    window.location.href = `/customer/booking-history/${bookingId}/detail`;
}

function writeReview(bookingId) {
    // Navigate to review page
    window.location.href = `/customer/booking/${bookingId}/review`;
}

function rebookField(fieldId) {
    // Navigate to field detail page
    window.location.href = `/customer/fields/${fieldId}`;
}

// Utility functions
function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}

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