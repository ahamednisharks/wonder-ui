import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitRoutingModule } from './unit-routing.module';
import { AddUnitComponent } from './add-unit/add-unit.component';
import { ViewUnitComponent } from './view-unit/view-unit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ToggleButtonModule } from 'primeng/togglebutton';


@NgModule({
  declarations: [
    AddUnitComponent,
    ViewUnitComponent
  ],
  imports: [
    CommonModule,
    UnitRoutingModule,
    ReactiveFormsModule,

    // PrimeNG
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    ButtonModule,
    TableModule,
    ToggleButtonModule,
    CardModule,
    FormsModule,
    TableModule,
    DropdownModule,
  ]
})
export class UnitModule { }
