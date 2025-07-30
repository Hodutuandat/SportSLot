// Flash Messages JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Auto-hide flash messages after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    
    alerts.forEach(alert => {
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (alert && alert.parentNode) {
                alert.classList.add('fade-out');
                setTimeout(() => {
                    if (alert && alert.parentNode) {
                        alert.parentNode.removeChild(alert);
                    }
                }, 300);
            }
        }, 5000);
        
        // Manual close button
        const closeBtn = alert.querySelector('.btn-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                alert.classList.add('fade-out');
                setTimeout(() => {
                    if (alert && alert.parentNode) {
                        alert.parentNode.removeChild(alert);
                    }
                }, 300);
            });
        }
    });
    
    // Remove empty flash message containers
    const flashContainer = document.querySelector('.flash-messages');
    if (flashContainer && flashContainer.children.length === 0) {
        flashContainer.remove();
    }
});

// Function to show custom flash message
function showFlashMessage(message, type = 'info') {
    const flashContainer = document.querySelector('.flash-messages') || createFlashContainer();
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.innerHTML = `
        <i class="fas fa-${getIconForType(type)}"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    flashContainer.appendChild(alert);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (alert && alert.parentNode) {
            alert.classList.add('fade-out');
            setTimeout(() => {
                if (alert && alert.parentNode) {
                    alert.parentNode.removeChild(alert);
                }
            }, 300);
        }
    }, 5000);
    
    // Manual close
    const closeBtn = alert.querySelector('.btn-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            alert.classList.add('fade-out');
            setTimeout(() => {
                if (alert && alert.parentNode) {
                    alert.parentNode.removeChild(alert);
                }
            }, 300);
        });
    }
}

function createFlashContainer() {
    const container = document.createElement('div');
    container.className = 'flash-messages';
    document.body.appendChild(container);
    return container;
}

function getIconForType(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-triangle',
        'warning': 'exclamation-circle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
} 