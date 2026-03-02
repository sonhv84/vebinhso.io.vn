// js/news.js
let NEWS_DATA_LOCAL = [];

async function loadExternalData() {
  try {
    const response = await fetch("/data/data.json");
    const data = await response.json();
    NEWS_DATA_LOCAL = data.NEWS_DATA;
    renderNews(NEWS_DATA_LOCAL);

    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const keyword = e.target.value.toLowerCase();
        const filtered = NEWS_DATA_LOCAL.filter(
          (n) =>
            n.title.toLowerCase().includes(keyword) ||
            n.desc.toLowerCase().includes(keyword),
        );
        renderNews(filtered);
      });
    }
  } catch (error) {
    console.error("Lỗi:", error);
  }
}

function renderNews(dataList) {
  const feed = document.getElementById("newsFeed");
  if (!feed) return;
  if (dataList.length === 0) {
    feed.innerHTML = "<p>Không tìm thấy bài viết.</p>";
    return;
  }

  const newsCards = dataList
    .map(
      (n) => `
        <div class="news-item">
            <div class="news-img-container">
                <img src="${n.img}" class="news-img" alt="${n.title}" loading="lazy">
            </div>
            <div class="news-content">
                <div style="margin-bottom: 8px;">
                    <span class="tag ${n.tagClass}">${n.label}</span>
                    <small style="color:#999; font-weight: 500;">${n.time}</small>
                </div>
                <h3><a href="/pages/chi-tiet-tin-tuc.html?id=${n.id}">${n.title}</a></h3>
                <p>${n.desc}</p>
                <a href="/pages/thong-tin-chi-tiet.html?id=${n.id}" class="btn-detail">CHI TIẾT BÀI VIẾT →</a>
            </div>
        </div>
    `,
    )
    .join("");
  feed.innerHTML = newsCards;
}

window.onload = () => {
  if (typeof loadLayout === "function") loadLayout();
  loadExternalData();
};
