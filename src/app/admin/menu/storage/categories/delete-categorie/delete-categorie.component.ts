import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalService } from '@services/configuration/global.service';
import { CategoriesService } from '@services/petitions/categories.service';
import { HelpersService } from '@services/configuration/helpers.service';

@Component({
  selector: 'app-delete-categorie',
  templateUrl: './delete-categorie.component.html',
  styleUrls: ['./delete-categorie.component.css']
})
export class DeleteCategorieComponent implements OnInit {
  @Output() cancel:EventEmitter<any> = new EventEmitter();
  petition={
    no:false,
    progress:false
  }
  constructor(public _global: GlobalService, private _categories: CategoriesService, private _helpers: HelpersService) { }

  ngOnInit() {
  }
  confirm(): void{
    this.petition.progress=true
    this._categories.deleteCategori(this._global.selectedCategori._id).subscribe(data=>{
      this._helpers.msgSuccess('Categoria eliminada');
      this._global.categories = this._global.categories.filter(cat => cat._id != this._global.selectedCategori._id)
      this.cancel.emit(true);
    }, 
    err => [this._helpers.msgError(this._helpers.goError(err)),this.petition.progress=false],
    ()=>this.petition.progress=false
    )
  }
  cancelDelete(): void{
    this.cancel.emit(true);
  }

}
