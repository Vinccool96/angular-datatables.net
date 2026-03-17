import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { provideMarkdownServiceTesting } from '../../../../../test/provide-markdown-service-testing';
import { BaseDemoComponent } from './base-demo.component';

describe('BaseDemoComponent', () => {
  let spectator: Spectator<BaseDemoComponent>;
  let component: BaseDemoComponent;

  const createComponent = createComponentFactory({
    component: BaseDemoComponent,
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
