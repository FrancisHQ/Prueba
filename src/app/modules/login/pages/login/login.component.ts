import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginPrd: AuthenticationService,
    private routerprd: Router
  ) {}

  ngOnInit(): void {
    this.myForm = this.createMyForm();
  }

  private createMyForm(): FormGroup {
    return this.fb.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public submitFormulario() {
    if (this.myForm.invalid) {
      Object.values(this.myForm.controls).forEach((control) => {
        control.markAllAsTouched();
      });
      return;
    }
    if (!this.loginPrd.ingresarAplicativo(this.myForm.value)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario o contraseña inválida.',
      });
    } else {
      sessionStorage.setItem('userData', JSON.stringify(this.myForm.value));
      this.routerprd.navigateByUrl('/sesion/principal');
    }
  }

  public get f(): any {
    return this.myForm.controls;
  }
}
