import { waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { createRoutingFactory, Spectator } from '@ngneat/spectator';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  let component: AppComponent;

  const createComponent = createRoutingFactory({
    component: AppComponent,
    shallow: true,
    routes: [],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create the app', waitForAsync(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have angular logo on navbar`, waitForAsync(() => {
    expect(spectator.query('img[src="assets/angular.png"]')).toBeTruthy();
  }));

  it(`should have datatables logo on navbar`, waitForAsync(() => {
    expect(spectator.query('img[src="assets/datatables.png"]')).toBeTruthy();
  }));
});
