// Transaction History Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Transaction data storage
    let allTransactions = [];
    let filteredTransactions = [];
    let currentPage = 1;
    const itemsPerPage = 10;

    // Initialize page
    initializeTransactionHistory();

    function initializeTransactionHistory() {
        collectTransactionData();
        setupFilters();
        setupPagination();
        setupModal();
        animateStatsOnLoad();
        displayTransactions();
        updatePagination();
    }

    function collectTransactionData() {
        const rows = document.querySelectorAll('#transactionTableBody .transaction-row');
        allTransactions = Array.from(rows).map(row => ({
            id: row.querySelector('.transaction-id').textContent,
            date: row.getAttribute('data-date'),
            dateTime: row.querySelector('.transaction-date').textContent,
            description: row.querySelector('.transaction-desc').textContent,
            method: row.querySelector('.payment-method-badge').textContent.trim(),
            amount: row.querySelector('.transaction-amount').textContent,
            status: row.getAttribute('data-status'),
            statusText: row.querySelector('.status-badge').textContent,
            element: row
        }));
        filteredTransactions = [...allTransactions];
    }

    function setupFilters() {
        const statusFilter = document.getElementById('statusFilter');
        const timeFilter = document.getElementById('timeFilter');
        const searchInput = document.getElementById('searchTransaction');
        const clearBtn = document.getElementById('clearFilters');

        statusFilter.addEventListener('change', applyFilters);
        timeFilter.addEventListener('change', applyFilters);
        searchInput.addEventListener('input', applyFilters);

        clearBtn.addEventListener('click', function() {
            statusFilter.value = '';
            timeFilter.value = '';
            searchInput.value = '';
            applyFilters();
        });
    }

    function applyFilters() {
        const statusFilter = document.getElementById('statusFilter').value;
        const timeFilter = document.getElementById('timeFilter').value;
        const searchTerm = document.getElementById('searchTransaction').value.toLowerCase();

        filteredTransactions = allTransactions.filter(transaction => {
            // Status filter
            if (statusFilter && transaction.status !== statusFilter) {
                return false;
            }

            // Time filter
            if (timeFilter && !isWithinTimeRange(transaction.date, timeFilter)) {
                return false;
            }

            // Search filter
            if (searchTerm && !matchesSearch(transaction, searchTerm)) {
                return false;
            }

            return true;
        });

        currentPage = 1;
        displayTransactions();
        updatePagination();
    }

    function isWithinTimeRange(transactionDate, timeFilter) {
        const today = new Date();
        const transDate = new Date(transactionDate);
        const diffDays = Math.floor((today - transDate) / (1000 * 60 * 60 * 24));

        switch (timeFilter) {
            case 'today':
                return diffDays === 0;
            case 'week':
                return diffDays <= 7;
            case 'month':
                return diffDays <= 30;
            case 'quarter':
                return diffDays <= 90;
            default:
                return true;
        }
    }

    function matchesSearch(transaction, searchTerm) {
        return transaction.id.toLowerCase().includes(searchTerm) ||
               transaction.description.toLowerCase().includes(searchTerm) ||
               transaction.method.toLowerCase().includes(searchTerm) ||
               transaction.amount.toLowerCase().includes(searchTerm);
    }

    function displayTransactions() {
        const tableBody = document.getElementById('transactionTableBody');
        
        // Hide all rows first
        allTransactions.forEach(transaction => {
            transaction.element.style.display = 'none';
        });

        // Show filtered transactions for current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const transactionsToShow = filteredTransactions.slice(startIndex, endIndex);

        transactionsToShow.forEach(transaction => {
            transaction.element.style.display = 'table-row';
        });

        // Show no results message if no transactions
        if (filteredTransactions.length === 0) {
            showNoResultsMessage();
        } else {
            hideNoResultsMessage();
        }
    }

    function showNoResultsMessage() {
        const tableBody = document.getElementById('transactionTableBody');
        let noResultsRow = document.getElementById('noResultsRow');
        
        if (!noResultsRow) {
            noResultsRow = document.createElement('tr');
            noResultsRow.id = 'noResultsRow';
            noResultsRow.innerHTML = `
                <td colspan="7" style="text-align: center; padding: 60px 20px; color: #666; font-style: italic;">
                    <i class="fas fa-search" style="font-size: 32px; margin-bottom: 16px; display: block; color: #ccc;"></i>
                    <div style="font-size: 1.1rem; margin-bottom: 8px;">Không tìm thấy giao dịch nào</div>
                    <div style="font-size: 0.9rem;">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</div>
                </td>
            `;
            tableBody.appendChild(noResultsRow);
        }
        noResultsRow.style.display = 'table-row';
    }

    function hideNoResultsMessage() {
        const noResultsRow = document.getElementById('noResultsRow');
        if (noResultsRow) {
            noResultsRow.style.display = 'none';
        }
    }

    function setupPagination() {
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');

        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                displayTransactions();
                updatePagination();
                scrollToTop();
            }
        });

        nextBtn.addEventListener('click', function() {
            const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                displayTransactions();
                updatePagination();
                scrollToTop();
            }
        });
    }

    function updatePagination() {
        const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');
        const currentPageSpan = document.getElementById('currentPage');
        const totalPagesSpan = document.getElementById('totalPages');

        currentPageSpan.textContent = currentPage;
        totalPagesSpan.textContent = Math.max(1, totalPages);

        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    }

    function scrollToTop() {
        const tableContainer = document.querySelector('.transaction-table-container');
        tableContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function setupModal() {
        const modal = document.getElementById('transactionDetailModal');
        const overlay = modal.querySelector('.transaction-detail-overlay');
        const closeBtn = modal.querySelector('.transaction-detail-close');

        overlay.addEventListener('click', closeTransactionModal);
        closeBtn.addEventListener('click', closeTransactionModal);
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeTransactionModal();
            }
        });
    }

    function closeTransactionModal() {
        const modal = document.getElementById('transactionDetailModal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function animateStatsOnLoad() {
        const statValues = document.querySelectorAll('.stat-value');
        
        statValues.forEach((stat, index) => {
            const text = stat.textContent;
            
            setTimeout(() => {
                if (text.includes('VNĐ')) {
                    // Animate money value
                    const value = parseInt(text.replace(/[^\d]/g, ''));
                    animateValue(stat, 0, value, 1200, (val) => `${val.toLocaleString()} VNĐ`);
                } else {
                    // Animate number
                    const value = parseInt(text);
                    animateValue(stat, 0, value, 1000);
                }
            }, index * 150);
        });
    }

    function animateValue(element, start, end, duration, formatter = null) {
        const startTime = performance.now();
        
        function updateValue(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (end - start) * easeOutQuart);
            
            element.textContent = formatter ? formatter(current) : current;
            
            if (progress < 1) {
                requestAnimationFrame(updateValue);
            }
        }
        
        requestAnimationFrame(updateValue);
    }

    // Table row hover enhancements
    const tableRows = document.querySelectorAll('.transaction-row');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(4px)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Stat cards hover effects
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Filter enhancements
    const filterInputs = document.querySelectorAll('.filter-select, .filter-search');
    filterInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 0 0 3px rgba(109, 140, 255, 0.1)';
        });

        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Add loading effect for table
    function showTableLoading() {
        const tableBody = document.getElementById('transactionTableBody');
        const loadingRow = document.createElement('tr');
        loadingRow.id = 'loadingRow';
        loadingRow.innerHTML = `
            <td colspan="7" style="text-align: center; padding: 40px; color: #666;">
                <i class="fas fa-spinner fa-spin" style="font-size: 24px; margin-bottom: 12px; display: block;"></i>
                Đang tải dữ liệu...
            </td>
        `;
        tableBody.appendChild(loadingRow);
    }

    function hideTableLoading() {
        const loadingRow = document.getElementById('loadingRow');
        if (loadingRow) {
            loadingRow.remove();
        }
    }

    // Initial table animations
    setTimeout(() => {
        const rows = document.querySelectorAll('.transaction-row');
        rows.forEach((row, index) => {
            row.style.opacity = '0';
            row.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                row.style.transition = 'all 0.3s ease';
                row.style.opacity = '1';
                row.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }, 100);
});

// ============== GLOBAL TRANSACTION FUNCTIONS ==============

// View transaction details
function viewTransaction(transactionId) {
    const modal = document.getElementById('transactionDetailModal');
    
    // Mock data for demo - in real app, this would come from API
    const transactionDetails = {
        'TXN001': {
            id: '#TXN001',
            dateTime: '15/12/2024 14:30',
            description: 'Đặt sân bóng đá - Sân ABC',
            paymentMethod: 'MoMo',
            amount: '200.000 VNĐ',
            status: 'Thành công',
            statusClass: 'success',
            fieldAddress: '123 Đường ABC, Quận 1, TP.HCM',
            bookingTime: '16:00 - 18:00, 15/12/2024',
            voucher: 'SAVE50K (Giảm 50.000 VNĐ)'
        },
        'TXN002': {
            id: '#TXN002',
            dateTime: '10/12/2024 09:15',
            description: 'Đặt sân tennis - Sân XYZ',
            paymentMethod: 'Banking',
            amount: '150.000 VNĐ',
            status: 'Thành công',
            statusClass: 'success',
            fieldAddress: '456 Đường XYZ, Quận 2, TP.HCM',
            bookingTime: '10:00 - 12:00, 10/12/2024',
            voucher: 'Không sử dụng'
        },
        'TXN003': {
            id: '#TXN003',
            dateTime: '08/12/2024 16:45',
            description: 'Đặt sân cầu lông - Sân DEF',
            paymentMethod: 'MoMo',
            amount: '120.000 VNĐ',
            status: 'Đang xử lý',
            statusClass: 'pending',
            fieldAddress: '789 Đường DEF, Quận 3, TP.HCM',
            bookingTime: '18:00 - 20:00, 08/12/2024',
            voucher: 'Không sử dụng'
        },
        'TXN004': {
            id: '#TXN004',
            dateTime: '05/12/2024 11:20',
            description: 'Đặt sân bóng đá - Sân GHI',
            paymentMethod: 'Banking',
            amount: '180.000 VNĐ',
            status: 'Thất bại',
            statusClass: 'failed',
            fieldAddress: '321 Đường GHI, Quận 4, TP.HCM',
            bookingTime: '14:00 - 16:00, 05/12/2024',
            voucher: 'Không sử dụng'
        },
        'TXN005': {
            id: '#TXN005',
            dateTime: '01/12/2024 19:20',
            description: 'Đặt sân badminton - Sân JKL',
            paymentMethod: 'MoMo',
            amount: '100.000 VNĐ',
            status: 'Thành công',
            statusClass: 'success',
            fieldAddress: '555 Đường JKL, Quận 5, TP.HCM',
            bookingTime: '20:00 - 21:00, 01/12/2024',
            voucher: 'Không sử dụng'
        }
    };

    const details = transactionDetails[transactionId];
    if (details) {
        // Populate modal with transaction details
        document.getElementById('detailTransactionId').textContent = details.id;
        document.getElementById('detailDateTime').textContent = details.dateTime;
        document.getElementById('detailDescription').textContent = details.description;
        document.getElementById('detailPaymentMethod').textContent = details.paymentMethod;
        document.getElementById('detailAmount').textContent = details.amount;
        document.getElementById('detailFieldAddress').textContent = details.fieldAddress;
        document.getElementById('detailBookingTime').textContent = details.bookingTime;
        document.getElementById('detailVoucher').textContent = details.voucher;
        
        const statusElement = document.getElementById('detailStatus');
        statusElement.textContent = details.status;
        statusElement.className = `status-badge ${details.statusClass}`;

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Download receipt
function downloadReceipt(transactionId) {
    
    
    // Simulate download
    setTimeout(() => {
        
        
        // Create a fake download
        const link = document.createElement('a');
        link.href = '#';
        link.download = `HoaDon_${transactionId}.pdf`;
        link.click();
    }, 1500);
}

// Cancel transaction
function cancelTransaction(transactionId) {
    if (confirm('Bạn có chắc chắn muốn hủy giao dịch này?')) {

        
        setTimeout(() => {
            // Update transaction status in table
            const row = document.querySelector(`[data-transaction-id="${transactionId}"]`);
            if (row) {
                const statusBadge = row.querySelector('.status-badge');
                statusBadge.textContent = 'Đã hủy';
                statusBadge.className = 'status-badge failed';
                
                // Update action buttons
                const actionsCell = row.querySelector('.transaction-actions');
                actionsCell.innerHTML = `
                    <button class="action-btn view-btn" onclick="viewTransaction('${transactionId}')">
                        <i class="fas fa-eye"></i>
                    </button>
                `;
            }
            

        }, 1500);
    }
}

// Retry transaction
function retryTransaction(transactionId) {
    if (confirm('Bạn có muốn thử lại giao dịch này?')) {

        
        setTimeout(() => {
            // Update transaction status in table
            const row = document.querySelector(`[data-transaction-id="${transactionId}"]`);
            if (row) {
                const statusBadge = row.querySelector('.status-badge');
                statusBadge.textContent = 'Đang xử lý';
                statusBadge.className = 'status-badge pending';
                
                // Update action buttons
                const actionsCell = row.querySelector('.transaction-actions');
                actionsCell.innerHTML = `
                    <button class="action-btn view-btn" onclick="viewTransaction('${transactionId}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn cancel-btn" onclick="cancelTransaction('${transactionId}')">
                        <i class="fas fa-times"></i>
                    </button>
                `;
            }
            

        }, 1500);
    }
}

// Contact support
function contactSupport() {
    
    
    setTimeout(() => {
        // In real app, this would redirect to support page
        window.open('mailto:support@sportslot.com?subject=Hỗ trợ giao dịch', '_blank');
    }, 1000);
}

 