import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SesionComponent } from './layout/public/sesion/sesion.component';
import { ContenidoComponent } from './layout/private/contenido/contenido.component';
import { PermisosRutasService } from './core/permisos/permisosRutas.service';
import { permisosCargarModulos } from './core/permisos/permisosCargaModulo';

const routes: Routes = [
  {
    path: 'sinsesion',
    component: SesionComponent,
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.loginModule),
  },
  {
    path: 'sesion',
    component: ContenidoComponent,
    canActivate: [PermisosRutasService],
    canLoad: [permisosCargarModulos],
    loadChildren: () =>
      import('./modules/principal/principal.module').then(
        (m) => m.principalModule
      ),
  },
  {
    path: '**',
    redirectTo: 'sinsesion/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
