import { waitForAsync } from '@angular/core/testing';
import { DataTableDirective } from 'angular-datatables.net';
import { CustomRangeSearchComponent } from './custom-range-search.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';

describe('CustomRangeSearchComponent', () => {
  let spectator: Spectator<CustomRangeSearchComponent>;
  let component: CustomRangeSearchComponent;

  const createComponent = createComponentFactory({
    component: CustomRangeSearchComponent,
    declarations: [MockComponent(MarkdownComponent)],
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

    const dir = spectator.query(DataTableDirective) as DataTableDirective;
    expect(dir).toBeTruthy();
    const instance = await dir.dtInstance;

    const inputFieldMin = spectator.query('input[name="min"]') as HTMLInputElement;
    const inputFieldMax = spectator.query('input[name="max"]') as HTMLInputElement;

    //  # Test 1

    inputFieldMin.value = '1';
    inputFieldMax.value = '5';

    inputFieldMin.dispatchEvent(new Event('input'));
    inputFieldMax.dispatchEvent(new Event('input'));

    instance.draw();
    spectator.detectChanges();

    expect(instance.rows({ page: 'current' }).count()).toBe(1);

    //  # Test 2

    inputFieldMin.value = '1';
    inputFieldMax.value = '15';

    inputFieldMin.dispatchEvent(new Event('input'));
    inputFieldMax.dispatchEvent(new Event('input'));

    instance.draw();
    spectator.detectChanges();

    expect(instance.rows({ page: 'current' }).count()).toBe(3);
  });
});
