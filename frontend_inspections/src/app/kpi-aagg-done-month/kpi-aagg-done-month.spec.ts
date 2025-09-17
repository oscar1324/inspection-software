import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiAaggDoneMonth } from './kpi-aagg-done-month';

describe('KpiAaggDoneMonth', () => {
  let component: KpiAaggDoneMonth;
  let fixture: ComponentFixture<KpiAaggDoneMonth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpiAaggDoneMonth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiAaggDoneMonth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
