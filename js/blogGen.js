'use strict'

// 記事取得時設定
const limit = 50;
const offset = 0;
const url = 'https://think-free.microcms.io/api/v1/blog?limit=' + limit + '&offset=' + offset;

// ユニークカテゴリの作成
let uniqueCategory = [];
let Category = [];

// ①カテゴリ追加時は以下に手代入
const blogCategory = ['Daily', 'Programming', 'Music','None'];

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
      
      // カテゴリを描画
      totalCount = blogjson.totalCount;
      for (let i=0; i<totalCount; i++){
        Category.push(blogjson.contents[i].category);
      }
      uniqueCategory = new Set(Category);
      parseCategories();

      // ブログを描画
      getParam(blogjson);

      let param;
      if (string != null)   
        param = string.contents_id;
      
      parseBlogs(parent, blogjson, totalCount, 'All', param);
      blogObj = blogjson;

      // // デバッグ用
      // console.log(blogObj);

    }).catch(function (error) {
      console.log(error);

      // 記事取得失敗
      getErrorMessage();
    });
}

// ブログ記事数取得関数
function getParam(myjson){
  totalCount = myjson.totalCount;

  let cAll = document.getElementById('cAll');
  cAll.innerHTML = totalCount;

  // // const categoryCount = Array.from(uniqueCategory);
  var myMap = new Map();

  // 初期化
  for (let category of uniqueCategory){
    myMap.set(category, 0);
  }

  // 記事数カウンター
  for (let i=0; i<totalCount; i++){
    const pageCategory = myjson.contents[i].category;
    const count = myMap.get(pageCategory);
    myMap.set(pageCategory, count + 1);
  }

  // 結果を表示
  for (let category of uniqueCategory){
  let cItem = document.getElementById('c' + category);
  cItem.innerHTML = myMap.get(category);
  }
}

// // カレンダー取得
// function getCalendar(){
//   const current = new Date();
//   const wrapper = document.getElementById('Calendar');
//   addCalendar(wrapper, current.getFullYear(), current.getMonth() + 1);
// }

// タイマー取得
// function getTimer(){
//   document.getElementById("TimerDisplay").innerText = calcMinSec(1500);
// }

//////////////////////////////////////////////////////////////////////////////////
// イベント

// ロード時イベント
window.addEventListener('DOMContentLoaded', () => {
  getBlogData();
  setInterval('getClock()', 1000);
  // getCalendar();
  // getTimer();

  // /*警告対策*/
  // const iframe = document.createElement('iframe');
  // iframe.setAttribute('allowFullScreen', '');
  // iframe.setAttribute('allow', 'fullscreen');

  InitEvent();
});


// 初期イベント登録
function InitEvent(){
  let hm = document.getElementById('navbtn');
  hm.addEventListener('click', onHamburgerclick);

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

// 選択カテゴリの記事のみ表示
function onlyCategoryzer(parent, category){
  parent.innerHTML = '';
  parseBlogs(parent, blogObj, totalCount, category, null);
}

// ブログ記事作成関数
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
}


// カテゴリリスト作成関数
function parseCategories(){
  let categorylist = document.getElementById('categoryList');

  for (let category of uniqueCategory){
    let li = document.createElement('li');
    li.id = category;
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    // リンク
    let ahref = document.createElement('a');
    ahref.id = category;
    ahref.innerHTML = '- '+category;
    ahref.href = '#'+ category;
    li.appendChild(ahref); 

    // ページ数カウンタ
    let span = document.createElement('span');
    span.id = 'c'+ category;
    span.className = 'badge bg-primary rounded-pill';
    li.appendChild(span);

    categorylist.appendChild(li);

    // イベント登録(カテゴリのみ)
    let all = document.getElementById('All');
    all.addEventListener('click', function (){
      onlyCategoryzer(document.getElementById('main'), 'All');
      scrollToTop();
    });

    let item = document.getElementById(category);
    item.addEventListener('click', function (){
      onlyCategoryzer(document.getElementById('main'), category);
      scrollToTop();
    });
  }
}


// 日時表示関数
function formatDate(current_datetime){
  const formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + "　" + addZero(current_datetime.getHours()) + ":" + addZero(current_datetime.getMinutes()) + "";
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

  // let icon = document.createElement('i');
  // icon.setAttribute('class', 'fab fa-2x ' + faString + ' share');
  // button.appendChild(icon);
  
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