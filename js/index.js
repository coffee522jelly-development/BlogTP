'use strict'

// グローバル変数
const blogCategory = ['日常', 'プログラミング', 'なし'];
const url = 'https://think-free.microcms.io/api/v1/blog?limit=50';

// ブログオブジェクト
let blogObj;

// 記事数カウンタ
let totalCount = 0;
let DayCount = 0;
let ProgramCount = 0;
let NoneCount = 0;

// ロード時
window.addEventListener('DOMContentLoaded', () => {
  GetBlogData();
  setInterval('GetClock()', 1000);
  GetCalendar();
  GetTimer();
  // ResetTwitterColor();
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
    const url = decodeURIComponent(location.search);
    const string = GetQueryString(url);
    
    GetParam(blogjson);

    let param;
    if (string != null) param = string.contents_id;
    
    parseBlogs(parent, blogjson, totalCount, 'All', param);
    blogObj = blogjson;
    console.log(blogObj);
  }).catch(function (error) {
    console.log(error);

    GetErrorMessage();
  });
}

// ブログ記事数取得関数
function GetParam(myjson){
  totalCount = 0;
  DayCount = 0;
  ProgramCount = 0;
  NoneCount = 0;
  
  totalCount = myjson.totalCount;

  for (let i=0; i<totalCount; i++){
    const categories = myjson.contents[i].category;
    if (categories == blogCategory[0])
      DayCount++;
    if (categories == blogCategory[1])
      ProgramCount++;
    if (categories == blogCategory[2])
      NoneCount++;
  }

  let All = document.getElementById('All');
  All.innerHTML = totalCount;

  let Day = document.getElementById('Day');
  Day.innerHTML = DayCount;

  let Program = document.getElementById('Program');
  Program.innerHTML = ProgramCount;

  let None = document.getElementById('None');
  None.innerHTML = NoneCount;
}

// カレンダー取得
function GetCalendar(){
  const current = new Date();
  const wrapper = document.getElementById('calendar');
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
    const scrolled = getScrolled();
    window.scrollTo( 0, Math.floor( scrolled / 2 ) );
    if ( scrolled > 0 ) {
      window.setTimeout( scrollToTop, 30 );
    }
};

//////////////////////////////////////////////////////////////////////////////////
// 表示・フォーマッタ

// エラーメッセージの表示
function GetErrorMessage(){
  let paper = document.getElementById('main');
  let error = document.createElement('div');
  error.id = 'error';
  error.innerHTML = 'ページ読み込みエラー';
  paper.appendChild(error);
}

// 選択カテゴリのみ表示
function onlyCategoryzer(parent, category){
  parent.innerHTML = '';
  parseBlogs(parent, blogObj, totalCount, category, null);  
}

// ブログ描画関数
function parseBlogs(parent, json, Size, paperCategory, id){
  for (let i=0; i < Size; i++){
    let obj = json.contents[i];

    if (paperCategory != 'All'){
      if (obj.category != paperCategory)  continue;
    }

    if (id != null){
      if (id != obj.id) continue;
    }

    // 記事単位のdiv生成
    let paper = document.createElement('div');
    paper.id = obj.id;
    paper.className = 'paper';
 
    // タイトル作成
    let title = document.createElement('div');
    title.id = 'title';
    title.innerHTML = obj.title;
    paper.appendChild(title);
 
    // カテゴリ作成
    let category = document.createElement('div');
    category.id = 'category';
    category.innerHTML = "category : " + obj.category;
    paper.appendChild(category);
 
    // img要素を作成
    let wrapper = document.createElement('div');
    wrapper.id = 'img-wrapper';
    let img = document.createElement('img');
    img.src = obj.photos.url;
    img.setAttribute('loading', 'lazy');
    img.setAttribute('class', 'img-thumbnail');
    wrapper.appendChild(img);
    paper.appendChild(wrapper);
 
    // コンテンツ作成
    let contents = document.createElement('div');
    contents.id = 'contents';
    contents.innerHTML = obj.contents;

    // シェア部分のヘッダ
    let share = document.createElement('div');
    share.setAttribute('class', 'row');
    share.id = 'share';

    // Twitterシェアボタン
    let twitter = document.createElement('div');
    twitter.setAttribute('class', 'col');
    twitter.id = 'tweet';
    let ctweet = document.createElement('a');
    ctweet.text = 'twitter.';
    ctweet.setAttribute('href','https://twitter.com/share?url=' + location.href + '?contents_id=' + paper.id + '&text=' + obj.title +'&hashtags=' + obj.category);
    twitter.appendChild(ctweet);
    share.appendChild(twitter);

    // facebookシェアボタン
    let facebook = document.createElement('div');
    facebook.setAttribute('class', 'col');
    facebook.id = 'facebook';
    let cfacebook = document.createElement('a');
    cfacebook.text = 'facebook.';
    cfacebook.setAttribute('href','https://www.facebook.com/share.php?u='+ location.href);
    facebook.appendChild(cfacebook);
    share.appendChild(facebook);

    // Lineシェアボタン
    let Line = document.createElement('div');
    Line.setAttribute('class', 'col');
    Line.id = 'Line';
    let cLine = document.createElement('a');
    cLine.text = 'Line.';
    cLine.setAttribute('href','https://social-plugins.line.me/lineit/share?url='+ location.href);
    Line.appendChild(cLine);
    share.appendChild(Line);

    // シェアボタンの記事への追加
    contents.appendChild(share);
    paper.appendChild(contents);
 
    // 作成日時
    let date = new Date(obj.createdAt);
    let createdAt = document.createElement('div');
    createdAt.id = 'createdAt';
    createdAt.innerHTML = "created-At ： " + formatDate(date);
    paper.appendChild(createdAt);
 
    // パーティション
    let part = document.createElement('hr');
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
      let query = document.location.search.substring(1);
      let parameters = query.split('&');

      let result = new Object();
      for (let i = 0; i < parameters.length; i++) {
          let element = parameters[i].split('=');

          const paramName = decodeURIComponent(element[0]);
          const paramValue = decodeURIComponent(element[1]);

          result[paramName] = decodeURIComponent(paramValue);
      }
      return result;
  }
  return null;
}