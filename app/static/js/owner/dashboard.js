// Owner Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize Charts
    initializeCharts();
    
    // Add click handlers for navigation
    setupNavigation();
    
    // Setup real-time updates simulation
    setupRealtimeUpdates();
    
    console.log('Owner dashboard loaded successfully');
});

function initializeCharts() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: window.chartData.labels,
                datasets: [{
                    label: 'Doanh thu (VND)',
                    data: window.chartData.revenueData,
                    borderColor: '#1e90ff',
                    backgroundColor: 'rgba(30, 144, 255, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#1e90ff',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return new Intl.NumberFormat('vi-VN').format(value) + 'đ';
                            }
                        },
                        grid: {
                            color: 'rgba(0,0,0,0.05)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0,0,0,0.05)'
                        }
                    }
                },
                elements: {
                    point: {
                        hoverRadius: 8
                    }
                }
            }
        });
    }

    // Bookings Chart
    const bookingsCtx = document.getElementById('bookingsChart');
    if (bookingsCtx) {
        new Chart(bookingsCtx, {
            type: 'bar',
            data: {
                labels: window.chartData.labels,
                datasets: [{
                    label: 'Số lượt đặt',
                    data: window.chartData.bookingsData,
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(139, 92, 246, 0.8)',
                        'rgba(236, 72, 153, 0.8)',
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(249, 115, 22, 0.8)',
                        'rgba(168, 85, 247, 0.8)',
                        'rgba(14, 165, 233, 0.8)',
                        'rgba(132, 204, 22, 0.8)',
                        'rgba(251, 146, 60, 0.8)',
                        'rgba(192, 38, 211, 0.8)'
                    ],
                    borderColor: [
                        'rgba(16, 185, 129, 1)',
                        'rgba(59, 130, 246, 1)',
                        'rgba(245, 158, 11, 1)',
                        'rgba(139, 92, 246, 1)',
                        'rgba(236, 72, 153, 1)',
                        'rgba(34, 197, 94, 1)',
                        'rgba(249, 115, 22, 1)',
                        'rgba(168, 85, 247, 1)',
                        'rgba(14, 165, 233, 1)',
                        'rgba(132, 204, 22, 1)',
                        'rgba(251, 146, 60, 1)',
                        'rgba(192, 38, 211, 1)'
                    ],
                    borderWidth: 2,
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 5
                        },
                        grid: {
                            color: 'rgba(0,0,0,0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

function setupNavigation() {
    // Add active state management for sidebar
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active from all links except logout
            if (!this.classList.contains('logout')) {
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Quick action cards hover effects
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-3px) scale(1)';
        });
    });

    // Stat cards click effects
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px)';
            }, 100);
        });
    });
}

function setupRealtimeUpdates() {
    // Simulate real-time updates
    setInterval(() => {
        updateNotificationIndicator();
    }, 30000); // Check every 30 seconds
    
    // Activity items animation
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100);
        }, index * 100);
    });
}

function updateNotificationIndicator() {
    const notificationLink = document.querySelector('a[href*="notifications"]');
    if (notificationLink && !notificationLink.querySelector('.notification-badge')) {
        // Simulate new notification
        if (Math.random() > 0.7) {
            const badge = document.createElement('span');
            badge.className = 'notification-badge';
            badge.textContent = '1';
            badge.style.cssText = `
                position: absolute;
                top: 8px;
                right: 8px;
                background: #ef4444;
                color: white;
                border-radius: 50%;
                width: 18px;
                height: 18px;
                font-size: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            `;
            notificationLink.style.position = 'relative';
            notificationLink.appendChild(badge);
        }
    }
}

// Format currency function
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Mobile sidebar toggle (for future mobile implementation)
function toggleSidebar() {
    const sidebar = document.querySelector('.owner-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('mobile-open');
    }
}

// Export functions for use in other scripts
window.ownerDashboard = {
    formatCurrency,
    toggleSidebar,
    updateNotificationIndicator
};

// Add some CSS for animations
const style = document.createElement('style');
style.textContent = `
    .notification-badge {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .stat-card {
        cursor: pointer;
    }
    
    .mobile-open {
        transform: translateX(0) !important;
    }
    
    .chart-container:hover {
        box-shadow: 0 4px 15px rgba(0,0,0,0.15);
        transition: box-shadow 0.3s ease;
    }
`;
document.head.appendChild(style); 