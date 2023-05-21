/** Módulos */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRoutingModule } from './manager-routing.module';
import { FormsModule } from '@angular/forms';

/** Componentes */
import { AddProyectoComponent } from './pages/proyecto-crud/add-proyecto/add-proyecto.component';
import { ManagerComponent } from './manager.component';
import { AddTareaComponent } from './pages/tarea-crud/add-tarea/add-tarea.component';

@NgModule({
  declarations: [
    AddProyectoComponent,
    ManagerComponent,
    AddTareaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ManagerRoutingModule
  ]
})
export class ManagerModule { }
