import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ObservationItemDetailDialog, DialogData } from "./observation-item-detail.component";

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http'; 
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BodyObservationService } from '../body-observation.service';

const dialogMock = {
    close: () => {
    }
}

const model: DialogData = {
    item: "Weight",
    unit: "kg"
};

var observationItemData = {
    "resourceType": "Bundle",
    "id": "e7a82f42-d38b-4429-a734-5f79c6746a7e",
    "meta": {
      "lastUpdated": "2019-12-22T08:14:30.395+00:00"
    },
    "type": "searchset",
    "total": 1,
    "link": [
      {
        "relation": "self",
        "url": "http://hapi.fhir.org/baseR4/Observation?_id=249507&_pretty=true"
      }
    ],
    "entry": [
      {
        "fullUrl": "http://hapi.fhir.org/baseR4/Observation/249507",
        "resource": {
          "resourceType": "Observation",
          "id": "249507",
          "meta": {
            "versionId": "4",
            "lastUpdated": "2019-12-11T11:12:44.415+00:00",
            "source": "#y56PixQN57GdNBjd"
          },
          "code": {
            "coding": [
              {
                "code": "unit"
              }
            ],
            "text": "Weight"
          },
          "subject": {
            "reference": "Patient/56899"
          },
          "valueQuantity": {
            "unit": "kg"
          }
        },
        "search": {
          "mode": "match"
        }
      }
    ]
	}

var createObservationData = {
	"resourceType": "Observation",
	"id": "580761",
	"meta": {
		"versionId": "2",
		"lastUpdated": "2019-12-22T09:08:27.360+00:00",
		"source": "#dlyiwd3Flm5nUcaK"
	},
	"code": {
		"coding": [
			{
				"code": "unit"
			}
		],
		"text": "Weight"
	},
	"subject": {
		"reference": "Patient/56899"
	},
	"valueQuantity": {
		"unit": "mg"
	}
}
	
var httpBody = {
	"resourceType":"Observation",
	"code":{"coding":[{"code":"unit"}],
	"text":"Weight"},"valueQuantity":{"unit":"g"},
	"subject":{"reference":"Patient/56899"}
}

describe('ObservationItemDetailDialog', () => {
    let component: ObservationItemDetailDialog;
    let fixture: ComponentFixture<ObservationItemDetailDialog>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ ObservationItemDetailDialog ],
        imports: [
            FormsModule,
            MatFormFieldModule,
            HttpClientModule,
            MatDialogModule,
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
        ]
      })
      .compileComponents();
    }));
  
    // beforeEach(() => {
    //   fixture = TestBed.createComponent(ObservationItemDetailDialog);
    //   component = fixture.componentInstance;
    //   fixture.detectChanges();
    // });
  
    beforeEach(inject([BodyObservationService], (bodyObservationService: BodyObservationService) => {
      let spy = spyOn(bodyObservationService, 'getObservation').and.callFake((id, successCallback, failureCallback) => {
          successCallback(observationItemData);
          failureCallback('test');
      });
      
      fixture = TestBed.createComponent(ObservationItemDetailDialog);
      fixture.debugElement.nativeElement.style.visibility = "hidden";
      component = fixture.componentInstance;
      fixture.detectChanges();
    }));
  
    it('should create', () => {
      expect(component).toBeTruthy();
      expect(component.unit).toEqual("kg");
    });

    it('test_onNoClick', () => {
        const spyObj = spyOn(component.dialogRef, 'close').and.callThrough();
        component.onNoClick();
        expect(spyObj).toHaveBeenCalledTimes(1);
    });

    it('test_onOkClick',
			inject([BodyObservationService], (bodyObservationService: BodyObservationService) => {
				let spy = spyOn(bodyObservationService, 'createObservation').and.callFake((body, successCallback, failureCallback) => {
					successCallback(createObservationData);
					failureCallback('test');
				});
				component.onOkClick();
				expect(spy).toHaveBeenCalledTimes(1);
			})
		);
		
		it('test_onUpdateClick',
			inject([BodyObservationService], (bodyObservationService: BodyObservationService) => {
				let spy = spyOn(bodyObservationService, 'editObservation').and.callFake((id, body, successCallback, failureCallback) => {
					successCallback(createObservationData);
					failureCallback('test');
				});
				component.onUpdateClick();
				expect(spy).toHaveBeenCalledTimes(1);
			})
  	);

  });