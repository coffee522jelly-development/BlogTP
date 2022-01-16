'use strict'

// 現在時刻取得
function getClock(){
  const nowTime = new Date();
  const nowHour = addZero(parseInt(nowTime.getHours()));
  const nowMin  = addZero(parseInt(nowTime.getMinutes()));
  const msg = nowHour + ":" + nowMin;

  document.getElementById("Clock").innerHTML = msg;
}

// 1桁に0を付与
function addZero(Item){
  if ((Item >= 0) && (9 >= Item))
      return Item = '0' + Item;
  else
      return Item;
}