// Sports-Themed Navbar Management
document.addEventListener('DOMContentLoaded', function() {
    initializeSportsNavbar();
    initializeParticleEffects();
    initializeScrollBehavior();
    
    console.log('🏆 Sports Navbar initialized with championship energy!');
});

// Initialize Sports Navbar
function initializeSportsNavbar() {
    addNavbarAnimations();
    addHoverEffects();
    addClickEffects();

    
    // Auto-hide mobile menu on larger screens
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const menu = document.getElementById('navbarMenu');
            const overlay = document.getElementById('navbarOverlay');
            
            if (menu) menu.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
        }
    });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('navbarMenu');
    const overlay = document.getElementById('navbarOverlay');
    const toggle = document.querySelector('.navbar__mobile-toggle');
    
    if (menu && overlay) {
        const isActive = menu.classList.contains('active');
        
        if (isActive) {
            // Close menu
            menu.classList.remove('active');
            overlay.classList.remove('active');
            if (toggle) {
                toggle.innerHTML = '<i class="fas fa-bars"></i>';
                toggle.style.animation = '';
            }
        } else {
            // Open menu
            menu.classList.add('active');
            overlay.classList.add('active');
            if (toggle) {
                toggle.innerHTML = '<i class="fas fa-times"></i>';
                toggle.style.animation = 'pulse 0.3s ease-in-out';
            }
            
            // Add staggered animation for menu items
            const menuItems = menu.querySelectorAll('li');
            menuItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 100 + (index * 50));
            });
        }
    }
}

// Navbar Entrance Animation
function addNavbarAnimations() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Staggered animation for menu items
        const menuItems = navbar.querySelectorAll('.navbar__menu li');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 300 + (index * 100));
        });
    }
}

// Enhanced Hover Effects
function addHoverEffects() {
    const navbar = document.querySelector('.navbar');
    const logo = document.querySelector('.navbar__logo a');
    const menuItems = document.querySelectorAll('.navbar__menu li a');
    
    // Navbar hover effect
    if (navbar) {
        navbar.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        navbar.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    }
    
    // Logo hover effect
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
    
        });
        
        logo.addEventListener('mouseleave', function() {
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    }
    
    // Menu items hover effects
    menuItems.forEach(item => {
        if (!item.classList.contains('navbar__login-btn') && 
            !item.classList.contains('navbar__register-btn') && 
            !item.classList.contains('navbar__profile-btn')) {
            
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.05)';
                createHoverSparkle(this);
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        }
    });
}

// Enhanced Click Effects
function addClickEffects() {
    const buttons = document.querySelectorAll('.navbar__login-btn, .navbar__register-btn, .navbar__profile-btn');
    const regularLinks = document.querySelectorAll('.navbar__menu li a:not(.navbar__login-btn):not(.navbar__register-btn):not(.navbar__profile-btn)');
    
    // Button click effects - No size changes
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // No transform effects - only color changes via CSS
            const buttonText = this.textContent.trim();
            if (buttonText.includes('Hồ Sơ')) {
                createCelebrationBurst(this);
            }
        });
    });
    
    // Regular link click effects - No size changes
    regularLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // No transform effects
        });
    });
}



// Particle Effects System
function initializeParticleEffects() {
    const effectsContainer = document.getElementById('navbarEffects');
    if (!effectsContainer) return;
    
    // Create floating particles
    setInterval(() => {
        if (Math.random() > 0.97) {
            createNavbarParticle(effectsContainer);
        }
    }, 200);
}

function createNavbarParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'navbar__particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    container.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 4000);
}

// Hover Sparkle Effect
function createHoverSparkle(element) {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.cssText = `
        position: absolute;
        top: -10px;
        right: -10px;
        font-size: 12px;
        pointer-events: none;
        z-index: 100;
        animation: sparkleEffect 0.8s ease-out forwards;
    `;
    
    element.style.position = 'relative';
    element.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 800);
}

// Celebration Burst Effect
function createCelebrationBurst(element) {
    const celebrations = ['🎉', '⭐', '💫', '🏆'];
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.textContent = celebrations[Math.floor(Math.random() * celebrations.length)];
            particle.style.cssText = `
                position: absolute;
                font-size: 14px;
                pointer-events: none;
                z-index: 1000;
                animation: celebrationPop 1s ease-out forwards;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            
            element.style.position = 'relative';
            element.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        }, i * 100);
    }
}

// Scroll Behavior
function initializeScrollBehavior() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const currentScrollY = window.scrollY;
        
        if (navbar) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
                navbar.style.transition = 'transform 0.3s ease';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
                navbar.style.transition = 'transform 0.3s ease';
                
                // Add entrance effect
                if (currentScrollY < lastScrollY) {
                    navbar.style.boxShadow = 'var(--shadow-hover)';
                    setTimeout(() => {
                        navbar.style.boxShadow = '';
                    }, 300);
                }
            }
        }
        
        lastScrollY = currentScrollY;
    });
}



// Utility Functions
function adjustColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

// Enhanced CSS Animations
const navbarAnimations = document.createElement('style');
navbarAnimations.textContent = `
    @keyframes sparkleEffect {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes celebrationPop {
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
    
    @keyframes slideInNavbar {
        from {
            transform: translateX(100%) scale(0.8);
            opacity: 0;
        }
        to {
            transform: translateX(0) scale(1);
            opacity: 1;
        }
    }
    
    @keyframes slideOutNavbar {
        from {
            transform: translateX(0) scale(1);
            opacity: 1;
        }
        to {
            transform: translateX(100%) scale(0.8);
            opacity: 0;
        }
    }
    

`;
document.head.appendChild(navbarAnimations);

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const menu = document.getElementById('navbarMenu');
        const overlay = document.getElementById('navbarOverlay');
        
        if (menu && menu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
});

// Page Load Completion
window.addEventListener('load', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.classList.add('navbar--loaded');
        
        // Add completion sparkle
        setTimeout(() => {
            createNavbarCompletionEffect();
        }, 500);
    }
});

function createNavbarCompletionEffect() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = '⭐';
            sparkle.style.cssText = `
                position: absolute;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                font-size: 12px;
                pointer-events: none;
                z-index: 100;
                animation: sparkleEffect 1s ease-out forwards;
            `;
            
            navbar.style.position = 'relative';
            navbar.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1000);
        }, i * 100);
    }
}

console.log('🚀 Sports Navbar loaded with championship power!'); 