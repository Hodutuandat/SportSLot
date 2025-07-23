function showModal(title, content, actionText, actionCallback) {
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    `;
    modal.innerHTML = `
        <div class="modal-content" style="
            background: white;
            border-radius: 15px;
            padding: 0;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: slideDown 0.3s ease;
        ">
            <div class="modal-header" style="
                padding: 20px 25px;
                border-bottom: 1px solid #e5e7eb;
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <h3 style="margin: 0; font-size: 1.3rem; font-weight: 700; color: #232a34;">${title}</h3>
                <button class="close-btn" onclick="closeCustomModal()" style="
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #6b7280;
                    padding: 5px;
                ">×</button>
            </div>
            <div class="modal-body" style="padding: 25px;">
                ${content}
                <div class="modal-actions" style="
                    display: flex;
                    gap: 10px;
                    justify-content: flex-end;
                    margin-top: 20px;
                ">
                    <button onclick="closeCustomModal()" style="
                        background: #e5e7eb;
                        color: #374151;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 600;
                    ">Hủy</button>
                    <button id="customModalAction" style="
                        background: linear-gradient(135deg, #1e90ff, #0066cc);
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 600;
                    ">${actionText}</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    // Setup action button
    const actionBtn = document.getElementById('customModalAction');
    if (actionBtn && actionCallback) {
        actionBtn.addEventListener('click', actionCallback);
    }
    window.currentCustomModal = modal;
}

function closeCustomModal() {
    if (window.currentCustomModal) {
        window.currentCustomModal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (window.currentCustomModal && window.currentCustomModal.parentNode) {
                document.body.removeChild(window.currentCustomModal);
            }
            window.currentCustomModal = null;
        }, 300);
    }
} 