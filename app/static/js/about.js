// About Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animation for stats
                if (entry.target.classList.contains('stat-item')) {
                    animateNumber(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.stat-item, .mission-item, .team-member, .contact-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Number animation for statistics
    function animateNumber(element) {
        const numberElement = element.querySelector('.stat-number');
        if (!numberElement) return;
        
        const text = numberElement.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        if (isNaN(number)) return;
        
        const suffix = text.replace(/[\d,]/g, '');
        let current = 0;
        const increment = number / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            numberElement.textContent = Math.floor(current).toLocaleString() + suffix;
        }, 30);
    }

    // Email click handler
    const emailLinks = document.querySelectorAll('.contact-email');
    emailLinks.forEach(emailLink => {
        emailLink.addEventListener('click', function(e) {
            const email = this.textContent.replace('📧 ', '');
            navigator.clipboard.writeText(email).then(() => {
                showToast('Email đã được sao chép: ' + email);
            }).catch(() => {
                // Fallback for older browsers
                window.location.href = 'mailto:' + email;
            });
        });
    });

    // Simple toast notification
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
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Team member interaction
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(30,144,255,0.2)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    });

    // Stats counter on page load
    setTimeout(() => {
        const statsSection = document.querySelector('.stats-grid');
        if (statsSection) {
            const rect = statsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                document.querySelectorAll('.stat-item').forEach(animateNumber);
            }
        }
    }, 1000);

    // Contact item click effects
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const heading = this.querySelector('h4').textContent;
            const content = this.querySelector('p').textContent;
            
            if (heading === 'Email') {
                const emails = content.split('\n');
                if (emails.length > 0) {
                    window.location.href = 'mailto:' + emails[0].trim();
                }
            } else if (heading === 'Điện thoại') {
                const phones = content.match(/[\d\-\(\)\s]+/g);
                if (phones && phones.length > 0) {
                    window.location.href = 'tel:' + phones[0].replace(/\D/g, '');
                }
            }
        });
    });

    console.log('About page loaded successfully');
}); 