import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../log-in/auth.service';
import { UserInfoComponent } from './user-info.component';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {MatListModule} from '@angular/material/list';

describe('UserInfoComponent', () => {
  let authService: AuthService;
  let router: Router;
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;
  let userInfoForm;
  let validators: any[];
  let asyncValidators: any[];

  const data = {
    name: [{
      given: [
        'Jeff'
      ]
    }],
    telecom: [{
      value: '091234567'
    }],
    gender: 'male',
    birthDate: '1996-11-13'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoComponent ],
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        HttpClientTestingModule,
        MatNativeDateModule,
        MatMomentDateModule,
        MatInputModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatListModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        // { provide: Router, useValue: routerMock },
        AuthService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
    const spyObj = spyOn(authService, 'getUserInfo').and.callFake((successCallback, failureCallback) => {
      successCallback(data);
      failureCallback();
    });
    fixture = TestBed.createComponent(UserInfoComponent);
    fixture.debugElement.nativeElement.style.visibility = "hidden";
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('component should create', () => {
    expect(component).toBeTruthy();
  });

  it('component shoud update', () => {
    component.update();
    expect(component.editMode).toBe(true);
    expect(component.originUserInfo.name).toEqual(data.name[0].given[0]);
    expect(component.originUserInfo.email).toEqual(data.telecom[0].value);
    expect(component.originUserInfo.gender).toEqual(data.gender);
    expect(component.originUserInfo.birthDate).toEqual(data.birthDate);
  });

  it('component shoud cancel', () => {
    component.cancel();
    expect(component.editMode).toBe(false);
    expect(component.userInfo.name).toEqual(component.originUserInfo.name);
    expect(component.userInfo.email).toEqual(component.originUserInfo.email);
    expect(component.userInfo.gender).toEqual(component.originUserInfo.gender);
    expect(component.userInfo.birthDate).toEqual(component.originUserInfo.birthDate);
  });

  it('component shoud save', () => {
    const spyObj = spyOn(authService, 'getPatientId').and.callFake(() => {
      return '56899';
    });
    const spyObj_2 = spyOn(authService, 'saveUserInfo').and.callFake((body, successCallback, failureCallback) => {
      successCallback();
      failureCallback();
    });
    component.save();
    expect(spyObj).toHaveBeenCalledTimes(1);
    expect(spyObj_2).toHaveBeenCalledTimes(1);
  });

  it('component shoud manageAccount', () => {
    userInfoForm = new NgForm(validators, asyncValidators);
    const spyObj = spyOn(authService, 'manageAccount').and.callFake((username, password, successCallback, failureCallback) => {
      successCallback('test');
      failureCallback('error');
    });
    component.manageAccount(userInfoForm);
    expect(spyObj).toHaveBeenCalledTimes(1);
  });

});
