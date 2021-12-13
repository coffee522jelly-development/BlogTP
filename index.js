// ブログ用変数
var parent = document.getElementById('main');

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
    
    // ブログ
    var parent = document.getElementById('main');
    for (var i=0; i < paperSize; i++)
    {
      var obj = json.contents[i];

      // タイトル作成
      var title = document.createElement('div');
      title.id = 'title';
      title.innerHTML = obj.title;
      parent.appendChild(title);

      // カテゴリ作成
      var category = document.createElement('div');
      category.id = 'category';
      category.innerHTML = "カテゴリ:" + obj.category;
      parent.appendChild(category);

      // img要素を作成
      var img = document.createElement('img');
      img.src = obj.photos.url; // 画像パス
      img.width = 320; // 横サイズ（px）
      img.height = 180; // 縦サイズ（px）
      parent.appendChild(img);

      // コンテンツ作成
      var contents = document.createElement('div');
      contents.id = 'contents';
      contents.innerHTML = obj.contents;
      parent.appendChild(contents);

      // 作成日時
      var createdAt = document.createElement('div');
      createdAt.id = 'createdAt';
      createdAt.innerHTML = "作成日時：" + obj.createdAt;
      parent.appendChild(createdAt);

      // パーティション
      var part = document.createElement('hr');
      parent.appendChild(part);
    }
  })
  .catch(function(error) {
    console.log(error);
  });