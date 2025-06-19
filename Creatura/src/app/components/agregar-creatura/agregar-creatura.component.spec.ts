import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCreaturaComponent } from './agregar-creatura.component';

describe('AgregarCreaturaComponent', () => {
  let component: AgregarCreaturaComponent;
  let fixture: ComponentFixture<AgregarCreaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarCreaturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarCreaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
