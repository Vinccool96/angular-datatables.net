import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { BaseDemoComponent } from './base-demo.component';
import { provideMarkdownServiceTesting } from '../../../../../test/provide-markdown-service-testing';

describe('BaseDemoComponent', () => {
  let spectator: Spectator<BaseDemoComponent>;
  let component: BaseDemoComponent;

  const createComponent = createComponentFactory({
    component: BaseDemoComponent,
    shallow: true,
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
