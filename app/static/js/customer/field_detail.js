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
    const bookingDuration = document.getElementById('bookingDuration');
    const confirmBookingBtn = document.getElementById('confirmBookingBtn');

    // Set ngày tối thiểu là hôm nay
    const today = new Date().toISOString().split('T')[0];
    bookingDate.min = today;
    bookingDate.value = today;

    // Giá sân từ template (chỉ lấy từ .price-value trong popup/modal)
    const priceEl = document.querySelector('.price-value');
    let fieldPrice = 0;
    if (priceEl) {
        const match = priceEl.textContent.match(/([\d,]+)\s*VNĐ/);
        if (match) fieldPrice = parseInt(match[1].replace(/,/g, ''));
    }

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

    // Mở popup đặt sân khi click nút Đặt Sân
    if (openBookingBtn && bookingModal) {
        openBookingBtn.addEventListener('click', function(e) {
            e.preventDefault();
            bookingModal.classList.add('active');
            document.body.style.overflow = 'hidden';
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

    // ========== THỜI KHÓA BIỂU ĐẶT SÂN (Booking Page) =============
    if (document.getElementById('timetable')) {
        const timetable = document.getElementById('timetable');
        const bookingStartTime = document.getElementById('bookingStartTime');
        const bookingDate = document.getElementById('bookingDate');
        const bookingDuration = document.getElementById('bookingDuration');
        let bookedSlots = [];
        let selectedSlot = null;
        // Tạo các slot giờ từ 06:00 đến 22:00
        const hours = [];
        for (let h = 6; h <= 22; h++) {
            hours.push(h.toString().padStart(2, '0') + ':00');
        }
        function renderTimetable() {
            timetable.innerHTML = '';
            const duration = parseInt(bookingDuration.value) || 1;
            for (let i = 0; i < hours.length; i++) {
                const slotStart = hours[i];
                const slotEndHour = parseInt(slotStart.split(':')[0]) + duration;
                if (slotEndHour > 23) break;
                // Kiểm tra trùng với slot đã đặt
                let isBooked = false;
                for (const b of bookedSlots) {
                    const bStart = parseInt(b.start.split(':')[0]);
                    const bEnd = bStart + b.duration;
                    const sStart = parseInt(slotStart.split(':')[0]);
                    const sEnd = slotEndHour;
                    if (!(sEnd <= bStart || sStart >= bEnd)) {
                        isBooked = true;
                        break;
                    }
                }
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'timetable-slot' + (isBooked ? ' booked' : '');
                btn.textContent = slotStart + ' - ' + slotEndHour.toString().padStart(2, '0') + ':00';
                btn.disabled = isBooked;
                if (selectedSlot === slotStart) btn.classList.add('selected');
                btn.addEventListener('click', function() {
                    if (isBooked) return;
                    selectedSlot = slotStart;
                    bookingStartTime.value = slotStart;
                    renderTimetable();
                });
                timetable.appendChild(btn);
            }
        }
        function fetchAndRenderTimetable() {
            const date = bookingDate.value;
            const fieldId = window.location.pathname.split('/').filter(Boolean).pop();
            if (!date) return;
            fetch(`/api/fields/${fieldId}/bookings?date=${date}`)
                .then(res => res.json())
                .then(data => {
                    bookedSlots = data.bookings || [];
                    selectedSlot = null;
                    bookingStartTime.value = '';
                    renderTimetable();
                });
        }
        bookingDate.addEventListener('change', fetchAndRenderTimetable);
        bookingDuration.addEventListener('change', renderTimetable);
        // Khi vào trang, tự động render timetable cho ngày hôm nay
        if (bookingDate.value) fetchAndRenderTimetable();
    }

    // Validate form: bắt buộc phải chọn slot
    bookingForm.addEventListener('submit', function(e) {
        if (!bookingStartTime.value) {
            alert('Vui lòng chọn khung giờ trên thời khóa biểu!');
            e.preventDefault();
            return;
        }
    });

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
            
            // Hiển thị popup thanh toán
            showPaymentModal(bookingData.paymentMethod);
            
            confirmBookingBtn.textContent = 'Xác nhận đặt sân';
            confirmBookingBtn.disabled = false;
        }, 1200);
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

    // ========== TÍNH TỔNG TIỀN TRANG BOOKING PAGE =============
    if (document.getElementById('bookingForm')) {
        const bookingForm = document.getElementById('bookingForm');
        const bookingStartTime = document.getElementById('bookingStartTime');
        const bookingDuration = document.getElementById('bookingDuration');
        const subtotalAmount = document.getElementById('subtotalAmount');
        const discountRow = document.getElementById('discountRow');
        const discountAmount = document.getElementById('discountAmount');
        const totalAmount = document.getElementById('totalAmount');
        const durationDisplay = document.getElementById('durationDisplay');
        const confirmBookingBtn = document.getElementById('confirmBookingBtn');
        // Lấy giá sân từ DOM
        let fieldPrice = 0;
        const priceEl = document.querySelector('.price-value');
        if (priceEl) {
            const match = priceEl.textContent.match(/([\d,]+)\s*VNĐ/);
            if (match) fieldPrice = parseInt(match[1].replace(/,/g, ''));
        }
        function updateBookingSummary() {
            const duration = parseInt(bookingDuration.value) || 0;
            const subtotal = fieldPrice * duration;
            durationDisplay.textContent = duration;
            subtotalAmount.textContent = subtotal.toLocaleString() + ' VNĐ';
            // Tính giảm giá từ voucher
            let discount = 0;
            let discountLabel = '';
            const selectedVoucher = sessionStorage.getItem('selectedVoucher');
            if (selectedVoucher && subtotal > 0) {
                const voucher = JSON.parse(selectedVoucher);
                if (voucher.code === 'PERCENT20') {
                    discount = Math.min(subtotal * 0.2, 150000);
                    discountLabel = `Giảm giá (20% - ${voucher.code})`;
                } else {
                    discount = Math.min(parseInt(voucher.discount), subtotal);
                    discountLabel = `Giảm giá (${voucher.code})`;
                }
            }
            const total = Math.max(0, subtotal - discount);
            if (discount > 0 && selectedVoucher) {
                discountRow.style.display = 'flex';
                discountRow.querySelector('span:first-child').textContent = discountLabel;
                discountAmount.textContent = '-' + discount.toLocaleString() + ' VNĐ';
            } else {
                discountRow.style.display = 'none';
            }
            totalAmount.textContent = total.toLocaleString() + ' VNĐ';
            confirmBookingBtn.disabled = total === 0;
        }
        bookingStartTime.addEventListener('change', updateBookingSummary);
        bookingDuration.addEventListener('change', updateBookingSummary);
        // Khi chọn voucher
        window.updateBookingSummary = updateBookingSummary;
        // Gọi khi load trang
        updateBookingSummary();
    }
    // Đảm bảo gọi updateBookingSummary sau khi chọn voucher
    if (document.getElementById('changeVoucherBtn')) {
        document.getElementById('changeVoucherBtn').addEventListener('click', function() {
            setTimeout(function() {
                if (window.updateBookingSummary) window.updateBookingSummary();
            }, 300);
        });
    }

    // ========== VOUCHER POPUP FOR BOOKING PAGE =============
    if (document.getElementById('voucherModal')) {
        const voucherModal = document.getElementById('voucherModal');
        const closeVoucherBtn = document.getElementById('closeVoucherBtn');
        const cancelVoucherBtn = document.getElementById('cancelVoucherBtn');
        const voucherOverlay = document.getElementById('voucherOverlay');
        const voucherApplyBtns = document.querySelectorAll('.voucher-apply-btn');
        const changeVoucherBtn = document.getElementById('changeVoucherBtn');
        // Mở popup
        changeVoucherBtn.addEventListener('click', function() {
            voucherModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        // Đóng popup
        function closeVoucherModal() {
            voucherModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        closeVoucherBtn.addEventListener('click', closeVoucherModal);
        cancelVoucherBtn.addEventListener('click', closeVoucherModal);
        voucherOverlay.addEventListener('click', closeVoucherModal);
        // Chọn voucher
        voucherApplyBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const voucherItem = this.closest('.voucher-item');
                const voucherCode = voucherItem.getAttribute('data-code');
                const voucherDiscount = voucherItem.getAttribute('data-discount');
                const voucherTitle = voucherItem.querySelector('.voucher-item-title').textContent;
                // Lưu voucher đã chọn
                sessionStorage.setItem('selectedVoucher', JSON.stringify({
                    code: voucherCode,
                    discount: voucherDiscount,
                    title: voucherTitle
                }));
                // Cập nhật hiển thị voucher
                const voucherDisplay = document.getElementById('voucherDisplay');
                voucherDisplay.innerHTML = `<span class='no-voucher'>${voucherTitle} (Mã: ${voucherCode})</span> <button type='button' class='change-voucher-btn' id='changeVoucherBtn'>Đổi voucher</button>`;
                closeVoucherModal();
                if (window.updateBookingSummary) window.updateBookingSummary();
                // Re-bind event cho nút đổi voucher
                setTimeout(() => {
                    document.getElementById('changeVoucherBtn').addEventListener('click', function() {
                        voucherModal.style.display = 'flex';
                        document.body.style.overflow = 'hidden';
                    });
                }, 100);
            });
        });
    }

    // ======= PAYMENT POPUP LOGIC =======
    const paymentModal = document.getElementById('paymentModal');
    const paymentOverlay = document.getElementById('paymentOverlay');
    const closePaymentBtn = document.getElementById('closePaymentBtn');
    const closePaymentBtn2 = document.getElementById('closePaymentBtn2');
    function showPaymentModal(method) {
        // Hiển thị phương thức thanh toán
        document.getElementById('paymentMethodInfo').textContent = method === 'momo' ? 'Ví MoMo' : 'Chuyển khoản ngân hàng';
        // Sinh mã giao dịch giả lập
        const code = 'TX' + Math.floor(100000 + Math.random() * 900000);
        document.getElementById('transactionCode').textContent = code;
        // QR code giả lập (có thể encode thêm thông tin nếu muốn)
        document.getElementById('paymentQR').src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${code}`;
        paymentModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closePaymentModal() {
        paymentModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    closePaymentBtn.addEventListener('click', closePaymentModal);
    closePaymentBtn2.addEventListener('click', closePaymentModal);
    paymentOverlay.addEventListener('click', closePaymentModal);


}); 