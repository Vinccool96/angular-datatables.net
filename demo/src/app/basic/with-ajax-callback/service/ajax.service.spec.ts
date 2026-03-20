import { HttpTestingController } from '@angular/common/http/testing';
import { createHttpFactory, SpectatorHttp } from '@ngneat/spectator';

import { AjaxCallbackApi } from './ajax-callback-api';

describe('AjaxCallbackApi', () => {
  let spectator: SpectatorHttp<AjaxCallbackApi>;
  let service: AjaxCallbackApi;
  let controller: HttpTestingController;

  const createService = createHttpFactory(AjaxCallbackApi);

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
