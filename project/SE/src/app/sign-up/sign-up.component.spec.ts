import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { NgForm , FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpComponent } from './sign-up.component';
import { AuthService } from '../log-in/auth.service';
import { HttpClient } from '@angular/common/http';

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

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authService: AuthService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
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
        AuthService,
        FormBuilder
      ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    authService = TestBed.get(AuthService);
    fixture = TestBed.createComponent(SignUpComponent);
    fixture.debugElement.nativeElement.style.visibility = "hidden";
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('component should click cancel', inject([Router], (router: Router) => {
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['/log-in']);
  }));

  it('component cannot submit', () => {
    component.registerForm = {};
    component.registerForm.invalid = true;
    component.onSubmit();
    expect(component.registerForm.invalid).toBe(true);
  });

  it('component can submit in valid',inject([Router], (router: Router) => {
    component.registerForm = {};
    component.registerForm.invalid = false;
    component.registerForm.value = {};
    component.registerForm.value.name = 'Jeff';
    component.registerForm.value.userName = 'Jeff';
    component.registerForm.value.password = 'abc123';
    component.loading = true;
    const spyObj = spyOn(authService, 'signUp').and.callFake((name, userName, password, successCallback, failureCallback) => {
      successCallback('Jeff');
      expect(router.navigate).toHaveBeenCalledWith(['/log-in']);
    });
    component.onSubmit();
    expect(component.registerForm.invalid).toBe(false);
    expect(component.loading).toBe(true);
    expect(spyObj).toHaveBeenCalledTimes(1);
  }));

  it('component signup failed', () => {
    component.registerForm = {};
    component.registerForm.invalid = false;
    component.registerForm.value = {};
    component.registerForm.value.name = 'Jeff';
    component.registerForm.value.userName = 'Jeff';
    component.registerForm.value.password = 'abc123';
    const spyObj = spyOn(authService, 'signUp').and.callFake((name, username, password, successCallback, failureCallback)=>{
      failureCallback('test');
    });
    component.onSubmit();
    expect(spyObj).toHaveBeenCalledTimes(1);
    expect(component.registerForm.value.name).toBe('');
    expect(component.registerForm.value.userName).toBe('');
    expect(component.registerForm.value.password).toBe('');
  });

  it('component can use getter', () => {
    component.registerForm = {};
    component.registerForm.controls = 'test';
    const spyObj = spyOnProperty(component, 'f').and.callThrough();
    expect(component.f).toBe('test');
    expect(spyObj).toHaveBeenCalledTimes(1);
  });
});
