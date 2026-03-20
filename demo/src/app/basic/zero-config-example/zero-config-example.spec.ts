import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { AngularDataTable } from 'angular-datatables.net';
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

  it('should create the app', (done) => {
    expect(component).toBeTruthy();
    done();
  });

  it('should have title "Zero configuration"', (done) => {
    expect(component.pageTitle).toBe('Zero configuration');
    done();
  });

  it('should create DataTables instance', (done) => {
    const dir = spectator.query(AngularDataTable);
    expect(dir).toBeTruthy();
    dir?.dtInstance
      .then((api) => {
        expect($.fn.dataTable.isDataTable(api)).toBeTruthy();
        done();
      })
      .catch((error: unknown) => {
        fail(error);
      });
  });
});
