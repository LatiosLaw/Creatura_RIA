import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraGestorCreaturaComponent } from './barra-gestor-creatura.component';

describe('BarraGestorCreaturaComponent', () => {
  let component: BarraGestorCreaturaComponent;
  let fixture: ComponentFixture<BarraGestorCreaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraGestorCreaturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarraGestorCreaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
