import { waitForAsync } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';

import { provideMarkdownServiceTesting } from '../../../../test/provide-markdown-service-testing';
import { MultipleTablesExample } from './multiple-tables-example';

describe('MultipleTablesExample', () => {
  let spectator: Spectator<MultipleTablesExample>;
  let component: MultipleTablesExample;

  const createComponent = createComponentFactory({
    component: MultipleTablesExample,
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

  it('should have title "Multiple tables in the same page"', waitForAsync(() => {
    expect(component.pageTitle).toBe('Multiple tables in the same page');
  }));

  it('should have two table instances in dtElements', async () => {
    await spectator.fixture.whenStable();

    expect(component.datatableElements().length).toBe(2);
  });
});
