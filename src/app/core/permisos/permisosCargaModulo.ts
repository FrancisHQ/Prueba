import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "src/app/shared/service/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class permisosCargarModulos implements CanLoad{
  constructor(private router: Router, private autenticacionPrd: AuthenticationService) { }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(!Boolean(this.autenticacionPrd.getAutenticationBySession()))
      {
        return this.router.parseUrl("/sinsesion/login")
      }
    return Boolean(this.autenticacionPrd.getAutenticationBySession());
  }

}