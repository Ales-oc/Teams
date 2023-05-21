/** Módulos */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

/** Guard */
import { RoutesGuard } from './core/shared/guards/routes.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'start',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./private/private.module').then(m => m.PrivateModule),
    data: {
      roles: ['Programador', 'Manager'],
    },
    canActivate: [RoutesGuard]
  },
  {
    path: 'manager',
    loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule),
    data: {
      roles: ['Manager']
    },
    canActivate: [RoutesGuard]
  },
  {
    path: '**',
    redirectTo: '/home/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
