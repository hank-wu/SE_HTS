import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ObservationItemComponent } from './observation-item.component';

import { MatTableModule } from '@angular/material';
import { MatRadioModule } from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http'; 

import { BodyObservationService } from '../body-observation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ObservationItemDetailDialog } from "./observation-item-detail.component";
import { NgModule, Renderer2 } from '@angular/core';

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

var editObservationItemData = {
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
    "unit": "lb"
  }
}

@NgModule({
  declarations: [ObservationItemDetailDialog],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserModule
  ],
  entryComponents: [
    ObservationItemDetailDialog,
  ]
})
class TestModuleObservationItemDetailDialog {}

describe('ObservationItemComponent', () => {
  let component: ObservationItemComponent;
  let fixture: ComponentFixture<ObservationItemComponent>;

  let radio = {
    "value": {
      "item": "Weight",
      "unit": "kg",
      "id": "249507",
    },
    "checked": true,
    "_elementRef": {
      "nativeElement":{}
    }
  }
  let row = {
    "item": "Weight",
    "unit": "kg",
    "id": "249507",
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationItemComponent ],
      imports: [
        MatTableModule,
        MatRadioModule,
        MatDialogModule,
        HttpClientModule,
        BrowserAnimationsModule,
        TestModuleObservationItemDetailDialog
      ],
    })
    .compileComponents();
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ObservationItemComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  beforeEach(inject([BodyObservationService], (bodyObservationService: BodyObservationService) => {
    let spy = spyOn(bodyObservationService, 'getAllObservationItem').and.callFake((successCallback, failureCallback) => {
        successCallback(allObservationItemData);
        failureCallback('test');
    });
    fixture = TestBed.createComponent(ObservationItemComponent);
    fixture.debugElement.nativeElement.style.visibility = "hidden";
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.dataSource.data.length).toEqual(5);
  });

  it('test_checkState', ()=>{
    component.checkState(radio, row);
    expect(component.currentCheckedValue).toEqual(null);
  });

  it('test_clickNew',
    inject([BodyObservationService], (bodyObservationService: BodyObservationService) => {

      let spy2 = spyOn(bodyObservationService, 'getObservation').and.callFake((id, successCallback, failureCallback) => {
        successCallback(observationItemData);
        failureCallback('test');
      });

      expect(component.dataSource.data.length).toEqual(5);
      component.clickNew();
      component.afterClickNew(249507);
      expect(component.dataSource.data.length).toEqual(6);
    })
  );

  it('test_clickEdit', ()=>{
    component.currentSelectedRow = row;
    expect(component.currentSelectedRow.unit).toEqual("kg");
    component.clickEdit();
    component.afterClickEdit(editObservationItemData);
    expect(component.currentSelectedRow.unit).toEqual("lb");
  });
});
