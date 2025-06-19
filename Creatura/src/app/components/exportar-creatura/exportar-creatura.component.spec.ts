import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportarCreaturaComponent } from './exportar-creatura.component';

describe('ExportarCreaturaComponent', () => {
  let component: ExportarCreaturaComponent;
  let fixture: ComponentFixture<ExportarCreaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportarCreaturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportarCreaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
