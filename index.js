const url = 'https://think-free.microcms.io/api/v1/blog';
const urlDay = 'https://think-free.microcms.io/api/v1/blog?filters=category[contains]日常';
const urlProgram = 'https://think-free.microcms.io/api/v1/blog?filters=category[contains]プログラミング';
const urlNone = 'https://think-free.microcms.io/api/v1/blog?filters=category[contains]なし';

// すべての記事数
var totalCount = 0;
var DayCount = 0;
var ProgramCount = 0;
var NoneCount = 0;

window.addEventListener('DOMContentLoaded', () => {
  GetBlogData();
});

function GetBlogData(){
const parent = document.getElementById('main');
 fetch(url, {
  headers: {
    "X-MICROCMS-API-KEY": "09fdf236-e540-414d-927a-70f425e43a3e",   // 個人のAPIキー
    "Content-Type": "application/json"
  }
  }).then(function (response) {
    return response.json();
  }).then(function (myjson) {
    GetParam(myjson);
    parseBlogs(parent, myjson, totalCount);
    console.log(myjson);
  }).catch(function (error) {
    console.log(error);
  });
}


function GetDayData(){
const parent = document.getElementById('main');
  fetch(urlDay, {
  headers: {
    "X-MICROCMS-API-KEY": "09fdf236-e540-414d-927a-70f425e43a3e",   // 個人のAPIキー
    "Content-Type": "application/json"
  }
  }).then(function (response) {
    return response.json();
  }).then(function (myjson) {
    GetParam(myjson);
    parseCategoryBlog(parent, myjson, '日常');
    console.log(myjson);
  }).catch(function (error) {
    console.log(error);
  });
}


function GetProgramData(){
const parent = document.getElementById('main');
  fetch(urlProgram, {
  headers: {
    "X-MICROCMS-API-KEY": "09fdf236-e540-414d-927a-70f425e43a3e",   // 個人のAPIキー
    "Content-Type": "application/json"
  }
  }).then(function (response) {
    return response.json();
  }).then(function (myjson) {
    GetParam(myjson);
    parseCategoryBlog(parent, myjson, 'プログラミング');
    console.log(myjson);
  }).catch(function (error) {
    console.log(error);
  });
}


function GetNoneData(){
const parent = document.getElementById('main');
  fetch(urlNone, {
  headers: {
    "X-MICROCMS-API-KEY": "09fdf236-e540-414d-927a-70f425e43a3e",   // 個人のAPIキー
    "Content-Type": "application/json"
  }
  }).then(function (response) {
    return response.json();
  }).then(function (myjson) {
    GetParam(myjson);
    parseCategoryBlog(parent, myjson, 'なし');
    console.log(myjson);
  }).catch(function (error) {
    console.log(error);
  });
}


// ブログ記事数取得
function GetParam(myjson){
  totalCount = 0;
  DayCount = 0;
  ProgramCount = 0;
  NoneCount = 0;
  
  totalCount = myjson.totalCount;

  for (var i=0; i<totalCount; i++){
    if (myjson.contents[i].category == '日常')
      DayCount++;
    if (myjson.contents[i].category == 'プログラミング')
      ProgramCount++;
    if (myjson.contents[i].category == 'なし')
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


// ブログ描画関数
function parseCategoryBlog(parent, json, Size, category){
  for (var i=0; i < Size; i++){
    var obj = json.contents[i];

    if (category != json.contents[i].category)  continue;
 
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

 
// カテゴリ:すべて
function OnAllClick(){
  const parent = document.getElementById('main');
  parent.innerHTML = '';

  GetBlogData();
}


// カテゴリ:日常
function OnADayClick(){
  const parent = document.getElementById('main');
  parent.innerHTML = '';

  GetDayData();
}


// カテゴリ:プログラミング
function OnProgrammingClick(){
  const parent = document.getElementById('main');
  parent.innerHTML = '';

  GetProgramData();
}


// カテゴリ:なし
function OnNoneClick(){
  const parent = document.getElementById('main');
  parent.innerHTML = '';

  GetNoneData();
}