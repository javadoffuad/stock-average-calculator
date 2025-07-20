import { TestBed } from '@angular/core/testing';

import { FacadeUsersService } from './facade-users.service';

describe('FacadeUsersService', () => {
  let service: FacadeUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacadeUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
