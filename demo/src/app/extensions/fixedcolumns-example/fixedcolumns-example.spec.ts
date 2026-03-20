import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';

import { provideMarkdownServiceTesting } from '../../../../test/provide-markdown-service-testing';
import { FixedcolumnsExample } from './fixedcolumns-example';

describe('FixedcolumnsExample', () => {
  let spectator: Spectator<FixedcolumnsExample>;
  let component: FixedcolumnsExample;

  const createComponent = createComponentFactory({
    component: FixedcolumnsExample,
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
