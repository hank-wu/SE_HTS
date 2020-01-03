import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { LogInComponent } from './log-in.component';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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

const routerMock = {
  navigate: jasmine.createSpy('navigate')
};

describe('LogInComponent', () => {
  let authService: AuthService;
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let validators: any[];
  let asyncValidators: any[];
  let loginForm;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogInComponent ],
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
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: Router, useValue: routerMock },
        AuthService
      ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    authService = TestBed.get(AuthService);
    fixture = TestBed.createComponent(LogInComponent);
    fixture.debugElement.nativeElement.style.visibility = "hidden";
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component should create', () => {
    expect(component).toBeTruthy();
  });

  it('component should click signUp', inject([Router], (router: Router) => {
    component.signUpClick();
    expect(router.navigate).toHaveBeenCalledWith(['/sign-up']);
  }));

  it('component should cancel', () => {
    loginForm = new NgForm(validators, asyncValidators);
    const spyObj = spyOn(loginForm, 'reset');
    component.cancel(loginForm);
    expect(spyObj).toHaveBeenCalledTimes(1);
  });

  it('component should login', inject([Router], (router: Router) => {
    loginForm = {};
    loginForm.form = {};
    loginForm.form.value = {};
    loginForm.valid = true;
    loginForm.form.value.userName = 'Jeff';
    loginForm.form.value.password = '1234567';
    const spyObj = spyOn(authService, 'login').and.callFake((username, password, successCallback, failureCallback) => {
      successCallback('Jeff');
      expect(router.navigate).toHaveBeenCalledWith(['/home']);
    });
    component.login(loginForm);
    expect(spyObj).toHaveBeenCalledTimes(1);
  }));

  it('component should login failed', () => {
    loginForm = {};
    loginForm.form = {};
    loginForm.form.value = {};
    loginForm.valid = true;
    loginForm.form.value.userName = 'Jeff';
    loginForm.form.value.password = 'abc123';

    const spyObj = spyOn(authService, 'login').and.callFake((username, password, successCallback, failureCallback) => {
      failureCallback();
    });
    component.login(loginForm);
    expect(spyObj).toHaveBeenCalledTimes(1);
  });

  it('component should login invalid', () => {
    loginForm = {};
    loginForm.valid = false;
    component.login(loginForm);
    expect(component.errorMessage).toBe('Please enter a user name and password.');
  });
});
