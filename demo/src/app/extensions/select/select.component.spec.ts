import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { SelectComponent } from './select.component';
import { provideMarkdownServiceTesting } from '../../../../test/provide-markdown-service-testing';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';

describe('SelectComponent', () => {
  let spectator: Spectator<SelectComponent>;
  let component: SelectComponent;

  const createComponent = createComponentFactory({
    component: SelectComponent,
    declarations: [MockComponent(MarkdownComponent)],
    providers: [provideMarkdownServiceTesting()],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
