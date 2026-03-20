import { waitForAsync } from '@angular/core/testing';
import { createRoutingFactory, Spectator } from '@ngneat/spectator';

import { App } from './app';

describe('App', () => {
  let spectator: Spectator<App>;
  let component: App;

  const createComponent = createRoutingFactory({
    component: App,
    routes: [],
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create the app', waitForAsync(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have angular logo on navbar`, waitForAsync(() => {
    spectator.detectChanges();
    expect(spectator.query('img[src="./angular.png"]')).toBeTruthy();
  }));

  it(`should have datatables logo on navbar`, waitForAsync(() => {
    expect(spectator.query('img[src="./datatables.png"]')).toBeTruthy();
  }));
});
