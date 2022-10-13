import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientosPerfilComponent } from './seguimientos-perfil.component';

describe('SeguimientosPerfilComponent', () => {
  let component: SeguimientosPerfilComponent;
  let fixture: ComponentFixture<SeguimientosPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguimientosPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientosPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
