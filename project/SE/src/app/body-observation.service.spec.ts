import { TestBed, inject } from '@angular/core/testing';
import { BodyObservationService } from './body-observation.service';

import { HttpClientModule } from '@angular/common/http'; 
import { AuthService } from './log-in/auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

var observationData = {
  "resourceType": "Observation",
  "id": "251484",
  "meta": {
    "versionId": "2",
    "lastUpdated": "2019-12-13T07:30:50.677+00:00",
    "source": "#Bmwc9xAzqELWHLwK"
  },
  "subject": {
    "reference": "Patient/56899"
  },
  "effectiveDateTime": "2019-12-11",
  "valueQuantity": {
    "value": 10
  },
  "derivedFrom": [
    {
      "reference": "Observation/250083"
    }
  ]
}

describe('BodyObservationService', () => {
  let service: BodyObservationService;
  let httpMock: HttpTestingController;
  let dateRange = {
    start: "2019-12-01",
    end: "2019-12-30"
  }
  let dateRange2 = {
    start: "2019-12-26",
    end: "2019-12-26"
  }

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule
    ]
  }));

  beforeEach(()=>{
    service = TestBed.get(BodyObservationService);
    httpMock = TestBed.get(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();
  }); 

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test_getAllObservation',
    inject([AuthService], (authService: AuthService) => {
      let spy2 = spyOn(authService, 'getPatientId').and.returnValue('56899');
      service.getAllObservation(dateRange, "all", ()=>{}, ()=>{});

      const req = httpMock.expectOne('http://140.124.181.142:8888/hapi-fhir-jpaserver/fhir/Observation?patient=56899&date=>=2019-12-01&date=<=2019-12-30&_pretty=true&_format=json');
      expect(req.request.method).toBe('GET');

    })
  );

  it('test_getAllObservation_sameDateRange',
    inject([AuthService], (authService: AuthService) => {
      let spy2 = spyOn(authService, 'getPatientId').and.returnValue('56899');
      service.getAllObservation(dateRange2, 249628, ()=>{}, ()=>{});

      const req = httpMock.expectOne('http://140.124.181.142:8888/hapi-fhir-jpaserver/fhir/Observation?patient=56899&date=2019-12-26&derived-from=249628&_pretty=true&_format=json');
      expect(req.request.method).toBe('GET');

    })
  );

  it('test_deleteObservation', () => {
    service.deleteObservation(56899, ()=>{}, ()=>{});
    const req = httpMock.expectOne('http://140.124.181.142:8888/hapi-fhir-jpaserver/fhir/Observation/56899?_pretty=true');
    expect(req.request.method).toBe('DELETE');
  });

  it('test_getObservation', () => {
    service.getObservation(56899, ()=>{}, ()=>{});
    const req = httpMock.expectOne('http://140.124.181.142:8888/hapi-fhir-jpaserver/fhir/Observation?_id=56899&_pretty=true');
    expect(req.request.method).toBe('GET');
  });

  it('test_createObservation',
    inject([AuthService], (authService: AuthService) => {
      let spy2 = spyOn(authService, 'getPatientId').and.returnValue('56899');
      service.createObservation(observationData, ()=>{}, ()=>{});

      const req = httpMock.expectOne('http://140.124.181.142:8888/hapi-fhir-jpaserver/fhir/Observation?_format=json&_pretty=true');
      expect(req.request.method).toBe('POST');
    })
  );

  it('test_editObservation',
    inject([AuthService], (authService: AuthService) => {
      let spy2 = spyOn(authService, 'getPatientId').and.returnValue('56899');
      service.editObservation(251484, observationData, ()=>{}, ()=>{});

      const req = httpMock.expectOne('http://140.124.181.142:8888/hapi-fhir-jpaserver/fhir/Observation/251484?_format=json&_pretty=true');
      expect(req.request.method).toBe('PUT');
    })
  );

  it('test_getAllObservationItem',
    inject([AuthService], (authService: AuthService) => {
      let spy2 = spyOn(authService, 'getPatientId').and.returnValue('56899');
      service.getAllObservationItem(()=>{}, ()=>{});

      const req = httpMock.expectOne('http://140.124.181.142:8888/hapi-fhir-jpaserver/fhir/Observation?patient=56899&code=unit&_pretty=true');
      expect(req.request.method).toBe('GET');
    })
  );

});
