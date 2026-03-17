import { waitForAsync } from '@angular/core/testing';
import { DataTableDirective } from 'angular-datatables.net';
import { UsingNgTemplateRefComponent } from './using-ng-template-ref.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';
import { provideMarkdownServiceTesting } from '../../../../test/provide-markdown-service-testing';

describe('UsingNgTemplateRefComponent', () => {
  let spectator: Spectator<UsingNgTemplateRefComponent>;
  let component: UsingNgTemplateRefComponent;

  const createComponent = createComponentFactory({
    component: UsingNgTemplateRefComponent,
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

  it('should have title "Using Angular TemplateRef"', waitForAsync(() => {
    expect(component.pageTitle).toBe('Using Angular TemplateRef');
  }));

  it('should have firstName, lastName columns have text in uppercase', async () => {
    await spectator.fixture.whenStable();

    const dir = spectator.query(DataTableDirective) as DataTableDirective;
    expect(dir).toBeTruthy();

    expect(component.message()).toBe('');

    const row = spectator.query('tbody tr:first-child') as HTMLElement;
    const button = row.querySelector('button.btn-sm') as HTMLButtonElement;
    button.click();

    expect(component.message()).toBe(`Event 'action1' with data '{}`);
  });

  it('should not crash when using "visible: false" for columns', async () => {
    await spectator.fixture.whenStable();
    spectator.detectChanges();

    const dir = spectator.query(DataTableDirective) as DataTableDirective;
    expect(dir).toBeTruthy();

    // hide first column
    (await dir.dtInstance).columns(0).visible(false);
    await spectator.fixture.whenRenderingDone();

    spectator.detectChanges();

    // verify app still works
    expect((await dir.dtInstance).column(0).visible()).toBeFalse();
  });

  it('should not have duplicate contents in ngTemplateRef column when navigating pages', async () => {
    await spectator.fixture.whenStable();
    spectator.detectChanges();

    const dir = spectator.query(DataTableDirective) as DataTableDirective;
    expect(dir).toBeTruthy();

    // trigger pagination events
    (await dir.dtInstance).page(2).draw(false);
    await spectator.fixture.whenRenderingDone();

    (await dir.dtInstance).page(0).draw(false);
    await spectator.fixture.whenRenderingDone();
    spectator.detectChanges();

    // verify no duplication
    const firstRow = spectator.query('tbody') as HTMLElement;
    const templatedCell = firstRow.children[0].children[3];
    expect(templatedCell.children.length).toBe(1);
  });
});
