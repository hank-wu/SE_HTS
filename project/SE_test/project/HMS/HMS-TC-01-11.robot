*** Settings ***
Library           SeleniumLibrary
Resource    ../keyword.txt
Test Setup    Login
Test Teardown    Close Browser

*** Test Cases ***
HMS-TC-01 Create body observation
    Wait And Click    xpath://*[contains(@class, 'nav-item')]//*[text()='身體檢測']
    Wait And Click    xpath://*[text()='新增']
    Wait And Click    xpath://*[contains(@class, 'mat-select-arrow-wrapper')]//*[contains(@class, 'mat-select-arrow')]
    Wait And Click    xpath://*[contains(@id, 'mat-option-0')]
    Wait And Click    xpath://*[contains(@class, 'mat-form-field-infix')]//*[contains(@ng-reflect-placeholder, 'Value')]
    Wait And Input    xpath://*[contains(@class, 'mat-form-field-infix')]//*[contains(@ng-reflect-placeholder, 'Value')]    50
    Wait And Click Button    xpath://button[contains(@class, 'mat-button mat-button-base ng-star-inserted')]
    Wait Until Element Is Visible    xpath://td[text()=' 50 ']

HMS-TC-02 Edit body observation
    Wait And Click    xpath://*[contains(@class, 'nav-item')]//*[text()='身體檢測']
    Wait And Click    xpath://div[contains(@class, 'mat-radio-outer-circle')]
    Wait And Click    xpath://*[text()='修改']
    Wait And Click    xpath://*[contains(@class, 'mat-form-field-infix')]//*[contains(@ng-reflect-placeholder, 'Value')]
    Wait And Input    xpath://*[contains(@class, 'mat-form-field-infix')]//*[contains(@ng-reflect-placeholder, 'Value')]    55
    Wait And Click Button    xpath://button[contains(@class, 'mat-button mat-button-base ng-star-inserted')]
    Wait Until Element Is Visible    xpath://td[text()=' 55 ']

HMS-TC-03 Delete body observation
    Wait And Click    xpath://*[contains(@class, 'nav-item')]//*[text()='身體檢測']
    Wait And Click    xpath://div[contains(@class, 'mat-radio-outer-circle')]
    Wait And Click    xpath://*[text()='刪除']

HMS-TC-04 Choose date
    Wait And Click    xpath://*[contains(@class, 'nav-item')]//*[text()='身體檢測']
    Wait And Click    xpath://input[contains(@startkey, 'start')]
    Wait And Input    xpath://input[contains(@startkey, 'start')]    ${EMPTY}
    Wait And Input    xpath://input[contains(@startkey, 'start')]    2019-12-01 - 2020-01-31
    Wait And Click Button    //button[@class='btn']
    Wait And Click    xpath://*[text()='搜尋']
    Sleep    3s
    Wait Until Element Is Visible    xpath://td[text()=' 76 ']

HMS-TC-07 Chart
    Wait And Click    xpath://*[contains(@class, 'nav-item')]//*[text()='圖表']
    Wait And Click    xpath://input[contains(@startkey, 'start')]
    Wait And Input    xpath://input[contains(@startkey, 'start')]    ${EMPTY}
    Wait And Input    xpath://input[contains(@startkey, 'start')]    12/01/2019 - 01/31/2020
    Wait And Click Button    //button[@class='btn']
    Wait And Click    xpath://*[contains(@class, 'mat-select-arrow-wrapper')]//*[contains(@class, 'mat-select-arrow')]
    Wait And Click    xpath://*[contains(@id, 'mat-option-0')]
    Wait And Click Button    //button[@style='margin-left: 30%;margin-right: -88%; margin-top: 3%;']
    Sleep    3s
    Wait Until Element Is Visible    xpath://*[text()='Legend']

HMS-TC-08-09 Create care plan
    Wait And Click    xpath://*[contains(@class, 'nav-item')]//*[text()='照護']
    Wait And Click    xpath://*[text()='新增']
    ${carePlanName} =    Set Variable    //*[contains(@class, 'mat-form-field-infix')]//*[contains(@ng-reflect-placeholder, '照護名稱')]
    Wait And Click    ${carePlanName}
    Wait And Input    ${carePlanName}    測試用照護
    Wait And Click    xpath://*[contains(@class, 'mat-select-arrow-wrapper')]//*[contains(@class, 'mat-select-arrow')]
    Wait And Click    xpath://*[contains(@id, 'mat-option-0')]
    ${standardValue} =    Set Variable    //*[contains(@class, 'mat-form-field-infix')]//*[contains(@ng-reflect-placeholder, '標準值')]
    Wait And Click    ${standardValue}
    Wait And Input    ${standardValue}    70
    Wait And Click Button    xpath://button[contains(@class, 'mat-button mat-button-base ng-star-inserted')]
    Wait Until Element Is Visible    xpath://td[text()=' 測試用照護 ']
    Validate Care Plan    測試用照護    體重

HMS-TC-10 Edit care plan
    Wait And Click    xpath://*[contains(@class, 'nav-item')]//*[text()='照護']
    @{radio} =    Get Elements    xpath://div[contains(@class, 'mat-radio-outer-circle')]
    Wait And Click    @{radio}[3]
    Wait And Click    xpath://*[text()='修改']
    ${standardValue} =    Set Variable    //*[contains(@class, 'mat-form-field-infix')]//*[contains(@ng-reflect-placeholder, '標準值')]
    Wait And Click    ${standardValue}
    Wait And Input    ${standardValue}    71
    Wait And Click Button    xpath://button[contains(@class, 'mat-button mat-button-base ng-star-inserted')]
    Wait Until Element Is Visible    xpath://td[text()=' 71 ']

HMS-TC-11 Delete care plan
    Wait And Click    xpath://*[contains(@class, 'nav-item')]//*[text()='照護']
    @{radio} =    Get Elements    xpath://div[contains(@class, 'mat-radio-outer-circle')]
    Wait And Click    @{radio}[3]
    Wait And Click    xpath://*[text()='刪除']

