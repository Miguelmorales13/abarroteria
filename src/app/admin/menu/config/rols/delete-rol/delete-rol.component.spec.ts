import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRolComponent } from './delete-rol.component';

describe('DeleteRolComponent', () => {
  let component: DeleteRolComponent;
  let fixture: ComponentFixture<DeleteRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
