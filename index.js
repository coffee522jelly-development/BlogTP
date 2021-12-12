// APIのURL
const url = 'https://think-free.microcms.io/api/v1/blog';

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
    const paperSize = json.totalCount;

    // 最新記事のみ
    document.getElementById("title").innerHTML = json.contents[0].title;
    document.getElementById("category").innerHTML = "カテゴリ:"　+ json.contents[0].category;
    document.getElementById("contents").innerHTML = json.contents[0].contents;
    document.getElementById("createdAt").innerHTML = "作成日時:" + json.contents[0].createdAt;
  })
  .catch(function(error) {
    console.log(error);
  });