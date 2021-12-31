### BlogTPについて
BlogTPは個人用のブログテーマです。
自分の学習用日記を目指して作成しており、
ブログ機能はもちろん、ポモドーロタイマー等を盛り込んでいます。

### BlogTPの構造
BlogTPは、HTML/CSS/JavascriptとBootStrap5を使用しています。
ブログコンテンツの管理はmicroCMSの使用を想定しています。
microCMSのAPIからブログデータを取得し表示します。

### エンドポイント
エンドポイント : http://○○.microcms.io/api/v1/blog
適宜変更してご使用ください。

### APIスキーマについて
APIスキーマについては現在時点では以下の通りになります。

|フィールドID|表示名|種類|
|:---|:---|:---|
|title|タイトル|テキストフィールド|
|category|カテゴリ|テキストフィールド|
|contents|コンテンツ|リッチエディタ|
|photos|画像|画像|

### デモページ
デモページは下記のとおりです。
https://coffee522jelly-development.github.io/BlogTP/
