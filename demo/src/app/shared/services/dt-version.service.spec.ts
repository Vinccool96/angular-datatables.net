import { TestBed } from '@angular/core/testing';

import { DtVersionOrchestrator } from './dt-version-orchestrator';

describe('DtVersionOrchestrator', () => {
  let service: DtVersionOrchestrator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DtVersionOrchestrator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
