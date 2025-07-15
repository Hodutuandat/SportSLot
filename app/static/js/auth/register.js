// JS cho popup register
function closeRegisterModal() {
    document.getElementById('registerModal').style.display = 'none';
    window.location.href = '/';
}
function selectRole(role) {
    document.getElementById('role-input').value = role;
    document.getElementById('role-customer').classList.remove('active');
    document.getElementById('role-owner').classList.remove('active');
    if(role === 'customer') {
        document.getElementById('role-customer').classList.add('active');
    } else {
        document.getElementById('role-owner').classList.add('active');
    }
}
document.addEventListener('DOMContentLoaded', function() {
    selectRole('customer');
});
