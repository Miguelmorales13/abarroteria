import { Component, OnInit, Input } from '@angular/core';
import { Client } from '@models/client';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.css']
})
export class DetailsClientComponent implements OnInit {
  @Input('client') client: Client = new Client();
  constructor() { }

  ngOnInit() {
  }

}
