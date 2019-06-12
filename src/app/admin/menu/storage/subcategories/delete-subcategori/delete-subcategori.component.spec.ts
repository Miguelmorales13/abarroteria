import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSubcategoriComponent } from './delete-subcategori.component';

describe('DeleteSubcategoriComponent', () => {
  let component: DeleteSubcategoriComponent;
  let fixture: ComponentFixture<DeleteSubcategoriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSubcategoriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSubcategoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
