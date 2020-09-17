import { TestBed } from '@angular/core/testing';

import { PassingidService } from './passingid.service';

describe('PassingidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassingidService = TestBed.get(PassingidService);
    expect(service).toBeTruthy();
  });
});
