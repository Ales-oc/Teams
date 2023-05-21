import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** Componentes */
import { PublicComponent } from "./public.component";
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from "./pages/login/login.component";

const routes: Routes = [
  {
    path: '', component: PublicComponent, children:
    [
      {
        path: '',
        redirectTo:'login',
        pathMatch: 'full'
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
