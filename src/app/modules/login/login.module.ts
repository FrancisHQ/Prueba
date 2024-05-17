import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { loginRoutingModule } from './login-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, CardModule, FormsModule, InputTextModule, ButtonModule, ReactiveFormsModule, loginRoutingModule],
})
export class loginModule {}
