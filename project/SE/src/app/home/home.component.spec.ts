import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {AuthService} from '../log-in/auth.service';

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

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let authService: AuthService;
  let spyObj;
  let data = {
    name: [{
      given: [
        'Jeff'
      ]
    }]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
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
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        AuthService
      ]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    authService = TestBed.get(AuthService);
    spyObj = spyOn(authService, 'getUserInfo').and.callFake((successCallback, failureCallback)=>{
      successCallback(data);
      failureCallback();
    });
    fixture = TestBed.createComponent(HomeComponent);
    fixture.debugElement.nativeElement.style.visibility = "hidden";
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
  it('component should get user info', () => {
    expect(spyObj).toHaveBeenCalledTimes(1);
  });
  it('component should get pageTitle', () => {
    expect(component.pageTitle).toEqual('Health Tracking System');
  });

  it('component should login', () => {
    expect(component.isLoggedIn).toEqual(true);
  });

  it('component should logout', () => {
    spyObj = spyOn(authService, 'logout').and.callThrough();
    component.logOutClick();
    expect(spyObj).toHaveBeenCalledTimes(1);
  });

});
