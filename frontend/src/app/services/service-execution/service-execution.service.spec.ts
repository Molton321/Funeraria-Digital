import { TestBed } from '@angular/core/testing';

import { ServiceExecutionService } from './service-execution.service';

describe('ServiceExecutionService', () => {
  let service: ServiceExecutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceExecutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
