import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { provideMarkdownServiceTesting } from '../../../../../test/provide-markdown-service-testing';
import { BaseDemo } from './base-demo';

describe('BaseDemo', () => {
  let spectator: Spectator<BaseDemo>;
  let component: BaseDemo;

  const createComponent = createComponentFactory({
    component: BaseDemo,
    providers: [provideMarkdownServiceTesting()],
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
