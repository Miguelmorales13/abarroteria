import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalService } from '@services/configuration/global.service';
import { HelpersService } from '@services/configuration/helpers.service';
import { SessionsService } from '@services/petitions/sessions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  petition=false;
  constructor(public _global: GlobalService,
    public _helpers: HelpersService,
    private route: Router,
    private _session: SessionsService 
    ) { }

  ngOnInit() {
  }
  onSubmit(formLogin: NgForm): void {
    if (!formLogin.valid) return this._helpers.msgInfo('Verifica tus datos');
    this.petition=true;
    this._session.goLogin(formLogin.value).subscribe(
      data => {
        this._session.setToken(data.token);
        this._session.setSession(data.token);
        if (this._session.isValid(this._session.getToken())) {
          this._helpers.msgSuccess('Iniciando Sesion');
          this.route.navigate(['/admin/menu'])
        } else {
          this._session.removeToken();
          this._session.deleteSession();
        }
      }, error => [this._helpers.msgError(this._helpers.goError(error)),this.petition=false],
      ()=>  this.petition=false
    );
    
  }
  


}
