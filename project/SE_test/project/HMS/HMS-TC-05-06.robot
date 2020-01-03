*** Settings ***
Library           SeleniumLibrary
Resource    ../keyword.txt
Test Setup    Login
Test Teardown    Close Browser

*** Test Cases ***
HMS-TC-05 Create body observation item
    Wait And Click    xpath://*[contains(@class, 'nav-item')]//*[text()='檢測項目']
    Wait And Click    xpath://*[text()='新增']
    Wait And Click    xpath://*[contains(@class, 'mat-form-field-infix')]//*[contains(@ng-reflect-placeholder, 'Item')]
    Wait And Input    xpath://*[contains(@class, 'mat-form-field-infix')]//*[contains(@ng-reflect-placeholder, 'Item')]    測試用項目
    Wait And Click    xpath://*[contains(@class, 'mat-form-field-infix')]//*[contains(@ng-reflect-placeholder, 'Unit')]
    Wait And Input    xpath://*[contains(@class, 'mat-form-field-infix')]//*[contains(@ng-reflect-placeholder, 'Unit')]    abc
    Wait And Click Button    xpath://button[contains(@class, 'mat-button mat-button-base ng-star-inserted')]
    Wait Until Element Is Visible    xpath://td[text()=' 測試用項目 ']


HMS-TC-06 Edit body observation item
    Wait And Click    xpath://*[contains(@class, 'nav-item')]//*[text()='檢測項目']
    @{radio} =    Get Elements    xpath://div[contains(@class, 'mat-radio-outer-circle')]
    Wait And Click    @{radio}[4]
    Wait And Click    xpath://*[text()='修改']
    Wait And Click    xpath://*[contains(@class, 'mat-form-field-infix')]//*[contains(@ng-reflect-placeholder, 'Unit')]
    Wait And Input    xpath://*[contains(@class, 'mat-form-field-infix')]//*[contains(@ng-reflect-placeholder, 'Unit')]    xyz
    Wait And Click Button    xpath://button[contains(@class, 'mat-button mat-button-base ng-star-inserted')]
    Wait Until Element Is Visible    xpath://td[text()=' xyz ']

