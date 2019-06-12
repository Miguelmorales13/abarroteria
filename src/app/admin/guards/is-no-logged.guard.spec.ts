import { TestBed, async, inject } from '@angular/core/testing';

import { IsNoLoggedGuard } from './is-no-logged.guard';

describe('IsNoLoggedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsNoLoggedGuard]
    });
  });

  it('should ...', inject([IsNoLoggedGuard], (guard: IsNoLoggedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
