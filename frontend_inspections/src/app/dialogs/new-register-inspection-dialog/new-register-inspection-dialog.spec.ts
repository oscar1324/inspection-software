import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRegisterInspectionDialog } from './new-register-inspection-dialog';

describe('NewRegisterInspectionDialog', () => {
  let component: NewRegisterInspectionDialog;
  let fixture: ComponentFixture<NewRegisterInspectionDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRegisterInspectionDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRegisterInspectionDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
