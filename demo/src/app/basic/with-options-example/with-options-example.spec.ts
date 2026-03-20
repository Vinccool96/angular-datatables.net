import { waitForAsync } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';

import { provideMarkdownServiceTesting } from '../../../../test/provide-markdown-service-testing';
import { WithOptionsExample } from './with-options-example';

describe('WithOptionsExample', () => {
  let spectator: Spectator<WithOptionsExample>;
  let component: WithOptionsExample;

  const createComponent = createComponentFactory({
    component: WithOptionsExample,
    declarations: [MockComponent(MarkdownComponent)],
    providers: [provideMarkdownServiceTesting()],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create the app', waitForAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should have title "With Options"', waitForAsync(() => {
    expect(component.pageTitle).toBe('With Options');
  }));

  it('should have pagingType as "full_numbers"', waitForAsync(() => {
    expect(component.dtOptions.pagingType).toBe('simple');
  }));
});
