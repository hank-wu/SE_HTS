import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BodyObservationDetailDialog, DialogData } from './body-observation-detail.component';
import { BodyObservationService } from '../body-observation.service';
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
}

const model: DialogData = {
    itemOption: [{
        id: '249507',
        type: 'height',
        unit: 'cm'
    }],
    id: 56899
};

const noIdModel: DialogData = {
  itemOption: [{
      id: '249507',
      type: 'height',
      unit: 'cm'
  }],
  id: undefined
};

describe('BodyObservationDetailDialog', () => {
  let component: BodyObservationDetailDialog;
  let fixture: ComponentFixture<BodyObservationDetailDialog>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyObservationDetailDialog ],
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

//   beforeEach(async() => {
//     // bodyObservationService = new BodyObservationService();
//     fixture = TestBed.createComponent(BodyObservationDetailDialog);
//     component = fixture.componentInstance;
//     // spyOn()
//     fixture.detectChanges();
//     authService = TestBed.get(AuthService);
//   });
  let result = {
      entry: [{
        resource: {
            valueQuantity: {
                value: 'kg'
            },
            effectiveDateTime: '2019-12-25',
            derivedFrom: [
                {
                    reference: 'Observation/249507'
                }
            ]
        }
      }]
  };
  beforeEach(inject([BodyObservationService], (bodyObservationService: BodyObservationService) => {
    let spy = spyOn(bodyObservationService, 'getObservation').and.callFake((id, successCallback, failureCallback) => {
        successCallback(result);
        failureCallback('test');
    });
    fixture = TestBed.createComponent(BodyObservationDetailDialog);
    fixture.debugElement.nativeElement.style.visibility = "hidden";
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.get(AuthService);
  }));

  it('component should be created', () => {
    expect(component.dialogdata.id).toBe(56899);
    expect(component).toBeTruthy();
  });

  it('component should on NoClick', () => {
    const spyObj = spyOn(component.dialogRef, 'close').and.callThrough();
    component.onNoClick();
    expect(spyObj).toHaveBeenCalledTimes(1);
  });

  it('component should onUpdate', inject([BodyObservationService], (bodyObservationService: BodyObservationService) => {
    spyOn(authService, 'getPatientId').and.callFake(() => {
        return '56899';
    });
    const spyObj = spyOn(component.dialogRef, 'close').and.callThrough();
    const spyObj_2 = spyOn(bodyObservationService, 'editObservation').and.callFake((id, body, successCallback, failureCallback) => {
        successCallback('56899');
        failureCallback('test');
    });
    component.onUpdateClick();
    expect(spyObj).toHaveBeenCalledTimes(1);
    expect(spyObj_2).toHaveBeenCalledTimes(1);
  }));

  it('component should getUnit', () => {
    expect(component.getUnit()).toBe('cm');
  });

  it('component should not getUnit', () => {
    component.selectedType = '';
    expect(component.getUnit()).toBe('');
  });
});

describe('BodyObservationDetailDialogNewMode', ()=>{
  let component: BodyObservationDetailDialog;
  let fixture: ComponentFixture<BodyObservationDetailDialog>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyObservationDetailDialog ],
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
            useValue: noIdModel
        },
        AuthService
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([BodyObservationService], (bodyObservationService: BodyObservationService) => {
    fixture = TestBed.createComponent(BodyObservationDetailDialog);
    fixture.debugElement.nativeElement.style.visibility = "hidden";
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.get(AuthService);
  }));

  it('component should be created', () => {
    expect(component.title).toBe('Create new observation');
    expect(component).toBeTruthy();
  });

  it('component should onOkClick', inject([BodyObservationService], (bodyObservationService: BodyObservationService) => {
    spyOn(authService, 'getPatientId').and.callFake(() => {
        return '56899';
    });
    const spyObj = spyOn(component.dialogRef, 'close').and.callThrough();
    const spyObj_2 = spyOn(bodyObservationService, 'createObservation').and.callFake((body, successCallback, failureCallback) => {
        successCallback('56899');
        failureCallback('test');
    });
    component.onOkClick();
    expect(spyObj).toHaveBeenCalledTimes(1);
    expect(spyObj_2).toHaveBeenCalledTimes(1);
  }));
  
});
