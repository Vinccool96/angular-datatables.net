import { waitForAsync } from '@angular/core/testing';
import { DataTableDirective } from 'angular-datatables.net';
import { AngularWayComponent } from './angular-way.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';

describe('AngularWayComponent', () => {
  let spectator: Spectator<AngularWayComponent>;
  let component: AngularWayComponent;

  const createComponent = createComponentFactory({
    component: AngularWayComponent,
    declarations: [MockComponent(MarkdownComponent)],
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
    const dir = spectator.query(DataTableDirective);
    expect(dir).toBeTruthy();
    const instance = await dir?.dtInstance;
    spectator.detectChanges();
    expect(instance?.rows().length).toBeGreaterThan(0);
  });
});
