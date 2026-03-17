import { createHttpFactory, SpectatorHttp } from '@ngneat/spectator';
import { HttpTestingController } from '@angular/common/http/testing';

import { LoadDtOptionsWithPromiseOptionsService } from './load-dt-options-with-promise-options.service';

describe('LoadDtOptionsWithPromiseOptionsService', () => {
  let spectator: SpectatorHttp<LoadDtOptionsWithPromiseOptionsService>;
  let service: LoadDtOptionsWithPromiseOptionsService;
  let controller: HttpTestingController;

  const createService = createHttpFactory(LoadDtOptionsWithPromiseOptionsService);

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
    controller = spectator.controller;
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
