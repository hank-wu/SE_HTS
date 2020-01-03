import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { LineChartComponent } from './line-chart.component';

import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http'; 
import {MatInputModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from "ng2-charts";
import { NgModule } from '@angular/core';

import { BodyObservationService } from '../body-observation.service';
import { CarePlanService } from "../care-plan/care-plan.service";
// import { SeLineChartComponent } from "../se-line-chart/se-line-chart.component";

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import * as moment from 'moment';

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

const testData = {
  entry: [{
    resource: {
      valueQuantity: '123',
      effectiveDateTime: '2019-12-01',
      code: {
        text: 'test'
      }
    }
  }]
};


describe('LineChartComponent', () => {
  let component: LineChartComponent;
  let fixture: ComponentFixture<LineChartComponent>;
  let event = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineChartComponent ],
      imports: [
        FormsModule,
        NgxChartsModule,
        NgxDaterangepickerMd.forRoot({
          // separator: '-',
          cancelLabel: 'Cancel',
          applyLabel: 'Apply'
        }),
        MatFormFieldModule,
        MatSelectModule,
        HttpClientModule,
        MatInputModule,
        BrowserAnimationsModule,
        ChartsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([CarePlanService, BodyObservationService], (carePlanService: CarePlanService, bodyObservationService: BodyObservationService) => {
    spyOn(carePlanService, 'getAllCarePlan').and.callFake((successCallback, failureCallback) => {
      successCallback(allCarePlanData, allCarePlanData);
      failureCallback('test');
    });

    fixture = TestBed.createComponent(LineChartComponent);
    fixture.debugElement.nativeElement.style.visibility = "hidden";
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('component should create', () => {
    expect(component).toBeTruthy();
  });

  it('component should select', () => {
    let data = 'test';
    component.onSelect(data);
    expect(data).toBe('test');
  });
  it('component should activate', () => {
    let data = 'test';
    component.onActivate(data);
    expect(data).toBe('test');
  });
  it('component should deactivate', () => {
    let data = 'test';
    component.onDeactivate(data);
    expect(data).toBe('test');
  });
  it('component should click generate', inject([BodyObservationService], (bodyObservationService: BodyObservationService) => {
    component.selected = {
      start: moment(),
      end: moment()
    }
    component.selected.start.year(2019);
    component.selected.start.month(11);
    component.selected.start.date(2);
    component.selected.end.year(2019);
    component.selected.end.month(11);
    component.selected.end.date(3);
    component.selectedPlan = "249507";
    component.planOption.push({
      text: 'test',
      observetype: '249508',
      balance: '123'
    });
    let spyObj = spyOn(bodyObservationService, 'getAllObservation').and.callFake((dateRange, itemType, successCallback, failureCallback) => {
      successCallback(testData);
      failureCallback('test');
    });
    component.generateClick();
    expect(spyObj).toHaveBeenCalledTimes(1);
  }));
  it('component should selectedPlanChange', inject([BodyObservationService], (bodyObservationService: BodyObservationService) => {
    let event = {
      source: {
        value: '123'
      }
    };
    
    let spyObj =  spyOn(bodyObservationService, 'getObservation').and.callFake((value, successCallback, faillureCallback) => {
      successCallback(testData);
      faillureCallback('test');
    });
    component.selectedPlanChange(event);
    expect(spyObj).toHaveBeenCalledTimes(1);
  }));

  it('component should selectedPlanChange failed', inject([BodyObservationService], (bodyObservationService: BodyObservationService) => {
    let event = {
      source: {
        value: '123'
      }
    };
  
    let spyObj = spyOn(bodyObservationService, 'getObservation').and.callFake((value, successCallback, failureCallback) => {
      successCallback({});
      failureCallback();
    });
    component.selectedPlanChange(event);
    expect(spyObj).toHaveBeenCalledTimes(1);
  }));

  it('component should disable to generate', () => {
    component.selected = {
      start: moment(),
      end: moment()
    }
    component.selectedType = '249507';
    expect(component.generateDisabled()).toBe(false);
  })

});
