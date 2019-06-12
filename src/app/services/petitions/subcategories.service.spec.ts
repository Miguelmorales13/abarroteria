import { TestBed } from '@angular/core/testing';

import { SubcategoriesService } from './subcategories.service';

describe('SubcategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubcategoriesService = TestBed.get(SubcategoriesService);
    expect(service).toBeTruthy();
  });
});
