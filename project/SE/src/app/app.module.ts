import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { ChartsModule } from "ng2-charts";
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BodyObservationComponent } from './body-observation/body-observation.component';
import { CarePlanComponent } from './care-plan/care-plan.component';
import { BodyObservationDetailDialog } from './body-observation/body-observation-detail.component';
import { ObservationItemDetailDialog } from "./observation-item/observation-item-detail.component";
import { CarePlanDetailDialog } from "./care-plan/care-plan-detail.component";


import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { AccountManageComponent } from './account-manage/account-manage.component';
import { ObservationItemComponent } from './observation-item/observation-item.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { StartupService, startupServiceFactory } from './start-up.service';
import { NotificationComponent } from './notification/notification.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BodyObservationDetailDialog,
    BodyObservationComponent,
    CarePlanComponent,
    LogInComponent,
    SignUpComponent,
    UserInfoComponent,
    AccountManageComponent,
    ObservationItemComponent,
    ObservationItemDetailDialog,
    LineChartComponent,
    NotificationComponent,
    CarePlanDetailDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ChartsModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    NgxDaterangepickerMd.forRoot({
      // separator: '-',
      cancelLabel: 'Cancel',
      applyLabel: 'Apply'
    }),
    NgxChartsModule
  ],
  entryComponents: [
    BodyObservationDetailDialog,
    ObservationItemDetailDialog,
    CarePlanDetailDialog
  ],
  providers: [
    StartupService,
    {
        provide: APP_INITIALIZER,
        useFactory: startupServiceFactory,
        deps: [StartupService, Injector],
        multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
