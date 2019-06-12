import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit {
  @Input('field') field: any;
  @Input('nameField') nameField?: any='';
  constructor() { }

  ngOnInit() {}
  getPattern(pattern: String) {
    return pattern.slice(4, -2)
  }
}
