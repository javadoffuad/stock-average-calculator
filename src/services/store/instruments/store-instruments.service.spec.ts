import { TestBed } from '@angular/core/testing';

import { StoreInstrumentsService } from './store-instruments.service';

describe('StoreInstrumentsService', () => {
  let service: StoreInstrumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreInstrumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
