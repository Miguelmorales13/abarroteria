import { Component, OnInit, Input } from '@angular/core';
import { Subcategori } from '@models/subcategori';
import { Categori } from '@models/categori';

@Component({
  selector: "app-details-subcategori",
  templateUrl: "./details-subcategori.component.html",
  styleUrls: ["./details-subcategori.component.css"]
})
export class DetailsSubcategoriComponent implements OnInit {
  @Input("subcategori") subcategori: Subcategori = new Subcategori();
  constructor() {}

  ngOnInit() { }
}
