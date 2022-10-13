import { TestBed } from '@angular/core/testing';

import { GestionSeguimientosService } from './gestion-seguimientos.service';

describe('GestionSeguimientosService', () => {
  let service: GestionSeguimientosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionSeguimientosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
