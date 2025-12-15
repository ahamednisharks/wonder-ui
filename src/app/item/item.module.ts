import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { ViewItemComponent } from './view-item/view-item.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';



@NgModule({
  declarations: [
    ViewItemComponent,
    AddItemComponent
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    ReactiveFormsModule,
    ItemRoutingModule,


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
    FileUploadModule
  ]
})
export class ItemModule { }
