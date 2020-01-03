*** Settings ***
Library           SeleniumLibrary
Resource    ../keyword.txt
Test Setup    Login
Test Teardown    Close Browser

*** Test Cases ***
AMS-TC-03 Manage account
    Change Password    123456    654321
    Change Password    654321    123456

AMS-TC-04 Manage user info
    Change User Info    2000-01-01
    Wait And Click    xpath://b[contains(text(), '返回')]
    Change User Info    2000-12-31

*** Keywords ***
Change Password
    [Arguments]    ${old}    ${new}
    Wait And Click    xpath://a[@routerlink='/account-manage']
    ${oldPassword} =    Set Variable    //input[@ng-reflect-name='oldPassword']
    Wait Until Element Is Visible    ${oldPassword}
    Input Text    ${oldPassword}    ${old}
    ${newPassword} =    Set Variable    //input[@ng-reflect-name='newPassword']
    Wait Until Element Is Visible    ${newPassword}
    Input Text    ${newPassword}    ${new}
    ${repeatNewPassword} =    Set Variable    //input[@ng-reflect-name='repeatNewPassword']
    Wait Until Element Is Visible    ${repeatNewPassword}
    Input Text    ${repeatNewPassword}    ${new}
    Wait And Click Button    xpath://button[@class='btn btn-primary']

Change User Info
    [Arguments]    ${birthday}
    Wait And Click    xpath://a[@routerlink='/user-info']
    Wait And Click Button    xpath://button[@color='primary']
    Wait And Input    xpath://input[@placeholder='生日']    ${birthday}
    Wait And Click Button    xpath://button[@style='margin-left: 20%']
    Wait Until Element Is Visible    xpath://*[contains(text(), '${birthday}')]