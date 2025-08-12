import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalDataWindfarm } from './technical-data-windfarm';

describe('TechnicalDataWindfarm', () => {
  let component: TechnicalDataWindfarm;
  let fixture: ComponentFixture<TechnicalDataWindfarm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicalDataWindfarm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicalDataWindfarm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
