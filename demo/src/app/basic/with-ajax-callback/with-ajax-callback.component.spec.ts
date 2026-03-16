import { waitForAsync } from '@angular/core/testing';

import { WithAjaxCallbackComponent } from './with-ajax-callback.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';

describe('WithAjaxCallbackComponent', () => {
  let spectator: Spectator<WithAjaxCallbackComponent>;
  let component: WithAjaxCallbackComponent;

  const createComponent = createComponentFactory({
    component: WithAjaxCallbackComponent,
    declarations: [MockComponent(MarkdownComponent)],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create the app', waitForAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should have title "AJAX with callback"', waitForAsync(() => {
    expect(component.pageTitle).toBe('AJAX with callback');
  }));
});
