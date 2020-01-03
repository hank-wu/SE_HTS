*** Settings ***
Library           SeleniumLibrary
Resource    ../keyword.txt
# Test Setup    Login
Test Teardown    Close Browser

*** Test Case ***
AMS-TC-02 Login
    Login
    Wait Until Element Is Visible    xpath://a[text()='Health Tracking System']