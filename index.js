const url = 'https://think-free.microcms.io/api/v1/blog';
const urlDay = 'https://think-free.microcms.io/api/v1/blog?filters=category[contains]日常';
const urlProgram = 'https://think-free.microcms.io/api/v1/blog?filters=category[contains]プログラミング';
const urlNone = 'https://think-free.microcms.io/api/v1/blog?filters=category[contains]なし';

window.addEventListener('DOMContentLoaded', () => {

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
    const parent = document.getElementById('main');
    const paperSize = json.totalCount;
    parseBlogs(parent, json, paperSize);
  })
  .catch(function(error) {
    console.log(error);
  });
});


// カテゴリ:すべて
function OnAllClick(){
  const parent = document.getElementById('main');
  parent.innerHTML = '';

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

      var All = document.getElementById('All');
      All.innerHTML = paperSize;

      parseBlogs(parent, json, paperSize);
    })
    .catch(function(error) {
      console.log(error);
    });
}



// カテゴリ:日常
function OnADayClick(){
  const parent = document.getElementById('main');
  parent.innerHTML = '';

  fetch(urlDay, {
    headers: {
      "X-MICROCMS-API-KEY": "09fdf236-e540-414d-927a-70f425e43a3e",   // 個人のAPIキー
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(json => {
      // jsonパース部分
      const paperSize = json.totalCount;

      var Day = document.getElementById('Day');
      Day.innerHTML = paperSize;

      parseBlogs(parent, json, paperSize);
    })
    .catch(function(error) {
      console.log(error);
    });
}


// カテゴリ:プログラミング
function OnProgrammingClick(){
  const parent = document.getElementById('main');
  parent.innerHTML = '';

  fetch(urlProgram, {
    headers: {
      "X-MICROCMS-API-KEY": "09fdf236-e540-414d-927a-70f425e43a3e",   // 個人のAPIキー
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(json => {
      // jsonパース部分
      const paperSize = json.totalCount;

      var Program = document.getElementById('Program');
      Program.innerHTML = paperSize;

      parseBlogs(parent, json, paperSize);
    })
    .catch(function(error) {
      console.log(error);
    });
}


// カテゴリ:なし
function OnNoneClick(){
  const parent = document.getElementById('main');
  parent.innerHTML = '';

  fetch(urlNone, {
    headers: {
      "X-MICROCMS-API-KEY": "09fdf236-e540-414d-927a-70f425e43a3e",   // 個人のAPIキー
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(json => {
      // jsonパース部分
      const paperSize = json.totalCount;

      const None = document.getElementById('None');
      None.innerHTML = paperSize;
      
      parseBlogs(parent, json, paperSize);
    })
    .catch(function(error) {
      console.log(error);
    });
}

// ブログ描画関数
function parseBlogs(parent, json, Size){
 for (var i=0; i < Size; i++){
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
   img.height = 320; // 縦サイズ（px）
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
}