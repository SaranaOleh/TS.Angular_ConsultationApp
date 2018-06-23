import { TestBed, inject } from '@angular/core/testing';

import { ConsultsService } from './consults.service';

describe('ConsultsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultsService]
    });
  });

  it('should be created', inject([ConsultsService], (service: ConsultsService) => {
    expect(service).toBeTruthy();
  }));
});
