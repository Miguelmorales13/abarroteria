import { Component, OnInit, Input } from '@angular/core';
import { Categori } from '@models/categori';

@Component({
  selector: 'app-details-categori',
  templateUrl: './details-categori.component.html',
  styleUrls: ['./details-categori.component.css']
})
export class DetailsCategoriComponent implements OnInit {
  @Input('categori') categori: Categori = new Categori();
  constructor() { }

  ngOnInit() {
  }

}
