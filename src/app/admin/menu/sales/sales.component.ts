import { Component, OnInit } from '@angular/core';
import { AccessService } from '@services/configuration/access.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  constructor(public _access: AccessService) { }

  ngOnInit() {
  }

}
