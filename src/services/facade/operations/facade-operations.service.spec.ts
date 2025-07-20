import { TestBed } from '@angular/core/testing';

import { FacadeOperationsService } from './facade-operations.service';

describe('FacadePositionsService', () => {
  let service: FacadeOperationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacadeOperationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
