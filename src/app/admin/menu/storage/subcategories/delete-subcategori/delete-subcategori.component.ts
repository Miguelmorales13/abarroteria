import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GlobalService } from '@services/configuration/global.service';
import { SubcategoriesService } from '@services/petitions/subcategories.service';
import { HelpersService } from '@services/configuration/helpers.service';

@Component({
  selector: 'app-delete-subcategori',
  templateUrl: './delete-subcategori.component.html',
  styleUrls: ['./delete-subcategori.component.css']
})
export class DeleteSubcategoriComponent implements OnInit {
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  petition=false;
  constructor(public _global: GlobalService, private _subcategories: SubcategoriesService, private _helpers: HelpersService) { }

  ngOnInit() {
  }
  confirm(): void {
    this.petition=true
    this._subcategories
      .deleteSubcategori(this._global.selectedSubcategori._id)
      .subscribe(
        data => {
          this._helpers.msgSuccess("Subcategoria eliminada");
          this._global.subcategories = this._global.subcategories.filter(
            subcat => subcat._id != this._global.selectedSubcategori._id
          );
          this.cancel.emit(true);
        },
        err => [this._helpers.msgError(this._helpers.goError(err)),this.petition=false],
        ()=>this.petition=false
      );
  }
  cancelDelete(): void {
    this.cancel.emit(true);
  }

}
