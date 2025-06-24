import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraGestorHabilidadComponent } from './barra-gestor-habilidad.component';

describe('BarraGestorHabilidadComponent', () => {
  let component: BarraGestorHabilidadComponent;
  let fixture: ComponentFixture<BarraGestorHabilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraGestorHabilidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarraGestorHabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
