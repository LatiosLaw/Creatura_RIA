import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarCreaturaComponent } from './mostrar-creatura.component';

describe('MostrarCreaturaComponent', () => {
  let component: MostrarCreaturaComponent;
  let fixture: ComponentFixture<MostrarCreaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarCreaturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarCreaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
