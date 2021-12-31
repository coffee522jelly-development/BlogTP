var settingTime = 1500;
var timer;

// X分X秒
function calcMinSec(settingTime) {
    var min = parseInt(settingTime / 60);
    var sec = parseInt(settingTime % 60);

    // 1桁秒数には0をつける
    if ((sec >= 0) && (9 >= sec)){
        sec = '0' + sec;
    }
    return min + ":" + sec;
}

// カウントダウン関数
function countDown() {
    settingTime--;
    document.getElementById("TimerDisplay").innerText = calcMinSec(settingTime);

    if (settingTime == 0){
        sound("sine", 0.1);
        Reset();
    }   
}

// スタート
function Start() {
    document.getElementById("TimerDisplay").innerText = calcMinSec(settingTime);
    timer = setInterval(countDown, 1000);   // 1秒に1度実行
    sound("sine", 0.1);
}

// ストップ
function Stop() {
    clearInterval(timer);
}

// リセット
function Reset() {
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

// 通知音関数
function sound(type, sec) {
	const ctx = new AudioContext();
	const osc = ctx.createOscillator();
	osc.type = type;
	osc.connect(ctx.destination);
	osc.start();
	osc.stop(sec);
}