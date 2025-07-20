// My Fields Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Setup event listeners
    setupFieldActions();
    setupModals();
    setupAnimations();
    
    console.log('My Fields page loaded successfully');
});

function setupFieldActions() {
    // Edit field buttons
    const editBtns = document.querySelectorAll('.edit-btn');
    editBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const fieldId = this.getAttribute('data-field-id');
            openEditModal(fieldId);
        });
    });
    
    // View bookings buttons
    const viewBookingsBtns = document.querySelectorAll('.view-bookings-btn');
    viewBookingsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const fieldId = this.getAttribute('data-field-id');
            viewBookings(fieldId);
        });
    });
    
    // Toggle status buttons
    const toggleStatusBtns = document.querySelectorAll('.toggle-status-btn');
    toggleStatusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const fieldId = this.getAttribute('data-field-id');
            const currentStatus = this.getAttribute('data-status');
            toggleStatus(fieldId, currentStatus);
        });
    });
    
    // Field card hover effects
    const fieldCards = document.querySelectorAll('.field-card');
    fieldCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 12px 35px rgba(30,144,255,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
    });
}

function setupModals() {
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const bookingModal = document.getElementById('bookingModal');
        const confirmModal = document.getElementById('confirmModal');
        const editFieldModal = document.getElementById('editFieldModal');
        
        if (event.target === bookingModal) {
            closeModal();
        }
        if (event.target === confirmModal) {
            closeConfirmModal();
        }
        if (event.target === editFieldModal) {
            closeEditModal();
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
            closeConfirmModal();
            closeEditModal();
        }
    });
}

function setupAnimations() {
    // Animate field cards on load
    const fieldCards = document.querySelectorAll('.field-card');
    fieldCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100 + 200);
    });
    
    // Animate stats
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function viewBookings(fieldId) {
    const modal = document.getElementById('bookingModal');
    const calendar = document.getElementById('bookingCalendar');
    
    // Show modal
    modal.style.display = 'block';
    
    // Generate calendar for the field (simplified)
    calendar.innerHTML = generateCalendar(fieldId);
}

function generateCalendar(fieldId) {
    // Simulate calendar data
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Sample booking data
    const bookings = {
        '2024-12-15': ['18:00-20:00', '20:00-22:00'],
        '2024-12-16': ['14:00-16:00'],
        '2024-12-17': ['16:00-18:00', '18:00-20:00'],
        '2024-12-18': ['19:00-21:00'],
        '2024-12-20': ['15:00-17:00', '17:00-19:00', '19:00-21:00']
    };
    
    let calendarHTML = `
        <div class="calendar-header">
            <h4>Lịch đặt sân - Tháng ${currentMonth + 1}/${currentYear}</h4>
        </div>
        <div class="calendar-grid">
            <div class="calendar-day-header">CN</div>
            <div class="calendar-day-header">T2</div>
            <div class="calendar-day-header">T3</div>
            <div class="calendar-day-header">T4</div>
            <div class="calendar-day-header">T5</div>
            <div class="calendar-day-header">T6</div>
            <div class="calendar-day-header">T7</div>
    `;
    
    // Generate calendar days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
        calendarHTML += '<div class="calendar-day empty"></div>';
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const hasBookings = bookings[dateStr];
        const isToday = day === currentDate.getDate();
        
        calendarHTML += `
            <div class="calendar-day ${isToday ? 'today' : ''} ${hasBookings ? 'has-bookings' : ''}">
                <div class="day-number">${day}</div>
                ${hasBookings ? `<div class="booking-count">${hasBookings.length} đặt</div>` : ''}
            </div>
        `;
    }
    
    calendarHTML += '</div>';
    
    // Add booking legend
    calendarHTML += `
        <div class="calendar-legend">
            <div class="legend-item">
                <div class="legend-color today"></div>
                <span>Hôm nay</span>
            </div>
            <div class="legend-item">
                <div class="legend-color has-bookings"></div>
                <span>Có booking</span>
            </div>
        </div>
    `;
    
    return calendarHTML;
}

function toggleStatus(fieldId, currentStatus) {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    const statusText = newStatus === 'active' ? 'kích hoạt' : 'tạm dừng';
    
    // Show confirmation modal
    const confirmModal = document.getElementById('confirmModal');
    const confirmMessage = document.getElementById('confirmMessage');
    const confirmBtn = document.getElementById('confirmBtn');
    
    confirmMessage.textContent = `Bạn có chắc chắn muốn ${statusText} sân này không?`;
    
    confirmBtn.onclick = function() {
        // Simulate API call
        updateFieldStatus(fieldId, newStatus);
        closeConfirmModal();
    };
    
    confirmModal.style.display = 'block';
}

function updateFieldStatus(fieldId, newStatus) {
    // Find the field card
    const fieldCard = document.querySelector(`[data-field-id="${fieldId}"]`);
    if (!fieldCard) return;
    
    // Update status badge
    const statusBadge = fieldCard.querySelector('.field-status');
    const toggleBtn = fieldCard.querySelector('.toggle-status-btn');
    const toggleIcon = toggleBtn.querySelector('.btn-icon');
    
    // Update UI
    if (newStatus === 'active') {
        statusBadge.className = 'field-status active';
        statusBadge.innerHTML = '✅ Hoạt động';
        toggleIcon.textContent = '⏸️';
        toggleBtn.innerHTML = '<span class="btn-icon">⏸️</span>Tạm dừng';
    } else {
        statusBadge.className = 'field-status inactive';
        statusBadge.innerHTML = '⏸️ Tạm dừng';
        toggleIcon.textContent = '▶️';
        toggleBtn.innerHTML = '<span class="btn-icon">▶️</span>Kích hoạt';
    }
    
    // Update data attribute
    toggleBtn.setAttribute('data-status', newStatus);
    
    // Show success message
    showToast(`Đã ${newStatus === 'active' ? 'kích hoạt' : 'tạm dừng'} sân thành công!`);
    
    // Add animation effect
    fieldCard.style.transform = 'scale(1.02)';
    setTimeout(() => {
        fieldCard.style.transform = 'scale(1)';
    }, 200);
}

function closeModal() {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'none';
}

function closeConfirmModal() {
    const modal = document.getElementById('confirmModal');
    modal.style.display = 'none';
}

// Edit Field Modal Functions
function openEditModal(fieldId) {
    const modal = document.getElementById('editFieldModal');
    
    // Load field data
    loadFieldData(fieldId);
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add animation
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'slideDown 0.4s ease';
}

function closeEditModal() {
    const modal = document.getElementById('editFieldModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function loadFieldData(fieldId) {
    // Simulate loading field data from server
    const fieldData = getFieldData(fieldId);
    
    // Populate form fields
    document.getElementById('editFieldName').value = fieldData.name || '';
    document.getElementById('editFieldType').value = fieldData.sport_type || 'football';
    document.getElementById('editFieldDescription').value = fieldData.description || '';
    document.getElementById('editCapacity').value = fieldData.capacity || '';
    document.getElementById('editFieldSize').value = fieldData.field_size || '';
    document.getElementById('editAddress').value = fieldData.address || '';
    document.getElementById('editDistrict').value = fieldData.district || '';
    document.getElementById('editCity').value = fieldData.city || '';
    document.getElementById('editParking').value = fieldData.parking || 'free';
    document.getElementById('editTransportation').value = fieldData.transportation || 'bus';
    document.getElementById('editWeekdayStart').value = fieldData.weekday_hours?.start || '';
    document.getElementById('editWeekdayEnd').value = fieldData.weekday_hours?.end || '';
    document.getElementById('editWeekendStart').value = fieldData.weekend_hours?.start || '';
    document.getElementById('editWeekendEnd').value = fieldData.weekend_hours?.end || '';
    document.getElementById('editDeposit').value = fieldData.deposit || '';
    document.getElementById('editCancellation').value = fieldData.cancellation || 'free';
    document.getElementById('editRules').value = fieldData.rules || '';
    
    // Set pricing
    if (fieldData.pricing) {
        document.querySelector('input[name="morning_weekday"]').value = fieldData.pricing.morning_weekday || '';
        document.querySelector('input[name="morning_weekend"]').value = fieldData.pricing.morning_weekend || '';
        document.querySelector('input[name="afternoon_weekday"]').value = fieldData.pricing.afternoon_weekday || '';
        document.querySelector('input[name="afternoon_weekend"]').value = fieldData.pricing.afternoon_weekend || '';
        document.querySelector('input[name="evening_weekday"]').value = fieldData.pricing.evening_weekday || '';
        document.querySelector('input[name="evening_weekend"]').value = fieldData.pricing.evening_weekend || '';
    }
    
    // Set amenities checkboxes
    const amenities = fieldData.amenities || [];
    document.querySelectorAll('input[name="amenities"]').forEach(checkbox => {
        checkbox.checked = amenities.includes(checkbox.value);
    });
    
    // Store field ID for saving
    document.getElementById('editFieldForm').setAttribute('data-field-id', fieldId);
}

function getFieldData(fieldId) {
    // Mock field data - in real app, this would come from server
    const fieldsData = {
        '1': {
            name: 'Sân Bóng Đá A',
            sport_type: 'football',
            description: 'Sân cỏ nhân tạo 7 người, có đèn chiếu sáng, đạt chuẩn FIFA mini.',
            capacity: 14,
            field_size: '40m x 20m',
            address: '123 Đường ABC',
            district: 'Quận 1',
            city: 'TP.HCM',
            parking: 'free',
            transportation: 'bus',
            amenities: ['lighting', 'changing_room', 'shower', 'equipment'],
            pricing: {
                morning_weekday: 180000,
                morning_weekend: 200000,
                afternoon_weekday: 200000,
                afternoon_weekend: 220000,
                evening_weekday: 220000,
                evening_weekend: 250000
            },
            weekday_hours: {
                start: '06:00',
                end: '23:00'
            },
            weekend_hours: {
                start: '05:00',
                end: '24:00'
            },
            deposit: 100000,
            cancellation: 'partial',
            rules: 'Không mang giày đinh vào sân, giữ gìn vệ sinh chung.'
        },
        '7': {
            name: 'Sân Mini Football Pro',
            sport_type: 'football',
            description: 'Sân mini chuyên nghiệp, mặt cỏ mới, phòng thay đồ hiện đại.',
            capacity: 10,
            field_size: '30m x 15m',
            address: '456 Đường XYZ',
            district: 'Quận 1',
            city: 'TP.HCM',
            parking: 'paid',
            transportation: 'motorbike',
            amenities: ['lighting', 'changing_room', 'equipment', 'cafe', 'wifi'],
            pricing: {
                morning_weekday: 160000,
                morning_weekend: 180000,
                afternoon_weekday: 180000,
                afternoon_weekend: 200000,
                evening_weekday: 200000,
                evening_weekend: 220000
            },
            weekday_hours: {
                start: '07:00',
                end: '22:00'
            },
            weekend_hours: {
                start: '06:00',
                end: '23:00'
            },
            deposit: 80000,
            cancellation: 'free',
            rules: 'Tôn trọng thời gian, không ăn uống trên sân.'
        }
    };
    
    return fieldsData[fieldId] || {};
}

function saveFieldChanges() {
    const form = document.getElementById('editFieldForm');
    const fieldId = form.getAttribute('data-field-id');
    
    // Validate form
    if (!validateEditForm()) {
        return;
    }
    
    // Collect form data
    const formData = new FormData(form);
    const fieldData = {
        name: formData.get('fieldName'),
        sport_type: formData.get('fieldType'),
        description: formData.get('fieldDescription'),
        capacity: formData.get('capacity'),
        field_size: formData.get('fieldSize'),
        address: formData.get('address'),
        district: formData.get('district'),
        city: formData.get('city'),
        parking: formData.get('parking'),
        transportation: formData.get('transportation'),
        amenities: formData.getAll('amenities'),
        pricing: {
            morning_weekday: formData.get('morning_weekday'),
            morning_weekend: formData.get('morning_weekend'),
            afternoon_weekday: formData.get('afternoon_weekday'),
            afternoon_weekend: formData.get('afternoon_weekend'),
            evening_weekday: formData.get('evening_weekday'),
            evening_weekend: formData.get('evening_weekend')
        },
        weekday_hours: {
            start: formData.get('weekday_start'),
            end: formData.get('weekday_end')
        },
        weekend_hours: {
            start: formData.get('weekend_start'),
            end: formData.get('weekend_end')
        },
        deposit: formData.get('deposit'),
        cancellation: formData.get('cancellation'),
        rules: formData.get('rules')
    };
    
    // Show loading state
    const saveBtn = document.querySelector('.btn.primary');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Đang lưu...';
    saveBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Update field card in UI
        updateFieldCard(fieldId, fieldData);
        
        // Reset button
        saveBtn.textContent = originalText;
        saveBtn.disabled = false;
        
        // Close modal
        closeEditModal();
        
        // Show success message
        showToast('Cập nhật sân thành công!');
    }, 1500);
}

function validateEditForm() {
    const requiredFields = [
        'editFieldName',
        'editFieldType',
        'editAddress',
        'editDistrict',
        'editCity'
    ];
    
    for (let fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.focus();
            showToast('Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
            return false;
        }
    }
    
    return true;
}

function updateFieldCard(fieldId, fieldData) {
    const fieldCard = document.querySelector(`[data-field-id="${fieldId}"]`);
    if (!fieldCard) return;
    
    // Update field name
    const fieldName = fieldCard.querySelector('.field-name');
    if (fieldName) {
        fieldName.textContent = fieldData.name;
    }
    
    // Update field type
    const fieldType = fieldCard.querySelector('.field-type');
    if (fieldType) {
        fieldType.textContent = `Sân ${getSportName(fieldData.sport_type)}`;
    }
    
    // Update address
    const fieldAddress = fieldCard.querySelector('.field-address');
    if (fieldAddress) {
        fieldAddress.textContent = `📍 ${fieldData.address}`;
    }
    
    // Update price
    const priceElement = fieldCard.querySelector('.field-stat .stat-value');
    if (priceElement && fieldData.pricing) {
        const avgPrice = calculateAveragePrice(fieldData.pricing);
        priceElement.textContent = `${avgPrice.toLocaleString()}đ`;
    }
    
    // Add animation effect
    fieldCard.style.transform = 'scale(1.02)';
    setTimeout(() => {
        fieldCard.style.transform = 'scale(1)';
    }, 200);
}

function getSportName(sportType) {
    const sportNames = {
        'football': 'Bóng đá',
        'basketball': 'Bóng rổ',
        'tennis': 'Tennis',
        'badminton': 'Cầu lông',
        'volleyball': 'Bóng chuyền',
        'futsal': 'Futsal',
        'ping-pong': 'Ping Pong',
        'other': 'Khác'
    };
    return sportNames[sportType] || 'Khác';
}

function calculateAveragePrice(pricing) {
    const prices = Object.values(pricing).filter(price => price && price > 0);
    if (prices.length === 0) return 0;
    return Math.round(prices.reduce((sum, price) => sum + parseInt(price), 0) / prices.length);
}

function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 2000;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(16,185,129,0.3);
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Add calendar styles
const style = document.createElement('style');
style.textContent = `
    .calendar-header {
        text-align: center;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 2px solid #e5e7eb;
    }
    
    .calendar-header h4 {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 700;
        color: #232a34;
    }
    
    .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 2px;
        background: #e5e7eb;
        border-radius: 8px;
        overflow: hidden;
    }
    
    .calendar-day-header {
        background: #232a34;
        color: white;
        padding: 10px;
        text-align: center;
        font-weight: 600;
        font-size: 0.9rem;
    }
    
    .calendar-day {
        background: white;
        min-height: 60px;
        padding: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.3s ease;
    }
    
    .calendar-day:hover {
        background: #f3f4f6;
    }
    
    .calendar-day.empty {
        background: #f9fafb;
        cursor: default;
    }
    
    .calendar-day.today {
        background: #dbeafe;
        font-weight: 700;
        color: #1e40af;
    }
    
    .calendar-day.has-bookings {
        background: #ecfdf5;
        border: 2px solid #10b981;
    }
    
    .day-number {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 4px;
    }
    
    .booking-count {
        font-size: 0.7rem;
        background: #10b981;
        color: white;
        padding: 2px 6px;
        border-radius: 10px;
        font-weight: 600;
    }
    
    .calendar-legend {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-top: 20px;
        padding-top: 15px;
        border-top: 1px solid #e5e7eb;
    }
    
    .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.9rem;
        color: #6b7280;
    }
    
    .legend-color {
        width: 16px;
        height: 16px;
        border-radius: 4px;
    }
    
    .legend-color.today {
        background: #dbeafe;
        border: 2px solid #1e40af;
    }
    
    .legend-color.has-bookings {
        background: #ecfdf5;
        border: 2px solid #10b981;
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