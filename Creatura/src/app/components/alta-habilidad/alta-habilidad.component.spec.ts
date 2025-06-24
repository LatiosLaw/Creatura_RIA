import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaHabilidadComponent } from './alta-habilidad.component';

describe('AltaHabilidadComponent', () => {
  let component: AltaHabilidadComponent;
  let fixture: ComponentFixture<AltaHabilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltaHabilidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaHabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
