import { waitForAsync } from '@angular/core/testing';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator';
import { AngularDataTable } from 'angular-datatables.net';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';
import { of } from 'rxjs';

import { loadDataJson } from '../../../../test/load-json';
import { provideMarkdownServiceTesting } from '../../../../test/provide-markdown-service-testing';
import { AngularWayExample } from './angular-way-example';
import { AngularWayApi } from './services/angular-way-api';

describe('AngularWayExample', () => {
  let spectator: Spectator<AngularWayExample>;
  let component: AngularWayExample;

  const createComponent = createComponentFactory({
    component: AngularWayExample,
    declarations: [MockComponent(MarkdownComponent)],
    providers: [provideMarkdownServiceTesting(), mockProvider(AngularWayApi, { obtainData: () => of(loadDataJson()) })],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create the app', waitForAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should have title "Angular way"', waitForAsync(() => {
    expect(component.pageTitle).toBe('Angular way');
  }));

  it('should have table populated via AJAX', async () => {
    await spectator.fixture.whenStable();
    const dir = spectator.query(AngularDataTable) as AngularDataTable;
    expect(dir).toBeTruthy();
    const instance = await dir.dtInstance;
    spectator.detectChanges();
    expect(instance.rows().length).toBeGreaterThan(0);
  });
});
