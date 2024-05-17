import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { IUser } from 'src/app/interfaces/IUser';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.scss']
})
export class ContenidoComponent implements OnInit {
  userData?: IUser;
  itemNav: MenuItem[] | undefined;

  constructor(
    private aut: AuthenticationService,
    private router: Router,
  ) {
    const userDataString = sessionStorage.getItem('userData');
    if(userDataString){
      this.userData = JSON.parse(userDataString);
    }
   }

  ngOnInit() {
    this.itemNav = [{ label: 'Salir', icon: 'pi pi-sign-out', command: () => {
      this.cerrarSesion()}
}];
  }

  public cerrarSesion() {
    this.aut.limpiarDataBySession();
    this.router.navigateByUrl('/sinsesion/login');
  }
}
