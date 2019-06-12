import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionsService } from '@services/petitions/sessions.service';

@Injectable({
  providedIn: "root"
})
export class IsNoLoggedGuard implements CanActivate {
  constructor(private _session: SessionsService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // let sess = this._session.getSession();
    if (this._session.isValid(this._session.getToken())) {
      this.router.navigate(["/admin/menu"]);
    }
    return this._session.isValid(this._session.getToken()) ? false : true;
  }
}
