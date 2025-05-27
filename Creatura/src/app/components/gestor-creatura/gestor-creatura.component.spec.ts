import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorCreaturaComponent } from './gestor-creatura.component';

describe('GestorCreaturaComponent', () => {
  let component: GestorCreaturaComponent;
  let fixture: ComponentFixture<GestorCreaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestorCreaturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestorCreaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
