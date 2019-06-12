import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: "pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"]
})
export class PaginationComponent implements OnInit {
  @Input("noData") public noData: number; //datos que se contaran para mostrar
  @Input("noDataView") public noDataView: number; //numero de datos por hoja
  pages: number[] = [];
  limitPagesView: number = 5;
  noPages: number = 0;
  pageActive: number = 1;
  start: number = 0;
  end: number = 0;
  pagesActivate: Array<number> = [];
  @Output() public pageActivated = new EventEmitter();
  constructor() {}

  ngOnInit() {
    this.noPages = Math.ceil(this.noData / this.noDataView);
    var count = 0;
    while (count < this.noPages) {
      count++;
      this.pages.push(count);
    }
    this.pagesActivate = this.pages;
    this.pageActive = 1;
    this.emitMessage();
  }
  ngOnChanges(): void {
    this.noPages = Math.ceil(this.noData / this.noDataView);
    this.pages = [];
    var count = 0;
    while (count < this.noPages) {
      count++;
      this.pages.push(count);
    }
    this.pagesActivate = this.pages;
    this.pageActive = 1;
    this.emitMessage();
  }
  activePagination(p) {
    if (p != this.pageActive) {
      this.pageActive = p;
      this.emitMessage();
    }
  }
  previous() {
    if (this.pageActive > 1) {
      this.pageActive--;
      this.emitMessage();
    }
  }
  next() {
    if (this.pageActive < this.pages.length) {
      this.pageActive++;
      this.emitMessage();
    }
  }
  first() {
    this.pageActive = 1;
    this.emitMessage();
  }

  emitMessage(): void {
    this.pagesView();
    this.start = (this.pageActive - 1) * this.noDataView;
    this.end = this.start + parseInt(String(this.noDataView)) - 1;
    this.pageActivated.emit({
      noDataView: this.noDataView,
      pageActive: this.pageActive,
      start: this.start,
      end: this.end
    });
  }
  pagesView(): void {
    let inicio = this.pageActive;
    let fin = this.pageActive + this.limitPagesView ;
    if (this.pages.length >= this.limitPagesView) {
      let pag = this.pagesActivate
      this.pagesActivate = this.pages.filter((page, i) => {
        if (page >= inicio && page < fin) {
          return page;
        }
      });
      if (this.pagesActivate.length < this.limitPagesView) {
        this.pagesActivate = pag;
      }
    } else {
      this.pagesActivate = this.pages;
    }
  }
}
