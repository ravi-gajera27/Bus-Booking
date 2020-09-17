import { TestBed } from '@angular/core/testing';

import { PassingIdService } from './passing-id.service';

describe('PassingIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassingIdService = TestBed.get(PassingIdService);
    expect(service).toBeTruthy();
  });
});
