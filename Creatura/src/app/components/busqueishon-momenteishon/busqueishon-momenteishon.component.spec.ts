import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusqueishonMomenteishonComponent } from './busqueishon-momenteishon.component';

describe('BusqueishonMomenteishonComponent', () => {
  let component: BusqueishonMomenteishonComponent;
  let fixture: ComponentFixture<BusqueishonMomenteishonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusqueishonMomenteishonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusqueishonMomenteishonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
