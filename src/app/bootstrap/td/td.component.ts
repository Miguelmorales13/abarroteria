import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: "app-td",
  templateUrl: "./td.component.html",
  styleUrls: ["./td.component.css"]
})
export class TdComponent implements OnInit {
  @Input() orderBy;
  @Input() formOrder;
  @Input() name;
  @Input() key;
  constructor() {}

  ngOnInit() {}
}
