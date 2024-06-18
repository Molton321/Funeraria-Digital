import { TestBed } from '@angular/core/testing';

import { FuneralHomeService } from './funeral-home.service';

describe('FuneralHomeService', () => {
  let service: FuneralHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuneralHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
