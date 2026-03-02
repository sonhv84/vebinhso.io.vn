const toggleBtn = document.getElementById("navbarToggle");
const mobileMenu = document.getElementById("navbarMobile");
const icon = toggleBtn.querySelector("i");

toggleBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
});