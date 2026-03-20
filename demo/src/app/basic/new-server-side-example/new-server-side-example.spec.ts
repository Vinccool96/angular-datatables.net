import { waitForAsync } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';

import { provideMarkdownServiceTesting } from '../../../../test/provide-markdown-service-testing';
import { NewServerSideExample } from './new-server-side-example';

describe('NewServerSideComponent', () => {
  let spectator: Spectator<NewServerSideExample>;
  let component: NewServerSideExample;

  const createComponent = createComponentFactory({
    component: NewServerSideExample,
    declarations: [MockComponent(MarkdownComponent)],
    providers: [provideMarkdownServiceTesting()],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have title "Server-side processing"', waitForAsync(() => {
    expect(component.pageTitle).toBe('Server-side processing');
  }));
});
