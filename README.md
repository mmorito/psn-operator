# psn-operetor
Google Home からPS4を操作する

## Overview
1. Google Homeに話しかけた内容をIFTTTに連携し、Webhookを発火する
2. WebhookでFirebaseのDBを更新する
3. Firebaseをnode.jsのプログラムでsubscribeしておき、変更を検知する
4. 検知内容に応じて、PS4に操作指示をだす

## Setup
```
$ npm install
$ node index.js
```

- *1: Firebaseのプロジェクト作成が必要
- *2: IFTTTのApplet作成が必要

## APIs
「OK, Google. プレステ」に続けて以下を発することでPS4を操作できる
### `起動`
- PS4を起動する

### `スタンバイ`
- PS4をスタンバイ状態にする

### `モンハン`
- PS4でモンスターハンターワールドのソフトを起動する

