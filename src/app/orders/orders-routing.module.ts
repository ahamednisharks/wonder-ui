// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { ViewOrdersComponent } from './view-orders/view-orders.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: ViewOrdersComponent
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class OrdersRoutingModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrdersComponent } from './add-orders/add-orders.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';

const routes: Routes = [
  { path: '', redirectTo: 'view', pathMatch: 'full' },
  { path: 'add', component: AddOrdersComponent },
  { path: 'view', component: ViewOrdersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}

