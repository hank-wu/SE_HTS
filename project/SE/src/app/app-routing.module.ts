import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'; 
import { LogInComponent } from './log-in/log-in.component'
import { BodyObservationComponent } from './body-observation/body-observation.component'
import { CarePlanComponent } from "./care-plan/care-plan.component";
import { SignUpComponent } from './sign-up/sign-up.component';
// import { SeLineChartComponent } from "./se-line-chart/se-line-chart.component";
import { LineChartComponent } from"./line-chart/line-chart.component";
import { UserInfoComponent } from "./user-info/user-info.component";
import { AccountManageComponent } from "./account-manage/account-manage.component";
import { ObservationItemComponent } from "./observation-item/observation-item.component";
import { NotificationComponent } from "./notification/notification.component"
import { from } from 'rxjs';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'body-observation',
        component: BodyObservationComponent
      },
      {
        path: 'observation-item',
        component: ObservationItemComponent
      },
      {
        path: 'care-plan',
        component: CarePlanComponent
      },
      {
        path: 'chart',
        component: LineChartComponent
      },
      {
        path: '',
        component: NotificationComponent
      }
    ],
    data: { preload: true }
  },
  {
    path:'log-in',
    component: LogInComponent
  },
  {
    path: '',
    redirectTo: 'log-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'user-info',
    component: UserInfoComponent
  },
  {
    path: 'account-manage',
    component: AccountManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
