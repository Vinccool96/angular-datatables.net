import { HttpTestingController } from '@angular/common/http/testing';
import { createHttpFactory, SpectatorHttp } from '@ngneat/spectator';

import { AjaxService } from './ajax.service';

describe('AjaxService', () => {
  let spectator: SpectatorHttp<AjaxService>;
  let service: AjaxService;
  let controller: HttpTestingController;

  const createService = createHttpFactory(AjaxService);

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
