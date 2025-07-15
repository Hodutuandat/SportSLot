document.addEventListener("DOMContentLoaded", () => {
  const typeButtons = document.querySelectorAll(".type-btn");
  const roleInput = document.getElementById("role");
  const ownerFields = document.querySelectorAll(".owner-only");

  // Xử lý chọn loại tài khoản
  typeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      typeButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const selectedRole = btn.dataset.role;
      roleInput.value = selectedRole;

      // Hiện/ẩn trường dành cho chủ sân
      if (selectedRole === "owner") {
        ownerFields.forEach(field => field.classList.remove("hidden"));
        // Đặt thuộc tính required
        document.getElementById("fullname").required = true;
        document.getElementById("field_address").required = true;
      } else {
        ownerFields.forEach(field => field.classList.add("hidden"));
        document.getElementById("fullname").required = false;
        document.getElementById("field_address").required = false;
      }
    });
  });
});
