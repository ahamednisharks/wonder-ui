import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingRoutingModule } from './billing-routing.module';
import { AddBillingComponent } from './add-billing/add-billing.component';
import { ViewBillingComponent } from './view-billing/view-billing.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// PrimeNG Modules
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    AddBillingComponent,
    ViewBillingComponent
  ],
  imports: [
    CommonModule,
    BillingRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // PrimeNG
    TabViewModule,
    CardModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    ToastModule,
    DialogModule,
    CalendarModule   
  ]
})
export class BillingModule {}
