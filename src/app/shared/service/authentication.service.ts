import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private ingresar:boolean = false;
  constructor() { }

  public ingresarAplicativo(obj:any):boolean{
    this.ingresar = obj.usuario == "keola" && obj.password == "keola";
    return this.ingresar;
  }

  public habilitarlogeo(){
    return this.ingresar;
  }

  getAutenticationBySession(){
    return sessionStorage.getItem("userData")
  }
  public limpiarDataBySession(){
    return sessionStorage.setItem("userData", '');
  }
}