import { TestBed } from '@angular/core/testing';

import { BitstableService } from './bitstable.service';

describe('BitstableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: BitstableService = TestBed.get(BitstableService);
    expect(service).toBeTruthy();
  });
});
