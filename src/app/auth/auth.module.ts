import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NbPasswordAuthStrategy, NbAuthModule } from '@nebular/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule
} from '@nebular/theme';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    // LoginComponent

    // RegisterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbAuthModule.forRoot({
         strategies: [
           NbPasswordAuthStrategy.setup({
             name: 'email',
             baseEndpoint: 'http://localhost:8000',
              login: {
                // ...
                endpoint: '/auth/signin',
                method: 'post'
              },
           }),
         ],
         forms: {
          login: {
            redirectDelay: 0,
             showMessages: {
               success: true,
             },
           }
         },
       }),
  ]
})
export class AuthModule { }
