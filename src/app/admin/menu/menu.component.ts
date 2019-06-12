import { Component, OnInit } from '@angular/core';
import { GlobalService } from '@services/configuration/global.service';
import { AccessService } from '@services/configuration/access.service';
import { SessionsService } from '@services/petitions/sessions.service';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  collapedSideBar: boolean;

  constructor(public _global: GlobalService, private _access: AccessService, private _session: SessionsService, private route: Router) { }

  ngOnInit() {
  }
  logout(event):void{
    this._session.removeToken()
    this._session.deleteSession();
    this.route.navigate(['/admin/adios'])
  }
  receiveCollapsed($event) {
      this.collapedSideBar = $event;
  }

}
