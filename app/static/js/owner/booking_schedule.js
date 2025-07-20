// Booking Schedule Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeBookingSchedule();
    console.log('Booking Schedule page loaded successfully');
});

// Global Variables
let currentWeek = new Date();
let selectedSlot = null;

// Initialize the booking schedule
function initializeBookingSchedule() {
    updateWeekDisplay();
    setupSlotInteractions();
    setupModalInteractions();
    loadScheduleData();
}

// Update week display
function updateWeekDisplay() {
    const weekStart = getWeekStart(currentWeek);
    const weekEnd = getWeekEnd(currentWeek);
    
    const weekDisplay = document.querySelector('.week-display');
    if (weekDisplay) {
        weekDisplay.textContent = `Tuần ${weekStart.getDate()} - ${weekEnd.getDate()} Tháng ${weekEnd.getMonth() + 1}, ${weekEnd.getFullYear()}`;
    }
    
    updateDayHeaders();
}

// Get week start (Monday)
function getWeekStart(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(d.setDate(diff));
}

// Get week end (Sunday)
function getWeekEnd(date) {
    const weekStart = getWeekStart(date);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return weekEnd;
}

// Update day headers with actual dates
function updateDayHeaders() {
    const weekStart = getWeekStart(currentWeek);
    const dayHeaders = document.querySelectorAll('.day-date');
    
    dayHeaders.forEach((header, index) => {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + index);
        header.textContent = `${date.getDate()}/${date.getMonth() + 1}`;
    });
}

// Navigation functions
function previousWeek() {
    currentWeek.setDate(currentWeek.getDate() - 7);
    updateWeekDisplay();
    loadScheduleData();
}

function nextWeek() {
    currentWeek.setDate(currentWeek.getDate() + 7);
    updateWeekDisplay();
    loadScheduleData();
}

function goToToday() {
    currentWeek = new Date();
    updateWeekDisplay();
    loadScheduleData();
}

// Setup slot interactions
function setupSlotInteractions() {
    const slots = document.querySelectorAll('.slot');
    
    slots.forEach(slot => {
        slot.addEventListener('click', function() {
            handleSlotClick(this);
        });
        
        slot.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        slot.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Handle slot click
function handleSlotClick(slot) {
    const day = slot.dataset.day;
    const time = slot.dataset.time;
    const status = getSlotStatus(slot);
    
    selectedSlot = {
        day: day,
        time: time,
        status: status,
        element: slot
    };
    
    if (status === 'empty') {
        openBookingModal(day, time);
    } else {
        showSlotDetails(day, time, status);
    }
}

// Get slot status
function getSlotStatus(slot) {
    const bookingItems = slot.querySelectorAll('.booking-item');
    if (bookingItems.length === 0) return 'empty';
    
    // Check if any booking item has specific status
    for (let item of bookingItems) {
        if (item.classList.contains('booked')) return 'booked';
        if (item.classList.contains('maintenance')) return 'maintenance';
        if (item.classList.contains('inactive')) return 'inactive';
    }
    
    return 'unknown';
}

// Setup modal interactions
function setupModalInteractions() {
    const modal = document.getElementById('bookingModal');
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeBookingModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeBookingModal();
        }
    });
}

// Open booking modal
function openBookingModal(day, time) {
    const modal = document.getElementById('bookingModal');
    const dateInput = document.getElementById('bookingDate');
    const timeInput = document.getElementById('bookingTime');
    
    // Set default values
    const weekStart = getWeekStart(currentWeek);
    const dayIndex = getDayIndex(day);
    const selectedDate = new Date(weekStart);
    selectedDate.setDate(weekStart.getDate() + dayIndex);
    
    dateInput.value = selectedDate.toISOString().split('T')[0];
    timeInput.value = time;
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add animation
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'slideDown 0.4s ease';
}

// Close booking modal
function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset form
    document.getElementById('bookingForm').reset();
}

// Get day index
function getDayIndex(day) {
    const dayMap = {
        'monday': 0,
        'tuesday': 1,
        'wednesday': 2,
        'thursday': 3,
        'friday': 4,
        'saturday': 5,
        'sunday': 6
    };
    return dayMap[day] || 0;
}

// Save booking
function saveBooking() {
    const form = document.getElementById('bookingForm');
    const formData = new FormData(form);
    
    // Validate form
    if (!validateBookingForm()) {
        return;
    }
    
    // Show loading state
    const saveBtn = document.querySelector('.booking-modal .btn.primary');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Đang lưu...';
    saveBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Update slot status
        if (selectedSlot && selectedSlot.element) {
            updateSlotStatus(selectedSlot.element, 'booked');
        }
        
        // Close modal
        closeBookingModal();
        
        // Reset button
        saveBtn.textContent = originalText;
        saveBtn.disabled = false;
        
        // Show success message
        showToast('Đặt sân thành công!', 'success');
        
        // Refresh schedule
        loadScheduleData();
    }, 1500);
}

// Validate booking form
function validateBookingForm() {
    const requiredFields = ['bookingField', 'bookingDate', 'bookingTime', 'bookingCustomer', 'bookingPhone'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            showFieldError(field, 'Trường này là bắt buộc');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    // Validate phone number
    const phoneField = document.getElementById('bookingPhone');
    const phoneRegex = /^[0-9]{10,11}$/;
    if (phoneField.value && !phoneRegex.test(phoneField.value)) {
        showFieldError(phoneField, 'Số điện thoại không hợp lệ');
        isValid = false;
    }
    
    if (!isValid) {
        showToast('Vui lòng kiểm tra và điền đầy đủ thông tin!', 'error');
    }
    
    return isValid;
}

// Show field error
function showFieldError(input, message) {
    clearFieldError(input);
    
    input.style.borderColor = '#ef4444';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.85rem;
        margin-top: 5px;
        font-weight: 500;
    `;
    errorDiv.textContent = message;
    
    input.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(input) {
    input.style.borderColor = '#e5e7eb';
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Update slot status
function updateSlotStatus(slot, status) {
    // Clear existing content
    const content = slot.querySelector('.slot-content');
    if (content) {
        content.innerHTML = '';
    }
    
    // Add new booking item based on status
    if (status === 'booked') {
        const bookingItem = document.createElement('div');
        bookingItem.className = 'booking-item booked';
        bookingItem.innerHTML = `
            <div class="booking-info">
                <div class="field-name">Sân mới</div>
                <div class="customer-name">Khách hàng mới</div>
                <div class="booking-time">--:-- - --:--</div>
            </div>
        `;
        content.appendChild(bookingItem);
    }
}

// Generate slot content
function generateSlotContent(status) {
    const bookingItems = {
        'booked': [
            '<div class="booking-item booked"><div class="booking-info"><div class="field-name">Sân A</div><div class="customer-name">Khách hàng</div><div class="booking-time">--:-- - --:--</div></div></div>'
        ],
        'maintenance': [
            '<div class="booking-item maintenance"><div class="booking-info"><div class="field-name">Sân</div><div class="maintenance-text">Bảo trì</div></div></div>'
        ],
        'inactive': [
            '<div class="booking-item inactive"><div class="booking-info"><div class="field-name">Sân</div><div class="inactive-text">Không hoạt động</div></div></div>'
        ]
    };
    
    return bookingItems[status] ? bookingItems[status].join('') : '';
}

// Show slot details
function showSlotDetails(day, time, status) {
    const dayNames = {
        'monday': 'Thứ 2',
        'tuesday': 'Thứ 3',
        'wednesday': 'Thứ 4',
        'thursday': 'Thứ 5',
        'friday': 'Thứ 6',
        'saturday': 'Thứ 7',
        'sunday': 'Chủ nhật'
    };
    
    const timeNames = {
        'morning': 'Sáng (05:00 - 12:00)',
        'afternoon': 'Trưa (12:00 - 17:00)',
        'evening': 'Chiều (17:00 - 23:00)'
    };
    
    const statusMessages = {
        'booked': 'Có các đặt sân trong khung giờ này',
        'maintenance': 'Sân đang trong quá trình bảo trì',
        'inactive': 'Sân không hoạt động trong khung giờ này'
    };
    
    const message = `${dayNames[day]} - ${timeNames[time]}\n${statusMessages[status] || 'Không có thông tin'}`;
    
    showToast(message, 'info');
}

// Load schedule data (simulated)
function loadScheduleData() {
    // Simulate loading data from server
    console.log('Loading schedule data for week:', currentWeek);
    
    // In a real application, this would make an API call
    // and update the schedule based on the response
}

// Export schedule
function exportSchedule() {
    showToast('Đang xuất báo cáo...', 'info');
    
    // Simulate export process
    setTimeout(() => {
        showToast('Báo cáo đã được xuất thành công!', 'success');
    }, 2000);
}

// Refresh schedule
function refreshSchedule() {
    showToast('Đang làm mới dữ liệu...', 'info');
    
    // Simulate refresh process
    setTimeout(() => {
        loadScheduleData();
        showToast('Dữ liệu đã được làm mới!', 'success');
    }, 1000);
}

// Add booking (quick action)
function addBooking() {
    openBookingModal('monday', 'morning');
}

// Utility function to show toast messages
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
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideInRight 0.3s ease;
        max-width: 350px;
        display: flex;
        align-items: center;
        gap: 8px;
        white-space: pre-line;
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
    }, 4000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
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