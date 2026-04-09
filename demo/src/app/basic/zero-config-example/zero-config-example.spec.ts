import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';
import { AngularDatatable } from 'angular-datatables.net';
import { Api } from 'datatables.net';
import $ from 'jquery';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';

import { provideMarkdownServiceTesting } from '../../../../test/provide-markdown-service-testing';
import { ZeroConfigExample } from './zero-config-example';

describe('ZeroConfigExample', () => {
  let spectator: Spectator<ZeroConfigExample>;
  let component: ZeroConfigExample;

  const createComponent = createComponentFactory({
    component: ZeroConfigExample,
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

  it('should have title "Zero configuration"', () => {
    expect(component.pageTitle).toBe('Zero configuration');
  });

  it('should create DataTables instance', async () => {
    const dir = spectator.query(AngularDatatable);
    expect(dir).toBeTruthy();
    const api = (await dir?.dtInstance) as Api;
    expect($.fn.dataTable.isDataTable(api)).toBeTruthy();
  });
});
