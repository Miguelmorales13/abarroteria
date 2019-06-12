import { Component, OnInit, Input } from '@angular/core';
import { Rol } from '@models/rol';

@Component({
  selector: 'app-details-rol',
  templateUrl: './details-rol.component.html',
  styleUrls: ['./details-rol.component.css']
})
export class DetailsRolComponent implements OnInit {
  @Input("rol") rol: Rol = new Rol();
  constructor() { }

  ngOnInit() {
  }

}
