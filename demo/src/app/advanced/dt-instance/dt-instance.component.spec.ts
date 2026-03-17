import { waitForAsync } from '@angular/core/testing';
import { DataTableDirective } from 'angular-datatables.net';
import { DtInstanceComponent } from './dt-instance.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';
import { provideMarkdownServiceTesting } from '../../../../test/provide-markdown-service-testing';

describe('DtInstanceComponent', () => {
  let spectator: Spectator<DtInstanceComponent>;
  let component: DtInstanceComponent;

  const createComponent = createComponentFactory({
    component: DtInstanceComponent,
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

  it('should have title "Finding DataTable instance"', waitForAsync(() => {
    expect(component.pageTitle).toBe('Finding DataTable instance');
  }));

  it('should retrieve Table instance', async () => {
    await spectator.fixture.whenStable();

    const dir = spectator.query(DataTableDirective);
    expect(dir).toBeTruthy();

    const instance = await dir?.dtInstance;
    expect(instance).toBeTruthy();
  });
});
