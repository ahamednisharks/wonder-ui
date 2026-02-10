import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';

export const routes: Routes = [
  { 
    path: '', 
    component: DashboardViewComponent 
  },
  { 
    path: 'dashboard', 
    component: DashboardViewComponent 
  }
];

// const routes: Routes = [
//   { path: 'home', component: DashboardViewComponent },
//   { path: '', redirectTo: 'home', pathMatch: 'full' },
//   { path: '**', redirectTo: 'home' }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
