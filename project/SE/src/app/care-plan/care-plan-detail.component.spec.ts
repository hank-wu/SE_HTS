import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CarePlanDetailDialog, DialogData } from './care-plan-detail.component';
import { CarePlanService } from './care-plan.service';
import { AuthService } from '../log-in/auth.service';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const dialogMock = {
    close: () => {
    }
};

const model: DialogData = {
    itemOption: [{
        id: '249507',
        type: 'weight',
        unit: 'kg'
    }],
    id: 56899
};

describe('CarePlanDetailDialog', () => {
    let component: CarePlanDetailDialog;
    let fixture: ComponentFixture<CarePlanDetailDialog>;
    let authService: AuthService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CarePlanDetailDialog ],
            imports: [
            MatFormFieldModule,
            MatSelectModule,
            FormsModule,
            MatDatepickerModule,
            HttpClientTestingModule,
            MatNativeDateModule,
            MatMomentDateModule,
            MatInputModule,
            BrowserAnimationsModule
            ],
            providers: [
            {
                provide: MatDialogRef,
                useValue: dialogMock
            },
            {
                provide: MAT_DIALOG_DATA,
                useValue: model
            },
            AuthService
            ]
        })
        .compileComponents();
    }));

    const result = {
        entry: [{
          resource: {
              target: [{
                  detailQuantity: {
                      value: 'Get Weight'
                  }
              }],
              description: {
                text: 'Eat much'
              },
              outcomeReference: [
                  {
                      reference: 'Observation/249507'
                  }
              ]
          }
        }]
    };
    beforeEach(inject([CarePlanService], (carePlanService: CarePlanService) => {
        spyOn(carePlanService, 'getCarePlan').and.callFake((id, successCallback, failureCallback) => {
            successCallback(result);
            failureCallback('test');
        });
        fixture = TestBed.createComponent(CarePlanDetailDialog);
        fixture.debugElement.nativeElement.style.visibility = "hidden";
        component = fixture.componentInstance;
        fixture.detectChanges();
        authService = TestBed.get(AuthService);
        component.ngOnInit();
    }));

    it('component should create', () => {
        expect(component.dialogdata.id).toBe(56899);
        expect(component).toBeTruthy();
    });

    it('component should click No', () => {
        const spyObj = spyOn(component.dialogRef, 'close').and.callThrough();
        component.onNoClick();
        expect(spyObj).toHaveBeenCalledTimes(1);
    });

    it('component should click Ok', inject([CarePlanService], (carePlanService: CarePlanService) => {
        spyOn(authService, 'getPatientId').and.callFake(() => {
            return '56899';
        });
        const spyObj = spyOn(component.dialogRef, 'close').and.callThrough();
        const spyObj_2 = spyOn(carePlanService, 'createCarePlan').and.callFake((body, successCallback, failureCallback) => {
            successCallback('56899');
            failureCallback('test');
        });
        component.onOkClick();
        expect(spyObj).toHaveBeenCalledTimes(1);
        expect(spyObj_2).toHaveBeenCalledTimes(1);
    }));

    it('component should click Update', inject([CarePlanService], (carePlanService: CarePlanService) => {
        spyOn(authService, 'getPatientId').and.callFake(() => {
            return '56899';
        });
        const spyObj = spyOn(component.dialogRef, 'close').and.callThrough();
        const spyObj_2 = spyOn(carePlanService, 'editCarePlan').and.callFake((id, body, successCallback, failureCallback) => {
            successCallback('56899');
            failureCallback('test');
        });
        component.onUpdateClick();
        expect(spyObj).toHaveBeenCalledTimes(1);
        expect(spyObj_2).toHaveBeenCalledTimes(1);
    }));
});
