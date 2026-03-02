// js/layout.js

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("#header", "/partials/header.html", initNavbar);
  loadComponent("#footer", "/partials/footer.html");
});

function loadComponent(selector, url, callback) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Không thể load ${url}`);
      }
      return response.text();
    })
    .then((html) => {
      document.querySelector(selector).innerHTML = html;
      if (typeof callback === "function") callback();
    })
    .catch((error) => {
      console.error(error);
    });
}

/* ===============================
   NAVBAR LOGIC
   =============================== */
function initNavbar() {
  const toggleBtn = document.getElementById("navbarToggle");
  const mobileMenu = document.getElementById("navbarMobile");

  if (!toggleBtn || !mobileMenu) return;

  const icon = toggleBtn.querySelector("i");

  toggleBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
  });
}

function initFooter() {
  const icons = document.querySelectorAll(".icon");
  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      console.log("Clicked social icon");
    });
  });
}

// Hàm này sẽ chạy mỗi khi trang web được tải xong
function setActiveNavLink() {
  // 1. Lấy tên file hiện tại từ thanh địa chỉ (ví dụ: tin-tuc.html)
  const currentPath = window.location.pathname.split("/").pop();

  // 2. Nếu trang chủ là rỗng (ví dụ: domain.com/) thì mặc định là index.html
  const activePage = currentPath === "" ? "index.html" : currentPath;

  // 3. Tìm tất cả các link trong navbar
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    // 4. Lấy giá trị href của từng link (ví dụ: tin-tuc.html)
    const linkHref = link.getAttribute('href');

    // 5. Nếu href trùng với trang hiện tại, thêm class active
    if (linkHref === activePage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Gọi hàm ngay sau khi Header của bạn đã được render xong trong layout.js
setActiveNavLink();