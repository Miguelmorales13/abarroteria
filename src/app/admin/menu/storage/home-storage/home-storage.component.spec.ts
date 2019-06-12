import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStorageComponent } from './home-storage.component';

describe('HomeStorageComponent', () => {
  let component: HomeStorageComponent;
  let fixture: ComponentFixture<HomeStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeStorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
