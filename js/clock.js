'use strict'

// 現在時刻取得
function GetClock(){
  let nowTime = new Date(); //  現在日時を得る
  let nowHour = addZero(parseInt(nowTime.getHours())); // 時を抜き出す
  let nowMin  = addZero(parseInt(nowTime.getMinutes())); // 分を抜き出す
  let msg = nowHour + ":" + nowMin;

  document.getElementById("clock").innerHTML = msg;
}

// 1桁に0を付与
function addZero(Item){
    if ((Item >= 0) && (9 >= Item))
        return Item = '0' + Item;
    else
        return Item;
}