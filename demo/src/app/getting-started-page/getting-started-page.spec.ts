import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { provideMarkdownServiceTesting } from '../../../test/provide-markdown-service-testing';
import { GettingStartedPage } from './getting-started-page';

describe('GettingStartedPage', () => {
  let spectator: Spectator<GettingStartedPage>;
  let component: GettingStartedPage;

  const createComponent = createComponentFactory({
    component: GettingStartedPage,
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
