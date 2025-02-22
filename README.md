## サービスのURL

[https://quiz-app-orcin-eight.vercel.app/](https://quiz-app-orcin-eight.vercel.app/)

メールアドレス : guest@gmail.com  
パスワード : guest

上記のログイン情報を入力するとログインできますが、renderでデプロイしている関係で初回のみレスポンスが返却されるまで1〜3分ほど時間がかかるため初回ログイン処理も完了までに数分かかります。  
エラーが出る場合は数分時間を開けてから再度お試しください。  

## 機能一覧

| ログイン画面                                                                                                                                             | マイページ                                                                                                                                            |
|:-----------:                                                                                                                                           |:------------:                                                                                                                                       |
|  <img width="1423" alt="スクリーンショット 2025-01-18 15 29 45" src="https://github.com/user-attachments/assets/18f3f884-882a-436b-a328-b20873930a86" />  | <img width="1423" alt="スクリーンショット 2025-01-18 15 35 12" src="https://github.com/user-attachments/assets/74f14ff2-a6b5-4cfb-88e1-698f7446888d" />| 
| メールアドレスとパスワードでの認証機能を実装しました。                                                                                                          | 自分のプロフィールのや編集が行え、編集では画像アップロード機能を実装しておりユーザーアイコンの設定なども可能です。                                                       | 

| クイズ投稿画面                                                                                                                                             | クイズ一覧画面                                                                                                                                           |
|:-----------:                                                                                                                                           |:------------:                                                                                                                                       |
|  <img width="1423" alt="スクリーンショット 2025-01-18 16 02 27" src="https://github.com/user-attachments/assets/2cd36c73-ed6e-4c8f-8d5d-2e652ab7db23" />　| <img width="1423" alt="スクリーンショット 2025-01-18 16 05 38" src="https://github.com/user-attachments/assets/0f2b03df-eff0-45f1-8176-02a9d9b1abf0" />| 
| こちらからクイズを投稿できます。                                                                                                                            | 投稿したクイズを確認することができます。<br> 編集、削除もこちらから行えます。                                                    | 

| クイズ回答画面                                                                                                                                           |
|:-----------:                                                                                                                                          |
|  <img width="1429" alt="スクリーンショット 2025-01-18 16 36 18" src="https://github.com/user-attachments/assets/7e10961e-c2e9-4b54-b10f-e39367a75a87" /> | 
| 選択肢のボタンを押してもらうことでクイズの回答ができます。<br/> 全てのユーザーが投稿したクイズが合計10問出題されます。                                                                   |

## 使用技術

| Category       | Technology Stack                                                       |
|:-----------    |:------------                                                           |
| Frontend       | TypeScript, Vite-react, Storybook, Tailwindcss, shadcn/ui, antd, etc...| 
| Backend        | Rust, actix-web,  diesel, etc...                                       | 
| Infrastructure | Vercel, render, Neon, firebase                                               |
| Database       | PostgreSQL                                                             |
| CI/CD          | GitHub Actions                                                         |
