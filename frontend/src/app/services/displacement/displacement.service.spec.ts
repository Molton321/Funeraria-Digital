import { TestBed } from '@angular/core/testing';

import { DisplacementService } from './displacement.service';

describe('DisplacementService', () => {
  let service: DisplacementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplacementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
