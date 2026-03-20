import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { provideMarkdownServiceTesting } from '../../../test/provide-markdown-service-testing';
import { WelcomePage } from './welcome-page';

describe('WelcomePage', () => {
  let spectator: Spectator<WelcomePage>;
  let component: WelcomePage;

  const createComponent = createComponentFactory({
    component: WelcomePage,
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
