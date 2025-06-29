import { TestBed } from '@angular/core/testing';

import { StoreOperationsService } from './store-operations.service';

describe('StorePositionsService', () => {
  let service: StoreOperationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreOperationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
