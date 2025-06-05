import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCreaturaComponent } from './modificar-creatura.component';

describe('ModificarCreaturaComponent', () => {
  let component: ModificarCreaturaComponent;
  let fixture: ComponentFixture<ModificarCreaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarCreaturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarCreaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
