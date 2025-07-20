// Public Navbar JavaScript - Clean & Simple
document.addEventListener('DOMContentLoaded', function() {
    initializePublicNavbar();
});

function initializePublicNavbar() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMobileMenu();
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const navbar = document.querySelector('.public-navbar');
        const mobileMenu = document.getElementById('mobileMenu');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        if (navbar && mobileMenu && toggle) {
            if (!navbar.contains(event.target)) {
                mobileMenu.classList.remove('active');
                toggle.classList.remove('active');
            }
        }
    });
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileMenu && toggle) {
        mobileMenu.classList.toggle('active');
        toggle.classList.toggle('active');
    }
}

// Prevent any transform effects on auth buttons
document.addEventListener('DOMContentLoaded', function() {
    const authButtons = document.querySelectorAll('.auth-btn, .mobile-auth-btn');
    
    authButtons.forEach(button => {
        // Ensure buttons maintain their size during navigation
        button.addEventListener('click', function(e) {
            // Prevent any size changes during click
            this.style.transform = 'none';
            this.style.width = '100px';
            this.style.height = this.classList.contains('mobile-auth-btn') ? '44px' : '40px';
        });
        
        // Prevent any hover transforms
        button.addEventListener('mouseenter', function(e) {
            this.style.transform = 'none';
        });
        
        button.addEventListener('mouseleave', function(e) {
            this.style.transform = 'none';
        });
    });
}); 