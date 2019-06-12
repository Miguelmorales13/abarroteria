import { TestBed } from '@angular/core/testing';

import { RolsService } from './rols.service';

describe('RolsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RolsService = TestBed.get(RolsService);
    expect(service).toBeTruthy();
  });
});
