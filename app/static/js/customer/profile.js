// Sports-Themed Profile Management
document.addEventListener('DOMContentLoaded', function() {
    initializeProfileTabs();
    initializeFilters();
    initializeSportsAnimations();
    initializeParticleEffect();
    
    // Add welcome animation
    setTimeout(() => {
        addWelcomeAnimation();
    }, 500);
});

// Enhanced Tab Switching with Sports Energy
function initializeProfileTabs() {
    const navItems = document.querySelectorAll('.profile-nav-item');
    const tabContents = document.querySelectorAll('.profile-tab-content');
    
    navItems.forEach((navItem, index) => {
        navItem.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Remove active class from all nav items and tab contents
            navItems.forEach(item => item.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked nav item
            this.classList.add('active');
            
            // Show corresponding tab content with staggered animation
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                setTimeout(() => {
                    targetContent.classList.add('active');
                    animateTabContent(targetContent);
                }, 200);
            }
            

        });
    });
}

// Animate tab content with sports energy
function animateTabContent(content) {
    const sections = content.querySelectorAll('.profile-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Enhanced Filter Functionality with Sports Feedback
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add dynamic click effect
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Get the parent filters container
            const filtersContainer = this.closest('.simple-filters');
            const inputs = filtersContainer.querySelectorAll('.filter-input');
            
            // Collect filter values
            let filterData = {};
            inputs.forEach(input => {
                if (input.value.trim()) {
                    filterData[input.previousElementSibling.textContent.trim()] = input.value.trim();
                }
            });
            
            // Show energetic feedback
            if (Object.keys(filterData).length > 0) {
        
                addFilterAnimation(filtersContainer);
                
                // Animate table rows
                const table = filtersContainer.parentElement.querySelector('.simple-table');
                if (table) {
                    animateTableRows(table);
                }
            } else {
        
                shakeAnimation(this);
            }
        });
    });
}

// Sports-themed animations
function initializeSportsAnimations() {
    // Hover effects for cards
    const profileSections = document.querySelectorAll('.profile-section');
    profileSections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.01)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Bouncing effect for status badges
    const statusBadges = document.querySelectorAll('.status-badge');
    statusBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            this.style.animation = 'bounce 0.6s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
    
    // Table row sports hover effect
    const tableRows = document.querySelectorAll('.simple-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.01)';
            this.style.boxShadow = '0 8px 25px rgba(0, 191, 99, 0.1)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// Particle effect for sports energy
function initializeParticleEffect() {
    const container = document.querySelector('.profile-container');
    
    // Create floating sports icons
    const sportsIcons = ['⚽', '🏀', '🎾', '🏐', '⚾', '🏓'];
    
    setInterval(() => {
        if (Math.random() > 0.97) { // 3% chance every interval
            createFloatingIcon(container, sportsIcons[Math.floor(Math.random() * sportsIcons.length)]);
        }
    }, 100);
}

function createFloatingIcon(container, icon) {
    const floating = document.createElement('div');
    floating.textContent = icon;
    floating.style.cssText = `
        position: fixed;
        font-size: 20px;
        pointer-events: none;
        z-index: 100;
        opacity: 0.3;
        animation: floatUp 3s ease-out forwards;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight + 20}px;
    `;
    
    container.appendChild(floating);
    
    // Remove after animation
    setTimeout(() => {
        if (floating.parentNode) {
            floating.parentNode.removeChild(floating);
        }
    }, 3000);
}

// Welcome animation
function addWelcomeAnimation() {
    const title = document.querySelector('.profile-section-title');
    if (title) {
        title.style.transform = 'scale(1.1)';
        title.style.transition = 'transform 0.6s ease';
        setTimeout(() => {
            title.style.transform = 'scale(1)';
        }, 600);
    }
}

// Enhanced Voucher Button Functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('voucher-btn') && e.target.classList.contains('apply')) {
        e.preventDefault();
        const voucherCard = e.target.closest('.voucher-card');
        const voucherCode = voucherCard.querySelector('.voucher-info span').textContent;
        
        // Add celebration animation
        celebrateVoucherApplication(voucherCard);
        
    }
});

// Member Type Button with Sports Energy
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('member-type-btn')) {
        e.preventDefault();
        
        // Add pulsing effect
        e.target.style.animation = 'pulse 0.6s ease-in-out';
        setTimeout(() => {
            e.target.style.animation = '';
        }, 600);
        
    
    }
});

// Celebration animation for voucher
function celebrateVoucherApplication(card) {
    // Create celebration particles
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createCelebrationParticle(card);
        }, i * 50);
    }
    
    // Card bounce effect
    card.style.animation = 'bounce 0.8s ease-in-out';
    setTimeout(() => {
        card.style.animation = '';
    }, 800);
}

function createCelebrationParticle(parent) {
    const particle = document.createElement('div');
    particle.textContent = ['🎉', '⭐', '💫', '✨'][Math.floor(Math.random() * 4)];
    particle.style.cssText = `
        position: absolute;
        font-size: 16px;
        pointer-events: none;
        z-index: 1000;
        animation: celebrate 1s ease-out forwards;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
    `;
    
    parent.style.position = 'relative';
    parent.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 1000);
}

// Filter animation
function addFilterAnimation(container) {
    container.style.transform = 'scale(1.02)';
    container.style.transition = 'transform 0.3s ease';
    setTimeout(() => {
        container.style.transform = 'scale(1)';
    }, 300);
}

// Table rows animation
function animateTableRows(table) {
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach((row, index) => {
        setTimeout(() => {
            row.style.transform = 'translateX(-10px)';
            row.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                row.style.transform = 'translateX(0)';
            }, 100);
        }, index * 50);
    });
}

// Shake animation for errors
function shakeAnimation(element) {
    element.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}



// Color adjustment utility
function adjustColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

// Enhanced CSS animations
const sportsStyle = document.createElement('style');
sportsStyle.textContent = `
    @keyframes slideInSports {
        from {
            transform: translateX(100%) rotate(5deg);
            opacity: 0;
        }
        to {
            transform: translateX(0) rotate(0deg);
            opacity: 1;
        }
    }
    
    @keyframes slideOutSports {
        from {
            transform: translateX(0) rotate(0deg);
            opacity: 1;
        }
        to {
            transform: translateX(100%) rotate(-5deg);
            opacity: 0;
        }
    }
    
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
        }
        50% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes celebrate {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    

`;
document.head.appendChild(sportsStyle);

// Table Row Click Handlers with Sports Energy
document.addEventListener('click', function(e) {
    const row = e.target.closest('tr');
    if (row && row.closest('.simple-table')) {
        // Only handle if not clicking on a button
        if (!e.target.closest('button')) {
            const table = row.closest('.simple-table');
            const isBookingTable = table.closest('#booking-history');
            const isTransactionTable = table.closest('#transaction-history');
            
            // Add click animation
            row.style.transform = 'scale(0.98)';
            setTimeout(() => {
                row.style.transform = '';
            }, 150);
            
            if (isBookingTable) {
                const bookingId = row.cells[1]?.textContent;
                if (bookingId && bookingId.startsWith('#')) {
                
                }
            } else if (isTransactionTable) {
                const transactionId = row.cells[1]?.textContent;
                if (transactionId && transactionId.startsWith('#')) {
                
                }
            }
        }
    }
});

// Enhanced Mobile Experience
function initializeMobileSports() {
    if (window.innerWidth <= 768) {
        // Create mobile sports toggle
        const toggleButton = document.createElement('button');
        toggleButton.innerHTML = '🏆';
        toggleButton.className = 'mobile-sports-toggle';
        toggleButton.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            background: linear-gradient(135deg, #00BF63 0%, #1E40AF 100%);
            color: white;
            border: none;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            z-index: 1001;
            box-shadow: 0 8px 25px rgba(0, 191, 99, 0.3);
            animation: pulse 2s infinite;
        `;
        
        document.body.appendChild(toggleButton);
        
        toggleButton.addEventListener('click', function() {
            const sidebar = document.querySelector('.profile-sidebar');
            const isVisible = sidebar.style.transform === 'translateX(0px)';
            
            sidebar.style.transform = isVisible ? 'translateX(-100%)' : 'translateX(0px)';
            sidebar.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Animate button
            this.style.transform = 'scale(0.9) rotate(180deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    }
}

// Initialize mobile features
window.addEventListener('resize', initializeMobileSports);
if (window.innerWidth <= 768) {
    initializeMobileSports();
}

// Initialize success message
setTimeout(() => {

}, 1000);

console.log('🏆 Sports Profile initialized with maximum energy!');