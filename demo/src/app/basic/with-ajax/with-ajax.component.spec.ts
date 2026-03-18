import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { DataTableDirective } from 'angular-datatables.net';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';

import { provideMarkdownServiceTesting } from '../../../../test/provide-markdown-service-testing';
import { WithAjaxComponent } from './with-ajax.component';

describe('WithAjaxComponent', () => {
  let spectator: Spectator<WithAjaxComponent>;
  let component: WithAjaxComponent;

  const createComponent = createComponentFactory({
    component: WithAjaxComponent,
    declarations: [MockComponent(MarkdownComponent)],
    providers: [provideMarkdownServiceTesting()],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have title "Quickstart"', () => {
    expect(component.pageTitle).toBe('With Ajax');
  });

  it('should have table populated via AJAX', async () => {
    await spectator.fixture.whenStable();
    expect(component.dtOptions.columns).toBeDefined();
    const dir = spectator.query(DataTableDirective);
    expect(dir).toBeTruthy();
    const instance = await dir?.dtInstance;
    spectator.detectChanges();
    expect(instance?.rows().length).toBeGreaterThan(0);
  });
});
