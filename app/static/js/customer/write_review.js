// Write Review JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeReviewForm();
});

function initializeReviewForm() {
    // Initialize star rating
    setupStarRating();
    
    // Initialize character counter
    setupCharacterCounter();
    
    // Initialize form validation
    setupFormValidation();
    
    console.log('⭐ Review form initialized!');
}

// Star Rating Functionality
function setupStarRating() {
    const starInputs = document.querySelectorAll('.star-input');
    const ratingText = document.getElementById('rating-text');
    
    const ratingTexts = {
        1: 'Rất không hài lòng',
        2: 'Không hài lòng',
        3: 'Bình thường',
        4: 'Hài lòng',
        5: 'Rất hài lòng'
    };
    
    starInputs.forEach(input => {
        input.addEventListener('change', function() {
            const rating = this.value;
            ratingText.textContent = ratingTexts[rating] || 'Chọn số sao';
            
            // Add visual feedback
            highlightStars(rating);
        });
        
        // Hover effects
        input.addEventListener('mouseenter', function() {
            const rating = this.value;
            highlightStars(rating);
            ratingText.textContent = ratingTexts[rating] || 'Chọn số sao';
        });
    });
    
    // Reset stars when mouse leaves container
    const starsContainer = document.querySelector('.stars');
    starsContainer.addEventListener('mouseleave', function() {
        const checkedInput = document.querySelector('.star-input:checked');
        if (checkedInput) {
            highlightStars(checkedInput.value);
            ratingText.textContent = ratingTexts[checkedInput.value] || 'Chọn số sao';
        } else {
            resetStars();
            ratingText.textContent = 'Chọn số sao';
        }
    });
}

function highlightStars(rating) {
    const starLabels = document.querySelectorAll('.star-label');
    starLabels.forEach((label, index) => {
        if (index < rating) {
            label.style.color = '#f59e0b';
        } else {
            label.style.color = '#e2e8f0';
        }
    });
}

function resetStars() {
    const starLabels = document.querySelectorAll('.star-label');
    starLabels.forEach(label => {
        label.style.color = '#e2e8f0';
    });
}

// Character Counter
function setupCharacterCounter() {
    const textarea = document.getElementById('comment');
    const charCount = document.getElementById('char-count');
    
    if (textarea && charCount) {
        textarea.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = length;
            
            // Change color based on length
            if (length < 10) {
                charCount.style.color = '#ef4444';
            } else if (length > 450) {
                charCount.style.color = '#f59e0b';
            } else {
                charCount.style.color = '#6b7280';
            }
        });
    }
}

// Form Validation
function setupFormValidation() {
    const form = document.querySelector('.review-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    // Real-time validation
    const ratingInputs = document.querySelectorAll('.star-input');
    const commentTextarea = document.getElementById('comment');
    
    ratingInputs.forEach(input => {
        input.addEventListener('change', validateForm);
    });
    
    commentTextarea.addEventListener('input', validateForm);
}

function validateForm() {
    const rating = document.querySelector('.star-input:checked');
    const comment = document.getElementById('comment').value.trim();
    const submitBtn = document.querySelector('button[type="submit"]');
    
    let isValid = true;
    let errorMessage = '';
    
    // Validate rating
    if (!rating) {
        isValid = false;
        errorMessage = 'Vui lòng chọn số sao đánh giá';
        showFieldError('rating', errorMessage);
    } else {
        clearFieldError('rating');
    }
    
    // Validate comment
    if (!comment) {
        isValid = false;
        errorMessage = 'Vui lòng viết nhận xét';
        showFieldError('comment', errorMessage);
    } else if (comment.length < 10) {
        isValid = false;
        errorMessage = 'Nhận xét phải có ít nhất 10 ký tự';
        showFieldError('comment', errorMessage);
    } else {
        clearFieldError('comment');
    }
    
    // Update submit button
    submitBtn.disabled = !isValid;
    
    return isValid;
}

function showFieldError(fieldName, message) {
    // Remove existing error
    clearFieldError(fieldName);
    
    let fieldElement;
    if (fieldName === 'rating') {
        fieldElement = document.querySelector('.rating-container');
    } else if (fieldName === 'comment') {
        fieldElement = document.getElementById('comment');
    }
    
    if (fieldElement) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 5px;
            display: flex;
            align-items: center;
            gap: 5px;
        `;
        
        // Add error icon
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        fieldElement.parentNode.appendChild(errorDiv);
    }
}

function clearFieldError(fieldName) {
    const existingError = document.querySelector(`[data-field="${fieldName}"] .field-error`);
    if (existingError) {
        existingError.remove();
    }
    
    // Also remove any error divs that might be direct children
    const errorDivs = document.querySelectorAll('.field-error');
    errorDivs.forEach(div => {
        if (div.textContent.includes('sao') && fieldName === 'rating') {
            div.remove();
        } else if (div.textContent.includes('nhận xét') && fieldName === 'comment') {
            div.remove();
        }
    });
}

// Form Submission
function submitForm() {
    const form = document.querySelector('.review-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
    submitBtn.disabled = true;
    
    // Submit form
    form.submit();
}

// Auto-save draft (optional feature)
function setupAutoSave() {
    const textarea = document.getElementById('comment');
    const ratingInputs = document.querySelectorAll('.star-input');
    
    // Save draft every 30 seconds
    setInterval(() => {
        const comment = textarea.value;
        const rating = document.querySelector('.star-input:checked')?.value;
        
        if (comment || rating) {
            const draft = {
                comment: comment,
                rating: rating,
                timestamp: Date.now()
            };
            
            localStorage.setItem('review_draft', JSON.stringify(draft));
        }
    }, 30000);
    
    // Load draft on page load
    const savedDraft = localStorage.getItem('review_draft');
    if (savedDraft) {
        const draft = JSON.parse(savedDraft);
        
        if (draft.comment) {
            textarea.value = draft.comment;
            textarea.dispatchEvent(new Event('input'));
        }
        
        if (draft.rating) {
            const ratingInput = document.querySelector(`input[value="${draft.rating}"]`);
            if (ratingInput) {
                ratingInput.checked = true;
                ratingInput.dispatchEvent(new Event('change'));
            }
        }
    }
    
    // Clear draft after successful submission
    window.addEventListener('beforeunload', () => {
        localStorage.removeItem('review_draft');
    });
}

// Initialize auto-save if needed
// setupAutoSave();

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

// Add some CSS for field errors
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .field-error {
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .star-label.error {
        color: #ef4444 !important;
    }
    
    textarea.error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
`;
document.head.appendChild(errorStyles); 