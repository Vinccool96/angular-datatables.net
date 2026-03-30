import { waitForAsync } from '@angular/core/testing';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator';
import { AngularDatatable } from 'angular-datatables.net';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';
import { of } from 'rxjs';

import { loadDtOptionsJson } from '../../../../test/load-json';
import { provideMarkdownServiceTesting } from '../../../../test/provide-markdown-service-testing';
import { LoadDtOptionsWithPromiseExample } from './load-dt-options-with-promise-example';
import { LoadDtOptionsWithPromiseOptionsApi } from './services/load-dt-options-with-promise-options-api';

describe('LoadDtOptionsWithPromiseExample', () => {
  let spectator: Spectator<LoadDtOptionsWithPromiseExample>;
  let component: LoadDtOptionsWithPromiseExample;

  const createComponent = createComponentFactory({
    component: LoadDtOptionsWithPromiseExample,
    declarations: [MockComponent(MarkdownComponent)],
    providers: [
      provideMarkdownServiceTesting(),
      mockProvider(LoadDtOptionsWithPromiseOptionsApi, { obtainOptions: () => of(loadDtOptionsJson()) }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create the app', waitForAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should have title "Load DT Options with Promise"', waitForAsync(() => {
    expect(component.pageTitle).toBe('Load DT Options with Promise');
  }));

  it('should render table from dtOptions as a Promise', async () => {
    await spectator.fixture.whenStable();

    const dir = spectator.query(AngularDatatable) as AngularDatatable;
    expect(dir).toBeTruthy();

    const instance = await dir.dtInstance;
    expect(instance.rows().count()).toBeGreaterThan(0);
  });
});
