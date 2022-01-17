'use strict'

// グローバル変数
let settingTime = 1500;
let timer;

//////////////////////////////////////////////////////////////////////////////////
// 処理

// カウントダウン
function countDown() {
    settingTime--;
    document.getElementById("TimerDisplay").innerText = calcMinSec(settingTime);

    if (settingTime == 0){
        soundBeep("sine", 0.1);
        resetTimer();
    }   
}

// 通知音関数
function soundBeep(type, sec) {
    const ctx = new AudioContext();
	const osc = ctx.createOscillator();
	osc.type = type;
	osc.connect(ctx.destination);
	osc.start();
	osc.stop(sec);
}

//////////////////////////////////////////////////////////////////////////////////
// イベント

// ロード
window.addEventListener('DOMContentLoaded', () => {
    InitTimerEvent();
});
  
// イベント登録
function InitTimerEvent(){
    let start = document.getElementById('start');
    start.addEventListener('click', startTimer);
    
    let stop = document.getElementById('stop');
    stop.addEventListener('click', stopTimer);
    
    let reset = document.getElementById('reset');
    reset.addEventListener('click', resetTimer);
    
    let min5 = document.getElementById('5min');
    min5.addEventListener('click', set5min);
    
    let min15 = document.getElementById('15min');
    min15.addEventListener('click', set15min);
}

// スタート
function startTimer() {
    document.getElementById("TimerDisplay").innerText = calcMinSec(settingTime);
    timer = setInterval(countDown, 1000);   // 1秒に1度実行
    soundBeep("sine", 0.1);
}

// ストップ
function stopTimer() {
    clearInterval(timer);
}

// リセット
function resetTimer() {
    clearInterval(timer);
    settingTime = 1500;
    document.getElementById("TimerDisplay").innerText = calcMinSec(settingTime);
}

// 5分セット
function set5min() {
    settingTime = 300;
    document.getElementById("TimerDisplay").innerText = calcMinSec(settingTime);
    clearInterval(timer);
}

// 15分セット
function set15min() {
    settingTime = 900;
    document.getElementById("TimerDisplay").innerText = calcMinSec(settingTime);
    clearInterval(timer);
}

//////////////////////////////////////////////////////////////////////////////////
// 表示・フォーマッタ

// 分秒計算
function calcMinSec(settingTime) {
    const min = parseInt(settingTime / 60);
    const sec = addZero(parseInt(settingTime % 60));

    return min + ":" + sec;
}