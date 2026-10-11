# CADMIUM — あそびのアトリエ

公開URL: https://cadmium2525.github.io/list/

cadmium2525のWebゲーム・ツールの作品ギャラリーです。スマートフォンを中心に、タグ・検索・人気順・五十音順ソート・カード/一覧表示で探せます。作品とGitHubは新しいタブで開きます。

## 開発・公開

mainブランチで作業します。Node.js 22以上で、外部npm依存なしにビルドできます。

```sh
node scripts/build-pwa.mjs
node --test tests/*.test.mjs
node preview.mjs
```

プレビュー: http://127.0.0.1:4397/list/

mainへのpushで `.github/workflows/pages.yml` が検証・ビルドし、`dist/` をGitHub Pagesにデプロイします。GitHub Pagesの公開元は **GitHub Actions** です。

## 作品の追加

`dist/projects.js` に追加します。`kind` は `game` または `tool`（省略するとgame）、`order` は掲載順、`reading` はソート用の読みがなです。画像は `dist/assets/` に置いてください。作品数・種類・タグの件数は自動更新します。

`dist/index.html` のOG紹介とJavaScript無効時のリンク一覧も更新してください。公開時にビルドが全画像を見つけてオフライン対象に加え、ファイル内容からキャッシュのバージョンを自動生成します。

## PWA

- Android: Chromeの「ホーム画面に追加」またはアプリをインストール。
- iPhone/iPad: Safariの共有メニューから「ホーム画面に追加」。
- 192/512px PNG、512px maskable、180px Apple Touchアイコンを同梱。
- 初回オンライン表示後に一覧と画像を保存。オフラインでも検索・ソート・絞り込みを利用できます。
- リンク先の別作品はこのPWAの保存範囲外です。各作品を開くには通信が必要です。
- Service Workerの範囲は `/list/`。同じGitHub Pagesアカウントの他のゲームに干渉しません。
- 新しい版は、既存のアプリ/タブを閉じて再度開くと有効になります。

`src/sw.template.js` が元コード、`dist/sw.js` はビルドで生成されます。

## 人気順

この一覧の画像・作品名・「遊んでみる／使ってみる」・「おまかせで開く」から作品を開いた回数を、全訪問者で共有して多い順に表示します。GitHubリンクは集計しません。ゲーム側のページ閲覧数やプレイ時間ではなく、集計開始後の一覧からのオープン数です。同数の場合は掲載順です。

Firebaseの匿名認証とFirestoreの `galleryPopularity/v1` 専用パスを使います。公開設定は `dist/popularity-config.js`、集計処理は `dist/popularity.js` です。管理者鍵はブラウザへ渡しません。既存ゲームの保存データは使いません。

同じブラウザは1作品につき日本時間の1日1回までです。サーバー側でも、回数を1増やす操作と当日の匿名IDの記録を原子的に検証します。公開されるのは作品ごとの合計のみで、匿名IDの記録は本人だけが取得できます。ブラウザのデータ削除や別のブラウザによる重複まで完全に防ぐものではありません。

オフラインや取得失敗時は、取得済みの共有回数があれば保存した日時を添えて表示します。未取得の場合は掲載順へ戻し、回数は未取得と表示します。通信に失敗したクリックを端末だけで加算せず、作品の新規タブ表示も集計の完了を待ちません。

## 画像

既存ゲーム画像・公開初期画面・作品内容を表す生成イラストを使用しています。生成画像のプロンプトは `IMAGE-PROMPT.md`、出典は `ASSET-SOURCES.md` を参照してください。配信用画像をWebPに軽量化しています。

`scripts/optimise-assets.cjs` は制作時の任意ツール（sharpが必要）です。GitHub Pagesのビルドや日常の作品追加には不要です。
