/** Módulos */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../core/shared/shared.module';

/** Componentes */
import { PublicComponent } from './public.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';



@NgModule({
  declarations: [
    PublicComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class PublicModule { }
