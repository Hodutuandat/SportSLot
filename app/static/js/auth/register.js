document.addEventListener('DOMContentLoaded', function() {
    const btnCustomer = document.getElementById('btn-customer');
    const btnOwner = document.getElementById('btn-owner');
    const ownerNameField = document.getElementById('owner-name-field');
    const fieldAddressField = document.getElementById('field-address-field');

    btnCustomer.addEventListener('click', function() {
        btnCustomer.classList.add('active');
        btnOwner.classList.remove('active');
        ownerNameField.style.display = 'none';
        fieldAddressField.style.display = 'none';
    });

    btnOwner.addEventListener('click', function() {
        btnOwner.classList.add('active');
        btnCustomer.classList.remove('active');
        ownerNameField.style.display = '';
        fieldAddressField.style.display = '';
    });
}); 