import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CarePlanComponent } from './care-plan.component';

import { MatTableModule } from '@angular/material';
import { MatRadioModule } from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http'; 
import { AuthService } from '../log-in/auth.service';

import { CarePlanService } from "./care-plan.service";
import { BodyObservationService } from '../body-observation.service';
import { NgModule, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarePlanDetailDialog } from "./care-plan-detail.component";

import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';


var allObservationItemData = {
  "resourceType": "Bundle",
  "id": "6aa68ef4-cd4c-428a-a138-6f98298ad4de",
  "meta": {
    "lastUpdated": "2019-12-20T07:41:25.998+00:00"
  },
  "type": "searchset",
  "total": 5,
  "link": [
    {
      "relation": "self",
      "url": "http://hapi.fhir.org/baseR4/Observation?_pretty=true&code=unit&patient=56899"
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
    },
    {
      "fullUrl": "http://hapi.fhir.org/baseR4/Observation/249628",
      "resource": {
        "resourceType": "Observation",
        "id": "249628",
        "meta": {
          "versionId": "2",
          "lastUpdated": "2019-12-13T09:23:24.799+00:00",
          "source": "#DTqtRAIBrKE2N5jx"
        },
        "code": {
          "coding": [
            {
              "code": "unit"
            }
          ],
          "text": "Pressure"
        },
        "subject": {
          "reference": "Patient/56899"
        },
        "valueQuantity": {
          "unit": "kpa"
        }
      },
      "search": {
        "mode": "match"
      }
    },
    {
      "fullUrl": "http://hapi.fhir.org/baseR4/Observation/250083",
      "resource": {
        "resourceType": "Observation",
        "id": "250083",
        "meta": {
          "versionId": "2",
          "lastUpdated": "2019-12-10T15:18:16.608+00:00",
          "source": "#MifgvNvbQfbuOBlO"
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
          "unit": "lb"
        }
      },
      "search": {
        "mode": "match"
      }
    },
    {
      "fullUrl": "http://hapi.fhir.org/baseR4/Observation/251353",
      "resource": {
        "resourceType": "Observation",
        "id": "251353",
        "meta": {
          "versionId": "1",
          "lastUpdated": "2019-12-11T09:14:07.373+00:00",
          "source": "#wO7OwICgbEdozKt6"
        },
        "code": {
          "coding": [
            {
              "code": "unit"
            }
          ],
          "text": "Height"
        },
        "subject": {
          "reference": "Patient/56899"
        },
        "valueQuantity": {
          "unit": "cm"
        }
      },
      "search": {
        "mode": "match"
      }
    },
    {
      "fullUrl": "http://hapi.fhir.org/baseR4/Observation/251354",
      "resource": {
        "resourceType": "Observation",
        "id": "251354",
        "meta": {
          "versionId": "3",
          "lastUpdated": "2019-12-11T09:56:53.830+00:00",
          "source": "#in1IV4xDyB6fBBtc"
        },
        "code": {
          "coding": [
            {
              "code": "unit"
            }
          ],
          "text": "Height"
        },
        "subject": {
          "reference": "Patient/56899"
        },
        "valueQuantity": {
          "unit": "m"
        }
      },
      "search": {
        "mode": "match"
      }
    }
  ]
};

var allCarePlanData = {
  "resourceType": "Bundle",
  "id": "41cf2aff-9ba4-4139-b1cc-351c2ee610cc",
  "meta": {
    "lastUpdated": "2019-12-22T02:37:35.170+00:00"
  },
  "type": "searchset",
  "total": 3,
  "link": [
    {
      "relation": "self",
      "url": "http://hapi.fhir.org/baseR4/Goal?_format=json&_pretty=true&patient=56899"
    }
  ],
  "entry": [
    {
      "fullUrl": "http://hapi.fhir.org/baseR4/Goal/579963",
      "resource": {
        "resourceType": "Goal",
        "id": "579963",
        "meta": {
          "versionId": "1",
          "lastUpdated": "2019-12-20T10:42:48.664+00:00",
          "source": "#TC8ie63kvviLINoO"
        },
        "description": {
          "text": "diet plan"
        },
        "subject": {
          "reference": "Patient/56899"
        },
        "target": [
          {
            "detailQuantity": {
              "value": 75
            }
          }
        ],
        "outcomeReference": [
          {
            "reference": "Observation/249507"
          }
        ]
      },
      "search": {
        "mode": "match"
      }
    },
    {
      "fullUrl": "http://hapi.fhir.org/baseR4/Goal/579964",
      "resource": {
        "resourceType": "Goal",
        "id": "579964",
        "meta": {
          "versionId": "1",
          "lastUpdated": "2019-12-20T10:44:01.110+00:00",
          "source": "#fl79dG1IxmFyl1iz"
        },
        "description": {
          "text": "test plan"
        },
        "subject": {
          "reference": "Patient/56899"
        },
        "target": [
          {
            "detailQuantity": {
              "value": 120
            }
          }
        ],
        "outcomeReference": [
          {
            "reference": "Observation/249628"
          }
        ]
      },
      "search": {
        "mode": "match"
      }
    },
    {
      "fullUrl": "http://hapi.fhir.org/baseR4/Goal/579965",
      "resource": {
        "resourceType": "Goal",
        "id": "579965",
        "meta": {
          "versionId": "1",
          "lastUpdated": "2019-12-20T10:45:07.427+00:00",
          "source": "#LqmPlgs4eRwEjuBs"
        },
        "description": {
          "text": "height record"
        },
        "subject": {
          "reference": "Patient/56899"
        },
        "target": [
          {
            "detailQuantity": {
              "value": 170
            }
          }
        ],
        "outcomeReference": [
          {
            "reference": "Observation/251353"
          }
        ]
      },
      "search": {
        "mode": "match"
      }
    }
  ]
}

var carePlanData = {
  "resourceType": "Bundle",
  "id": "778eae7b-4ebe-40dc-b472-c3ebeec71a77",
  "meta": {
    "lastUpdated": "2019-12-22T04:03:06.114+00:00"
  },
  "type": "searchset",
  "total": 1,
  "link": [
    {
      "relation": "self",
      "url": "http://hapi.fhir.org/baseR4/Goal?_id=579963&_pretty=true"
    }
  ],
  "entry": [
    {
      "fullUrl": "http://hapi.fhir.org/baseR4/Goal/579963",
      "resource": {
        "resourceType": "Goal",
        "id": "579963",
        "meta": {
          "versionId": "1",
          "lastUpdated": "2019-12-20T10:42:48.664+00:00",
          "source": "#TC8ie63kvviLINoO"
        },
        "description": {
          "text": "diet plan"
        },
        "subject": {
          "reference": "Patient/56899"
        },
        "target": [
          {
            "detailQuantity": {
              "value": 75
            }
          }
        ],
        "outcomeReference": [
          {
            "reference": "Observation/249507"
          }
        ]
      },
      "search": {
        "mode": "match"
      }
    }
  ]
}

var editCarePlanData = {
  "resourceType": "Goal",
  "id": "579963",
  "meta": {
    "versionId": "1",
    "lastUpdated": "2019-12-20T10:42:48.664+00:00",
    "source": "#TC8ie63kvviLINoO"
  },
  "description": {
    "text": "diet plan"
  },
  "subject": {
    "reference": "Patient/56899"
  },
  "target": [
    {
      "detailQuantity": {
        "value": 99
      }
    }
  ],
  "outcomeReference": [
    {
      "reference": "Observation/249507"
    }
  ]
}

@NgModule({
  declarations: [CarePlanDetailDialog],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserModule
  ],
  entryComponents: [
    CarePlanDetailDialog,
  ]
})
class TestModule {}

describe('CarePlanComponent', () => {
  let component: CarePlanComponent;
  let fixture: ComponentFixture<CarePlanComponent>;
  let authService: AuthService;
  let ren: Renderer2;

  let radio = {
    "value": 75,
    "checked": true,
    "_elementRef": {
      "nativeElement":{}
    }
  }
  let row = {
    "type": "Weight",
    "value": 75,
    "name": "diet plan",
    "id": "579963",
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarePlanComponent ],
      imports: [
        MatTableModule,
        MatRadioModule,
        MatDialogModule,
        HttpClientModule,
        BrowserAnimationsModule,
        TestModule,
      ],
      providers: [
        AuthService,
        Renderer2,
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([CarePlanService, BodyObservationService], (carePlanService: CarePlanService, bodyObservationService: BodyObservationService) => {
    let spy = spyOn(bodyObservationService, 'getAllObservationItem').and.callFake((successCallback, failureCallback) => {
        successCallback(allObservationItemData);
        failureCallback('test');
    });
    let spy2 = spyOn(carePlanService, 'getAllCarePlan').and.callFake((successCallback, failureCallback) => {
        successCallback(allCarePlanData);
        failureCallback('test');
    });
    fixture = TestBed.createComponent(CarePlanComponent);
    fixture.debugElement.nativeElement.style.visibility = "hidden";
    component = fixture.componentInstance;
    fixture.detectChanges();
    ren = TestBed.get(Renderer2);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.dataSource.data.length).toEqual(3);
  });

  it('test_checkState', ()=>{
    component.checkState(radio, row);
    expect(component.currentCheckedValue).toEqual(null);
  });

  // it('test_checkState', ()=>{
  //   component.checkState(radio, row);
  //   expect(component.currentCheckedValue).toEqual(null);
  //   // let spy = spyOn(ren, 'removeClass').and.callThrough();
  //   component.currentCheckedValue = 75;
  //   component.checkState(radio, row);
  //   expect(component.currentCheckedValue).toEqual(75)
  // });

  // it('test_checkState',
  //   inject([Renderer2], (ren2: Renderer2) => {
  //     component.checkState(radio, row);
  //     expect(component.currentCheckedValue).toEqual(null);

  //     // let spy = spyOn(ren2, 'removeClass').and.callThrough();
  //     component.currentCheckedValue = 75;
  //     component.checkState(radio, row);
  //     expect(component.currentCheckedValue).toEqual(75)
  //   })
  // );

  it('test_clickNew',
    inject([CarePlanService], (carePlanService: CarePlanService) => {
      let spy2 = spyOn(carePlanService, 'getCarePlan').and.callFake((id, successCallback, failureCallback) => {
        successCallback(carePlanData);
        failureCallback('test');
      });

      expect(component.dataSource.data.length).toEqual(3);
      component.clickNew();
      component.afterClickNew(579963);
      expect(component.dataSource.data.length).toEqual(4);
    })
  );

  it('test_clickEdit', ()=>{
    component.currentSelectedRow = row;
    expect(component.currentSelectedRow.value).toEqual(75);
    component.clickEdit();
    component.afterClickEdit(editCarePlanData);
    expect(component.currentSelectedRow.value).toEqual(99);
  });

});
