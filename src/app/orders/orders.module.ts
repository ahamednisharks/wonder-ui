// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { OrdersRoutingModule } from './orders-routing.module';
// import { AddOrdersComponent } from './add-orders/add-orders.component';
// import { ViewOrdersComponent } from './view-orders/view-orders.component';


// @NgModule({
//   declarations: [
//     AddOrdersComponent,
//     ViewOrdersComponent
//   ],
//   imports: [
//     CommonModule,
//     OrdersRoutingModule
//   ]
// })
// export class OrdersModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { OrdersRoutingModule } from './orders-routing.module';
import { AddOrdersComponent } from './add-orders/add-orders.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';

/* PrimeNG Modules */
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    AddOrdersComponent,
    ViewOrdersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    OrdersRoutingModule,

    /* PrimeNG */
    CardModule,
    InputTextModule,
    DropdownModule,
    TableModule,
    ButtonModule,
    CalendarModule,
    InputNumberModule,
    FileUploadModule,
    InputTextareaModule
  ]
})
export class OrdersModule {}
