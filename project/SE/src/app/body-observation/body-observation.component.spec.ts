
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyObservationComponent } from './body-observation.component';
import { Renderer2, RendererFactory2, RendererStyleFlags2 } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { BodyObservationService } from '../body-observation.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from "../log-in/auth.service";
import {MatTableDataSource, MatTable} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';

//--
import { ChangeDetectorRef, ElementRef, IterableDiffers } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';

//--dialog
import { Overlay, OverlayContainer, ScrollStrategy } from '@angular/cdk/overlay';
import { Location } from '@angular/common';
import { InjectionToken, Injector, OnDestroy, TemplateRef } from '@angular/core';
import { MatDialogConfig } from '../../../node_modules/@angular/material/dialog/typings/dialog-config';

import { Observable, observable, Observer } from 'rxjs';

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

var observationData = {
  "resourceType": "Observation",
  "id": "251484",
  "meta": {
    "versionId": "2",
    "lastUpdated": "2019-12-13T07:30:50.677+00:00",
    "source": "#Bmwc9xAzqELWHLwK"
  },
  "subject": {
    "reference": "Patient/56899"
  },
  "effectiveDateTime": "2019-12-11",
  "valueQuantity": {
    "value": 10
  },
  "derivedFrom": [
    {
      "reference": "Observation/250083"
    }
  ]
}

var observationData2 = {
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
};

var observationData3 = {
  "resourceType": "Observation",
  "id": "249507",
  "meta": {
    "versionId": "2",
    "lastUpdated": "2019-12-13T07:30:50.677+00:00",
    "source": "#Bmwc9xAzqELWHLwK"
  },
  "subject": {
    "reference": "Patient/56899"
  },
  "effectiveDateTime": "2019-12-11",
  "valueQuantity": {
    "value": 20
  },
  "derivedFrom": [
    {
      "reference": "Observation/250083"
    }
  ]
};

export class MockAuthService extends AuthService{
  getPatientId(): string{
    return '56899';
  }
}

export class MockBodyObservationService extends BodyObservationService{
  getAllObservationItem(successCallback, failureCallback){
    successCallback(allObservationItemData);
    // failureCallback(data);
  }

  getAllObservation(dateRange, itemType, successCallback, failureCallback){
    // let data = 
    successCallback(allObservationData);
    failureCallback(allObservationData);
  }

  deleteObservation(id, successCallback, failureCallback){
    let data = {};
    successCallback(data);
  }

  getObservation(id, successCallback, failureCallback){
    successCallback(allObservationData);
  }
}

export class MockTable{
  renderRows(){}
}

export class MockRenderer2 extends Renderer2{
  readonly data;
  destroy(): void{}
  createElement(name: string, namespace?: string | null): any{}
  createComment(value: string): any{}
  createText(value: string): any{}
  appendChild(parent: any, newChild: any): void{}
  insertBefore(parent: any, newChild: any, refChild: any): void{}
  removeChild(parent: any, oldChild: any, isHostElement?: boolean): void{}
  selectRootElement(selectorOrNode: string | any, preserveContent?: boolean): any{}
  parentNode(node: any): any{}
  nextSibling(node: any): any{}
  setAttribute(el: any, name: string, value: string, namespace?: string | null): void{}
  removeAttribute(el: any, name: string, namespace?: string | null): void{}
  addClass(el: any, name: string): void{}
  removeClass(el: any, name: string): void{}
  setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void{}
  removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void{}
  setProperty(el: any, name: string, value: any): void{}
  setValue(node: any, value: string): void{}
  listen(target: 'window' | 'document' | 'body' | any, eventName: string, callback: (event: any) => boolean | void): any{}
}

export class MockSubscribe{
  subscribe():any {}
}

export class MockDialogRef{
  mockSubscribe = new MockSubscribe();
  afterClosed(): any{
    return this.mockSubscribe;
  }
  
  // data = new Observable();
  // data: Observable<any>;
  // afterClosed(): Observable<any>{
  //   return this.data;
  // }
}

export class MockDialog extends MatDialog{
  dialogRef = new MockDialogRef()
  open(): any{
    return this.dialogRef;
  }
}

describe('BodyObservationComponent', () => {
  let _overlay: Overlay;
  let _injector: Injector;
  let _location: Location;
  let _defaultOptions: MatDialogConfig;
  let scrollStrategy: any;
  let _parentDialog: MatDialog;
  let _overlayContainer: OverlayContainer;
  
  let http: HttpClient;

  let dialog;
  let ren2;
  let mockAuthService;
  let mockBodyObservationService;
  let bodyObservationComponent;

  let radio = {
    "value": 65,
    "_elementRef": {
      "nativeElement":{}
    }
  }
  let row = {
    "type": "Pressure",
    "value": 65,
    "unit": "kpa",
    "id": "59198",
    "date": "2019-12-26"
  }

  beforeEach(() => {
    dialog = new MockDialog(_overlay, _injector, _location, _defaultOptions, scrollStrategy, _parentDialog, _overlayContainer);
    ren2 = new MockRenderer2();
    mockAuthService = new MockAuthService(http);
    mockBodyObservationService = new MockBodyObservationService(http, mockAuthService);
    bodyObservationComponent = new BodyObservationComponent(ren2, dialog, mockBodyObservationService);

    bodyObservationComponent.table = new MockTable();

    bodyObservationComponent.dataSource = {};
    bodyObservationComponent.dataSource.data = [];
  });

  it('test_ngOnInit', ()=>{
    expect(bodyObservationComponent.dataSource.data.length).toEqual(0);
    bodyObservationComponent.ngOnInit();
    expect(bodyObservationComponent.dataSource.data.length).toEqual(2);
  });

  it('test_getItemSuccess', ()=>{
    expect(bodyObservationComponent.dataSource.data.length).toEqual(0);
    bodyObservationComponent.getItemSuccess(allObservationItemData, mockBodyObservationService);
    expect(bodyObservationComponent.dataSource.data[0].unit).toEqual("kpa");
    expect(bodyObservationComponent.dataSource.data.length).toEqual(2);
  });

  it('test_setObservation', ()=>{
    bodyObservationComponent.getItemSuccess(allObservationItemData, mockBodyObservationService);
    bodyObservationComponent.setObservation(observationData);
    expect(bodyObservationComponent.dataSource.data[2].unit).toEqual("lb");
  });

  it('test_search', ()=>{
    bodyObservationComponent.getItemSuccess(allObservationItemData, mockBodyObservationService);

    bodyObservationComponent.selected.start.year(2019);
    bodyObservationComponent.selected.start.month(11);
    bodyObservationComponent.selected.start.date(2);
    bodyObservationComponent.selected.end.year(2020);
    bodyObservationComponent.selected.end.month(0);
    bodyObservationComponent.selected.end.date(30);

    // expect(bodyObservationComponent.dataSource.data.length).toEqual(3);

    // let _differs: IterableDiffers;
    // let _changeDetectorRef: ChangeDetectorRef;
    // let _elementRef: ElementRef;
    // let role: string;
    // let _dir: Directionality;
    // let _document: any;
    // let _platform: Platform;
    // bodyObservationComponent.table = new MockTable(_differs, _changeDetectorRef, _elementRef, role, _dir, _document, _platform);

    // let spy: any;
    // spy = spyOn(bodyObservationComponent.table, 'renderRows');

    bodyObservationComponent.search();
    expect(bodyObservationComponent.dataSource.data.length).toEqual(2);
    // let radio: MatRadioModule;
  });

  it('test_checkState', ()=>{
    bodyObservationComponent.currentCheckedValue = 65;
    bodyObservationComponent.checkState(radio, row);
    expect(bodyObservationComponent.currentCheckedValue).toEqual(65);
    
    bodyObservationComponent.currentCheckedValue = 64;
    bodyObservationComponent.checkState(radio, row);
    expect(bodyObservationComponent.currentCheckedValue).toEqual(64);
  });

  it('test_clickDelete', ()=>{
    bodyObservationComponent.getItemSuccess(allObservationItemData, mockBodyObservationService);
    bodyObservationComponent.currentSelectedRow = row;
    bodyObservationComponent.clickDelete();
    expect(bodyObservationComponent.currentSelectedRow).toEqual(null);
  });

  it('test_clickNew', ()=>{
    bodyObservationComponent.getItemSuccess(allObservationItemData, mockBodyObservationService);
    expect(bodyObservationComponent.dataSource.data.length).toEqual(2);
    bodyObservationComponent.clickNew();
    bodyObservationComponent.afterClickNew(251484);
    expect(bodyObservationComponent.dataSource.data.length).toEqual(3);

  });

  it('test_clickEdit', ()=>{
    bodyObservationComponent.getItemSuccess(allObservationItemData, mockBodyObservationService);
    bodyObservationComponent.currentSelectedRow = row;
    expect(bodyObservationComponent.currentSelectedRow.value).toEqual(65);
    bodyObservationComponent.clickEdit();
    bodyObservationComponent.afterClickEdit(observationData3);
    expect(bodyObservationComponent.currentSelectedRow.value).toEqual(20);
  });

  
});
