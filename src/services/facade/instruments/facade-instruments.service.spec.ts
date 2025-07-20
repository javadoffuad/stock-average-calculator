import { TestBed } from '@angular/core/testing';

import { FacadeInstrumentsService } from './facade-instruments.service';

describe('FacadeInstrumentsService', () => {
  let service: FacadeInstrumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacadeInstrumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
