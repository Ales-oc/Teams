/** Módulos */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** Componentes */
import { ManagerComponent } from './manager.component';
import { AddProyectoComponent } from './pages/proyecto-crud/add-proyecto/add-proyecto.component';
import { AddTareaComponent } from './pages/tarea-crud/add-tarea/add-tarea.component';

const routes: Routes = [
  {
    path: '', component: ManagerComponent, children: [
      {
        path: 'add-proyecto',
        component: AddProyectoComponent
      },
      {
        path: 'add-tarea/:idProyecto',
        component: AddTareaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
