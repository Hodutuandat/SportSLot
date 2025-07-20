// Sports-Themed Homepage Management
document.addEventListener('DOMContentLoaded', function() {
    initializeSportsHomepage();
    initializeParticleEffect();
    initializeFAQ();
    initializeScrollAnimations();
    initializePhoneDemo();
    
    // Add loading screen
    showSportsLoader();
    
    // Initialize welcome effect
    setTimeout(() => {
        hideSportsLoader();
        addWelcomeEffect();
    }, 1500);
});

// Sports Homepage Initialization
function initializeSportsHomepage() {
    initializeHeroAnimations();
    initializeFeatureCards();
    initializeStepCards();
    initializeScrollEffects();
    
    console.log('🏆 Sports Homepage initialized with maximum energy!');
}

// Hero Section Animations
function initializeHeroAnimations() {
    const heroCTA = document.querySelector('.hero__cta');
    const heroImage = document.querySelector('.hero__image img');
    
    if (heroCTA) {
        heroCTA.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            

            
            // Navigate after animation
            setTimeout(() => {
                window.location.href = '/register';
            }, 800);
        });
        
        // Add hover sound effect
        heroCTA.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        heroCTA.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    }
    
    if (heroImage) {
        heroImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        heroImage.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    }
}

// Feature Cards Interactive Effects
function initializeFeatureCards() {
    const features = document.querySelectorAll('.feature');
    
    features.forEach((feature, index) => {
        // Staggered entrance animation
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            feature.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            feature.style.opacity = '1';
            feature.style.transform = 'translateY(0)';
        }, 200 + (index * 150));
        
        // Hover effects
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            
            // Add shimmer effect to image
            const img = this.querySelector('img');
            if (img) {
                img.style.animation = 'pulse 0.6s ease-in-out';
                setTimeout(() => {
                    img.style.animation = '';
                }, 600);
            }
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Click effect
        feature.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;

            
            // Bounce animation
            this.style.animation = 'bounce 0.6s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
}

// Step Cards Animation
function initializeStepCards() {
    const steps = document.querySelectorAll('.step');
    
    steps.forEach((step, index) => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.03)';
            
            // Animate the number
            const span = this.querySelector('span');
            if (span) {
                span.style.animation = 'pulse 0.6s ease-in-out';
                setTimeout(() => {
                    span.style.animation = '';
                }, 600);
            }
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        step.addEventListener('click', function() {
            const stepNumber = this.querySelector('span').textContent;
            const stepText = this.querySelector('p').textContent;

            
            // Add celebration effect
            createCelebrationBurst(this);
        });
    });
}

// FAQ Interactive System
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq__question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = answer.classList.contains('active');
            
            // Close all other answers
            document.querySelectorAll('.faq__answer').forEach(ans => {
                ans.classList.remove('active');
            });
            document.querySelectorAll('.faq__question').forEach(q => {
                q.classList.remove('active');
            });
            
            // Toggle current answer
            if (!isActive) {
                answer.classList.add('active');
                this.classList.add('active');
        
            }
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add special effects for different sections
                if (entry.target.classList.contains('how-it-works')) {
                    animateStepsSequence();
                } else if (entry.target.classList.contains('faq')) {
                    animateFAQCards();
                }
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('.how-it-works, .faq').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });
}

// Steps Sequence Animation
function animateStepsSequence() {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.style.transform = 'translateY(-5px)';
            step.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                step.style.transform = '';
            }, 300);
        }, index * 200);
    });
}

// FAQ Cards Animation
function animateFAQCards() {
    const faqItems = document.querySelectorAll('.faq__item');
    faqItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateX(-10px)';
            item.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                item.style.transform = 'translateX(0)';
            }, 300);
        }, index * 100);
    });
}

// Particle Effect System
function initializeParticleEffect() {
    const body = document.body;
    const sportsIcons = ['⚽', '🏀', '🎾', '🏐', '⚾', '🏓', '🏸', '🏑'];
    
    // Create floating particles
    setInterval(() => {
        if (Math.random() > 0.95) { // 5% chance
            createFloatingSportsIcon(body, sportsIcons[Math.floor(Math.random() * sportsIcons.length)]);
        }
    }, 200);
    
    // Create background energy particles
    setInterval(() => {
        if (Math.random() > 0.98) { // 2% chance
            createEnergyParticle(body);
        }
    }, 100);
}

function createFloatingSportsIcon(container, icon) {
    const floating = document.createElement('div');
    floating.textContent = icon;
    floating.style.cssText = `
        position: fixed;
        font-size: ${20 + Math.random() * 10}px;
        pointer-events: none;
        z-index: 100;
        opacity: 0.4;
        animation: floatUpSports 4s ease-out forwards;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight + 20}px;
    `;
    
    container.appendChild(floating);
    
    setTimeout(() => {
        if (floating.parentNode) {
            floating.parentNode.removeChild(floating);
        }
    }, 4000);
}

function createEnergyParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--primary-green);
        border-radius: 50%;
        pointer-events: none;
        z-index: 50;
        opacity: 0.6;
        animation: energyFloat 3s ease-out forwards;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight + 10}px;
    `;
    
    container.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 3000);
}

// Celebration Burst Effect
function createCelebrationBurst(element) {
    const celebrations = ['🎉', '⭐', '💫', '✨', '🏆'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.textContent = celebrations[Math.floor(Math.random() * celebrations.length)];
            particle.style.cssText = `
                position: absolute;
                font-size: 16px;
                pointer-events: none;
                z-index: 1000;
                animation: celebrationBurst 1.2s ease-out forwards;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            
            element.style.position = 'relative';
            element.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1200);
        }, i * 50);
    }
}

// Welcome Effect
function addWelcomeEffect() {

    
    // Add sparkle effect to hero
    const hero = document.querySelector('.hero');
    if (hero) {
        createSparkleEffect(hero);
    }
}

function createSparkleEffect(element) {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = '✨';
            sparkle.style.cssText = `
                position: absolute;
                font-size: 12px;
                pointer-events: none;
                z-index: 200;
                animation: sparkle 2s ease-out forwards;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            
            element.style.position = 'relative';
            element.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 2000);
        }, i * 100);
    }
}

// Scroll Effects
function initializeScrollEffects() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const direction = scrollY > lastScrollY ? 'down' : 'up';
        
        // Parallax effect for hero
        const hero = document.querySelector('.hero');
        if (hero) {
            const offset = scrollY * 0.3;
            hero.style.transform = `translateY(${offset}px)`;
        }
        
        lastScrollY = scrollY;
    });
}

// Loading Screen
function showSportsLoader() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <h2>🏆 SportSlot</h2>
            <div class="loader-spinner"></div>
            <p style="margin-top: 20px; font-size: 1.1rem; opacity: 0.9;">Đang tải sân chơi thể thao...</p>
        </div>
    `;
    
    document.body.appendChild(loader);
}

function hideSportsLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, 500);
    }
}



// Utility Functions
function adjustColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

// Enhanced CSS Animations
const sportsAnimations = document.createElement('style');
sportsAnimations.textContent = `
    @keyframes floatUpSports {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.4;
        }
        50% {
            opacity: 0.8;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes energyFloat {
        0% {
            transform: translateY(0);
            opacity: 0.6;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(-80vh);
            opacity: 0;
        }
    }
    
    @keyframes celebrationBurst {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes sparkle {
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
    

`;
document.head.appendChild(sportsAnimations);

// Phone Demo Management
function initializePhoneDemo() {
    const screens = ['home', 'booking', 'success'];
    let currentScreen = 0;
    
    // Auto-cycle through screens
    function cycleScreens() {
        const currentElement = document.querySelector('.app-screen.active');
        const nextScreen = screens[(currentScreen + 1) % screens.length];
        const nextElement = document.querySelector(`[data-screen="${nextScreen}"]`);
        
        if (currentElement && nextElement) {
            // Remove active from current
            currentElement.classList.remove('active');
            
            // Add active to next with delay for smooth transition
            setTimeout(() => {
                nextElement.classList.add('active');
                
                // Add screen-specific animations
                if (nextScreen === 'booking') {
                    addBookingAnimations();
                } else if (nextScreen === 'success') {
                    addSuccessAnimations();
                }
            }, 100);
            
            currentScreen = (currentScreen + 1) % screens.length;
        }
    }
    
    // Interactive elements
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Trigger screen transition based on card
            const actionText = this.querySelector('.action-text').textContent;
            if (actionText.includes('Đặt sân')) {
                goToScreen('booking');
            }
        });
    });
    
    // Interactive booking elements
    const timeSlots = document.querySelectorAll('.time-slot.available');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    const bookButton = document.querySelector('.book-button');
    if (bookButton) {
        bookButton.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                goToScreen('success');
            }, 150);
        });
    }
    
    // Navigation interactions
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Go to home screen when home nav is clicked
            const label = this.querySelector('.nav-label').textContent;
            if (label.includes('Trang chủ')) {
                goToScreen('home');
                currentScreen = 0;
            }
        });
    });
    
    // Start auto-cycling after initial delay
    setTimeout(() => {
        const interval = setInterval(cycleScreens, 4000);
        
        // Pause cycling when user hovers over phone
        const phoneFrame = document.querySelector('.phone-frame');
        if (phoneFrame) {
            phoneFrame.addEventListener('mouseenter', () => clearInterval(interval));
            phoneFrame.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    setInterval(cycleScreens, 4000);
                }, 1000);
            });
        }
    }, 3000);
    
    function goToScreen(screenName) {
        const currentActive = document.querySelector('.app-screen.active');
        const targetScreen = document.querySelector(`[data-screen="${screenName}"]`);
        
        if (currentActive && targetScreen) {
            currentActive.classList.remove('active');
            setTimeout(() => {
                targetScreen.classList.add('active');
                currentScreen = screens.indexOf(screenName);
            }, 100);
        }
    }
    
    function addBookingAnimations() {
        const timeSlots = document.querySelectorAll('.time-slot');
        timeSlots.forEach((slot, index) => {
            slot.style.opacity = '0';
            slot.style.transform = 'translateY(10px)';
            setTimeout(() => {
                slot.style.transition = 'all 0.3s ease';
                slot.style.opacity = '1';
                slot.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    function addSuccessAnimations() {
        const successIcon = document.querySelector('.success-icon');
        if (successIcon) {
            successIcon.style.transform = 'scale(0)';
            setTimeout(() => {
                successIcon.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                successIcon.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    console.log('📱 Phone Demo initialized with interactive features!');
}

// Initialize on page visibility change
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // Page became visible again
        setTimeout(() => {
        
        }, 500);
    }
});

console.log('🚀 Sports Homepage loaded with championship energy!'); 