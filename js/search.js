// Khai báo biến trống để chứa dữ liệu sau khi lấy từ file JSON
let BLACKLIST = { phones: [], emails: [], links: [] };
let NEWS_DATA = [];

// --- PHẦN THÊM MỚI: Lấy dữ liệu từ bên ngoài ---
async function loadExternalData() {
    try {
        const response = await fetch('/data/data.json'); // Đường dẫn tới file json của bạn
        const data = await response.json();
        
        // Gán dữ liệu vào biến toàn cục
        BLACKLIST = data.BLACKLIST;
        NEWS_DATA = data.NEWS_DATA;

        // Sau khi có dữ liệu mới chạy hàm khởi tạo News
        init();
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
    }
}

// --- GIỮ NGUYÊN LOGIC CỦA BẠN ---
function handleCheck() {
  const inputElement = document.getElementById("checkInput");
  const input = inputElement.value.trim().toLowerCase();
  const area = document.getElementById("resultArea");

  if (!input) {
    area.innerHTML = "";
    return;
  }

  area.innerHTML = `<div class="result-card" style="color:white;"><div class="spinner"></div> Đang kiểm tra dữ liệu...</div>`;

  setTimeout(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(0|84)[0-9]{9}$/;
    const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/.*)?$/;

    let type = "";
    if (emailRegex.test(input)) type = "email";
    else if (phoneRegex.test(input)) type = "phone";
    else if (urlRegex.test(input)) type = "url";

    if (type === "") {
      inputElement.classList.add("shake");
      setTimeout(() => inputElement.classList.remove("shake"), 400);
      area.innerHTML = `
            <div class="result-card warning">
                <i class="fas fa-info-circle"></i>
                <span>Định dạng không hợp lệ. Vui lòng nhập đúng SĐT, Email hoặc Link web.</span>
            </div>`;
      return;
    }

    let isScam = false;
    let label = "";

    if (type === "email") {
      isScam = BLACKLIST.emails.includes(input);
      label = "Email";
    } else if (type === "phone") {
      isScam = BLACKLIST.phones.includes(input);
      label = "Số điện thoại";
    } else if (type === "url") {
      isScam = BLACKLIST.links.some((l) => input.includes(l));
      label = "Liên kết";
    }

    if (isScam) {
      area.innerHTML = `
            <div class="result-card danger">
                <i class="fas fa-exclamation-triangle"></i>
                <span>CẢNH BÁO: ${label} này nằm trong danh sách lừa đảo!</span>
            </div>`;
    } else {
      area.innerHTML = `
            <div class="result-card success">
                <i class="fas fa-shield-check"></i>
                <span>AN TOÀN: ${label} này chưa bị báo cáo xấu.</span>
            </div>`;
    }
  }, 600);
}

function init() {
  const feed = document.getElementById("newsFeed");
  if (!feed) return;
  const newsCards = NEWS_DATA.map(
    (n) => `
            <div class="news-item">
                <div class="news-img-container"><img src="${n.img}" class="news-img"></div>
                <div class="news-content">
                    <div style="margin-bottom: 8px;">
                        <span class="tag ${n.tagClass}">${n.label}</span>
                        <small style="color:var(--text-muted); font-weight: 500;">${n.time}</small>
                    </div>
                    <h3><a href="#">${n.title}</a></h3>
                    <p>${n.desc}</p>
                    <a href="#" style="color:var(--color-primary); font-weight:700; text-decoration:none; font-size:13px;">Chi tiết bài viết →</a>
                </div>
            </div>
        `,
  ).join("");
  feed.innerHTML = newsCards; // Dùng dấu = thay vì += để tránh lặp nội dung khi fetch lại
}

// Thay đổi window.onload để gọi hàm tải dữ liệu trước
window.onload = loadExternalData;