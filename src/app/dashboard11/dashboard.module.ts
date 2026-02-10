// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { DashboardRoutingModule } from './dashboard-routing.module';
// import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
// import { NgApexchartsModule } from 'ng-apexcharts';


// @NgModule({
//   declarations: [
//     DashboardViewComponent
//   ],
//   imports: [
//     CommonModule,
//     DashboardRoutingModule,
//     NgApexchartsModule
//   ]
// })
// export class DashboardModule { }



// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import {
//   CardModule,
//   GridModule,
//   ButtonModule,
//   BadgeModule,
//   ProgressModule
// } from '@coreui/angular';

// // import { ChartjsModule } from '@coreui/angular-chartjs';
// // import { ChartjsModule } from '@coreui/angular';
// import { ChartjsModule } from '@coreui/angular-chartjs';

// import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';

// @NgModule({
//   declarations: [DashboardViewComponent],
//   imports: [
//     CommonModule,

//     // CoreUI (ONLY dashboard)
//     CardModule,
//     GridModule,
//     ButtonModule,
//     BadgeModule,
//     ProgressModule,
//     ChartjsModule
//   ]
// })
// export class DashboardModule {}




import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  CardModule,
  GridModule,
  ButtonModule,
  BadgeModule,
  ProgressModule
} from '@coreui/angular';

import { ChartjsModule } from '@coreui/angular-chartjs';

import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { IconModule } from '@coreui/icons-angular';

@NgModule({
  declarations: [DashboardViewComponent],
  imports: [
    CommonModule,

    CardModule,
    GridModule,
    ButtonModule,
    BadgeModule,
    ProgressModule,
    ChartjsModule,
    IconModule   
  ]
})
export class DashboardModule {}
