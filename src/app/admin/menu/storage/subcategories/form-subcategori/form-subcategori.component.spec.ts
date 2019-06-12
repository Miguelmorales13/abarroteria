import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubcategoriComponent } from './form-subcategori.component';

describe('FormSubcategoriComponent', () => {
  let component: FormSubcategoriComponent;
  let fixture: ComponentFixture<FormSubcategoriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSubcategoriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSubcategoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
