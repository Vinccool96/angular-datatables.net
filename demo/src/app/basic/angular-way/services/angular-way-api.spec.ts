import { HttpTestingController } from '@angular/common/http/testing';
import { createHttpFactory, SpectatorHttp } from '@ngneat/spectator';

import { AngularWayApi } from './angular-way-api';

describe('AngularWayDataService', () => {
  let spectator: SpectatorHttp<AngularWayApi>;
  let service: AngularWayApi;
  let controller: HttpTestingController;

  const createService = createHttpFactory(AngularWayApi);

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
