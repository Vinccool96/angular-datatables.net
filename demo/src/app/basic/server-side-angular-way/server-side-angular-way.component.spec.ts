import { waitForAsync } from '@angular/core/testing';
import { ServerSideAngularWayComponent } from './server-side-angular-way.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';

describe('ServerSideAngularWayComponent', () => {
  let spectator: Spectator<ServerSideAngularWayComponent>;
  let component: ServerSideAngularWayComponent;

  const createComponent = createComponentFactory({
    component: ServerSideAngularWayComponent,
    declarations: [MockComponent(MarkdownComponent)],
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
