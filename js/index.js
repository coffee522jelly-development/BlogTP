const blogCategory = ['日常', 'プログラミング', 'なし'];
const url = 'https://think-free.microcms.io/api/v1/blog';

// すべての記事数
var totalCount = 0;
var DayCount = 0;
var ProgramCount = 0;
var NoneCount = 0;

// jsonオブジェクト
var blogObj;

window.addEventListener('DOMContentLoaded', () => {
  ResetTwitterColor();
  GetBlogData();
});


// ツイッターカラーの初期値設定
function ResetTwitterColor(){
  const twitter = document.querySelector('.twitter-timeline');
  if (window.matchMedia('(prefers-color-scheme: dark)').matches === true){
    twitter.setAttribute('data-theme', 'dark');
  }
  else{
    twitter.setAttribute('data-theme', 'light');
  }
}


// ブログデータ取得関数
function GetBlogData(){
const parent = document.getElementById('main');
 fetch(url, {
  headers: {
    "X-MICROCMS-API-KEY": "09fdf236-e540-414d-927a-70f425e43a3e",   // 個人のAPIキー
    "Content-Type": "application/json"
  }
  }).then(function (response) {
    return response.json();
  }).then(function (blogjson) { 
    GetParam(blogjson);
    parseBlogs(parent, blogjson, totalCount, 'All');
    blogObj = blogjson;
    console.log(blogObj);
  }).catch(function (error) {
    console.log(error);
  });
}


// ブログ描画関数
function parseBlogs(parent, json, Size, paperCategory){
  for (var i=0; i < Size; i++){
    var obj = json.contents[i];

    if (paperCategory != 'All'){
      if (obj.category != paperCategory)  continue;
    }
 
    // タイトル作成
    var title = document.createElement('div');
    title.id = 'title';
    title.innerHTML = obj.title;
    parent.appendChild(title);
 
    // カテゴリ作成
    var category = document.createElement('div');
    category.id = 'category';
    category.innerHTML = "category : " + obj.category;
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
    var date = new Date(obj.createdAt);
    var createdAt = document.createElement('div');
    createdAt.id = 'createdAt';
    createdAt.innerHTML = "created-At ： " + formatDate(date);
    parent.appendChild(createdAt);
 
    // パーティション
    var part = document.createElement('hr');
    parent.appendChild(part);
  } 
}


// 日時表示関数
function formatDate(current_datetime){
  let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + "　" + current_datetime.getHours() + "-" + current_datetime.getMinutes() + "";
  return formatted_date;
}


// ブログ記事数取得関数
function GetParam(myjson){
  totalCount = 0;
  DayCount = 0;
  ProgramCount = 0;
  NoneCount = 0;
  
  totalCount = myjson.totalCount;

  for (var i=0; i<totalCount; i++){
    var categories = myjson.contents[i].category;
    if (categories == blogCategory[0])
      DayCount++;
    if (categories == blogCategory[1])
      ProgramCount++;
    if (categories == blogCategory[2])
      NoneCount++;
  }

  var All = document.getElementById('All');
  All.innerHTML = totalCount;

  var Day = document.getElementById('Day');
  Day.innerHTML = DayCount;

  var Program = document.getElementById('Program');
  Program.innerHTML = ProgramCount;

  var None = document.getElementById('None');
  None.innerHTML = NoneCount;
}

// 選択カテゴリのみ表示
function onlyCategoryzer(parent, category){
  parent.innerHTML = '';
  parseBlogs(parent, blogObj, totalCount, category);
}
 
// すべて
function OnAllClick(){
  onlyCategoryzer(document.getElementById('main'), 'All');
  scrollToTop();
}

// 日常
function OnADayClick(){
  onlyCategoryzer(document.getElementById('main'), blogCategory[0]);
  scrollToTop();
}

// プログラム
function OnProgrammingClick(){
  onlyCategoryzer(document.getElementById('main'), blogCategory[1]);
  scrollToTop();
}

// なし
function OnNoneClick(){
  onlyCategoryzer(document.getElementById('main'), blogCategory[2]);
  scrollToTop();
}

//スクロール量を取得
function getScrolled() {
  return ( window.pageYOffset !== undefined ) ? window.pageYOffset: document.documentElement.scrollTop;
}

// トップまでスクロール
function scrollToTop() {
  var scrolled = getScrolled();
  window.scrollTo( 0, Math.floor( scrolled / 2 ) );
  if ( scrolled > 0 ) {
    window.setTimeout( scrollToTop, 30 );
  }
};