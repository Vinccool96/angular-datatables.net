import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { provideMarkdownServiceTesting } from '../../../test/provide-markdown-service-testing';
import { GettingStartedComponent } from './getting-started.component';

describe('GettingStartedComponent', () => {
  let spectator: Spectator<GettingStartedComponent>;
  let component: GettingStartedComponent;

  const createComponent = createComponentFactory({
    component: GettingStartedComponent,
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
