import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { WelcomeComponent } from './welcome.component';
import { provideMarkdownServiceTesting } from '../../../test/provide-markdown-service-testing';

describe('WelcomeComponent', () => {
  let spectator: Spectator<WelcomeComponent>;
  let component: WelcomeComponent;

  const createComponent = createComponentFactory({
    component: WelcomeComponent,
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
