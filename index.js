// APIのURL
const url = 'https://think-free.microcms.io/api/v1/news/_Ej9SD_IN';

// jsonの読込設定
fetch(url, {
  headers: {
    "X-MICROCMS-API-KEY": "09fdf236-e540-414d-927a-70f425e43a3e",   // 個人のAPIキー
    "Content-Type": "application/json"
  }
})
  .then(res => res.json())
  .then(json => {
    // jsonパース部分
    document.getElementById("news").innerHTML = json.news;
    document.getElementById("createdAt").innerHTML = json.createdAt;
  })
  .catch(function(error) {
    console.log(error);
  });