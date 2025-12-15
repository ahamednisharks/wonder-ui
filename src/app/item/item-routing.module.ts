import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewItemComponent } from './view-item/view-item.component';
import { AddItemComponent } from './add-item/add-item.component';

const routes: Routes = [
  {
    path: '',
    component: ViewItemComponent
  },
  {
    path: 'view-item',
    component: ViewItemComponent
  },
  {
    path: 'add-item',
    component: AddItemComponent
  },
  {
    path: 'update-item',
    component: AddItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
