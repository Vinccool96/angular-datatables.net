import { AfterViewInit, Component, effect, OnDestroy, signal, TemplateRef, viewChild } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';
import { Subject } from 'rxjs';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';
import { DemoNgTemplateRefComponent } from '../../shared/components/demo-ng-template-ref/demo-ng-template-ref.component';
import { DemoNgTemplateRefEventType } from '../../shared/models/demo-ng-template-ref-event-type';

@Component({
  imports: [DataTableDirective, BaseDemoComponent, DemoNgTemplateRefComponent],
  selector: 'app-using-ng-template-ref',
  styleUrl: './using-ng-template-ref.component.css',
  templateUrl: './using-ng-template-ref.component.html',
})
export class UsingNgTemplateRefComponent implements AfterViewInit, OnDestroy {
  public readonly message = signal('');
  public readonly pageTitle = 'Using Angular TemplateRef';
  protected dtOptions: ADTSettings = {};
  protected readonly dtTrigger = new Subject<ADTSettings>();
  protected readonly mdHTML = 'docs/advanced/using-ng-template-ref/source-html.md';
  protected readonly mdIntro = 'docs/advanced/using-ng-template-ref/intro.md';

  protected readonly mdTS = 'docs/advanced/using-ng-template-ref/source-ts.md';

  private readonly afterViewInit = signal(false);
  private readonly demoNg = viewChild<TemplateRef<DemoNgTemplateRefComponent>>('demoNg');
  private readonly ready = signal(false);

  public constructor() {
    effect(() => {
      const demo = this.demoNg();

      if (demo === undefined) {
        return;
      }

      this.dtOptions = {
        ajax: 'data/data.json',
        columns: [
          {
            data: 'id',
            title: 'ID',
          },
          {
            data: 'firstName',
            title: 'First name',
          },
          {
            data: 'lastName',
            title: 'Last name',
          },
          {
            data: null,
            defaultContent: '',
            ngTemplateRef: {
              context: {
                // needed for capturing events inside <ng-template>
                captureEvents: this.onCaptureEvent.bind(this),
              },
              ref: demo,
            },
            title: 'Actions',
          },
        ],
      };

      this.ready.set(true);
    });

    effect(() => {
      if (this.ready() && this.afterViewInit()) {
        this.dtTrigger.next(this.dtOptions);
      }
    });
  }

  public ngAfterViewInit(): void {
    this.afterViewInit.set(true);
  }

  public ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  private onCaptureEvent(event: DemoNgTemplateRefEventType): void {
    this.message.set(`Event '${event.cmd}' with data '${JSON.stringify(event.data)}`);
  }
}
