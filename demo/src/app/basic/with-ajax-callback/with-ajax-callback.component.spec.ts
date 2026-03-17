import { waitForAsync } from '@angular/core/testing';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';
import { of } from 'rxjs';

import { loadDataJson } from '../../../../test/load-json';
import { provideMarkdownServiceTesting } from '../../../../test/provide-markdown-service-testing';
import { AjaxService } from './service/ajax.service';
import { WithAjaxCallbackComponent } from './with-ajax-callback.component';

describe('WithAjaxCallbackComponent', () => {
  let spectator: Spectator<WithAjaxCallbackComponent>;
  let component: WithAjaxCallbackComponent;

  const createComponent = createComponentFactory({
    component: WithAjaxCallbackComponent,
    declarations: [MockComponent(MarkdownComponent)],
    providers: [provideMarkdownServiceTesting(), mockProvider(AjaxService, { getResult: () => of(loadDataJson()) })],
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
