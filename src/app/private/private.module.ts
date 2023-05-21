/** Módulos */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocketIoModule } from 'ngx-socket-io';
import { PrivateRoutingModule } from './private-routing.module';
import { SharedModule } from '../core/shared/shared.module';
import { NgxPaginationModule } from "ngx-pagination";
import { ManagerModule } from '../manager/manager.module';

/** Componentes */
import { PrivateComponent } from './private.component';
import { ChatComponent } from './pages/chat/chat.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListadoProyectosTareasComponent } from './pages/proyectos/listado-proyectos-tareas/listado-proyectos-tareas.component';
import { ListadoTareasComponent } from './pages/proyectos/listado-tareas/listado-tareas.component';
import { TareaDetailsComponent } from './pages/tarea-details/tarea-details.component';

@NgModule({
  declarations: [
    PrivateComponent,
    ChatComponent,
    DashboardComponent,
    ListadoProyectosTareasComponent,
    ListadoTareasComponent,
    TareaDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SocketIoModule,
    PrivateRoutingModule,
    SharedModule,
    NgxPaginationModule,
    ManagerModule
  ]
})
export class PrivateModule { }
