import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let injector: TestBed;
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    injector = getTestBed();
    service = injector.get(AuthService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('servic should login', () => {
    let data = {
        patient_id: '56899'
    }
    let user = localStorage.setItem('User', JSON.stringify(data));
    expect(service.isLoggedIn()).toBe(true);
    service.logout();
  })

  it('service should not login', () => {
    expect(service.isLoggedIn()).toBe(false);
  });

  it('service should login', () => {
    service.login('Jeff', '1234567', (data) => {
    }, () => {});
    const req = httpMock.expectOne('http://140.124.181.142:3000/users');
    expect(req.request.method).toBe('POST');
    req.flush({ msg: 'success' });
    expect(localStorage.getItem("User")).toEqual('{"msg":"success"}');
    localStorage.removeItem('User');
  });

  it('service should sign up', () => {
    service.signUp('Jeff', 'Jeff', 'abc123', () => {}, () => {});
    const req = httpMock.expectOne('http://140.124.181.142:3000/user/create');
    expect(req.request.method).toBe('POST');
  });

  it('service should change password', () => {
    service.changePassword('Jeff', 'abc123', '456', () => {}, () => {});
    const req = httpMock.expectOne('http://140.124.181.142:3000/users/password');
    expect(req.request.method).toBe('POST');
  });

  it('service should manage account', () => {
    service.manageAccount('Jeff', 'abc123', () => {}, () => {});
    const req = httpMock.expectOne("http://140.124.181.142:3000/users/userInfo");
    expect(req.request.method).toBe('POST');
  });

  it('service should get user info', () => {
    let data = {
        patient_id: '56899'
    }
    let user = localStorage.setItem('User', JSON.stringify(data));
    service.getUserInfo(() => {}, () => {});
    const req = httpMock.expectOne('http://140.124.181.142:8888/hapi-fhir-jpaserver/fhir/Patient?_id=56899&_pretty=true&_format=json');
    expect(req.request.method).toBe('GET');
    service.logout();
  });

  it('service should save user info', () => {
    let data = {
        patient_id: '56899'
    }
    let user = localStorage.setItem('User', JSON.stringify(data));
    service.saveUserInfo({},() => {}, () => {});
    const req = httpMock.expectOne("http://140.124.181.142:8888/hapi-fhir-jpaserver/fhir/Patient/56899?_format=json&_pretty=true");
    expect(req.request.method).toBe('PUT');
    service.logout();
  });

  it('service should get patientId', () => {
    let data = {
        patient_id: '56899'
    }
    let user = localStorage.setItem('User', JSON.stringify(data));
    expect(service.getPatientId()).toEqual('56899');
    service.logout();
  });

  it('service should get username', () => {
    let data = {
        userName: 'Jeff'
    }
    let user = localStorage.setItem('User', JSON.stringify(data));
    expect(service.getUserName()).toEqual('Jeff');
    service.logout();
  });

});
