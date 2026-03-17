import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { provideMarkdownServiceTesting } from '../../../test/provide-markdown-service-testing';
import { FaqComponent } from './faq.component';

describe('FaqComponent', () => {
  let spectator: Spectator<FaqComponent>;
  let component: FaqComponent;

  const createComponent = createComponentFactory({
    component: FaqComponent,
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
