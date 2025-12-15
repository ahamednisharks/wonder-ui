import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewBillingComponent } from './view-billing/view-billing.component';
import { AddBillingComponent } from './add-billing/add-billing.component';

const routes: Routes = [
  {
    path: '',
    component: ViewBillingComponent
  },
  {
    path: 'add-billing',
    component: AddBillingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule { }
