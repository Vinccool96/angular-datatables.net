import { TestBed } from '@angular/core/testing';

import { LoadDtOptionsWithPromiseOptionsService } from './load-dt-options-with-promise-options.service';

describe('LoadDtOptionsWithPromiseOptionsService', () => {
  let service: LoadDtOptionsWithPromiseOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadDtOptionsWithPromiseOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
