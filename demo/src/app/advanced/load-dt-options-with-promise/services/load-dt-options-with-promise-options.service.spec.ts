import { HttpTestingController } from '@angular/common/http/testing';
import { createHttpFactory, SpectatorHttp } from '@ngneat/spectator';

import { LoadDtOptionsWithPromiseOptionsApi } from './load-dt-options-with-promise-options-api';

describe('LoadDtOptionsWithPromiseOptionsApi', () => {
  let spectator: SpectatorHttp<LoadDtOptionsWithPromiseOptionsApi>;
  let service: LoadDtOptionsWithPromiseOptionsApi;
  let controller: HttpTestingController;

  const createService = createHttpFactory(LoadDtOptionsWithPromiseOptionsApi);

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
