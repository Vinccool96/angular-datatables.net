import { TestBed } from '@angular/core/testing';

import { DtVersionService } from './dt-version.service';

describe('DtVersionService', () => {
  let service: DtVersionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DtVersionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
