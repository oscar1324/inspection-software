import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiPorcentajeCard } from './kpi-porcentaje-card';

describe('KpiPorcentajeCard', () => {
  let component: KpiPorcentajeCard;
  let fixture: ComponentFixture<KpiPorcentajeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpiPorcentajeCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiPorcentajeCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
