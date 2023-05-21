import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** Componentes */
import { PrivateComponent } from './private.component';
import { ChatComponent } from './pages/chat/chat.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListadoProyectosTareasComponent } from './pages/proyectos/listado-proyectos-tareas/listado-proyectos-tareas.component';
import { ListadoTareasComponent } from './pages/proyectos/listado-tareas/listado-tareas.component';
import { TareaDetailsComponent } from './pages/tarea-details/tarea-details.component';

const routes: Routes = [
  {
    path: '', component: PrivateComponent, children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'chat',
        component: ChatComponent
      },
      {
        path: 'proyectos-y-tareas',
        component: ListadoProyectosTareasComponent
      },
      {
        path: 'tareas/:idProyecto',
        component: ListadoTareasComponent
      },
      {
        path: 'tarea/:idTarea',
        component: TareaDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
