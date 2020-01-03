import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';

import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http'; 
import { BodyObservationService } from '../body-observation.service';
import { CarePlanService } from "../care-plan/care-plan.service";

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

var allObservationData = {
  "resourceType": "Bundle",
  "id": "92e10e02-26ea-4285-bbd5-0f4c56da8b09",
  "meta": {
    "lastUpdated": "2019-12-20T10:14:53.757+00:00"
  },
  "type": "searchset",
  "total": 16,
  "link": [
    {
      "relation": "self",
      "url": "http://hapi.fhir.org/baseR4/Observation?_format=json&_pretty=true&date=%3E%3D2019-12-01&date=%3C%3D2020-02-07&patient=56899"
    }
  ],
  "entry": [
    {
      "fullUrl": "http://hapi.fhir.org/baseR4/Observation/59198",
      "resource": {
        "resourceType": "Observation",
        "id": "59198",
        "meta": {
          "versionId": "15",
          "lastUpdated": "2019-12-13T07:29:03.971+00:00",
          "source": "#w28mMksNy41ZBkI0"
        },
        "subject": {
          "reference": "Patient/56899"
        },
        "effectiveDateTime": "2019-12-26",
        "valueQuantity": {
          "value": 65
        },
        "derivedFrom": [
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
      "fullUrl": "http://hapi.fhir.org/baseR4/Observation/251482",
      "resource": {
        "resourceType": "Observation",
        "id": "251482",
        "meta": {
          "versionId": "2",
          "lastUpdated": "2019-12-13T07:29:12.998+00:00",
          "source": "#TkUA2jE5VYdvM0ib"
        },
        "subject": {
          "reference": "Patient/56899"
        },
        "effectiveDateTime": "2019-12-11",
        "valueQuantity": {
          "value": 123
        },
        "derivedFrom": [
          {
            "reference": "Observation/250083"
          }
        ]
      },
      "search": {
        "mode": "match"
      }
    }
  ]
};

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationComponent ],
      imports: [
        MatCardModule,
        HttpClientModule
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
    let spy3 = spyOn(bodyObservationService, 'getAllObservation').and.callFake((dateRange, itemType, successCallback, failureCallback) => {
      successCallback(allObservationData);
      failureCallback('test');
  });

    fixture = TestBed.createComponent(NotificationComponent);
    fixture.debugElement.nativeElement.style.visibility = "hidden";
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.messages.length).toEqual(0);
  });

  it('component should get observation failed', () => {
    let testData = {};
    let itemName = 'kg';
    let planName = 'get Wegiht';
    let messages = [];
    component.getObservationSuccess(testData, itemName, planName, messages);
    expect(testData).toEqual({});
  });
});
