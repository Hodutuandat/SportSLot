document.addEventListener('DOMContentLoaded', function() {
    // Example: Navbar active link
    const links = document.querySelectorAll('.navbar-menu li a');
    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
    // Add more JS as needed
});

// Example: Toggle mobile menu (expand for future)
// const menuToggle = document.querySelector('.navbar-toggle');
// const menu = document.querySelector('.navbar-menu');
// if (menuToggle && menu) {
//     menuToggle.addEventListener('click', function() {
//         menu.classList.toggle('open');
//     });
// }
