import { waitForAsync } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { AngularDatatable } from 'angular-datatables.net';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';

import { provideMarkdownServiceTesting } from '../../../../test/provide-markdown-service-testing';
import { CustomRangeSearchExample } from './custom-range-search-example';

describe('CustomRangeSearchExample', () => {
  let spectator: Spectator<CustomRangeSearchExample>;
  let component: CustomRangeSearchExample;

  const createComponent = createComponentFactory({
    component: CustomRangeSearchExample,
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

  it('should have title "Custom filtering - Range search"', waitForAsync(() => {
    expect(component.pageTitle).toBe('Custom filtering - Range search');
  }));

  it('should have data filtered when min, max values change', async () => {
    await spectator.fixture.whenStable();

    const dir = spectator.query(AngularDatatable) as AngularDatatable;
    expect(dir).toBeTruthy();
    const instance = await dir.dtInstance;

    //  # Test 1

    spectator.typeInElement('1', 'input[name="min"]');
    spectator.typeInElement('5', 'input[name="max"]');

    instance.draw();
    spectator.detectChanges();

    expect(instance.rows({ page: 'current' }).count()).toBe(1);

    //  # Test 2

    spectator.typeInElement('1', 'input[name="min"]');
    spectator.typeInElement('15', 'input[name="max"]');

    instance.draw();
    spectator.detectChanges();

    expect(instance.rows({ page: 'current' }).count()).toBe(3);
  });
});
