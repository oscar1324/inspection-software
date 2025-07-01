import { TestBed } from '@angular/core/testing';

import { Inspections } from './inspections';

describe('Inspections', () => {
  let service: Inspections;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Inspections);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
