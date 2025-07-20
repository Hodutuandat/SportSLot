// Voucher Modal Functionality (only accessible from booking modal)
document.addEventListener('DOMContentLoaded', function() {
    const voucherModal = document.getElementById('voucherModal');
    const closeVoucherBtn = document.getElementById('closeVoucherBtn');
    const cancelVoucherBtn = document.getElementById('cancelVoucherBtn');
    const voucherOverlay = document.getElementById('voucherOverlay');
    const voucherApplyBtns = document.querySelectorAll('.voucher-apply-btn');

    // Đóng popup voucher (và giữ lại booking modal nếu đang mở)
    function closeVoucherModal() {
        voucherModal.classList.remove('active');
        voucherModal.classList.remove('voucher-from-booking');
        // Không khôi phục scroll nếu booking modal vẫn đang mở
        const bookingModal = document.getElementById('bookingModal');
        if (!bookingModal || !bookingModal.classList.contains('active')) {
            document.body.style.overflow = 'auto';
        }
    }

    // Đóng popup khi click nút X
    closeVoucherBtn.addEventListener('click', closeVoucherModal);

    // Đóng popup khi click nút Hủy
    cancelVoucherBtn.addEventListener('click', closeVoucherModal);

    // Đóng popup khi click overlay
    voucherOverlay.addEventListener('click', closeVoucherModal);

    // Đóng popup khi nhấn ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && voucherModal.classList.contains('active')) {
            closeVoucherModal();
        }
    });

    // Xử lý chọn voucher
    voucherApplyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const voucherItem = this.closest('.voucher-item');
            const voucherCode = voucherItem.getAttribute('data-code');
            const voucherDiscount = voucherItem.getAttribute('data-discount');
            const voucherTitle = voucherItem.querySelector('.voucher-item-title').textContent;

            // Hiệu ứng chọn voucher
            voucherApplyBtns.forEach(b => {
                b.textContent = 'Áp dụng';
                b.style.background = '#6d8cff';
            });

            this.textContent = 'Đã chọn';
            this.style.background = '#4e9c2e';

            // Lưu voucher đã chọn
            sessionStorage.setItem('selectedVoucher', JSON.stringify({
                code: voucherCode,
                discount: voucherDiscount,
                title: voucherTitle
            }));

            // Cập nhật thông tin voucher trong booking modal nếu đang mở
            const bookingModal = document.getElementById('bookingModal');
            if (bookingModal && bookingModal.classList.contains('active')) {
                setTimeout(() => {
                    loadSelectedVoucher();
                    updateBookingSummary();
                    
                    // Highlight voucher section với animation
                    const voucherSection = document.querySelector('.voucher-section');
                    if (voucherSection) {
                        voucherSection.style.animation = 'voucherUpdate 0.6s ease-out';
                        setTimeout(() => {
                            voucherSection.style.animation = '';
                        }, 600);
                    }
                }, 100);
            }

            // Tự động đóng popup sau 1 giây
            setTimeout(() => {
                closeVoucherModal();
            }, 1000);
        });
    });



    // Đánh dấu voucher đã chọn trong popup khi load trang
    const selectedVoucher = sessionStorage.getItem('selectedVoucher');
    if (selectedVoucher) {
        const voucher = JSON.parse(selectedVoucher);
        
        // Đánh dấu voucher đã chọn trong popup
        const selectedVoucherItem = document.querySelector(`[data-code="${voucher.code}"]`);
        if (selectedVoucherItem) {
            const applyBtn = selectedVoucherItem.querySelector('.voucher-apply-btn');
            applyBtn.textContent = 'Đã chọn';
            applyBtn.style.background = '#4e9c2e';
        }
    }

    // Xử lý smooth scroll cho voucher items
    const voucherList = document.querySelector('.voucher-list');
    if (voucherList) {
        voucherList.style.scrollBehavior = 'smooth';
    }

    // ============== BOOKING MODAL FUNCTIONALITY ==============
    const bookingModal = document.getElementById('bookingModal');
    const openBookingBtn = document.getElementById('openBookingBtn');
    const closeBookingBtn = document.getElementById('closeBookingBtn');
    const cancelBookingBtn = document.getElementById('cancelBookingBtn');
    const bookingOverlay = document.getElementById('bookingOverlay');
    const changeVoucherBtn = document.getElementById('changeVoucherBtn');
    
    // Form elements
    const bookingForm = document.getElementById('bookingForm');
    const bookingDate = document.getElementById('bookingDate');
    const bookingStartTime = document.getElementById('bookingStartTime');
    const bookingDuration = document.getElementById('bookingDuration');
    const confirmBookingBtn = document.getElementById('confirmBookingBtn');

    // Set ngày tối thiểu là hôm nay
    const today = new Date().toISOString().split('T')[0];
    bookingDate.min = today;
    bookingDate.value = today;

    // Giá sân từ template (sử dụng biến global hoặc parse từ DOM)
    const fieldPriceText = document.querySelector('.price-value').textContent;
    const fieldPrice = parseInt(fieldPriceText.replace(/[^\d]/g, ''));

    // Mở popup đặt sân
    openBookingBtn.addEventListener('click', function(e) {
        e.preventDefault();
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Load voucher đã chọn (nếu có)
        loadSelectedVoucher();
        updateBookingSummary();
        
        // Cập nhật voucher info khi mở modal
        setTimeout(() => {
            loadSelectedVoucher();
        }, 100);
    });

    // Đóng popup đặt sân
    function closeBookingModal() {
        bookingModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Reset voucher display khi đóng modal
        setTimeout(() => {
            loadSelectedVoucher();
        }, 100);
    }

    closeBookingBtn.addEventListener('click', closeBookingModal);
    cancelBookingBtn.addEventListener('click', closeBookingModal);
    bookingOverlay.addEventListener('click', closeBookingModal);

    // Đóng popup khi nhấn ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && bookingModal.classList.contains('active')) {
            closeBookingModal();
        }
    });

    // Mở popup voucher từ booking (không cần block scroll vì booking modal đã block rồi)
    if (changeVoucherBtn) {
        changeVoucherBtn.addEventListener('click', function() {
            voucherModal.classList.add('active');
            voucherModal.classList.add('voucher-from-booking');
        });
    }

    // Cập nhật thời gian và tổng tiền khi thay đổi
    bookingStartTime.addEventListener('change', updateTimeDisplay);
    bookingDuration.addEventListener('change', function() {
        updateTimeDisplay();
        updateBookingSummary();
        // Cập nhật thông tin voucher với số tiền tiết kiệm mới
        loadSelectedVoucher();
    });

    function updateTimeDisplay() {
        const startTime = bookingStartTime.value;
        const duration = parseInt(bookingDuration.value);
        const timeSummary = document.getElementById('timeSummary');
        const timeRange = document.getElementById('timeRange');

        if (startTime && duration) {
            const [startHour, startMinute] = startTime.split(':').map(Number);
            const endHour = startHour + duration;
            const endTime = `${endHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
            
            timeRange.textContent = `Từ ${startTime} đến ${endTime}`;
            timeSummary.style.display = 'block';
        } else {
            timeSummary.style.display = 'none';
        }
    }

    function updateBookingSummary() {
        const duration = parseInt(bookingDuration.value) || 0;
        const subtotal = fieldPrice * duration;
        
        // Cập nhật hiển thị
        document.getElementById('durationDisplay').textContent = duration;
        document.getElementById('subtotalAmount').textContent = `${subtotal.toLocaleString()} VNĐ`;

        // Tính giảm giá từ voucher
        let discount = 0;
        let discountLabel = '';
        const selectedVoucher = sessionStorage.getItem('selectedVoucher');
        if (selectedVoucher && subtotal > 0) {
            const voucher = JSON.parse(selectedVoucher);
            if (voucher.code === 'PERCENT20') {
                discount = Math.min(subtotal * 0.2, 150000);
                const percent = ((discount / subtotal) * 100).toFixed(1);
                discountLabel = `Giảm giá (${percent}% - ${voucher.code})`;
            } else {
                discount = Math.min(parseInt(voucher.discount), subtotal);
                discountLabel = `Giảm giá (${voucher.code})`;
            }
        }

        const total = Math.max(0, subtotal - discount);

        // Hiển thị giảm giá chỉ khi có voucher và có giá trị
        const discountRow = document.getElementById('discountRow');
        const discountAmount = document.getElementById('discountAmount');
        const discountLabelElement = discountRow.querySelector('span:first-child');
        
        if (discount > 0 && selectedVoucher) {
            discountRow.style.display = 'flex';
            discountLabelElement.textContent = discountLabel;
            discountAmount.textContent = `-${discount.toLocaleString()} VNĐ`;
        } else {
            discountRow.style.display = 'none';
        }

        document.getElementById('totalAmount').textContent = `${total.toLocaleString()} VNĐ`;
        
        // Enable/disable confirm button
        confirmBookingBtn.disabled = total === 0;
    }

    function loadSelectedVoucher() {
        const selectedVoucher = sessionStorage.getItem('selectedVoucher');
        const voucherDisplay = document.getElementById('voucherDisplay');
        
        if (selectedVoucher) {
            const voucher = JSON.parse(selectedVoucher);
            
            // Format hiển thị voucher dựa trên loại
            let voucherDescription = '';
            let currentSavings = '';
            
            // Tính toán số tiền tiết kiệm hiện tại
            const duration = parseInt(document.getElementById('bookingDuration').value) || 0;
            const subtotal = fieldPrice * duration;
            let actualDiscount = 0;
            
            if (subtotal > 0) {
                if (voucher.code === 'PERCENT20') {
                    actualDiscount = Math.min(subtotal * 0.2, 150000);
                    voucherDescription = 'Giảm 20% (tối đa 150.000đ)';
                } else {
                    actualDiscount = Math.min(parseInt(voucher.discount), subtotal);
                    const discountAmount = parseInt(voucher.discount).toLocaleString();
                    voucherDescription = `Giảm ${discountAmount}đ`;
                }
                
                if (actualDiscount > 0) {
                    currentSavings = `<div class="voucher-current-savings">💰 Bạn tiết kiệm: ${actualDiscount.toLocaleString()}đ</div>`;
                }
            } else {
                if (voucher.code === 'PERCENT20') {
                    voucherDescription = 'Giảm 20% (tối đa 150.000đ)';
                } else {
                    const discountAmount = parseInt(voucher.discount).toLocaleString();
                    voucherDescription = `Giảm ${discountAmount}đ`;
                }
            }
            
            voucherDisplay.innerHTML = `
                <div class="voucher-selected">
                    <div class="voucher-selected-info">
                        <div class="voucher-selected-header">
                            <div class="voucher-selected-title">🎫 ${voucher.title}</div>
                            <button type="button" class="change-voucher-btn-small" id="changeVoucherBtn">Đổi</button>
                        </div>
                        <div class="voucher-selected-desc">${voucherDescription}</div>
                        <div class="voucher-selected-code">Mã: <strong>${voucher.code}</strong></div>
                        ${currentSavings}
                    </div>
                </div>
            `;
            // Re-bind event cho nút mới
            document.getElementById('changeVoucherBtn').addEventListener('click', function() {
                voucherModal.classList.add('active');
                voucherModal.classList.add('voucher-from-booking');
            });
        } else {
            voucherDisplay.innerHTML = `
                <div class="voucher-not-selected">
                    <div class="no-voucher-container">
                        <div class="no-voucher-text">
                            <span class="no-voucher-icon">🎫</span>
                            <span class="no-voucher">Chưa chọn voucher</span>
                        </div>
                        <button type="button" class="change-voucher-btn" id="changeVoucherBtn">Chọn voucher</button>
                    </div>
                </div>
            `;
            // Re-bind event cho nút mới
            document.getElementById('changeVoucherBtn').addEventListener('click', function() {
                voucherModal.classList.add('active');
                voucherModal.classList.add('voucher-from-booking');
            });
        }
    }

    // Xử lý submit form đặt sân
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const formData = new FormData(bookingForm);
        const bookingData = {
            date: formData.get('booking_date'),
            startTime: formData.get('start_time'),
            duration: formData.get('duration'),
            paymentMethod: formData.get('payment_method'),
            voucher: sessionStorage.getItem('selectedVoucher') ? JSON.parse(sessionStorage.getItem('selectedVoucher')) : null
        };

        // Kiểm tra thời gian có hợp lệ không
        if (!validateBookingTime(bookingData.date, bookingData.startTime, parseInt(bookingData.duration))) {
    
            return;
        }

        // Hiển thị loading
        confirmBookingBtn.textContent = 'Đang xử lý...';
        confirmBookingBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
    
            
            // Reset form và đóng modal
            bookingForm.reset();
            
            // Clear voucher selection
            sessionStorage.removeItem('selectedVoucher');
            
            closeBookingModal();
            
            // Chuyển đến trang thanh toán (simulate)
            setTimeout(() => {
                console.log('Redirect to payment page with data:', bookingData);
                // window.location.href = '/payment';
            }, 2000);
            
            confirmBookingBtn.textContent = 'Xác nhận đặt sân';
            confirmBookingBtn.disabled = false;
        }, 2000);
    });

    function validateBookingTime(date, startTime, duration) {
        if (!date || !startTime || !duration) return false;
        
        const [hour] = startTime.split(':').map(Number);
        const endHour = hour + duration;
        
        // Kiểm tra giờ hoạt động (6:00 - 23:00)
        if (hour < 6 || endHour > 23) {
            return false;
        }
        
        // Kiểm tra ngày không được là quá khứ
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return selectedDate >= today;
    }




}); 