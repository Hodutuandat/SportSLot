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
    
    // Prevent any transform effects on auth buttons
    preventAuthButtonTransforms();
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileMenu && toggle) {
        mobileMenu.classList.toggle('active');
        toggle.classList.toggle('active');
    }
}

function preventAuthButtonTransforms() {
    const authButtons = document.querySelectorAll('.public-navbar .auth-btn, .public-navbar .mobile-auth-btn');

    function removeInlineStyles(el) {
        el.style.removeProperty('transform');
        el.style.removeProperty('width');
        el.style.removeProperty('height');
        el.style.removeProperty('box-shadow');
        el.style.removeProperty('animation');
    }

    authButtons.forEach(button => {
        // Xóa inline style khi click
        button.addEventListener('click', function() {
            removeInlineStyles(this);
        });
        // Xóa inline style khi hover
        button.addEventListener('mouseenter', function() {
            removeInlineStyles(this);
        });
        button.addEventListener('mouseleave', function() {
            removeInlineStyles(this);
        });
        // Xóa inline style khi focus/blur
        button.addEventListener('focus', function() {
            removeInlineStyles(this);
        });
        button.addEventListener('blur', function() {
            removeInlineStyles(this);
        });
    });
} 