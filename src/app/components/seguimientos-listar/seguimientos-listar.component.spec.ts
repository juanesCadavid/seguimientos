import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientosListarComponent } from './seguimientos-listar.component';

describe('SeguimientosListarComponent', () => {
  let component: SeguimientosListarComponent;
  let fixture: ComponentFixture<SeguimientosListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguimientosListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientosListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
