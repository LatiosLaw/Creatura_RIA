import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCreaturasSystemComponent } from './listado-creaturas-system.component';

describe('ListadoCreaturasSystemComponent', () => {
  let component: ListadoCreaturasSystemComponent;
  let fixture: ComponentFixture<ListadoCreaturasSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoCreaturasSystemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoCreaturasSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
