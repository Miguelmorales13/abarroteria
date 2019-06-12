import { Component, OnInit,Input } from '@angular/core';
import { Subcategori } from '@models/subcategori';
import { GlobalService } from '@services/configuration/global.service';
import { Categori } from '@models/categori';

@Component({
  selector: 'app-subcategori',
  templateUrl: './subcategori.component.html',
  styleUrls: ['./subcategori.component.css']
})
export class SubcategoriComponent implements OnInit {
  @Input('subcategori') subcategori: Subcategori = new Subcategori();
  constructor(public _global: GlobalService) { }

  ngOnInit() {
  }

}
