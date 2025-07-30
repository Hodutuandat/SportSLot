// Add Field Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize add field functionality
    initializeFormSteps();
    initializeImageUpload();
    initializeMapInteraction();
    setupFormValidation();
    setupAmenityInteractions();
    loadDraftData();
    
    console.log('Add Field page loaded successfully');
});

// Global Variables
let currentStep = 1;
const totalSteps = 5;
let uploadedImages = [];
let selectedLocation = { lat: 10.7769, lng: 106.7009 }; // Default HCM location
let draftData = {};

// Step Navigation
function initializeFormSteps() {
    updateProgressDisplay();
    updateNavigationButtons();
}

function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            // Save current step data
            saveStepData();
            
            // Hide current step
            document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
            document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
            document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('completed');
            
            // Show next step
            currentStep++;
            document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
            document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');
            
            // Update progress
            updateProgressDisplay();
            updateNavigationButtons();
            
            // Special handling for review step
            if (currentStep === 5) {
                populateReviewData();
            }
            
            // Scroll to top
            document.querySelector('.add-field-content').scrollTop = 0;
        }
    }
}

function previousStep() {
    if (currentStep > 1) {
        // Hide current step
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
        document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
        
        // Show previous step
        currentStep--;
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
        document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');
        
        // Remove completed state from current step
        document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('completed');
        
        // Update progress
        updateProgressDisplay();
        updateNavigationButtons();
        
        // Scroll to top
        document.querySelector('.add-field-content').scrollTop = 0;
    }
}

function updateProgressDisplay() {
    const progressFill = document.querySelector('.progress-fill');
    const percentage = (currentStep / totalSteps) * 100;
    progressFill.style.width = `${percentage}%`;
}

function updateNavigationButtons() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const submitBtn = document.querySelector('.submit-btn');
    
    // Show/hide previous button
    if (currentStep === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'inline-flex';
    }
    
    // Show/hide next/submit button
    if (currentStep === totalSteps) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
    } else {
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
    }
}

// Form Validation
function setupFormValidation() {
    const form = document.getElementById('addFieldForm');
    form.addEventListener('submit', handleFormSubmit);
}

function validateCurrentStep() {
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const requiredInputs = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            showFieldError(input, 'Trường này là bắt buộc');
            isValid = false;
        } else {
            clearFieldError(input);
        }
    });
    
    // Additional validation for specific steps
    switch(currentStep) {
        case 1:
            isValid = validateStep1() && isValid;
            break;
        case 2:
            isValid = validateStep2() && isValid;
            break;
        case 3:
            isValid = validateStep3() && isValid;
            break;
        case 4:
            isValid = validateStep4() && isValid;
            break;
    }
    
    if (!isValid) {
        showToast('Vui lòng kiểm tra và điền đầy đủ thông tin!', 'error');
    }
    
    return isValid;
}

function validateStep1() {
    const fieldName = document.getElementById('fieldName').value;
    const fieldType = document.getElementById('fieldType').value;
    
    if (fieldName.length < 5) {
        showFieldError(document.getElementById('fieldName'), 'Tên sân phải có ít nhất 5 ký tự');
        return false;
    }
    
    if (!fieldType) {
        showFieldError(document.getElementById('fieldType'), 'Vui lòng chọn loại sân');
        return false;
    }
    
    return true;
}

function validateStep2() {
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const district = document.getElementById('district').value;
    
    if (address.length < 10) {
        showFieldError(document.getElementById('address'), 'Địa chỉ cần chi tiết hơn');
        return false;
    }
    
    return true;
}

function validateStep3() {
    if (uploadedImages.length === 0) {
        showToast('Vui lòng upload ít nhất 1 hình ảnh sân!', 'error');
        return false;
    }
    
    return true;
}

function validateStep4() {
    const pricing = ['morning_weekday', 'afternoon_weekday', 'evening_weekday'];
    let hasPrice = false;
    
    pricing.forEach(field => {
        const input = document.querySelector(`input[name="${field}"]`);
        if (input && input.value && parseInt(input.value) > 0) {
            hasPrice = true;
        }
    });
    
    if (!hasPrice) {
        showToast('Vui lòng nhập ít nhất 1 mức giá!', 'error');
        return false;
    }
    
    return true;
}

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

function clearFieldError(input) {
    input.style.borderColor = '#e5e7eb';
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Image Upload
function initializeImageUpload() {
    const fileInput = document.getElementById('fieldImages');
    const uploadZone = document.querySelector('.upload-zone');
    
    // File input change handler
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop handlers
    uploadZone.addEventListener('dragover', handleDragOver);
    uploadZone.addEventListener('drop', handleFileDrop);
    uploadZone.addEventListener('dragleave', handleDragLeave);
}

function triggerFileInput() {
    document.getElementById('fieldImages').click();
}

function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    processFiles(files);
}

function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.style.borderColor = '#1e90ff';
    event.currentTarget.style.background = '#eff6ff';
}

function handleDragLeave(event) {
    event.currentTarget.style.borderColor = '#d1d5db';
    event.currentTarget.style.background = '#f9fafb';
}

function handleFileDrop(event) {
    event.preventDefault();
    handleDragLeave(event);
    
    const files = Array.from(event.dataTransfer.files);
    processFiles(files);
}

function processFiles(files) {
    const validFiles = files.filter(file => {
        if (!file.type.startsWith('image/')) {
            showToast(`${file.name} không phải là file hình ảnh!`, 'error');
            return false;
        }
        
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            showToast(`${file.name} quá lớn! Tối đa 5MB.`, 'error');
            return false;
        }
        
        return true;
    });
    
    validFiles.forEach(file => {
        if (uploadedImages.length < 10) { // Limit to 10 images
            addImagePreview(file);
            uploadedImages.push(file);
        } else {
            showToast('Tối đa 10 hình ảnh!', 'warning');
        }
    });
    
    updateImageUploadDisplay();
}

function addImagePreview(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const previewContainer = document.querySelector('.image-preview-container');
        const previewDiv = document.createElement('div');
        previewDiv.className = 'image-preview';
        previewDiv.innerHTML = `
            <img src="${e.target.result}" alt="Preview">
            <button type="button" class="image-remove" onclick="removeImage(${uploadedImages.length})">×</button>
        `;
        
        previewContainer.appendChild(previewDiv);
    };
    reader.readAsDataURL(file);
}

function removeImage(index) {
    uploadedImages.splice(index, 1);
    updateImagePreviews();
}

function updateImagePreviews() {
    const container = document.querySelector('.image-preview-container');
    container.innerHTML = '';
    
    uploadedImages.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewDiv = document.createElement('div');
            previewDiv.className = 'image-preview';
            previewDiv.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button type="button" class="image-remove" onclick="removeImage(${index})">×</button>
            `;
            container.appendChild(previewDiv);
        };
        reader.readAsDataURL(file);
    });
}

function updateImageUploadDisplay() {
    const uploadZone = document.querySelector('.upload-zone');
    if (uploadedImages.length > 0) {
        uploadZone.querySelector('p').textContent = `${uploadedImages.length} hình ảnh đã được chọn`;
    }
}

// Map Interaction
function initializeMapInteraction() {
    const mapDisplay = document.getElementById('map');
    
    mapDisplay.addEventListener('click', function() {
        // Simulate map click - in real app, integrate with Google Maps or similar
        showMapModal();
    });
}

function showMapModal() {
    // Simulate location selection
    const newLat = (Math.random() * 0.1 + 10.7).toFixed(6);
    const newLng = (Math.random() * 0.1 + 106.7).toFixed(6);
    
    selectedLocation = { lat: parseFloat(newLat), lng: parseFloat(newLng) };
    
    document.getElementById('latitude').textContent = newLat;
    document.getElementById('longitude').textContent = newLng;
    
    const mapPlaceholder = document.querySelector('.map-placeholder p');
    mapPlaceholder.textContent = 'Vị trí đã được chọn ✓';
    mapPlaceholder.style.color = '#10b981';
    
    showToast('Đã chọn vị trí trên bản đồ!', 'success');
}

// Amenities Interaction
function setupAmenityInteractions() {
    const amenityItems = document.querySelectorAll('.amenity-item');
    
    amenityItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const label = item.querySelector('label');
        
        item.addEventListener('click', function(e) {
            if (e.target.type !== 'checkbox') {
                checkbox.checked = !checkbox.checked;
            }
            
            if (checkbox.checked) {
                item.style.background = '#eff6ff';
                item.style.borderColor = '#1e90ff';
            } else {
                item.style.background = '';
                item.style.borderColor = '#e5e7eb';
            }
        });
    });
}

// Form Data Management
function saveStepData() {
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const inputs = currentStepElement.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            draftData[input.name] = input.checked;
        } else if (input.type === 'file') {
            // File data handled separately
        } else {
            draftData[input.name] = input.value;
        }
    });
    
    // Save location data
    if (currentStep === 2) {
        draftData.location = selectedLocation;
    }
    
    // Save images data
    if (currentStep === 3) {
        draftData.images = uploadedImages.length;
    }
}

function saveDraft() {
    saveStepData();
    localStorage.setItem('fieldDraft', JSON.stringify(draftData));
    showToast('Đã lưu nháp thành công!', 'success');
}

function loadDraftData() {
    const saved = localStorage.getItem('fieldDraft');
    if (saved) {
        draftData = JSON.parse(saved);
        
        // Ask user if they want to restore draft
        if (Object.keys(draftData).length > 0) {
            setTimeout(() => {
                if (confirm('Bạn có muốn khôi phục dữ liệu đã lưu trước đó không?')) {
                    restoreDraftData();
                }
            }, 1000);
        }
    }
}

function restoreDraftData() {
    Object.keys(draftData).forEach(key => {
        const input = document.querySelector(`[name="${key}"]`);
        if (input) {
            if (input.type === 'checkbox') {
                input.checked = draftData[key];
            } else {
                input.value = draftData[key];
            }
        }
    });
    
    if (draftData.location) {
        selectedLocation = draftData.location;
        document.getElementById('latitude').textContent = selectedLocation.lat;
        document.getElementById('longitude').textContent = selectedLocation.lng;
    }
    
    showToast('Đã khôi phục dữ liệu nháp!', 'success');
}

// Review Data Population
function populateReviewData() {
    // Basic Information
    document.getElementById('review-name').textContent = 
        document.getElementById('fieldName').value || '-';
    
    const fieldTypeSelect = document.getElementById('fieldType');
    const selectedOption = fieldTypeSelect.options[fieldTypeSelect.selectedIndex];
    document.getElementById('review-type').textContent = 
        selectedOption ? selectedOption.textContent : '-';
    
    document.getElementById('review-capacity').textContent = 
        document.getElementById('capacity').value ? document.getElementById('capacity').value + ' người' : '-';
    
    document.getElementById('review-description').textContent = 
        document.getElementById('fieldDescription').value || '-';
    
    // Address
    const fullAddress = [
        document.getElementById('address').value,
        document.querySelector('#district option:checked')?.textContent,
        document.querySelector('#city option:checked')?.textContent
    ].filter(Boolean).join(', ');
    
    document.getElementById('review-address').textContent = fullAddress || '-';
    
    // Images
    populateReviewImages();
    
    // Amenities
    populateReviewAmenities();
    
    // Pricing
    populateReviewPricing();
}

function populateReviewImages() {
    const container = document.getElementById('review-images-container');
    container.innerHTML = '';
    
    uploadedImages.forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'Field Image';
            container.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
}

function populateReviewAmenities() {
    const checkedAmenities = Array.from(document.querySelectorAll('input[name="amenities"]:checked'))
        .map(checkbox => checkbox.nextElementSibling.textContent);
    
    const amenitiesList = document.getElementById('review-amenities-list');
    amenitiesList.innerHTML = checkedAmenities.length > 0 ? 
        checkedAmenities.join(', ') : 'Không có tiện ích được chọn';
}

function populateReviewPricing() {
    const pricingContainer = document.getElementById('review-pricing-table');
    
    const morningWeekday = document.querySelector('input[name="morning_weekday"]').value || '0';
    const morningWeekend = document.querySelector('input[name="morning_weekend"]').value || '0';
    const afternoonWeekday = document.querySelector('input[name="afternoon_weekday"]').value || '0';
    const afternoonWeekend = document.querySelector('input[name="afternoon_weekend"]').value || '0';
    const eveningWeekday = document.querySelector('input[name="evening_weekday"]').value || '0';
    const eveningWeekend = document.querySelector('input[name="evening_weekend"]').value || '0';
    
    pricingContainer.innerHTML = `
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="background: #f8f9fa;">
                    <th style="padding: 10px; border: 1px solid #e5e7eb;">Khung giờ</th>
                    <th style="padding: 10px; border: 1px solid #e5e7eb;">Thứ 2-6</th>
                    <th style="padding: 10px; border: 1px solid #e5e7eb;">Thứ 7-CN</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 10px; border: 1px solid #e5e7eb;">Sáng (05:00-12:00)</td>
                    <td style="padding: 10px; border: 1px solid #e5e7eb; text-align: center;">${formatPrice(morningWeekday)}</td>
                    <td style="padding: 10px; border: 1px solid #e5e7eb; text-align: center;">${formatPrice(morningWeekend)}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #e5e7eb;">Chiều (12:00-17:00)</td>
                    <td style="padding: 10px; border: 1px solid #e5e7eb; text-align: center;">${formatPrice(afternoonWeekday)}</td>
                    <td style="padding: 10px; border: 1px solid #e5e7eb; text-align: center;">${formatPrice(afternoonWeekend)}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #e5e7eb;">Tối (17:00-23:00)</td>
                    <td style="padding: 10px; border: 1px solid #e5e7eb; text-align: center;">${formatPrice(eveningWeekday)}</td>
                    <td style="padding: 10px; border: 1px solid #e5e7eb; text-align: center;">${formatPrice(eveningWeekend)}</td>
                </tr>
            </tbody>
        </table>
    `;
}

function formatPrice(price) {
    if (!price || price === '0') return '-';
    return new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';
}

// Form Submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    if (!validateCurrentStep()) {
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading-spinner"></span>Đang tạo sân...';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = new FormData(document.getElementById('addFieldForm'));
    
    // Prepare data for API
    const fieldData = {
        name: formData.get('fieldName'),
        sport_type: formData.get('fieldType'),
        description: formData.get('fieldDescription'),
        capacity: parseInt(formData.get('capacity')) || null,
        field_size: formData.get('fieldSize'),
        address: formData.get('address'),
        city: formData.get('city'),
        district: formData.get('district'),
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
        parking: formData.get('parking'),
        transportation: formData.get('transportation'),
        amenities: formData.getAll('amenities'),
        rules: formData.get('rules'),
        pricing: {
            morning_weekday: parseInt(formData.get('morning_weekday')) || 0,
            morning_weekend: parseInt(formData.get('morning_weekend')) || 0,
            afternoon_weekday: parseInt(formData.get('afternoon_weekday')) || 0,
            afternoon_weekend: parseInt(formData.get('afternoon_weekend')) || 0,
            evening_weekday: parseInt(formData.get('evening_weekday')) || 0,
            evening_weekend: parseInt(formData.get('evening_weekend')) || 0
        },
        weekday_hours: {
            start: formData.get('weekday_start'),
            end: formData.get('weekday_end')
        },
        weekend_hours: {
            start: formData.get('weekend_start'),
            end: formData.get('weekend_end')
        },
        deposit: parseInt(formData.get('deposit')) || 0,
        cancellation: formData.get('cancellation')
    };
    
    // Get JWT token from localStorage
    const token = localStorage.getItem('jwt_token');
    if (!token) {
        showToast('Vui lòng đăng nhập lại!', 'error');
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
        return;
    }
    
    // Submit to API
    fetch('/api/owner/fields', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(fieldData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Clear draft data
            localStorage.removeItem('fieldDraft');
            
            // Show success modal
            showSuccessModal();
            
            // Store field ID for potential use
            localStorage.setItem('last_created_field_id', data.field_id);
        } else {
            showToast(data.message || 'Có lỗi xảy ra khi tạo sân!', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('Có lỗi xảy ra khi kết nối với server!', 'error');
    })
    .finally(() => {
        // Reset button
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
    });
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Add animation
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'slideDown 0.4s ease';
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeSuccessModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeSuccessModal();
        }
    });
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

function redirectToMyFields() {
    window.location.href = '/owner/my-fields';
}

function createAnotherField() {
    // Reset form
    document.getElementById('addFieldForm').reset();
    uploadedImages = [];
    draftData = {};
    currentStep = 1;
    
    // Reset UI
    document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active', 'completed');
    });
    
    document.querySelector('.form-step[data-step="1"]').classList.add('active');
    document.querySelector('.step[data-step="1"]').classList.add('active');
    
    updateProgressDisplay();
    updateNavigationButtons();
    
    // Hide modal
    closeSuccessModal();
    
    // Clear image previews
    document.querySelector('.image-preview-container').innerHTML = '';
    
    showToast('Đã reset form để tạo sân mới!', 'info');
}

// Utility Functions
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

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
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
    
    @keyframes slideDown {
        from { transform: translateY(-50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(style); 