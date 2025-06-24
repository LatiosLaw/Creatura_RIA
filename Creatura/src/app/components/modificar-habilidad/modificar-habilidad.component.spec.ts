import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarHabilidadComponent } from './modificar-habilidad.component';

describe('ModificarHabilidadComponent', () => {
  let component: ModificarHabilidadComponent;
  let fixture: ComponentFixture<ModificarHabilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarHabilidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarHabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
