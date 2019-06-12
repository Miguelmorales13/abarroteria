import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input('title') public title: string = '';
  @Input('modal_id') public modal_id: string;
  @Input('type') public type: string;
  constructor() { }

  ngOnInit() {
  }

}
