import { TestBed } from '@angular/core/testing';

import { StoreUsersService } from './store-users.service';

describe('FacadeUsersService', () => {
  let service: StoreUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
