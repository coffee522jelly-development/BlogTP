### BlogTPについて
html,javascript,cssのみで構成された個人ブログ用のテーマ開発です。(現在は自分用として開発中)
バックエンドはmicroCMSの使用を想定しています。
ページロード時にmicroCMSにGETリクエストを送信し、受信したjsonデータをDOMに展開していくイメージです。

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
