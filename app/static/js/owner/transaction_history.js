// Revenue/Transaction History Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeRevenuePage();
    console.log('Revenue page loaded successfully');
});

// Global Variables
let revenueChart, fieldChart;
let currentTimeRange = 'week';
let currentChartType = 'revenue';

// Initialize the revenue page
function initializeRevenuePage() {
    initializeCharts();
    setupEventListeners();
    loadRevenueData();
}

// Initialize charts
function initializeCharts() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
            datasets: [{
                label: 'Doanh thu (VNĐ)',
                data: [2.1, 1.8, 2.3, 2.5, 2.8, 3.2, 2.1],
                borderColor: '#1e90ff',
                backgroundColor: 'rgba(30, 144, 255, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
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
                            return value + 'M';
                        }
                    }
                }
            }
        }
    });

    // Field Performance Chart
    const fieldCtx = document.getElementById('fieldChart').getContext('2d');
    fieldChart = new Chart(fieldCtx, {
        type: 'doughnut',
        data: {
            labels: ['Sân A', 'Sân B', 'Sân C'],
            datasets: [{
                data: [45, 35, 20],
                backgroundColor: [
                    '#1e90ff',
                    '#10b981',
                    '#f59e0b'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Add any additional event listeners here
}

// Load revenue data based on time range
function loadRevenueData() {
    // Simulate loading data from server
    console.log('Loading revenue data for:', currentTimeRange);
    
    // Update charts with new data
    updateCharts();
    
    // Update overview cards
    updateOverviewCards();
}

// Update charts with new data
function updateCharts() {
    const data = getChartData(currentTimeRange, currentChartType);
    
    if (currentChartType === 'revenue') {
        revenueChart.data.datasets[0].data = data;
        revenueChart.data.datasets[0].label = 'Doanh thu (VNĐ)';
    } else {
        revenueChart.data.datasets[0].data = data;
        revenueChart.data.datasets[0].label = 'Số đặt sân';
    }
    
    revenueChart.update();
}

// Get chart data based on time range and type
function getChartData(timeRange, type) {
    const data = {
        'revenue': {
            'today': [2.1],
            'week': [2.1, 1.8, 2.3, 2.5, 2.8, 3.2, 2.1],
            'month': [2.1, 1.8, 2.3, 2.5, 2.8, 3.2, 2.1, 2.4, 2.6, 2.9, 3.1, 2.7, 2.3, 2.8, 3.0, 2.5, 2.2, 2.6, 2.9, 3.2, 2.8, 2.4, 2.7, 3.0, 2.6, 2.3, 2.8, 3.1, 2.9, 2.5],
            'quarter': [2.1, 1.8, 2.3, 2.5, 2.8, 3.2, 2.1, 2.4, 2.6, 2.9, 3.1, 2.7, 2.3, 2.8, 3.0, 2.5, 2.2, 2.6, 2.9, 3.2, 2.8, 2.4, 2.7, 3.0, 2.6, 2.3, 2.8, 3.1, 2.9, 2.5, 2.1, 1.8, 2.3, 2.5, 2.8, 3.2, 2.1, 2.4, 2.6, 2.9, 3.1, 2.7, 2.3, 2.8, 3.0, 2.5, 2.2, 2.6, 2.9, 3.2, 2.8, 2.4, 2.7, 3.0, 2.6, 2.3, 2.8, 3.1, 2.9, 2.5, 2.1, 1.8, 2.3, 2.5, 2.8, 3.2, 2.1, 2.4, 2.6, 2.9, 3.1, 2.7, 2.3, 2.8, 3.0, 2.5, 2.2, 2.6, 2.9, 3.2, 2.8, 2.4, 2.7, 3.0, 2.6, 2.3, 2.8, 3.1, 2.9, 2.5],
            'year': [2.1, 1.8, 2.3, 2.5, 2.8, 3.2, 2.1, 2.4, 2.6, 2.9, 3.1, 2.7]
        },
        'bookings': {
            'today': [15],
            'week': [15, 12, 18, 20, 22, 25, 15],
            'month': [15, 12, 18, 20, 22, 25, 15, 19, 21, 24, 26, 23, 18, 22, 25, 20, 17, 21, 24, 26, 22, 19, 23, 25, 21, 18, 22, 26, 24, 20],
            'quarter': [15, 12, 18, 20, 22, 25, 15, 19, 21, 24, 26, 23, 18, 22, 25, 20, 17, 21, 24, 26, 22, 19, 23, 25, 21, 18, 22, 26, 24, 20, 15, 12, 18, 20, 22, 25, 15, 19, 21, 24, 26, 23, 18, 22, 25, 20, 17, 21, 24, 26, 22, 19, 23, 25, 21, 18, 22, 26, 24, 20, 15, 12, 18, 20, 22, 25, 15, 19, 21, 24, 26, 23, 18, 22, 25, 20, 17, 21, 24, 26, 22, 19, 23, 25, 21, 18, 22, 26, 24, 20],
            'year': [15, 12, 18, 20, 22, 25, 15, 19, 21, 24, 26, 23]
        }
    };
    
    return data[type][timeRange] || data[type]['week'];
}

// Update overview cards
function updateOverviewCards() {
    const data = getOverviewData(currentTimeRange);
    
    // Update total revenue
    const totalRevenueEl = document.querySelector('.total-revenue .card-value');
    if (totalRevenueEl) {
        totalRevenueEl.textContent = data.totalRevenue;
    }
    
    // Update total bookings
    const totalBookingsEl = document.querySelector('.total-bookings .card-value');
    if (totalBookingsEl) {
        totalBookingsEl.textContent = data.totalBookings;
    }
    
    // Update average revenue
    const avgRevenueEl = document.querySelector('.avg-revenue .card-value');
    if (avgRevenueEl) {
        avgRevenueEl.textContent = data.avgRevenue;
    }
    
    // Update conversion rate
    const conversionEl = document.querySelector('.conversion-rate .card-value');
    if (conversionEl) {
        conversionEl.textContent = data.conversionRate;
    }
}

// Get overview data based on time range
function getOverviewData(timeRange) {
    const data = {
        'today': {
            totalRevenue: '2.1M',
            totalBookings: '15',
            avgRevenue: '140K',
            conversionRate: '96.7%'
        },
        'week': {
            totalRevenue: '15.8M',
            totalBookings: '127',
            avgRevenue: '124K',
            conversionRate: '94.2%'
        },
        'month': {
            totalRevenue: '68.5M',
            totalBookings: '548',
            avgRevenue: '125K',
            conversionRate: '93.8%'
        },
        'quarter': {
            totalRevenue: '205.2M',
            totalBookings: '1643',
            avgRevenue: '125K',
            conversionRate: '94.1%'
        },
        'year': {
            totalRevenue: '820.8M',
            totalBookings: '6572',
            avgRevenue: '125K',
            conversionRate: '94.0%'
        }
    };
    
    return data[timeRange] || data['week'];
}

// Switch chart type
function switchChartType(type) {
    currentChartType = type;
    
    // Update active button
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update chart
    updateCharts();
}

// Update revenue data
function updateRevenueData() {
    const timeRangeSelect = document.getElementById('timeRange');
    currentTimeRange = timeRangeSelect.value;
    
    if (currentTimeRange === 'custom') {
        showCustomDatePicker();
        return;
    }
    
    loadRevenueData();
}

// Show custom date picker
function showCustomDatePicker() {
    // Implementation for custom date picker
    alert('Tính năng chọn ngày tùy chỉnh sẽ được phát triển sau');
    document.getElementById('timeRange').value = 'week';
}

// Export revenue report
function exportRevenueReport() {
    showToast('Đang xuất báo cáo doanh thu...', 'info');
    
    // Simulate export process
    setTimeout(() => {
        showToast('Báo cáo đã được xuất thành công!', 'success');
    }, 2000);
}

// Filter transactions
function filterTransactions() {
    const searchTerm = document.getElementById('searchTransaction').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const tableBody = document.getElementById('transactionsTableBody');
    const rows = tableBody.getElementsByTagName('tr');
    
    for (let row of rows) {
        const cells = row.getElementsByTagName('td');
        const customerName = cells[1].textContent.toLowerCase();
        const fieldName = cells[2].textContent.toLowerCase();
        const status = cells[6].textContent.toLowerCase();
        
        const matchesSearch = customerName.includes(searchTerm) || fieldName.includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || status.includes(statusFilter);
        
        row.style.display = matchesSearch && matchesStatus ? '' : 'none';
    }
}

// View transaction details
function viewTransaction(txId) {
    const modal = document.getElementById('transactionModal');
    
    // Load transaction data (simulated)
    const transactionData = getTransactionData(txId);
    
    // Populate modal
    document.getElementById('modalTxId').textContent = transactionData.id;
    document.getElementById('modalCustomer').textContent = transactionData.customer;
    document.getElementById('modalField').textContent = transactionData.field;
    document.getElementById('modalDate').textContent = transactionData.date;
    document.getElementById('modalTime').textContent = transactionData.time;
    document.getElementById('modalAmount').textContent = transactionData.amount;
    document.getElementById('modalPayment').textContent = transactionData.payment;
    document.getElementById('modalStatus').textContent = transactionData.status;
    document.getElementById('modalNotes').textContent = transactionData.notes;
    
    // Update status class
    const statusEl = document.getElementById('modalStatus');
    statusEl.className = 'status ' + transactionData.statusClass;
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add animation
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'slideDown 0.4s ease';
}

// Get transaction data (simulated)
function getTransactionData(txId) {
    const data = {
        'TX001': {
            id: '#TX001',
            customer: 'Nguyễn Văn Nam',
            field: 'Sân A',
            date: '18/12/2024',
            time: '18:00-20:00',
            amount: '400.000đ',
            payment: 'Chuyển khoản',
            status: 'Hoàn thành',
            statusClass: 'completed',
            notes: 'Không có'
        },
        'TX002': {
            id: '#TX002',
            customer: 'Trần Minh Tuấn',
            field: 'Sân B',
            date: '19/12/2024',
            time: '14:00-16:00',
            amount: '360.000đ',
            payment: 'Tiền mặt',
            status: 'Hoàn thành',
            statusClass: 'completed',
            notes: 'Khách hàng VIP'
        },
        'TX003': {
            id: '#TX003',
            customer: 'Lê Hoàng Anh',
            field: 'Sân C',
            date: '20/12/2024',
            time: '20:00-22:00',
            amount: '450.000đ',
            payment: 'Chuyển khoản',
            status: 'Chờ xử lý',
            statusClass: 'pending',
            notes: 'Chờ xác nhận thanh toán'
        },
        'TX004': {
            id: '#TX004',
            customer: 'Phạm Thị Mai',
            field: 'Sân A',
            date: '21/12/2024',
            time: '19:00-21:00',
            amount: '400.000đ',
            payment: 'Chuyển khoản',
            status: 'Hoàn thành',
            statusClass: 'completed',
            notes: 'Không có'
        },
        'TX005': {
            id: '#TX005',
            customer: 'Vũ Đức Hùng',
            field: 'Sân B',
            date: '22/12/2024',
            time: '15:00-17:00',
            amount: '360.000đ',
            payment: 'Tiền mặt',
            status: 'Đã hủy',
            statusClass: 'cancelled',
            notes: 'Khách hàng hủy do thời tiết'
        }
    };
    
    return data[txId] || data['TX001'];
}

// Close transaction modal
function closeTransactionModal() {
    const modal = document.getElementById('transactionModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Print transaction
function printTransaction() {
    showToast('Đang chuẩn bị in hóa đơn...', 'info');
    
    // Simulate print process
    setTimeout(() => {
        showToast('Hóa đơn đã được gửi đến máy in!', 'success');
    }, 1500);
}

// Utility function to show toast messages
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    
    let bgColor = '#1e90ff';
    let icon = 'ℹ️';
    
    switch(type) {
        case 'success':
            bgColor = '#10b981';
            icon = '✅';
            break;
        case 'error':
            bgColor = '#ef4444';
            icon = '❌';
            break;
        case 'warning':
            bgColor = '#f59e0b';
            icon = '⚠️';
            break;
    }
    
    toast.className = 'toast';
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideInRight 0.3s ease;
        max-width: 350px;
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    toast.innerHTML = `${icon} ${message}`;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('transactionModal');
    if (event.target === modal) {
        closeTransactionModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('transactionModal');
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeTransactionModal();
    }
}); 