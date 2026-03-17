import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';

import { provideMarkdownServiceTesting } from '../../../../test/provide-markdown-service-testing';
import { SelectComponent } from './select.component';

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
