import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'item',
    loadChildren: () =>
      import('./item/item.module').then(m => m.ItemModule)
  },
  {
    path: 'unit',
    loadChildren: () =>
      import('./unit/unit.module').then(m => m.UnitModule)
  },
  {
    path: 'billing',
    loadChildren: () =>
      import('./billing/billing.module').then(m => m.BillingModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
