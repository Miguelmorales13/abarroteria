import { Component, OnInit, Input } from '@angular/core';
import { User } from '@models/user';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {
  @Input('user') user: User = new User();
  constructor() { }

  ngOnInit() {
  }

}
