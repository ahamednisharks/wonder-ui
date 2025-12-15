// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { LoginRoutingModule } from './login-routing.module';
// import { LoginPageComponent } from './login-page/login-page.component';


// @NgModule({
//   declarations: [
//     LoginPageComponent
//   ],
//   imports: [
//     CommonModule,
//     LoginRoutingModule
//   ]
// })
// export class LoginModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    FormsModule,

    // PrimeNG
    InputTextModule,
    PasswordModule,
    ButtonModule
  ]
})
export class LoginModule {}

