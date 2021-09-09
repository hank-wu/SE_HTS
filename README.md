# 健康トゥラッキングシステム(Health Tracking System)

このシステムはソフトウェア工学（software engineering）クラスのタームプロジェクト（term project）


開発時間：2019/09-2019/12

チーム人数：4人

- - - -
## 目標
患者の健康管理を手伝ったりカウンセリングしたりするために開発するシステム（主にフロントエンドの部分）（フロントエンドソースコード：https://github.com/hank-wu/SE_HTS/tree/jp_introduction/project/SE）
<br>このシステムは二つの部分に分けられる:
1. アカウント管理サブシステム(AMS，Account Management Subsyetem) (バックエンドソースコード:https://github.com/hank-wu/SE_HTS/tree/master/project/SE_server)
2. 健康管理サブシステム(HMS，Health Management Subsystem) (バックエンド外部API:https://hapi.fhir.org/)

<br>

|        |       |
|  ----  | ----  |
| フレームワーク   | Angular |
| プログラミング言語   | TypeScript |


<br>
<br>
<br>

## ユーザーインタフェース（UI）
- - - -

`健康管理`

![hms](/readme_images/hms.png)

`健康記録編集`

![hms_edit](/readme_images/hms_edit.png)

`健康管理グラフ`

![hms_chart](/readme_images/hms_chart.png)

`アカウント管理`

![account_management](/readme_images/account_management.png)

<br>
<br>

## システムデザイン
- - - -

`システムアーキテクチャ`

![system_architecture](/readme_images/system_architecture.png)

`アカウント管理サブシステムのアーキテクチャ`

![ams_architecture](/readme_images/ams_architecture.jpg)

`健康管理サブシステムのアーキテクチャ`

![hms_architecture](/readme_images/hms_architecture.jpg)

`Class Diagram`

![class_diagram](/readme_images/class_diagram.png)

`一つのSequence Diagram`

![sd](/readme_images/sd.png)

<br>
<br>

## フロントエンドのUnit Test Result
- - - -

`Unit Test Result`

![unit_test](/readme_images/unit_test.png)

`Unit Testのソースコード：`

https://github.com/hank-wu/SE_HTS/tree/jp_introduction/project/SE/src/app

Unit TestのソースコードはこのURLの中にいる。しかし、Unit Testのファイルは分散している。コンポーネントずつはUnit Testがついている。’...spec.ts’のファイルが
Unit Testのファイル。line-chart.component.tsがいて、line-chart.component.spec.tsがこのコンポーネントのUnit test。

## System Test 
- - - -

<br>

|        |       |
|  ----  | ----  |
| フレームワーク   | Robot Framework |
| プログラミング言語   | Python |


<br>


`System Testでシステムをデモ動画：`

https://github.com/hank-wu/SE_HTS/tree/jp_introduction/demoVideo

`System Testのソースコード：`

https://github.com/hank-wu/SE_HTS/tree/jp_introduction/project/SE_test/project


<br>
<br>

## 啟動
- - - -
1. Nodejsをインストール 
2. npm install -g @angular/cli 
3. ng build 
4. ng serve --open 