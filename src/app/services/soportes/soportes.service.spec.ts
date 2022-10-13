import { TestBed } from '@angular/core/testing';

import { SoportesService } from './soportes.service';

describe('SoportesService', () => {
  let service: SoportesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoportesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
