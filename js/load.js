// ローディング関数
function loaded() {
    document.getElementById("loading").classList.remove("active");
}

// ロードイベント
window.addEventListener("load", function() {
    setTimeout(loaded, 1000);
})

setTimeout(loaded, 5000);