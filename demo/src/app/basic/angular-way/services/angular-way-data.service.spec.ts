import { TestBed } from '@angular/core/testing';

import { AngularWayDataService } from './angular-way-data.service';

describe('AngularWayDataService', () => {
  let service: AngularWayDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularWayDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
