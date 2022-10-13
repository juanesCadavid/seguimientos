import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSeguimientosComponent } from './gestion-seguimientos.component';

describe('GestionSeguimientosComponent', () => {
  let component: GestionSeguimientosComponent;
  let fixture: ComponentFixture<GestionSeguimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionSeguimientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionSeguimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
