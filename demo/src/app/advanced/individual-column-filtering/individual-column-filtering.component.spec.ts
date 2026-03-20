import { waitForAsync } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { AngularDataTable } from 'angular-datatables.net';
import { Api } from 'datatables.net';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';

import { provideMarkdownServiceTesting } from '../../../../test/provide-markdown-service-testing';
import { IndividualColumnFilteringComponent } from './individual-column-filtering.component';

/**
 * Applies the input value to the field and redraws the table
 * @param inputElement The input
 * @param value The value
 * @param table The table to redraw
 */
function applyValueToInput(inputElement: HTMLInputElement, value: string, table: Api): void {
  inputElement.value = value;
  inputElement.dispatchEvent(new Event('input'));
  inputElement.dispatchEvent(new Event('change'));
  table.draw();
}

describe('IndividualColumnFilteringComponent', () => {
  let spectator: Spectator<IndividualColumnFilteringComponent>;
  let component: IndividualColumnFilteringComponent;

  const createComponent = createComponentFactory({
    component: IndividualColumnFilteringComponent,
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

  it('should have title "Individual column searching"', waitForAsync(() => {
    expect(component.pageTitle).toBe('Individual column searching');
  }));

  it('should filter contents acc. to column', async () => {
    component.dtOptions.paging = false;

    await spectator.fixture.whenStable();

    const dir = spectator.query(AngularDataTable) as AngularDataTable;
    expect(dir).toBeTruthy();

    const instance = await dir.dtInstance;

    const inputFields = [...spectator.queryAll<HTMLInputElement>('input')];
    const inputFieldID = inputFields.find((element) => element.name === 'search-id') as HTMLInputElement;
    const inputFieldFirstName = inputFields.find((element) => element.name === 'search-first-name') as HTMLInputElement;
    const inputFieldLastName = inputFields.find((element) => element.name === 'search-last-name') as HTMLInputElement;

    // # Test 1
    applyValueToInput(inputFieldID, '113', instance);
    expect(instance.rows({ page: 'current' }).count()).toBe(1);

    // # Test 2

    // reset prev. field
    applyValueToInput(inputFieldID, '', instance);
    applyValueToInput(inputFieldFirstName, 'Batman', instance);
    expect(instance.rows({ page: 'current' }).count()).toBe(30);

    // # Test 3
    // reset prev. field
    applyValueToInput(inputFieldFirstName, '', instance);
    applyValueToInput(inputFieldLastName, 'Titi', instance);
    expect(instance.rows({ page: 'current' }).count()).toBe(28);
  });
});
