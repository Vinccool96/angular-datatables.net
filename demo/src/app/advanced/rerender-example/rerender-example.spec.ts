import { waitForAsync } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';

import { provideMarkdownServiceTesting } from '../../../../test/provide-markdown-service-testing';
import { RerenderExample } from './rerender-example';

describe('RerenderExample', () => {
  let spectator: Spectator<RerenderExample>;
  let component: RerenderExample;

  const createComponent = createComponentFactory({
    component: RerenderExample,
    declarations: [MockComponent(MarkdownComponent)],
    providers: [provideMarkdownServiceTesting()],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create the app', waitForAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should have title "Rerender"', waitForAsync(() => {
    expect(component.pageTitle).toBe('Rerender');
  }));

  it('should recreate table when Rerender is clicked', async () => {
    await spectator.fixture.whenStable();

    const rerenderSpy = spyOn(component, 'rerender');

    const triggerBtns = [...spectator.queryAll<HTMLButtonElement>('button')];
    const triggerButton = triggerBtns.find((element) => element.textContent.includes('Rerender')) as HTMLButtonElement;

    triggerButton.click();
    triggerButton.dispatchEvent(new Event('click'));

    expect(rerenderSpy).toHaveBeenCalled();
  });
});
