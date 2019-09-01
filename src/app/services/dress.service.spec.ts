import { TestBed } from '@angular/core/testing';

import { DressService } from './dress.service';

describe('DressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DressService = TestBed.get(DressService);
    expect(service).toBeTruthy();
  });
});
