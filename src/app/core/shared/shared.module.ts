/** Componentes */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from "./services/auth/auth.module";
import { RouterModule } from '@angular/router';

/** Módulos */
import { SidebarComponent } from './components/sidebar/sidebar.component';


@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    AuthModule,
    RouterModule
  ]
})
export class SharedModule { }
