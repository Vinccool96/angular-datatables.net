import { waitForAsync } from '@angular/core/testing';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator';
import { DataTableDirective } from 'angular-datatables.net';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';
import { of } from 'rxjs';

import { loadDtOptionsJson } from '../../../../test/load-json';
import { provideMarkdownServiceTesting } from '../../../../test/provide-markdown-service-testing';
import { LoadDtOptionsWithPromiseComponent } from './load-dt-options-with-promise.component';
import { LoadDtOptionsWithPromiseOptionsService } from './services/load-dt-options-with-promise-options.service';

describe('LoadDtOptionsWithPromiseComponent', () => {
  let spectator: Spectator<LoadDtOptionsWithPromiseComponent>;
  let component: LoadDtOptionsWithPromiseComponent;

  const createComponent = createComponentFactory({
    component: LoadDtOptionsWithPromiseComponent,
    declarations: [MockComponent(MarkdownComponent)],
    providers: [
      provideMarkdownServiceTesting(),
      mockProvider(LoadDtOptionsWithPromiseOptionsService, { obtainOptions: () => of(loadDtOptionsJson()) }),
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

    const dir = spectator.query(DataTableDirective) as DataTableDirective;
    expect(dir).toBeTruthy();

    const instance = await dir.dtInstance;
    expect(instance.rows().count()).toBeGreaterThan(0);
  });
});
