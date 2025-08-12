import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWindFarmDialog } from './new-wind-farm-dialog';

describe('NewWindFarmDialog', () => {
  let component: NewWindFarmDialog;
  let fixture: ComponentFixture<NewWindFarmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewWindFarmDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewWindFarmDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
