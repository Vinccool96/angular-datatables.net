import { DataTableDirective } from 'angular-datatables.net';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ZeroConfigComponent } from './zero-config.component';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';
import { provideMarkdownServiceTesting } from '../../../../test/provide-markdown-service-testing';

describe('ZeroConfigComponent', () => {
  let spectator: Spectator<ZeroConfigComponent>;
  let component: ZeroConfigComponent;

  const createComponent = createComponentFactory({
    component: ZeroConfigComponent,
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
    const dir = spectator.query(DataTableDirective);
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
