import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRolsComponent } from './list-rols.component';

describe('ListRolsComponent', () => {
  let component: ListRolsComponent;
  let fixture: ComponentFixture<ListRolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
