import { DataTableDirective } from 'angular-datatables.net';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { WithAjaxComponent } from './with-ajax.component';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';

describe('WithAjaxComponent', () => {
  let spectator: Spectator<WithAjaxComponent>;
  let component: WithAjaxComponent;

  const createComponent = createComponentFactory({
    component: WithAjaxComponent,
    declarations: [MockComponent(MarkdownComponent)],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have title "Quickstart"', () => {
    expect(component.pageTitle).toBe('Quickstart');
  });

  it('should have table populated via AJAX', async () => {
    await spectator.fixture.whenStable();
    expect(component.dtOptions().columns).toBeDefined();
    const dir = spectator.query(DataTableDirective);
    expect(dir).toBeTruthy();
    const instance = await dir?.dtInstance;
    spectator.detectChanges();
    expect(instance?.rows().length).toBeGreaterThan(0);
  });
});
