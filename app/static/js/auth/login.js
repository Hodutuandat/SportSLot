document.addEventListener("DOMContentLoaded", () => {
  console.log("🔐 Trang đăng nhập đã sẵn sàng");

  // Ví dụ: focus tự động vào ô email
  const emailInput = document.querySelector("#email");
  if (emailInput) {
    emailInput.focus();
  }

  // Bạn có thể thêm validate, toggle mật khẩu... tại đây
});
