'use strict'

// グローバル変数
const blogCategory = ['日常', 'プログラミング', 'なし'];
const url = 'https://think-free.microcms.io/api/v1/blog?limit=50';

// ブログオブジェクト
var blogObj;

// 記事数カウンタ
var totalCount = 0;
var DayCount = 0;
var ProgramCount = 0;
var NoneCount = 0;

// ロード時
window.addEventListener('DOMContentLoaded', () => {
  GetBlogData();
  setInterval('GetClock()', 1000);
  GetCalendar();
  GetTimer();
  ResetTwitterColor();
});


//////////////////////////////////////////////////////////////////////////////////
// 処理

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
    var url = decodeURIComponent(location.search);
    var string = GetQueryString(url);
    
    GetParam(blogjson);

    var param;
    if (string != null) param = string.contents_id;
    
    parseBlogs(parent, blogjson, totalCount, 'All', param);
    blogObj = blogjson;
    console.log(blogObj);
  }).catch(function (error) {
    console.log(error);
  });
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

// カレンダー取得
function GetCalendar(){
  var current = new Date();
  var wrapper = document.getElementById('calendar');
  add_calendar(wrapper, current.getFullYear(), current.getMonth() + 1);
}

// タイマー取得
function GetTimer(){
  document.getElementById("TimerDisplay").innerText = calcMinSec(1500);
}

//////////////////////////////////////////////////////////////////////////////////
// イベント
 
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

//////////////////////////////////////////////////////////////////////////////////
// 表示・フォーマッタ

// 選択カテゴリのみ表示
function onlyCategoryzer(parent, category){
  parent.innerHTML = '';
  parseBlogs(parent, blogObj, totalCount, category, null);  
}

// ブログ描画関数
function parseBlogs(parent, json, Size, paperCategory, id){
  for (var i=0; i < Size; i++){
    var obj = json.contents[i];

    if (paperCategory != 'All'){
      if (obj.category != paperCategory)  continue;
    }

    if (id != null){
      if (id != obj.id) continue;
    }

    // 記事単位のdiv生成
    var paper = document.createElement('div');
    paper.id = obj.id;
    paper.className = 'paper';
 
    // タイトル作成
    var title = document.createElement('div');
    title.id = 'title';
    title.innerHTML = obj.title;
    paper.appendChild(title);
 
    // カテゴリ作成
    var category = document.createElement('div');
    category.id = 'category';
    category.innerHTML = "category : " + obj.category;
    paper.appendChild(category);
 
    // img要素を作成
    var wrapper = document.createElement('div');
    wrapper.className = 'img-wrapper';
    var img = document.createElement('img');
    img.src = obj.photos.url; // 画像パス
    img.setAttribute('loading', 'lazy');
    img.setAttribute('class', 'img-fluid');
    wrapper.appendChild(img);
    paper.appendChild(wrapper);
 
    // コンテンツ作成
    var contents = document.createElement('div');
    contents.id = 'contents';
    contents.innerHTML = obj.contents;

    // シェア部分のヘッダ
    var share = document.createElement('div');
    share.setAttribute('class', 'row');
    share.id = 'share';

    // Twitterシェアボタン
    var twitter = document.createElement('div');
    twitter.setAttribute('class', 'col');
    twitter.id = 'tweet';
    var ctweet = document.createElement('a');
    ctweet.text = 'tweet.';
    ctweet.setAttribute('href','https://twitter.com/share?url=' + location.href + '?contents_id=' + paper.id + '&text=' + obj.title +'&hashtags=' + obj.category);
    twitter.appendChild(ctweet);
    share.appendChild(twitter);

    // facebookシェアボタン
    var facebook = document.createElement('div');
    facebook.setAttribute('class', 'col');
    facebook.id = 'facebook';
    var cfacebook = document.createElement('a');
    cfacebook.text = 'facebook.';
    cfacebook.setAttribute('href','https://www.facebook.com/share.php?u='+ location.href);
    facebook.appendChild(cfacebook);
    share.appendChild(facebook);

    // Lineシェアボタン
    var Line = document.createElement('div');
    Line.setAttribute('class', 'col');
    Line.id = 'Line';
    var cLine = document.createElement('a');
    cLine.text = 'Line.';
    cLine.setAttribute('href','https://social-plugins.line.me/lineit/share?url='+ location.href);
    Line.appendChild(cLine);
    share.appendChild(Line);

    // シェアボタンの記事への追加
    contents.appendChild(share);
    paper.appendChild(contents);
 
    // 作成日時
    var date = new Date(obj.createdAt);
    var createdAt = document.createElement('div');
    createdAt.id = 'createdAt';
    createdAt.innerHTML = "created-At ： " + formatDate(date);
    paper.appendChild(createdAt);
 
    // パーティション
    var part = document.createElement('hr');
    paper.appendChild(part);

    parent.appendChild(paper);
  } 
}

// 日時表示関数
function formatDate(current_datetime){
  let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + "　" + current_datetime.getHours() + "時" + current_datetime.getMinutes() + "分";
  return formatted_date;
}

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

// パラメータ読み出し
function GetQueryString() {
  if (1 < document.location.search.length) {
      var query = document.location.search.substring(1);
      var parameters = query.split('&');

      var result = new Object();
      for (var i = 0; i < parameters.length; i++) {
          var element = parameters[i].split('=');

          var paramName = decodeURIComponent(element[0]);
          var paramValue = decodeURIComponent(element[1]);

          result[paramName] = decodeURIComponent(paramValue);
      }
      return result;
  }
  return null;
}