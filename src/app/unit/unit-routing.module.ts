import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewUnitComponent } from './view-unit/view-unit.component';
import { AddUnitComponent } from './add-unit/add-unit.component';

const routes: Routes = [
  {
    path: '',
    component: ViewUnitComponent
  },
  {
    path: 'add-unit',
    component: AddUnitComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitRoutingModule { }
