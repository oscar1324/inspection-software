import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWindFarmDialog } from './delete-wind-farm-dialog';

describe('DeleteWindFarmDialog', () => {
  let component: DeleteWindFarmDialog;
  let fixture: ComponentFixture<DeleteWindFarmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteWindFarmDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteWindFarmDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
