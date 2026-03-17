import { waitForAsync } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { WithOptionsComponent } from './with-options.component';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';
import { provideMarkdownServiceTesting } from '../../../../test/provide-markdown-service-testing';

describe('WithOptionsComponent', () => {
  let spectator: Spectator<WithOptionsComponent>;
  let component: WithOptionsComponent;

  const createComponent = createComponentFactory({
    component: WithOptionsComponent,
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
    expect(component.dtOptions().pagingType).toBe('simple');
  }));
});
