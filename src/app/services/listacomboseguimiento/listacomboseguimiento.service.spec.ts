import { TestBed } from '@angular/core/testing';

import { ListacomboseguimientoService } from './listacomboseguimiento.service';

describe('ListacomboseguimientoService', () => {
  let service: ListacomboseguimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListacomboseguimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
