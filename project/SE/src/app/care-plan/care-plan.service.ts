import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../log-in/auth.service'

@Injectable({
  providedIn: 'root'
})
export class CarePlanService {
  

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getAllCarePlan(successCallback, failureCallback){
    let url = "http://140.124.181.142:8888/hapi-fhir-jpaserver/fhir/Goal?patient=";
    url = url + this.authService.getPatientId();

    // if(itemType != "all")
    //   url = url + "&derived-from=" + itemType;

    url = url +"&_pretty=true&_format=json";

    this.http.get(url).subscribe(successCallback, failureCallback);
  }
  deleteCarePlan(id, successCallback, failureCallback){
    this.http.delete("http://140.124.181.142:8888/hapi-fhir-jpaserver/fhir/Goal/" + id + "?_pretty=true")
    .subscribe(successCallback, failureCallback);
  };
  getCarePlan(id, successCallback, failureCallback){
    this.http.get("http://140.124.181.142:8888/hapi-fhir-jpaserver/fhir/Goal?_id=" + id + "&_pretty=true")
    .subscribe(successCallback, failureCallback);
  }
  createCarePlan(body, successCallback, failureCallback){
    let headers = new HttpHeaders({
      'Content-Type': 'text/json'
    });
    let options = {
      headers
    };
    body.subject = {
      "reference": "Patient/" + this.authService.getPatientId()
    };
    body = JSON.stringify(body);
    this.http.post<any>("http://140.124.181.142:8888/hapi-fhir-jpaserver/fhir/Goal?_format=json&_pretty=true", body, options)
    .subscribe(successCallback, failureCallback);
  }
  editCarePlan(id, body, successCallback, failureCallback){
    let headers = new HttpHeaders({
      "Accept": "application/fhir+json;q=1.0, application/json+fhir;q=0.9",
      "Content-Type": "application/fhir+json; charset=UTF-8"
    });
    let options = {
      headers
    };
    body.subject = {
      "reference": "Patient/" + this.authService.getPatientId()
    };
    body = JSON.stringify(body);
    this.http.put<any>("http://140.124.181.142:8888/hapi-fhir-jpaserver/fhir/Goal/" + id + "?_format=json&_pretty=true", body, options)
    .subscribe(successCallback, failureCallback);
  }
}
