import { TestBed } from '@angular/core/testing';

import { BaseFilterService } from './base-filter.service';

describe('BaseFilterService', () => {
  let service: BaseFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseFilterService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
