import { waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { createComponentFactory, mockProvider, Spectator, SpyObject } from '@ngneat/spectator';
import { DataTableDirective } from 'angular-datatables.net';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';

import { provideMarkdownServiceTesting } from '../../../../test/provide-markdown-service-testing';
import { RouterLinkComponent } from './router-link.component';

describe('RouterLinkComponent', () => {
  let spectator: Spectator<RouterLinkComponent>;
  let component: RouterLinkComponent;
  let router: SpyObject<Router>;

  const createComponent = createComponentFactory({
    component: RouterLinkComponent,
    declarations: [MockComponent(MarkdownComponent)],
    providers: [mockProvider(Router), provideMarkdownServiceTesting()],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    router = spectator.inject(Router);
  });

  it('should create the app', waitForAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should have title "Router Link"', waitForAsync(() => {
    expect(component.pageTitle).toBe('Router Link');
  }));

  it('should respond to button click event inside TemplateRef', async () => {
    await spectator.fixture.whenStable();

    const dir = spectator.query(DataTableDirective) as DataTableDirective;
    expect(dir).toBeTruthy();

    const row = spectator.query<HTMLTableRowElement>('tbody tr:first-child') as HTMLTableRowElement;
    const button = row.querySelector('button.btn-sm') as HTMLButtonElement;
    button.click();

    expect(router.navigate).toHaveBeenCalled();
  });
});
