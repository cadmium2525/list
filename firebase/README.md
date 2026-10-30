# 人気順の共有カウンター

集計先は既存 Firebase プロジェクト `rakugakisuma` の `(default)` Firestore です。既存の `/characters` と `/characters/{id}/reports` のルールは変更せず、`gallery-popularity.rules.inc` を `/databases/{database}/documents` の内側に追加しました。

| パス | 内容 | 権限 |
| --- | --- | --- |
| `galleryPopularity/v1/projects/{slug}` | `count`（整数）、`updatedAt`（サーバー時刻） | 合計は公開。増分1のみ、当日の本人の記録と同時に更新 |
| `galleryPopularity/v1/receipts/{day}/opens/{slug}_{uid}` | `slug`、匿名認証の `uid`、`openedAt`（サーバー時刻） | 本人のみ単件取得可。新規作成のみ、一覧・更新・削除は不可 |

`day` は日本時間の暦日を示す整数文字列です。サーバー時刻を9時間ずらして日付を取り、ミリ秒で表します。二つの文書は同じ commit で書き、`getAfter` で相互に検証します。単独での加算、合計の上書き・減算、同一匿名IDの同日同作品への再加算は拒否します。訪問者の名前・メール・ゲームの保存内容は送信しません。

作品を追加するときは `dist/projects.js` と、この追加ルールの `galleryProject`・`galleryOwnReceipt` にslugを追加します。既存ゲーム側のルールを再公開する場合も、ギャラリーの追加部分を含めてください。この断片単独で全ルールを置き換えないでください。

公開前に、Firebase公式 Rules API でコンパイルし、現行ルールのSHA256が調査時と一致することと、既存部分が完全に保持されることを確認しました。実通信でも、別の匿名ユーザーが同じ合計を読み、1→2へ加算できること、重複・不正書き換え・他人の記録の取得・記録一覧・削除が拒否されることを確認しています。実通信テスト用のカウンターと匿名ユーザーは除去しました。

2026-10-11 のデプロイ記録：

- 変更前 ruleset: `projects/rakugakisuma/rulesets/c03fe5ba-2d76-49b5-adf2-3787c60801f9`
- 変更後 ruleset: `projects/rakugakisuma/rulesets/46ab979a-d2fa-434e-830c-cdff4e304d54`
- 既存ソース SHA256: `d170fcb4d47491a62a95d8ad13cd7167bf069bb7f24e0d0ac538280f1a7ad9e4`

変更前の ruleset はゲームルールを復元するための参照です。戻す場合は、その後の変更がないことを確認してから操作してください。ギャラリーの集計データはルール変更で消去されません。

仕様の確認元：[Firebase Auth REST API](https://firebase.google.com/docs/reference/rest/auth)、[Firestore Write](https://firebase.google.com/docs/firestore/reference/rest/v1/Write)、[原子的な書き込みとgetAfter](https://firebase.google.com/docs/firestore/manage-data/transactions)。


2026-10-21: 既存のゲームとギャラリーの制限を保持し、`souiuimi`・`kanji-tower`・`leaf-stream-race`・`guchitter`・`mato` の5件を集計対象に追加しました。

- 変更前 ruleset: `projects/rakugakisuma/rulesets/46ab979a-d2fa-434e-830c-cdff4e304d54`
- 変更後 ruleset: `projects/rakugakisuma/rulesets/fbe3c7c4-5d28-4d36-8acb-f922cbea343d`
- 既存ルール SHA256: `7dd46a02be150c0e2eb2d1e4290a1a0e5ba9741c9e9308204c42a51de0e25e03`

2026-10-21: `BOUNCEPARADE` を18番目の集計対象に追加しました。既存ゲームと17作品の集計制限は保持しています。

- 変更前 ruleset: `projects/rakugakisuma/rulesets/fbe3c7c4-5d28-4d36-8acb-f922cbea343d`
- 変更後 ruleset: `projects/rakugakisuma/rulesets/aa9887f7-6a1c-4aca-bc59-fa7e4d665c68`
- 既存ルール SHA256: `c377a134e0064e7936d8af622a9303912f4646f37da0ef12ef3422c89762ae6c`

2026-10-27: `garbage-truck` を19番目の集計対象に追加しました。変更は `galleryProject`・`galleryOwnReceipt` の許可リストへの追加のみです。既存ゲーム、18作品の集計、日本時間での同日重複防止、本人だけの記録取得、加算以外の書き込み拒否は維持しています。

- 変更前 ruleset: `projects/rakugakisuma/rulesets/aa9887f7-6a1c-4aca-bc59-fa7e4d665c68`
- 変更後 ruleset: `projects/rakugakisuma/rulesets/6a2d0e1d-c720-4950-9767-82a606a8a1d8`
- 変更前 SHA256: `ceaee099cb8183eb032236303917d62f64c39056ee622efcea45fefabf2547ac`
- 変更後 SHA256: `168397c294c39d8dc19b502e0bbef4568fd9f5ce57b1cb488f42d7a1ed3cd770`
- 公式 Rules API のコンパイル結果: エラー・警告なし。公開直前の現行ソース一致と、公開後のルールセット・ソース一致を確認しました。ゲームや集計のデータへの書き込みは行っていません。

2026-10-27: `senju-otedama` を20番目の集計対象に追加しました。変更は `galleryProject`・`galleryOwnReceipt` の許可リストへの追加のみです。既存ゲーム、19作品の集計、日本時間での同日重複防止、本人だけの記録取得、加算以外の書き込み拒否は維持しています。

- 変更前 ruleset: `projects/rakugakisuma/rulesets/6a2d0e1d-c720-4950-9767-82a606a8a1d8`
- 変更後 ruleset: `projects/rakugakisuma/rulesets/66f86624-0db0-4a6c-8d82-e6ea1a296f59`
- 変更前 SHA256: `168397c294c39d8dc19b502e0bbef4568fd9f5ce57b1cb488f42d7a1ed3cd770`
- 変更後 SHA256: `e4df4e8469dc299bfc5ea0c759f265b890e2530a2a323ad9077d0e0b09478183`
- 公式 Rules API のコンパイル結果: エラー・警告なし。調査時と公開直前のルール一致、許可リスト2箇所だけの変更、公開後のルールセット・ソース一致を確認しました。ゲームや集計のデータへの読み書きは行っていません。

2026-10-28: `climbing-the-mast` を21番目の集計対象に追加しました。変更は `galleryProject`・`galleryOwnReceipt` の許可リストへの追加のみです。既存ゲーム、20作品の集計、日本時間での同日重複防止、本人だけの記録取得、加算以外の書き込み拒否は維持しています。

- 変更前 ruleset: `projects/rakugakisuma/rulesets/66f86624-0db0-4a6c-8d82-e6ea1a296f59`
- 変更後 ruleset: `projects/rakugakisuma/rulesets/882bb150-35b5-42ed-bd70-eb034aa38bf5`
- 変更前 SHA256: `e4df4e8469dc299bfc5ea0c759f265b890e2530a2a323ad9077d0e0b09478183`
- 変更後 SHA256: `0b81a08f607825d89eb624bb81ffceb1ee15c973ac4c53b04382eda9d35bd92a`
- 公式 Rules API のコンパイル結果: エラー・警告なし。調査時と公開直前のルール一致、許可リスト2箇所だけの変更、公開後のルールセット・ソース一致を確認しました。ゲームや集計のデータへの読み書きは行っていません。

2026-10-28: `ishikoro`・`command`・`baby-race`・`antlion`・`hokorichan` の5作品を追加し、集計対象を26作品にしました。変更は `galleryProject`・`galleryOwnReceipt` の許可リストへの追加のみです。既存ゲーム、21作品の集計、日本時間での同日重複防止、本人だけの記録取得、加算以外の書き込み拒否は維持しています。

- 変更前 ruleset: `projects/rakugakisuma/rulesets/882bb150-35b5-42ed-bd70-eb034aa38bf5`
- 変更後 ruleset: `projects/rakugakisuma/rulesets/decbbf8d-3b19-4cb6-846e-80a91d0d9900`
- 変更前 SHA256: `0b81a08f607825d89eb624bb81ffceb1ee15c973ac4c53b04382eda9d35bd92a`
- 変更後 SHA256: `402e9a97e9d53400967d04702b06c38c73359f05aa8b5413a2fdf454935e8384`
- 公式 Rules API のコンパイル結果: エラー・警告なし。調査時と公開直前のルール一致、許可リスト2箇所だけの変更、公開後のルールセット・ソース一致を確認しました。ゲームや集計のデータへの読み書きは行っていません。

2026-10-29: `pancake` を27番目の集計対象に追加しました。変更は `galleryProject`・`galleryOwnReceipt` の許可リストへの追加のみです。既存ゲーム、26作品の集計、日本時間での同日重複防止、本人だけの記録取得、加算以外の書き込み拒否は維持しています。

- 変更前 ruleset: `projects/rakugakisuma/rulesets/decbbf8d-3b19-4cb6-846e-80a91d0d9900`
- 変更後 ruleset: `projects/rakugakisuma/rulesets/7123a2a9-4bc9-4d6d-a8de-4a3cd7fd063c`
- 変更前 SHA256: `402e9a97e9d53400967d04702b06c38c73359f05aa8b5413a2fdf454935e8384`
- 変更後 SHA256: `ad30a32b0e3f7085c2e78057a088c9c706de4f2494bec30e22ffbfbabf768f6e`
- 公式 Rules API のコンパイル結果: エラー・警告なし。調査時と公開直前のルール一致、許可リスト2箇所だけの変更、公開後のルールセット・ソース一致を確認しました。ゲームや集計のデータへの読み書きは行っていません。

2026-10-30: `nira` を28番目の集計対象に追加しました。変更は `galleryProject`・`galleryOwnReceipt` の許可リストへの追加のみです。既存ゲーム、27作品の集計、日本時間での同日重複防止、本人だけの記録取得、加算以外の書き込み拒否は維持しています。

- 変更前 ruleset: `projects/rakugakisuma/rulesets/7123a2a9-4bc9-4d6d-a8de-4a3cd7fd063c`
- 変更後 ruleset: `projects/rakugakisuma/rulesets/26e79e9c-5caf-49e8-85c1-98c91a6e5018`
- 変更前 SHA256: `ad30a32b0e3f7085c2e78057a088c9c706de4f2494bec30e22ffbfbabf768f6e`
- 変更後 SHA256: `c0597de6d610ffab1998a5f778e13e9fe9288666549f1c432045171b0b25c3e1`
- 公式 Rules API のコンパイル結果: エラー・警告なし。調査時と公開直前のルール一致、許可リスト2箇所だけの変更、公開後のルールセット・ソース一致を確認しました。ゲームや集計のデータへの読み書きは行っていません。

2026-10-30: `horse10-000` を29番目の集計対象に追加しました。変更は `galleryProject`・`galleryOwnReceipt` の許可リストへの追加のみです。既存ゲーム、28作品の集計、日本時間での同日重複防止、本人だけの記録取得、加算以外の書き込み拒否は維持しています。

- 変更前 ruleset: `projects/rakugakisuma/rulesets/26e79e9c-5caf-49e8-85c1-98c91a6e5018`
- 変更後 ruleset: `projects/rakugakisuma/rulesets/48f48384-a02b-4e75-8483-cc2a379e3f9c`
- 変更前 SHA256: `c0597de6d610ffab1998a5f778e13e9fe9288666549f1c432045171b0b25c3e1`
- 変更後 SHA256: `6dfbff80652ed124a1722554a8bb21189d40d3b177dab27893c63352b5b17e01`
- 公式 Rules API のコンパイル結果: エラー・警告なし。調査時と公開直前のルール一致、許可リスト2箇所だけの変更、公開後のルールセット・ソース一致を確認しました。ゲームや集計のデータへの読み書きは行っていません。
