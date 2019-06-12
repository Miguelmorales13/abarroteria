import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRolComponent } from './details-rol.component';

describe('DetailsRolComponent', () => {
  let component: DetailsRolComponent;
  let fixture: ComponentFixture<DetailsRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
