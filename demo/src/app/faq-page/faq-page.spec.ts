import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { provideMarkdownServiceTesting } from '../../../test/provide-markdown-service-testing';
import { FaqPage } from './faq-page';

describe('FaqPage', () => {
  let spectator: Spectator<FaqPage>;
  let component: FaqPage;

  const createComponent = createComponentFactory({
    component: FaqPage,
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
