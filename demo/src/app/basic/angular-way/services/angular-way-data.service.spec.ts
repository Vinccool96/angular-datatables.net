import { HttpTestingController } from '@angular/common/http/testing';
import { createHttpFactory, SpectatorHttp } from '@ngneat/spectator';

import { AngularWayDataService } from './angular-way-data.service';

describe('AngularWayDataService', () => {
  let spectator: SpectatorHttp<AngularWayDataService>;
  let service: AngularWayDataService;
  let controller: HttpTestingController;

  const createService = createHttpFactory(AngularWayDataService);

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
