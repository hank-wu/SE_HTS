# 健康追蹤系統(Health Tracking System)

為了幫助患者進行健康管理，協助病人諮詢問題而設計的系統(前端部分)。
<br>本系統主要分為兩個部分:
1. 帳戶管理子系統(AMS，Account Management Subsyetem) (後端:https://github.com/hank-wu/SE_HTS/tree/master/project/SE_server)
2. 健康管理子系統(HMS，Health Management Subsystem) (後端:https://hapi.fhir.org/)

<br>

|        |       |
|  ----  | ----  |
| 框架   | Angular |
| 語言   | TypeScript |


<br>
<br>
<br>

## 使用者介面
- - - -

`健康管理`

![hms](/readme_images/hms.png)

`編輯`

![hms_edit](/readme_images/hms_edit.png)

`照護計畫圖表`

![hms_chart](/readme_images/hms_chart.png)

`帳號管理`

![account_management](/readme_images/account_management.png)

<br>
<br>

## 設計
- - - -

`系統架構圖設計`

![system_architecture](/readme_images/system_architecture.png)

`帳戶管理子系統架構圖`

![ams_architecture](/readme_images/ams_architecture.jpg)

`健康管理子系統架構圖`

![hms_architecture](/readme_images/hms_architecture.jpg)

`Class Diagram`

![class_diagram](/readme_images/class_diagram.png)

`其中一個Sequence Diagram`

![sd](/readme_images/sd.png)

<br>
<br>

## Unit Test Result
- - - -

`Unit Test Result`

![unit_test](/readme_images/unit_test.png)

<br>
<br>

## 啟動
- - - -
1. 安裝Nodejs 
2. npm install -g @angular/cli 
3. ng build 
4. ng serve --open 