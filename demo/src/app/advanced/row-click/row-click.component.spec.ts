import { waitForAsync } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { RowClickComponent } from './row-click.component';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';

describe('RowClickComponent', () => {
  let spectator: Spectator<RowClickComponent>;
  let component: RowClickComponent;

  const createComponent = createComponentFactory({
    component: RowClickComponent,
    declarations: [MockComponent(MarkdownComponent)],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create the app', waitForAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should have title "Row click event"', waitForAsync(() => {
    expect(component.pageTitle).toBe('Row click event');
  }));

  it('should display row data on table cell click', async () => {
    await spectator.fixture.whenStable();

    //  Test
    const tr1 = spectator.query('tbody tr:nth-child(1)') as HTMLElement;
    $('td:first-child', tr1).trigger('click');
    expect(component.message()).toBe('3 - Cartman');

    //  Test 2
    const tr4 = spectator.query('tbody tr:nth-child(4)') as HTMLElement;
    $('td:first-child', tr4).trigger('click');
    expect(component.message()).toBe('22 - Luke');

    //  Test 3
    const tr7 = spectator.query('tbody tr:nth-child(7)') as HTMLElement;
    $('td:first-child', tr7).trigger('click');
    expect(component.message()).toBe('32 - Batman');
  });
});
