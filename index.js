const url = 'https://think-free.microcms.io/api/v1/news/_Ej9SD_IN';

//操作したいHTML領域を取得
const news = document.getElementById('news');
const main = document.getElementById('main');

//APIからJSONデータを取得する
fetch(url, {
  method: "GET",
  withCredentials: true,
  headers: {
    "X-MICROCMS-API-KEY :": "09fdf236-e540-414d-927a-70f425e43a3e",
    "Content-Type": "application/json"
  }
})
  .then(resp => resp.json())
  .then(function(data) {
    console.log(data);
  })
  .catch(function(error) {
    console.log(error);
  });
//JSONデータを引数に受け取ってDOM操作を行う関数を作成
function GetMainContents(jsonObj){
 const data = jsonObj.results[0]
 news.textContent = data.news;
 main.textContent = data.main;
}