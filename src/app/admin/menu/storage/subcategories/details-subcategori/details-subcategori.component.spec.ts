import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSubcategoriComponent } from './details-subcategori.component';

describe('DetailsSubcategoriComponent', () => {
  let component: DetailsSubcategoriComponent;
  let fixture: ComponentFixture<DetailsSubcategoriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsSubcategoriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSubcategoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
