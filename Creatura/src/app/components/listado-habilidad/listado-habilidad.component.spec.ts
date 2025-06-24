import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoHabilidadComponent } from './listado-habilidad.component';

describe('ListadoHabilidadComponent', () => {
  let component: ListadoHabilidadComponent;
  let fixture: ComponentFixture<ListadoHabilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoHabilidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoHabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
