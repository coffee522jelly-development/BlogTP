'use strict'

// 記事取得時設定
const limit = 50;
const offset = 0;
const url = 'https://think-free.microcms.io/api/v1/blog?limit=' + limit + '&offset=' + offset;

// ①カテゴリ追加時は以下に手代入
const blogCategory = ['日常', 'プログラミング', 'なし'];

// ブログオブジェクト
let blogObj;

// 記事数カウンタ
let totalCount = 0;
let categoryCount = 0;

// ページ表示数制限値(最新：最大10件)
const pageRestrict = 10;

//////////////////////////////////////////////////////////////////////////////////
// 処理

// ブログデータ取得関数
function getBlogData(){
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
      const string = getQueryString(url);
      
      getParam(blogjson);

      let param;
      if (string != null) 
        param = string.contents_id;
      
      parseBlogs(parent, blogjson, totalCount, 'All', param);
      blogObj = blogjson;

      // デバッグ用
      console.log(blogObj);

    }).catch(function (error) {
      console.log(error);

      // 記事取得失敗
      getErrorMessage();
    });
}

// ブログ記事数取得関数
function getParam(myjson){
  totalCount = myjson.totalCount;
  categoryCount = new Array(blogCategory.length);
  categoryCount.fill(0);

  for (let i=0; i<totalCount; i++){
    const categories = myjson.contents[i].category;
      for (let j=0; j<categoryCount.length; j++){
        if (categories == blogCategory[j])
        categoryCount[j]++;
      }
  }

  let cAll = document.getElementById('cAll');
  cAll.innerHTML = totalCount;

  let cDay = document.getElementById('cDay');
  cDay.innerHTML = categoryCount[0];

  let cProgram = document.getElementById('cProgram');
  cProgram.innerHTML = categoryCount[1];

  let cNone = document.getElementById('cNone');
  cNone.innerHTML = categoryCount[2];

  // ②カテゴリ追加時は以下に処理を追加
}

// カレンダー取得
function getCalendar(){
  const current = new Date();
  const wrapper = document.getElementById('Calendar');
  addCalendar(wrapper, current.getFullYear(), current.getMonth() + 1);
}

// タイマー取得
function getTimer(){
  document.getElementById("TimerDisplay").innerText = calcMinSec(1500);
}

//////////////////////////////////////////////////////////////////////////////////
// イベント

// ロード
window.addEventListener('DOMContentLoaded', () => {
  getBlogData();
  setInterval('getClock()', 1000);
  getCalendar();
  getTimer();
  // resetTwitterColor();

  InitEvent();
});

// イベント登録
function InitEvent(){
  let hm = document.getElementById('navbtn');
  hm.addEventListener('click', onHamburgerclick);

  let All = document.getElementById('All');
  All.addEventListener('click', onAllClick);

  let Day = document.getElementById('Day');
  Day.addEventListener('click', onADayClick);

  let Program = document.getElementById('Programming');
  Program.addEventListener('click', onProgrammingClick);

  let None = document.getElementById('None');
  None.addEventListener('click', onNoneClick);

  let hmItem = document.getElementsByClassName('hm');
  for (let i=0; i<hmItem.length; i++){
    hmItem[i].addEventListener('click', onRemoveOpen);
  }
}


// ハンバーガーメニュー
function onHamburgerclick(){
  document.querySelector('html').classList.toggle('open');
}

function onRemoveOpen(){
  document.querySelector('html').classList.remove('open');
}

// すべて
function onAllClick(){
  onlyCategoryzer(document.getElementById('main'), 'All');
  scrollToTop();
}

// 日常
function onADayClick(){
  onlyCategoryzer(document.getElementById('main'), blogCategory[0]);
  scrollToTop();
}

// プログラム
function onProgrammingClick(){
  onlyCategoryzer(document.getElementById('main'), blogCategory[1]);
  scrollToTop();
}

// なし
function onNoneClick(){
  onlyCategoryzer(document.getElementById('main'), blogCategory[2]);
  scrollToTop();
}

// ③カテゴリ追加時は、こちらに関数を追加
//スクロール量
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
function getErrorMessage(){
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
    title.className = 'title';
    title.innerHTML = obj.title;
    paper.appendChild(title);
 
    // カテゴリ作成
    let category = document.createElement('div');
    category.id = 'category';
    category.innerHTML = "category : " + obj.category;
    paper.appendChild(category);
 
    // サムネイルを作成
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

    // シェアボタンの生成
    const lohref = location.href;

    // Twitterシェアボタン
    const twiurl = 'https://twitter.com/share?url=' + lohref + '?contents_id=' + paper.id + '&text=' + obj.title +'&hashtags=' + obj.category;
    generateShareButton(share, 'Twitter', twiurl, 'fa-twitter-square');
   
    // facebookシェアボタン
    const faceurl = 'https://www.facebook.com/share.php?u='+ lohref; 
    generateShareButton(share, 'Facebook', faceurl, 'fa-facebook-square');
    
    // Lineシェアボタン
    const lineurl = 'https://social-plugins.line.me/lineit/share?url='+ lohref;
    generateShareButton(share, 'Line', lineurl, 'fa-line');

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

  // ページネーション
  //pageNation();
}

// 日時表示関数
function formatDate(current_datetime){
  const formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + "　" + current_datetime.getHours() + "時" + current_datetime.getMinutes() + "分";
  return formatted_date;
}

// シェアボタン生成関数
// 引数：親要素
// 引数：ボタン名称
// 引数：URL文字列
// 引数：FontAwesome指定文字列
function generateShareButton(parent, buttonName, url, faString){
  let button = document.createElement('div');
  button.setAttribute('class', 'col share');
  button.id = buttonName;

  let icon = document.createElement('i');
  icon.setAttribute('class', 'fab fa-2x ' + faString + ' share');
  button.appendChild(icon);
  
  let buttonLink = document.createElement('a');
  buttonLink.text = buttonName + '.';
  buttonLink.setAttribute('href', url);
  button.appendChild(buttonLink);
  parent.appendChild(button);
}


// ページネーション表示関数
function pageNation(){
  let Pagination = document.getElementById('Pagination');

  let nav = document.createElement('nav');
  nav.ariaLabel = 'Pagenation';
  let ulist = document.createElement('ul');
  ulist.className = 'pagination pagination-lg justify-content-center';
  
  // 前
  let prevlist = document.createElement('li');
  prevlist.className = 'page-item';
  let prev = document.createElement('a');
  prev.id = 'prev'; 
  prev.className = 'page-link';
  prev.innerHTML = '<';
  prev.href = 'javascript:OnPrevClick()';
  prevlist.appendChild(prev);
  ulist.appendChild(prevlist);

  // カウンタ
  let buttonSize = totalCount % pageRestrict;
  for (let i = 1; i <= buttonSize; i++){
    let countlist = document.createElement('li');
    countlist.className = 'page-item';
    let count = document.createElement('a');
    count.className = 'page-link';
    count.innerHTML = i;
    countlist.appendChild(count);
    ulist.appendChild(countlist);
  }

  // 次
  let nextlist = document.createElement('li');
  nextlist.className = 'page-item';
  let next = document.createElement('a');
  next.id = 'next';
  next.className = 'page-link';
  next.innerHTML = '>';
  next.href = 'javascript:OnNextClick()';
  nextlist.appendChild(next);
  ulist.appendChild(nextlist);

  nav.appendChild(ulist);
  Pagination.appendChild(nav);
} 

// ツイッターカラーの初期値設定
function resetTwitterColor(){
  const twitter = document.querySelector('.twitter-timeline');
  if (window.matchMedia('(prefers-color-scheme: dark)').matches === true){
    twitter.setAttribute('data-theme', 'dark');
  }
  else{
    twitter.setAttribute('data-theme', 'light');
  }
}

// パラメータ読み出し
function getQueryString() {
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