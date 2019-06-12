import { Component, OnInit, Input } from '@angular/core';
import { Categori } from '@models/categori';
import { GlobalService } from '@services/configuration/global.service';

@Component({
  selector: 'app-categori',
  templateUrl: './categori.component.html',
  styleUrls: ['./categori.component.css']
})
export class CategoriComponent implements OnInit {
  @Input('categori') categori: Categori= new Categori();
  constructor(public _global: GlobalService) { }

  ngOnInit() {
  }

}
