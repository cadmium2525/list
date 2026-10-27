# 画像と紹介文の出典

## 2026-10-27 WAIT!! GOMI TRUCK!! 追加

- `garbage-truck-cover.webp`: 作者のゲーム本体をローカルの撮影環境で動かした、Three.jsによる実ゲーム描画。青い収集車・袋を持つ主人公・赤いスクーターを回収地点で撮影しています。撮影用カメラを道路側へ配置し、HUDを外しました。画像生成AIは使用していません。
- 原画: `C:/Users/森本/Documents/sagyou/garbage-truck-production/edit/qa/cover-original.png`（1280 × 720）。配信用画像は960 × 540、WebP quality 86、34,454 bytes。
- スマホのリスト表示では既存の `coverStyle: 'illustration'` により画像全体を収め、トラックや人物の見切れを防ぎます。
- 正式名・別称「爆速ゴミ収集」・5地点・スクーター/投げ込み/近道/ジャンプの紹介は、[公開ゲーム](https://cadmium2525.github.io/garbage-truck/)と[README](https://github.com/cadmium2525/garbage-truck/blob/main/README.md)、ゲーム実装を確認して作成しました。
- ゲームの参照時main: `fee7da0ef6906c2b038c2853d2e10054eb6f860d`。ゲーム本体のリポジトリは変更していません。

## 2026-10-28 グニャマスト 追加

- `climbing-the-mast-cover.webp`: グニャマストの実ページから収録した、竹に手足をかけるかぐや姫と右側の月が見える画面です。通常操作で約4.8mへ登った姿勢を使い、HUDと操作用の丸を非表示にして撮影しました。モデル・竹・月・背景は元の実ゲーム描画です。
- 原画: `C:/Users/森本/Documents/sagyou/climbing-the-mast-production/edit/qa/cover-landscape.png`（1280 × 800）。配信用画像は960 × 600、WebP quality 86。新たな画像生成は行っていません。背景には、ゲームに同梱されている本作専用の既存ImageGen生成画像が含まれます（[背景の記録](https://github.com/cadmium2525/climbing-the-mast/blob/main/public/assets/ASSETS.md)）。
- スマホのリスト表示では既存の `coverStyle: 'illustration'` により画像全体を収め、かぐや姫や月の見切れを防ぎます。
- 作品名・紹介文・タグは[公開ゲーム](https://cadmium2525.github.io/climbing-the-mast/)と[README](https://github.com/cadmium2525/climbing-the-mast/blob/main/README.md)、ゲーム実装を確認して作成しました。参照時main: `ea032ceb6acf1e154a619d33cfeb75a1e6497080`。同梱のThree.js MIT通知以外に、画像・PVの表示クレジット指定はありません。ゲーム本体のリポジトリは変更していません。

## 2026-10-27 千手お手玉 追加

- `senju-otedama-cover.webp`: 千手お手玉の実ゲーム描画から収録した、7個の布玉と複数の腕でお手玉をする観音の画面です。HUDを除いた収録素材を使い、余白を詰めて主役・腕・玉を中央に収めています。画像生成AIは使用していません。
- 原画: `C:/Users/森本/Documents/sagyou/senju-otedama-production/edit/qa/cover-original.png`（840 × 1520）。上380pxから840 × 1000を切り出し、806 × 960、WebP quality 86に変換しました。
- 縦長画像は既存の `coverStyle: 'portrait'` で全体を収め、スマホのグリッド・リスト表示で顔・腕・玉の見切れを防ぎます。
- 作品名・紹介文・タグは[公開ゲーム](https://cadmium2525.github.io/senju-otedama/)と[README](https://github.com/cadmium2525/senju-otedama/blob/main/README.md)、ゲーム実装を確認して作成しました。ゲームの参照時main: `f5db7b62557d0ed2d78f7305f02c2dc2f6abd73a`。ゲーム本体のリポジトリは変更していません。

## 2026-10-21 BOUNCE PARADE 追加

- `bounce-parade-cover.webp`: BOUNCE PARADE のゲーム内容から作成した生成イメージイラスト。白黒サッカーボールを主役に、虹色ガラスビー玉・紫の3穴ボウリング球・オレンジ色の火球が、空と緑の丘の上を跳ねる構図です。
- 生成モード: built-in `image_gen`。新規生成1回と小球の配置を中央へ寄せる編集1回。CLI / API fallback なし。参照は公開ゲームの既存アイコンと草原背景の画風確認のみ。
- 保存マスターPNG: `C:/Users/森本/Documents/sagyou/bounceparade-production/deliverables/icons/bounce-parade-icon-1024.png`
- 配信用保存先: `dist/assets/bounce-parade-cover.webp`（960 × 960、WebP quality 83、80,164 bytes）。
- 完全な初回生成・最終編集プロンプト、元の生成パス、サイズ別PNGとmaskable確認結果: [IMAGE-PROMPT.md の BOUNCE PARADE 記録](IMAGE-PROMPT.md#2026-10-21-bounce-parade-ホームアイコン兼ギャラリーカバー)。
- 紹介データは公開ゲームとソースの調査結果に基づきます。ゲームURL `https://cadmium2525.github.io/BOUNCEPARADE/`、GitHub `https://github.com/cadmium2525/BOUNCEPARADE` の大文字表記を維持しています。

紹介文と作品名は、ユーザーが提示した各公開ゲーム・ツールのHTML title・description・READMEを確認して作成しました。

| ファイル | 出典 |
|---|---|
| mic-cover.webp | https://cadmium2525.github.io/-mic/images/branding/bg.png |
| rakugaction-cover.webp | https://cadmium2525.github.io/rakugaction/title-bg.webp |
| punching-cover.webp | https://cadmium2525.github.io/punching/assets/characters/character_01.webp |
| tomoshibi-cover.webp | https://cadmium2525.github.io/tomoshibi/assets/story/title.webp |
| aurapuzzle-cover.webp | https://cadmium2525.github.io/aurapuzzle_-adventure/assets/ui/title.webp |
| monster-collection-cover.webp | https://cadmium2525.github.io/monster_collection/assets/images/title/title-screen.webp |

ラクガキ大乱闘には既存ラスター画像がなかったため、sumaraku-cover.webpは作品内容をもとにしたイメージイラストです。
atelier-hero.webpはアトリエの創作活動を表現したオリジナルイラストです。
生成の詳細はIMAGE-PROMPT.mdを参照してください。

ガッツファクトリーの49連勝とモンスター交換の説明は https://cadmium2525.github.io/-mic/js/kinnejiki.js のゲーム説明も参照しています。

## 追加5作品

- sumamama-cover.webp: 対戦するファイターを描いた、作品内容をもとにした生成イメージイラスト。
- giftntool-cover.webp: ドラゴン・星・系譜のメダリオンで相性探索を表した生成イメージイラスト。
- endless-monsters-cover.webp: https://cadmium2525.github.io/endless_monsters/ の公開初期画面。所持資産0の状態を撮影。
- infographic-cover.webp: https://cadmium2525.github.io/infographic/ の公開初期画面。空のキャンバスとレイヤー0の状態を撮影。
- c-tools-cover-v2.webp: 手帳・電卓・虫眼鏡で育成の記録・計算・分析を表した生成イメージイラスト。

元ゲームのHELP画面画像はCツール自身の画面ではないため、カバーには使用していません。
スマママ・ギフトン・Cツールのカバーは、2026-10-11にユーザーの依頼で公式アイコン・初期画面からイメージイラストへ差し替えました。生成モードと最終プロンプトはIMAGE-PROMPT.mdに記録しています。
PNG/JPEGを配信用WebPに変換し、トップは横1100px、その他は最大横960pxに縮小しました。


## 2026-10-21 追加5作品

| ファイル | 出典 |
|---|---|
| souiuimi-cover.webp | https://cadmium2525.github.io/souiuimi/icons/icon-original.png （公開済みの公式イラスト） |
| kanji-tower-cover.webp | 漢字の形そのものを積むゲーム内容から作成した生成イメージイラスト |
| leaf-stream-cover.webp | 葉を切って用水路に流すゲーム内容から作成した生成イメージイラスト |
| guchitter-cover.webp | https://cadmium2525.github.io/guchitter/icon-512.png （公開済みの公式アプリアイコン） |
| mato-cover.webp | 小便器内の的を動かすゲーム内容から作成した生成イメージイラスト。人物・体液・汚れは描写していません |

作品名・紹介文・タグは各公開ページと対応するGitHubリポジトリのREADME・ルーター・画面コードを確認して作成しました。葉っぱ流しは `/Leaf-stream/race` を維持しています（404.htmlにアプリ本体を配信するSPA構成）。愚痴ったーには利用者の日記や投稿画面を使用していません。3点の生成モード・最終プロンプト・保存先はIMAGE-PROMPT.mdに記録しています。
