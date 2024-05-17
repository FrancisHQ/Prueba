import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const rutas: Routes = [
  {
    path: '',
    children: [{ path: 'login', component: LoginComponent }],
  },
];
@NgModule({ imports: [RouterModule.forChild(rutas)], exports: [RouterModule] })
export class loginRoutingModule {}
