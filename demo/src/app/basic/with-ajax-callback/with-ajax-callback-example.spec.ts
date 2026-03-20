import { waitForAsync } from '@angular/core/testing';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';
import { of } from 'rxjs';

import { loadDataJson } from '../../../../test/load-json';
import { provideMarkdownServiceTesting } from '../../../../test/provide-markdown-service-testing';
import { AjaxCallbackApi } from './service/ajax-callback-api';
import { WithAjaxCallbackExample } from './with-ajax-callback-example';

describe('WithAjaxCallbackComponent', () => {
  let spectator: Spectator<WithAjaxCallbackExample>;
  let component: WithAjaxCallbackExample;

  const createComponent = createComponentFactory({
    component: WithAjaxCallbackExample,
    declarations: [MockComponent(MarkdownComponent)],
    providers: [
      provideMarkdownServiceTesting(),
      mockProvider(AjaxCallbackApi, { getResult: () => of(loadDataJson()) }),
    ],
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
