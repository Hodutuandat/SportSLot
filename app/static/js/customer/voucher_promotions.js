// Voucher Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Monthly Navigation
    const monthBtns = document.querySelectorAll('.month-btn');
    const monthOffers = document.querySelectorAll('.month-offers');
    
    monthBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetMonth = this.dataset.month;
            
            // Remove active from all buttons and offers
            monthBtns.forEach(b => b.classList.remove('active'));
            monthOffers.forEach(offer => offer.classList.remove('active'));
            
            // Add active to clicked button
            this.classList.add('active');
            
            // Show corresponding offers
            let targetId;
            switch(targetMonth) {
                case 'current':
                    targetId = 'current-month';
                    break;
                case 'next':
                    targetId = 'next-month';
                    break;
                case 'season':
                    targetId = 'season-offers';
                    break;
            }
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });
    
    // Membership card hover effects
    const membershipCards = document.querySelectorAll('.membership-card');
    membershipCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
        });
    });
    
    // Event card interactions
    const eventBtns = document.querySelectorAll('.event-btn');
    eventBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const eventTitle = this.closest('.event-card').querySelector('h3').textContent;
            
            if (eventTitle.includes('Giải đấu')) {
                showModal('Đăng ký giải đấu', 'Tính năng đăng ký giải đấu sẽ có sớm. Hãy theo dõi thông báo từ SportSlot!');
            } else if (eventTitle.includes('Sinh nhật')) {
                showModal('Sinh nhật SportSlot', 'Sự kiện kỷ niệm sẽ diễn ra vào 15/3/2025. Đừng bỏ lỡ ưu đãi đặc biệt!');
            } else if (eventTitle.includes('Giới thiệu')) {
                showModal('Giới thiệu bạn bè', 'Chia sẻ link giới thiệu của bạn để nhận voucher 100k cho cả hai!');
            }
        });
    });
    
    // Offer card hover effects
    const offerCards = document.querySelectorAll('.offer-card');
    offerCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const badge = this.querySelector('.offer-badge');
            if (badge) {
                badge.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const badge = this.querySelector('.offer-badge');
            if (badge) {
                badge.style.transform = 'scale(1)';
            }
        });
    });
    
    // Voucher item interactions
    const voucherItems = document.querySelectorAll('.voucher-item');
    voucherItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (!e.target.classList.contains('copy-btn')) {
                const code = this.querySelector('.code').textContent;
                copyCode(code);
            }
        });
    });
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animation for membership cards
                if (entry.target.classList.contains('membership-card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(-10px)';
                    }, 200);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.membership-card, .offer-card, .event-card, .voucher-item, .step-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Auto-advance monthly offers (optional demo feature)
    let currentOfferIndex = 0;
    setInterval(() => {
        const monthButtons = document.querySelectorAll('.month-btn');
        if (monthButtons.length > 0) {
            // Don't auto-advance, let user control
            // This is just here for future enhancement
        }
    }, 10000);
    
    console.log('Voucher page loaded successfully');
});

// Copy voucher code function
function copyCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        showToast(`Đã sao chép mã: ${code}`);
        
        // Find and animate the copy button
        const copyBtns = document.querySelectorAll('.copy-btn');
        copyBtns.forEach(btn => {
            if (btn.closest('.voucher-item').querySelector('.code').textContent === code) {
                btn.classList.add('copy-success');
                btn.textContent = 'Đã sao chép!';
                setTimeout(() => {
                    btn.classList.remove('copy-success');
                    btn.textContent = 'Sao chép';
                }, 2000);
            }
        });
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast(`Đã sao chép mã: ${code}`);
    });
}

// Simple modal function
function showModal(title, content) {
    const modal = document.createElement('div');
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
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            animation: slideUp 0.3s ease;
        ">
            <h3 style="color: #232a34; margin-bottom: 15px; font-size: 1.5rem;">${title}</h3>
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">${content}</p>
            <button onclick="closeModal()" style="
                background: #1e90ff;
                color: white;
                border: none;
                padding: 12px 25px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
            ">Đóng</button>
        </div>
    `;
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.body.appendChild(modal);
    window.currentModal = modal;
}

function closeModal() {
    if (window.currentModal) {
        window.currentModal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (window.currentModal && window.currentModal.parentNode) {
                document.body.removeChild(window.currentModal);
            }
            window.currentModal = null;
        }, 300);
    }
}

// Toast notification function
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #232a34;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 1000;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
        transform: translateX(400px);
        max-width: 300px;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
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
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideUp {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(style); 