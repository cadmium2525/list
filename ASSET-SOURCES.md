# 画像と紹介文の出典

## 2026-11-09 どんぶりメーカー 追加

- `donburi-maker-cover.webp`: 元ゲームのCanvasで仕上げた「彩り海鮮丼」と「花畑丼」を並べた画像です。左は藍の唐草の器にマグロ・中トロ・サーモン・いくら・うに、右はさくらの器に厚焼き玉子の花びらと卵黄を盛り付けています。元の器と具材を使い、どちらも丼全体が見える構図です。
- 原画: `C:/Users/森本/Documents/sagyou/donburi-maker-production/edit/qa/cover-landscape.png`（1280 × 752）。配信用画像は960 × 564、WebP quality 86。ゲームの `renderFull` 出力を横に並べ、新規画像生成AIは使用していません。スマホのリスト表示では既存の `coverStyle: 'illustration'` で画像全体を表示します。
- 正式名・紹介文・タグは[公開ゲーム](https://cadmium2525.github.io/donburi_maker/)と[README](https://github.com/cadmium2525/donburi_maker/blob/18d4e6aa26ce3bcd9e04d1aafc966b1db267fe0a/README.md)、器・具材・加工・シェアの実装を確認して作成しました。参照main: `18d4e6aa26ce3bcd9e04d1aafc966b1db267fe0a`。ゲーム全体のLICENSEファイルや個別の画像表示クレジット指定は見当たりません。

## 2026-11-08 GEDDAN DRAW 追加

- `geddan-cover.webp`: GEDDAN DRAWの公式サンプルキャラクターと「グルグル」の線を、元の `buildDance`・`renderDance` で描画した静止画です。再生0.75秒の猫耳のキャラクター、伸びた手足、残像を収めています。
- 原画: `C:/Users/森本/Documents/sagyou/geddan-research/geddan-cover-original.png`（1020 × 600）。既存カードの縦横比に合わせ、描画用ステージの論理幅を900から1020へ調整しました。配信用画像は960 × 565、WebP quality 86。元のカメラと描画関数を使い、ステージ全体を出力しています。新規画像生成AIは使用していません。
- 描画条件は `geddan-research/cover-evidence.json` に記録しています。キャラクター全身がカード枠に収まり、スマホのリスト表示では既存の `coverStyle: 'illustration'` で画像全体を表示します。
- 正式名・紹介文・タグは[公開ゲーム](https://cadmium2525.github.io/geddan/)と[README](https://github.com/cadmium2525/geddan/blob/9ddc8245d98972f40632b14c35aed3628556a348/README.md)、ゲーム実装を確認して作成しました。参照main: `9ddc8245d98972f40632b14c35aed3628556a348`。ゲーム全体のLICENSEファイルや個別の画像表示クレジット指定は見当たりません。

## 2026-11-07 581万人100m走 追加

- `581run-cover.webp`: 581万人100m走の元ゲーム描画を使った通常レースの画面です。青い帽子とオレンジの服の主人公、前方の群衆、GOALを収めています。ゲームの標準入力データでシミュレーションを進め、HUDを非表示にした横画面の標準カメラ（FOV60°）で描画しました。
- 原画: `C:/Users/森本/Documents/sagyou/581run-production/edit/qa/cover-wide-standard.png`（1280 × 800）。配信用画像は960 × 600、WebP quality 86。モデル・走路・群衆は元ゲームの描画で、新規画像生成AIは使用していません。スマホのリスト表示では既存の `coverStyle: 'illustration'` で画像全体を収めます。
- 正式名・紹介文・5,812,375人・最後尾スタート・回避とダッシュは[公開ゲーム](https://cadmium2525.github.io/581run/)と[README](https://github.com/cadmium2525/581run/blob/5e51663b9074272276ea1f20cfddb79a26c9c149/README.md)、ゲーム実装を確認して作成しました。参照main: `5e51663b9074272276ea1f20cfddb79a26c9c149`。人数は作品内の架空の設定です。
- ゲーム全体のLICENSEファイルは見当たりません。同梱Three.jsのMIT通知をゲーム全体のライセンスとは解釈していません。

## 2026-11-04 相撲クラブ 追加

- `crab-sumo-cover.webp`: 相撲クラブの実ゲーム描画から収録した、切り株の土俵で対峙するシオマネキとサワガニ「カニオ」の画面です。通常操作で捕獲したシオマネキを初戦に出し、HUDを非表示にして全身・ハサミ・白い仕切り線が見えるよう撮影用カメラを調整しました。個体・モデル・能力・勝敗は変更していません。
- 原画: `C:/Users/森本/Documents/sagyou/crab-sumo-production/edit/qa/cover-landscape.png`（1280 × 800）。配信用画像は960 × 600、WebP quality 86。カニ・切り株・草・岩のモデルとテクスチャは元のプログラム生成で、新規画像生成AIは使用していません。撮影状態は同じフォルダーの `cover-evidence.json`、通常捕獲した個体は `crab-sumo-production/earned-save.json` に記録しています。
- スマホのリスト表示では既存の `coverStyle: 'illustration'` で画像全体を収めます。
- 正式名・紹介文・14種・遊び方・タグは[公開ゲーム](https://cadmium2525.github.io/Crab-sumo/)と[README](https://github.com/cadmium2525/Crab-sumo/blob/83cc4964df9fa7056baad8de6636355f6635f6d5/README.md)、ゲーム実装を確認して作成しました。参照main: `83cc4964df9fa7056baad8de6636355f6635f6d5`。紹介キャッチ「つかまえて、育てて、はっけよい。」は当サイト用の編集文です。ゲーム本体のリポジトリは変更していません。
- ゲーム全体のLICENSEファイルや個別の画像・PV表示クレジット指定は見当たりません。同梱Three.js r170のMIT通知をゲーム全体のライセンスとは解釈していません。

## 2026-11-04 SAND FLAG BATTLE 追加

- `seesaw-sky-cover.webp`: SAND FLAG BATTLEの実ゲーム描画から収録した、頂上の赤い旗・砂山・黄色いショベルカー・赤いバケツの画面です。通常のひとり練習の開始状態を使い、HUDを非表示にして全体が収まるよう撮影用カメラを調整しました。砂・旗・道具のモデルやゲームの物理・判定は変更していません。
- 原画: `C:/Users/森本/Documents/sagyou/seesaw-sky-production/edit/qa/cover-landscape.png`（1280 × 800）。配信用画像は960 × 600、WebP quality 86。モデル・砂のテクスチャ・背景は元のプログラム生成で、新規画像生成AIは使用していません。撮影状態は同じフォルダーの `cover-evidence.json` に記録しています。
- スマホのリスト表示では既存の `coverStyle: 'illustration'` で画像全体を収めます。
- 正式名・紹介文・4つの道具・対戦モード・タグは[公開ゲーム](https://cadmium2525.github.io/seesaw-sky/)と[README](https://github.com/cadmium2525/seesaw-sky/blob/251d9daa9ad78c67e57102f6f77cd9967e9e01c7/README.md)、ゲーム実装を確認して作成しました。参照main: `251d9daa9ad78c67e57102f6f77cd9967e9e01c7`。出典: © 2026 cadmium2525、[MIT License](https://github.com/cadmium2525/seesaw-sky/blob/251d9daa9ad78c67e57102f6f77cd9967e9e01c7/LICENSE)。ゲーム本体のリポジトリは変更していません。

## 2026-10-27 WAIT!! GOMI TRUCK!! 追加

- `garbage-truck-cover.webp`: 作者のゲーム本体をローカルの撮影環境で動かした、Three.jsによる実ゲーム描画。青い収集車・袋を持つ主人公・赤いスクーターを回収地点で撮影しています。撮影用カメラを道路側へ配置し、HUDを外しました。画像生成AIは使用していません。
- 原画: `C:/Users/森本/Documents/sagyou/garbage-truck-production/edit/qa/cover-original.png`（1280 × 720）。配信用画像は960 × 540、WebP quality 86、34,454 bytes。
- スマホのリスト表示では既存の `coverStyle: 'illustration'` により画像全体を収め、トラックや人物の見切れを防ぎます。
- 正式名・別称「爆速ゴミ収集」・5地点・スクーター/投げ込み/近道/ジャンプの紹介は、[公開ゲーム](https://cadmium2525.github.io/garbage-truck/)と[README](https://github.com/cadmium2525/garbage-truck/blob/main/README.md)、ゲーム実装を確認して作成しました。
- ゲームの参照時main: `fee7da0ef6906c2b038c2853d2e10054eb6f860d`。ゲーム本体のリポジトリは変更していません。

## 2026-11-03 BOTANICAL ODDITIES 追加

- `plant-cover.webp`: BOTANICAL ODDITIESの実ゲーム描画から収録した、ガジュマルのシード63（`gajumaru:63`）「すらりべえ」です。ユーザー指定の種類・シードを使い、足組みの根・葉先・鉢全体が見えるよう撮影しました。個体IDはシードの36進表記 `000001R`、特徴は「足組み・気根の森・ミニマル」、SSR「幻の個体」です。
- 原画: `C:/Users/森本/Documents/sagyou/plant-production/edit/qa/cover-landscape.png`（1280 × 800）。配信用画像は960 × 600、WebP quality 86。HUDを非表示にし、撮影用カメラを少し寄せています。個体の遺伝子・形状・レア度は変更していません。植物・鉢・背景は元のプログラム生成で、新規画像生成AIは使用していません。
- 個体の記録: `plant-production/edit/qa/cover-evidence.json`、Chrome撮影環境で得た骨格JSONのSHA256 `66a3acc2d9a1691233f8d5957cf1fbdf8b9cbea3691124edff803a2ef92561cc`。正規の再現URLは [ガジュマル63](https://cadmium2525.github.io/plant/?debug=gajumaru:63) です。スマホのリスト表示では既存の `coverStyle: 'illustration'` で画像全体を収めます。
- 作品名・紹介文・タグは[公開ゲーム](https://cadmium2525.github.io/plant/)と[README](https://github.com/cadmium2525/plant/blob/64218b71b9ae6d956d2ec7cf5ca7faec3179fb80/README.md)、育成・図鑑・スタジオ実装を確認して作成しました。参照main: `64218b71b9ae6d956d2ec7cf5ca7faec3179fb80`。ゲーム本体のリポジトリは変更していません。
- ゲーム全体のLICENSEファイルや個別の画像・PV表示クレジット指定は見当たりません。Three.jsのMIT通知をゲーム全体のライセンスと解釈していません。

## 2026-11-01 SEESAW 追加

- `seesaw-jump-cover.webp`: [公式OGPイラスト](https://github.com/cadmium2525/seesaw_jump/blob/f2463176af7b1f52814333deaa62be69cbdc1c9a/public/social.svg)。一つ目のカニ脚シーソー、空中の人、太陽と丘、作品名を描いた既存のSVG画像です。実プレイのスクリーンショットやAI生成画像ではありません。
- 原本: `C:/Users/森本/Documents/sagyou/seesaw-jump-research/official-social.svg`（SHA256 `2ba75a046721a75c06608fbaae4779700dd48f242adf883038495e5666aada0b`）。1200 × 630のPNGへ描画した後、960 × 504、WebP quality 86へ変換しました。新たな画像生成は行っていません。
- スマホのリスト表示では既存の `coverStyle: 'illustration'` で画像全体を収めます。
- 正式名・紹介文・タグは[公開ゲーム](https://cadmium2525.github.io/seesaw_jump/)と[README](https://github.com/cadmium2525/seesaw_jump/blob/f2463176af7b1f52814333deaa62be69cbdc1c9a/README.md)、入力・キャッチ判定の実装を確認して作成しました。参照main: `f2463176af7b1f52814333deaa62be69cbdc1c9a`。出典: © 2026 SEESAW contributors、[MIT License](https://github.com/cadmium2525/seesaw_jump/blob/f2463176af7b1f52814333deaa62be69cbdc1c9a/LICENSE)。ゲーム本体のリポジトリは変更していません。

## 2026-10-31 ウルトラ赤白帽 追加

- `akashiro-cover.webp`: ウルトラ赤白帽の実ゲーム描画から収録した、教室の友だちと赤白帽の画面です。帽子・小学生・教室は元のThree.js手続きメッシュで、画像生成AIは使用していません。
- 原画: `C:/Users/森本/Documents/sagyou/akashiro-production/edit/qa/cover-landscape.png`（1280 × 800）。配信用画像は960 × 600、WebP quality 86。通常のかんたんモードのスワイプ操作で100点S評価となった光線ポーズを使い、HUDを非表示にして帽子の先と全身が入るよう撮影用カメラを少し引きました。ゲーム本体の形状パラメーター・採点・結果を直接変更していません。
- スマホのリスト表示では既存の `coverStyle: 'illustration'` で画像全体を収めます。
- 作品名・紹介文・4段階の操作・タグは[公開ゲーム](https://cadmium2525.github.io/akashiro/)と[README](https://github.com/cadmium2525/akashiro/blob/ee111fc0f633e597440d376ba135116d022a342e/README.md)、入力・採点実装を確認して作成しました。参照main: `ee111fc0f633e597440d376ba135116d022a342e`。ゲーム本体のリポジトリは変更していません。
- ゲーム全体のLICENSEファイルや個別の画像・PV表示クレジット指定は見当たりません。同梱Three.jsのMIT通知をゲーム全体のライセンスと解釈していません。

## 2026-10-30 10,000 HORSE RACE 追加

- `horse10-000-cover.webp`: [公式OGPイラスト](https://github.com/cadmium2525/horse10-000/blob/84496203350bc141637a0b3de0847e7ac450bbee/public/assets/ogp.png)。ピンクの騎手と馬、色とりどりの馬群、作品名を描いた画像です。`src/share/CardRenderer.ts` の `renderOgp()` がCanvas 2Dで生成しており、実プレイのスクリーンショットやAI生成画像ではありません。
- 原画: `C:/Users/森本/Documents/sagyou/horse10-000-research/official-ogp.png`（1200 × 630、SHA256 `cc7b31de5d0884b418e7311f90ccc0c5944ff355a8b0dd6f26c60e9c0988b34c`）。配信用画像は960 × 504、WebP quality 86。新たな画像生成は行っていません。
- スマホのリスト表示では既存の `coverStyle: 'illustration'` で画像全体を収めます。
- 正式名・紹介文・横持ち推奨・タグは[公開ゲーム](https://cadmium2525.github.io/horse10-000/)と[README](https://github.com/cadmium2525/horse10-000/blob/84496203350bc141637a0b3de0847e7ac450bbee/README.md)、操作・レース実装を確認して作成しました。参照main: `84496203350bc141637a0b3de0847e7ac450bbee`。出典: © 2026 cadmium2525、[MIT License](https://github.com/cadmium2525/horse10-000/blob/84496203350bc141637a0b3de0847e7ac450bbee/LICENSE)。ゲーム本体のリポジトリは変更していません。

## 2026-10-30 ニラ飛ばし 追加

- `nira-cover.webp`: ニラ飛ばしの実ゲーム描画から収録した、木のトレイに個性の違う8本のニラが並ぶ選択画面です。通常操作で2本を選んだ状態を使い、HUDを非表示にして撮影しました。ニラ・トレイ・選択の印は元のゲーム描画です。
- 原画: `C:/Users/森本/Documents/sagyou/nira-production/edit/qa/cover-landscape.png`（1280 × 800）。配信用画像は960 × 600、WebP quality 86。カバー用にカメラをトレイへ寄せ、8本を大きく見せています。ゲーム本体の物理・飛距離・結果は変更していません。新たな画像生成AIは使用していません。
- スマホのリスト表示では既存の `coverStyle: 'illustration'` で画像全体を収めます。
- 作品名・紹介文・タグは[公開ゲーム](https://cadmium2525.github.io/nira/)と[README](https://github.com/cadmium2525/nira/blob/main/README.md)、ゲーム実装を確認して作成しました。参照時main: `c84e7aec7c8c515789bee35491eb93c95412d4a7`。ゲーム本体のリポジトリは変更していません。今回の選択画面には外部画像や個別の表示クレジット指定は見当たりません。

## 2026-10-29 PANCAKE AXEL 追加

- `pancake-cover.webp`: PANCAKE AXELの実ゲーム描画から収録した、黄金色のパンケーキがフライパンの上を舞うキッチンの画面です。通常の代替タッチ操作で焼き、トスした状態を使っています。カバー撮影時はHUDを非表示にし、パンケーキとフライパンの取っ手まで全体が収まるようカメラを少し引きました。ゲームの物理・焼成・得点は変更していません。
- 原画: `C:/Users/森本/Documents/sagyou/pancake-production/edit/qa/cover-landscape.png`（1280 × 800）。配信用画像は960 × 600、WebP quality 86、13,552 bytes。
- モデル・焼き色テクスチャは元ゲームのプログラムで生成されたものです。新たな画像生成AIは使用していません。スマホのリスト表示では既存の `coverStyle: 'illustration'` で全体を収めます。
- 作品名・紹介文・タグは[公開ゲーム](https://cadmium2525.github.io/pancake/)と[README](https://github.com/cadmium2525/pancake/blob/main/README.md)、ゲーム実装を確認して作成しました。参照時main: `344c51da87d5e3008b3cc9c22453e9317665dfa0`。外部アセットや個別の表示クレジット指定は見当たりません。ゲーム本体のリポジトリは変更していません。

## 2026-10-28 追加5ゲーム

| 配信用ファイル | 画像の種類・出典 | サイズ・変換 |
|---|---|---|
| `ishikoro-cover.webp` | [いしころ公式アプリアイコン](https://github.com/cadmium2525/ishikoro/blob/e7e3f57c90a4758858df0053226daf1e9341ba15/public/icon-512.png)。夕色の空と道に置かれた低ポリゴンの石。 | 512 × 512、WebP quality 86、2,220 bytes |
| `command-cover.webp` | [SECRET START公式タイトル背景](https://github.com/cadmium2525/command/blob/f184b3ac4de297d4f5ca9560a0774d629c4a5a30/public/assets/title-world.webp)。深緑の夜空・城・浮島の扉。元作品用に生成された既存画像で、[素材台帳](https://github.com/cadmium2525/command/blob/f184b3ac4de297d4f5ca9560a0774d629c4a5a30/docs/assets-manifest.md)の区分はOpenAI-outputです。CC0素材とは扱いません。 | 960 × 600、元のWebPを変換せずコピー、56,226 bytes |
| `baby-race-cover.webp` | ガラガラ！ハイハイレースの作品内容に基づく新規生成イメージ（実画面ではありません）。4色のプレイマット、4人の赤ちゃんとガラガラ。 | 960 × 640、WebP quality 84、37,766 bytes |
| `antlion-cover.webp` | アリジゴク巨大化ゲームの作品内容に基づく新規生成イメージ（実画面ではありません）。すり鉢状の巣穴にいる幼虫、砂粒、小さなアリ。 | 960 × 640、WebP quality 84、97,944 bytes |
| `hokorichan-cover.webp` | [ほこりちゃん公式アプリアイコン](https://github.com/cadmium2525/hokorichan/blob/75c7758f33d2f9cfbbceca9a2c7a011db37e5c27/public/icons/icon-512.png)。暖かい部屋の白い綿毛状キャラクターと掃除機を描いたピクセルアート。 | 512 × 512、WebP quality 86、37,206 bytes |

- 既存画像3点は公式リポジトリの画像を使用し、新たな画像生成は行っていません。いしころ・ほこりちゃんに外部作者名や別の表示クレジット指定は見当たらず、出典を上記に記録しています。ライセンス区分を推定していません。
- 新規生成2点はbuilt-in `image_gen`で各1回生成し、CLI/API fallbackは使用していません。原画・完全プロンプト・保存先・生成結果は `C:/Users/森本/Documents/sagyou/gallery-additions-2026-10-28/generated/` と [IMAGE-PROMPT.md](IMAGE-PROMPT.md) に記録しました。
- カードではいしころの石が中央に収まるよう `position: '50% 78%'` を指定。ほこりちゃんは公式アイコンの全体を収め、その他の横長イラストもリスト表示では全体を収めます。
- 紹介文・正式名・タグは、各公開ページとREADME・操作実装を照合して作成しました。参照mainは、いしころ `e7e3f57c90a4758858df0053226daf1e9341ba15`、SECRET START `f184b3ac4de297d4f5ca9560a0774d629c4a5a30`、ガラガラ！ハイハイレース `eecddb5a31d23ed9e07b4a0b0632c8bd33a68f31`、アリジゴク巨大化ゲーム `8f406935df09437b28c89da9dca83fc18d63b8ce`、ほこりちゃん `75c7758f33d2f9cfbbceca9a2c7a011db37e5c27`。ゲーム本体のリポジトリは変更していません。

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
