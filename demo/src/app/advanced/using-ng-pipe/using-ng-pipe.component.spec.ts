import { waitForAsync } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { DataTableDirective } from 'angular-datatables.net';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';

import { provideMarkdownServiceTesting } from '../../../../test/provide-markdown-service-testing';
import { Person } from '../../person/models/person';
import { UsingNgPipeComponent } from './using-ng-pipe.component';

describe('UsingNgPipeComponent', () => {
  let spectator: Spectator<UsingNgPipeComponent>;
  let component: UsingNgPipeComponent;

  const createComponent = createComponentFactory({
    component: UsingNgPipeComponent,
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

  it('should have title "Using Angular Pipe"', waitForAsync(() => {
    expect(component.pageTitle).toBe('Using Angular Pipe');
  }));

  it('should have firstName, lastName columns have text in uppercase', async () => {
    await spectator.fixture.whenStable();

    const dir = spectator.query(DataTableDirective) as DataTableDirective;
    expect(dir).toBeTruthy();

    const instance = await dir.dtInstance;

    const rows = spectator.queryAll('tbody tr');

    const testsArray = [0, 3, 6];
    const expectedArray = testsArray.map((_) => true);

    expect(
      testsArray.map((index) => {
        const dataRow = rows[index];

        const firstNameFromData = (instance.row(dataRow).data() as Person).firstName;
        const firstNameFromTable = $('td:nth-child(2)', dataRow).text();

        const lastNameFromData = (instance.row(dataRow).data() as Person).lastName;
        const lastNameFromTable = $('td:nth-child(3)', dataRow).text();
        return (
          firstNameFromTable === firstNameFromData.toUpperCase() && lastNameFromTable === lastNameFromData.toUpperCase()
        );
      }),
    ).toEqual(expectedArray);
  });

  it('should have money on id column', async () => {
    await spectator.fixture.whenStable();

    const dir = spectator.query(DataTableDirective) as DataTableDirective;
    expect(dir).toBeTruthy();

    const instance = await dir.dtInstance;

    const rows = spectator.queryAll<HTMLElement>('tbody tr');

    const testsArray = [0, 3, 6];
    const expectedArray = testsArray.map((_) => true);

    expect(
      testsArray.map((index) => {
        const dataRow = rows[index];

        const pipeInstance = component.pipeCurrencyInstance;

        const IdFromData = (instance.row(dataRow).data() as Person).id;
        const IdFromTable = $('td:nth-child(1)', dataRow).text();
        return IdFromTable === pipeInstance.transform(IdFromData, 'USD', 'symbol');
      }),
    ).toEqual(expectedArray);
  });

  it('should not crash when using "visible: false" for columns', async () => {
    await spectator.fixture.whenStable();
    spectator.detectChanges();

    const dir = spectator.query(DataTableDirective) as DataTableDirective;
    expect(dir).toBeTruthy();

    // hide first column
    let instance = await dir.dtInstance;
    instance.columns(0).visible(false);
    await spectator.fixture.whenRenderingDone();

    spectator.detectChanges();

    // verify app still works
    instance = await dir.dtInstance;
    expect(instance.column(0).visible()).toBeFalse();
  });
});
