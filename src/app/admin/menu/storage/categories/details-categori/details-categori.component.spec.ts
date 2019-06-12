import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCategoriComponent } from './details-categori.component';

describe('DetailsCategoriComponent', () => {
  let component: DetailsCategoriComponent;
  let fixture: ComponentFixture<DetailsCategoriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsCategoriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCategoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
