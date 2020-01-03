import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CarePlanService } from './care-plan.service';
import { AuthService } from '../log-in/auth.service'

describe('CarePlanService', () =>{
    let injector: TestBed;
    let service: CarePlanService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [CarePlanService],
        });
    
        injector = getTestBed();
        service = injector.get(CarePlanService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('getAllCarePlan', inject([AuthService], (authService: AuthService) =>{
        spyOn(authService, 'getPatientId').and.callFake(()=>{
            return '56899';
        })
        service.getAllCarePlan(()=>{}, ()=>{});
        const req = httpMock.expectOne("http://140.124.181.142:8888/hapi-fhir-jpaserver/fhir/Goal?patient=56899&_pretty=true&_format=json");
        expect(req.request.method).toBe('GET');
    }))
    
    it('deleteCarePlan', () =>{
        service.deleteCarePlan(56899, ()=>{}, ()=>{});
        const req = httpMock.expectOne('http://140.124.181.142:8888/hapi-fhir-jpaserver/fhir/Goal/56899?_pretty=true');
        expect(req.request.method).toBe('DELETE');
    })

    it('getCarePlan', () =>{
        service.getCarePlan(56899, ()=>{}, ()=>{});
        const req = httpMock.expectOne('http://140.124.181.142:8888/hapi-fhir-jpaserver/fhir/Goal?_id=56899&_pretty=true');
        expect(req.request.method).toBe('GET');
    })

    it('createCarePlan', inject([AuthService], (authService: AuthService) =>{
        spyOn(authService, 'getPatientId').and.callFake(()=>{
            return '56899';
        })
        service.createCarePlan({}, ()=>{}, ()=>{});
        const req = httpMock.expectOne("http://140.124.181.142:8888/hapi-fhir-jpaserver/fhir/Goal?_format=json&_pretty=true");
        expect(req.request.method).toBe('POST');
    }))

    it('editCarePlan', inject([AuthService], (authService: AuthService) =>{
        spyOn(authService, 'getPatientId').and.callFake(()=>{
            return '56899';
        })
        service.editCarePlan(56899,{}, ()=>{}, ()=>{});
        const req = httpMock.expectOne("http://140.124.181.142:8888/hapi-fhir-jpaserver/fhir/Goal/56899?_format=json&_pretty=true");
        expect(req.request.method).toBe('PUT');
    }))
})