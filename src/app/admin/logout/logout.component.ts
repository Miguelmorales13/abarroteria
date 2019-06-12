import { Component, OnInit } from '@angular/core';
import { GlobalService } from '@services/configuration/global.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(public _global: GlobalService) { }

  ngOnInit() {
  }

}
