import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiExtraMonth } from './kpi-extra-month';

describe('KpiExtraMonth', () => {
  let component: KpiExtraMonth;
  let fixture: ComponentFixture<KpiExtraMonth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpiExtraMonth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiExtraMonth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
