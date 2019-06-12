import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriComponent } from './subcategori.component';

describe('SubcategoriComponent', () => {
  let component: SubcategoriComponent;
  let fixture: ComponentFixture<SubcategoriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategoriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
