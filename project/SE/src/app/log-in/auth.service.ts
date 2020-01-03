import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    let user = localStorage.getItem("User");
    if(user){
      return true;
    }else{
      return false;
    }
  }

  login(userName: string, password: string, successCallback, failureCallback): void {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = {
      headers
    };

    var obj = {
      "userName": userName,
      "password": password
    }
    this.http.post<any>("http://140.124.181.142:3000/users", obj, options)
    .subscribe((data)=>{
      localStorage.setItem("User", JSON.stringify(data));
      successCallback(data);
    }, failureCallback);
  }

  signUp(name: string, userName: string, password: string, successCallback, failureCallback): void{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = {
      headers
    };

    var obj = {
      "name": name,
      "userName": userName,
      "password": password
    }
    this.http.post<any>("http://140.124.181.142:3000/user/create", obj, options)
    .subscribe(successCallback, failureCallback);
  }

  getPatientId(): string{
    let user = localStorage.getItem("User");
    return JSON.parse(user).patient_id;
  }

  getUserName(): string{
    let user = localStorage.getItem("User");
    return JSON.parse(user).userName;
  }

  manageAccount(userName: string, password: string, successCallback, failureCallback): void{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = {
      headers
    };
    var obj = {
      "userName": userName,
      "password": password
    };
    this.http.post<any>("http://140.124.181.142:3000/users/userInfo", obj, options)
    .subscribe(successCallback, failureCallback);
  }

  getUserInfo(successCallback, failureCallback): void{
    let patientId = this.getPatientId();
    let headers = new HttpHeaders({
      'Content-Type': 'application/fhir+json;charset=utf-8',
    });
    let options = {
      headers
    };
    this.http.get<any>("http://140.124.181.142:8888/hapi-fhir-jpaserver/fhir/Patient?_id=" + patientId + "&_pretty=true&_format=json", options)
    .subscribe((data)=>{
      successCallback(data.entry[0].resource);
    }, failureCallback);
  }

  saveUserInfo(body, successCallback, failureCallback): void{
    let patientId = this.getPatientId();
    let headers = new HttpHeaders({
      "Accept": "application/fhir+json;q=1.0, application/json+fhir;q=0.9",
      "Content-Type": "application/fhir+json; charset=UTF-8"
    });
    let options = {
      headers
    };

    this.http.put<any>("http://140.124.181.142:8888/hapi-fhir-jpaserver/fhir/Patient/" + patientId + "?_format=json&_pretty=true", body, options)
    .subscribe(successCallback, failureCallback);
  }


  logout(): void {
    localStorage.removeItem("User");
  }

  changePassword(userName, oldPassword, newPassword, successCallback, failureCallback): void{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = {
      headers
    };
    var obj = {
      "userName": userName,
      "oldPassword": oldPassword,
      "newPassword": newPassword
    };
    this.http.post<any>("http://140.124.181.142:3000/users/password", obj, options)
    .subscribe(successCallback, failureCallback);
  }
}
