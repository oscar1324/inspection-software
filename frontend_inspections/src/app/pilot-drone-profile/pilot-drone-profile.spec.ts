import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilotDroneProfile } from './pilot-drone-profile';

describe('PilotDroneProfile', () => {
  let component: PilotDroneProfile;
  let fixture: ComponentFixture<PilotDroneProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PilotDroneProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PilotDroneProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
