import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCreaturaComponent } from './listado-creatura.component';

describe('ListadoCreaturaComponent', () => {
  let component: ListadoCreaturaComponent;
  let fixture: ComponentFixture<ListadoCreaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoCreaturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoCreaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
