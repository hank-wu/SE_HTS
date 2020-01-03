*** Settings ***
Library           SeleniumLibrary
Resource    ../keyword.txt
# Test Setup    Login
Test Teardown    Close Browser

*** Test Cases ***
AMS-TC-01 Create account
    Open Browser    http://140.124.181.142:4200/    browser=chrome
    Maximize Browser Window
    Wait And Click Button    xpath://button[@class='btn btn-link']
    ${oldPassword} =    Set Variable    //input[@ng-reflect-name='name']
    Wait Until Element Is Visible    ${oldPassword}
    Input Text    ${oldPassword}    TestName02
    ${newPassword} =    Set Variable    //input[@ng-reflect-name='userName']
    Wait Until Element Is Visible    ${newPassword}
    Input Text    ${newPassword}    TestName02
    ${repeatNewPassword} =    Set Variable    //input[@ng-reflect-name='password']
    Wait Until Element Is Visible    ${repeatNewPassword}
    Input Text    ${repeatNewPassword}    112233
    Wait And Click Button    xpath://button[@class='btn btn-primary']
    Login For Test    TestName02    112233
    Wait Until Element Is Visible    xpath://a[text()='Welcome, TestName02']