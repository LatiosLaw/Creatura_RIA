import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorHabilidadComponent } from './gestor-habilidad.component';

describe('GestorHabilidadComponent', () => {
  let component: GestorHabilidadComponent;
  let fixture: ComponentFixture<GestorHabilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestorHabilidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestorHabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
