import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../log-in/auth.service';

import { AccountManageComponent } from './account-manage.component';
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


describe('AccountManageComponent', () => {
  let component: AccountManageComponent;
  let authService: AuthService;
  let spyObj;
  let fixture: ComponentFixture<AccountManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountManageComponent ],
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
    spyOn(authService, 'getPatientId').and.callFake(() => {
      return '56899';
    });
    spyObj = spyOn(authService, 'getUserName').and.callFake(() => {
      return 'Jeff';
    });
    fixture = TestBed.createComponent(AccountManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component should be created', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
    expect(spyObj).toHaveBeenCalledTimes(1);
  });

  it('component should canecl', () => {
    spyObj = spyOn(component, 'cancel').and.callThrough();
    component.cancel();
    expect(spyObj).toHaveBeenCalledTimes(1);
  });

  it('component can submit in inValid', () => {
    component.accountManageForm = {};
    component.accountManageForm.invalid = true;
    component.onSubmit();
    expect(component.accountManageForm.invalid).toBe(true);
  });

  it('component can submit in valid', () => {
    component.accountManageForm = {};
    component.accountManageForm.invalid = false;
    component.accountManageForm.value = {};
    component.accountManageForm.value.oldPassword = 'abc123';
    component.accountManageForm.value.newPassword = 'abc456';
    component.accountManageForm.value.repeatNewPassword = 'abc456';
    spyObj = spyOn(authService, 'changePassword').and.callFake((username, oldPassword, newPassword, successCallback, failureCallback) => {
      successCallback('Jeff');
    });
    component.onSubmit();
    expect(component.accountManageForm.value.oldPassword).toBe('abc123');
    expect(component.accountManageForm.value.newPassword).toBe('abc456');
    expect(component.accountManageForm.value.repeatNewPassword).toBe('abc456');
    expect(component.accountManageForm.invalid).toBe(false);
    expect(component.loading).toBe(true);
    expect(spyObj).toHaveBeenCalledTimes(1);
  });

  it('component submit failed in valid', () => {
    component.accountManageForm = {};
    component.accountManageForm.invalid = false;
    component.accountManageForm.value = {};
    component.accountManageForm.value.oldPassword = 'abc123';
    component.accountManageForm.value.newPassword = 'abc456';
    component.accountManageForm.value.repeatNewPassword = 'abc456';
    spyObj = spyOn(authService, 'changePassword').and.callFake((username, oldPassword, newPassword, successCallback, failureCallback) => {
      failureCallback('test');
    });
    component.onSubmit();
    expect(component.accountManageForm.value.oldPassword).toBe('');
    expect(component.accountManageForm.value.newPassword).toBe('');
    expect(component.accountManageForm.value.repeatNewPassword).toBe('');
    expect(component.accountManageForm.invalid).toBe(false);
    expect(component.loading).toBe(true);
    expect(spyObj).toHaveBeenCalledTimes(1);
  });

  it('component can use getter', () => {
    component.accountManageForm = {};
    component.accountManageForm.controls = 'test';
    spyObj = spyOnProperty(component, 'f').and.callThrough();
    expect(component.f).toBe('test');
    expect(spyObj).toHaveBeenCalledTimes(1);
  });
});
