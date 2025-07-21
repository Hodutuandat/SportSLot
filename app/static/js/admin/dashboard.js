// Admin Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize current time
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    // Initialize revenue chart
    initializeRevenueChart();
    
    // Initialize chart filters
    initializeChartFilters();
    
    // Initialize performer filters
    initializePerformerFilters();
    
    // Initialize alert actions
    initializeAlertActions();
    
    // Initialize system health monitoring
    initializeSystemHealth();
});

// Update current time
function updateCurrentTime() {
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        timeElement.textContent = timeString;
    }
}

// Initialize revenue chart
function initializeRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;
    
    // Sample data for revenue chart
    const monthlyData = {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        datasets: [{
            label: 'Doanh thu (triệu VNĐ)',
            data: [32, 38, 45, 52, 58, 63, 68, 72, 78, 85, 92, 98],
            borderColor: '#1e3a8a',
            backgroundColor: 'rgba(30, 58, 138, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
        }]
    };
    
    const quarterlyData = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
            label: 'Doanh thu (triệu VNĐ)',
            data: [115, 173, 218, 275],
            borderColor: '#1e3a8a',
            backgroundColor: 'rgba(30, 58, 138, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
        }]
    };
    
    const yearlyData = {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        datasets: [{
            label: 'Doanh thu (triệu VNĐ)',
            data: [450, 680, 920, 1250, 1580],
            borderColor: '#1e3a8a',
            backgroundColor: 'rgba(30, 58, 138, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
        }]
    };
    
    // Create chart
    const chart = new Chart(ctx, {
        type: 'line',
        data: monthlyData,
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
                    grid: {
                        color: '#e2e8f0'
                    },
                    ticks: {
                        color: '#64748b',
                        font: {
                            size: 12
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#64748b',
                        font: {
                            size: 12
                        }
                    }
                }
            },
            elements: {
                point: {
                    radius: 4,
                    hoverRadius: 6
                }
            }
        }
    });
    
    // Store chart reference for filter updates
    window.revenueChart = chart;
    window.chartData = {
        month: monthlyData,
        quarter: quarterlyData,
        year: yearlyData
    };
}

// Initialize chart filters
function initializeChartFilters() {
    const filterButtons = document.querySelectorAll('.chart-filter');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const period = this.getAttribute('data-period');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update chart data
            if (window.revenueChart && window.chartData) {
                const newData = window.chartData[period];
                if (newData) {
                    window.revenueChart.data = newData;
                    window.revenueChart.update();
                }
            }
            
            // Update stats based on period
            updateChartStats(period);
        });
    });
}

// Update chart statistics
function updateChartStats(period) {
    const stats = {
        month: { total: '45.6M VNĐ', growth: '+8.3%' },
        quarter: { total: '275M VNĐ', growth: '+12.1%' },
        year: { total: '1.58B VNĐ', growth: '+26.4%' }
    };
    
    const currentStats = stats[period];
    if (currentStats) {
        const statElements = document.querySelectorAll('.chart-stat .stat-value');
        if (statElements.length >= 2) {
            statElements[0].textContent = currentStats.total;
            statElements[1].textContent = currentStats.growth;
        }
    }
}

// Initialize performer filters
function initializePerformerFilters() {
    const filterButtons = document.querySelectorAll('.performer-filter');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update performer data based on type
            updatePerformerData(type);
        });
    });
}

// Update performer data
function updatePerformerData(type) {
    const performers = document.querySelectorAll('.performer-item');
    
    if (type === 'revenue') {
        // Revenue data
        const revenueData = [
            { name: 'Sân Bóng Đá A', owner: 'Trần Thị Bình', value: '9.0M VNĐ', label: 'Doanh thu tháng' },
            { name: 'Sân Tennis Elite', owner: 'Phạm Văn Dũng', value: '7.5M VNĐ', label: 'Doanh thu tháng' },
            { name: 'Sân Cầu Lông Vip', owner: 'Lê Hoàng Anh', value: '6.8M VNĐ', label: 'Doanh thu tháng' }
        ];
        
        performers.forEach((performer, index) => {
            const data = revenueData[index];
            if (data) {
                performer.querySelector('.performer-name').textContent = data.name;
                performer.querySelector('.performer-owner').textContent = `Chủ sân: ${data.owner}`;
                performer.querySelector('.performer-value').textContent = data.value;
                performer.querySelector('.performer-label').textContent = data.label;
            }
        });
    } else if (type === 'bookings') {
        // Bookings data
        const bookingData = [
            { name: 'Sân Bóng Đá A', owner: 'Trần Thị Bình', value: '156', label: 'Đặt sân tháng' },
            { name: 'Sân Tennis Elite', owner: 'Phạm Văn Dũng', value: '134', label: 'Đặt sân tháng' },
            { name: 'Sân Cầu Lông Vip', owner: 'Lê Hoàng Anh', value: '98', label: 'Đặt sân tháng' }
        ];
        
        performers.forEach((performer, index) => {
            const data = bookingData[index];
            if (data) {
                performer.querySelector('.performer-name').textContent = data.name;
                performer.querySelector('.performer-owner').textContent = `Chủ sân: ${data.owner}`;
                performer.querySelector('.performer-value').textContent = data.value;
                performer.querySelector('.performer-label').textContent = data.label;
            }
        });
    }
}

// Initialize alert actions
function initializeAlertActions() {
    const alertButtons = document.querySelectorAll('.alert-btn');
    
    alertButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.classList.contains('approve') ? 'approve' : 
                          this.classList.contains('reject') ? 'reject' : 'view';
            
            handleAlertAction(action, this);
        });
    });
}

// Handle alert actions
function handleAlertAction(action, button) {
    const alertItem = button.closest('.alert-item');
    
    switch (action) {
        case 'approve':
            showNotification('Đã duyệt thành công!', 'success');
            alertItem.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                alertItem.remove();
                updateAlertCount();
            }, 300);
            break;
            
        case 'reject':
            showNotification('Đã từ chối!', 'warning');
            alertItem.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                alertItem.remove();
                updateAlertCount();
            }, 300);
            break;
            
        case 'view':
            showNotification('Mở trang chi tiết...', 'info');
            // Redirect to detail page
            break;
    }
}

// Update alert count
function updateAlertCount() {
    const alerts = document.querySelectorAll('.alert-item');
    const countBadge = document.querySelector('.count-badge');
    
    if (countBadge) {
        countBadge.textContent = alerts.length;
    }
}

// Initialize system health monitoring
function initializeSystemHealth() {
    // Simulate real-time system health updates
    setInterval(() => {
        updateSystemMetrics();
    }, 5000);
}

// Update system metrics
function updateSystemMetrics() {
    const metrics = [
        { label: 'CPU Usage', value: Math.floor(Math.random() * 30) + 40 },
        { label: 'Memory Usage', value: Math.floor(Math.random() * 20) + 55 },
        { label: 'Disk Usage', value: Math.floor(Math.random() * 15) + 35 },
        { label: 'Network', value: Math.floor(Math.random() * 25) + 65 }
    ];
    
    metrics.forEach((metric, index) => {
        const metricElement = document.querySelectorAll('.health-metric')[index];
        if (metricElement) {
            const fillElement = metricElement.querySelector('.metric-fill');
            const valueElement = metricElement.querySelector('.metric-value');
            
            if (fillElement && valueElement) {
                fillElement.style.width = `${metric.value}%`;
                valueElement.textContent = `${metric.value}%`;
                
                // Update color based on usage
                if (metric.value > 80) {
                    fillElement.style.background = 'linear-gradient(90deg, #ef4444, #dc2626)';
                } else if (metric.value > 60) {
                    fillElement.style.background = 'linear-gradient(90deg, #f59e0b, #d97706)';
                } else {
                    fillElement.style.background = 'linear-gradient(90deg, #22c55e, #16a34a)';
                }
            }
        }
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification-toast ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        color: white;
        font-size: 14px;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#22c55e';
            break;
        case 'warning':
            notification.style.background = '#f59e0b';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        default:
            notification.style.background = '#3b82f6';
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(-100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export functions for global access
window.adminDashboard = {
    updateCurrentTime,
    showNotification,
    handleAlertAction
}; 