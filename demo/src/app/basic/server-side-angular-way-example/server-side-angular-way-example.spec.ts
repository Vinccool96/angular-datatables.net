import { waitForAsync } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';

import { provideMarkdownServiceTesting } from '../../../../test/provide-markdown-service-testing';
import { ServerSideAngularWayExample } from './server-side-angular-way-example';

describe('ServerSideAngularWayComponent', () => {
  let spectator: Spectator<ServerSideAngularWayExample>;
  let component: ServerSideAngularWayExample;

  const createComponent = createComponentFactory({
    component: ServerSideAngularWayExample,
    declarations: [MockComponent(MarkdownComponent)],
    providers: [provideMarkdownServiceTesting(), provideRouter([])],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create the app', waitForAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should have title "Server side the Angular way"', waitForAsync(() => {
    expect(component.pageTitle).toBe('Server side the Angular way');
  }));
});
