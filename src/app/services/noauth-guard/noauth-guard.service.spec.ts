import { TestBed, inject } from '@angular/core/testing';

import { NoauthGuardService } from './noauth-guard.service';

describe('NoauthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoauthGuardService]
    });
  });

  it('should be created', inject([NoauthGuardService], (service: NoauthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
