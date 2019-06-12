import { Injectable } from '@angular/core';
import { SessionsService } from '@services/petitions/sessions.service';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  constructor(private _session: SessionsService) { }

  accessRolsRoutes(section: string): boolean{
    
    if (!this._session.verifySession(this._session.getToken())) return  false;
    const rol=this._session.getAnyUser('rol.permisos')
    const sentence=`rol.${section}.agregar || rol.${section}.eliminar || rol.${section}.modificar || rol.${section}.ver`
    return eval(sentence) ?true: false
  }
  accessRolsSection(section: string, type:string ): boolean{
    if (!this._session.verifySession(this._session.getToken())) return  false;
    const rol=this._session.getAnyUser('rol.permisos')
    const sentence=`rol.${section}.${type}`
    return (eval(sentence)) ? true: false
  }

}
