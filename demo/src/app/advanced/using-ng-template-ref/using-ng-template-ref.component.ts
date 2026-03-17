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
  readonly demoNg = viewChild<TemplateRef<DemoNgTemplateRefComponent>>('demoNg');
  dtOptions: ADTSettings = {};
  readonly dtTrigger = new Subject<ADTSettings>();
  readonly mdHTML = 'docs/advanced/using-ng-template-ref/source-html.md';

  readonly mdIntro = 'docs/advanced/using-ng-template-ref/intro.md';
  readonly mdTS = 'docs/advanced/using-ng-template-ref/source-ts.md';

  readonly message = signal('');

  readonly pageTitle = 'Using Angular TemplateRef';
  private readonly afterViewInit = signal(false);
  private readonly ready = signal(false);

  constructor() {
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

  ngAfterViewInit() {
    this.afterViewInit.set(true);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  onCaptureEvent(event: DemoNgTemplateRefEventType) {
    this.message.set(`Event '${event.cmd}' with data '${JSON.stringify(event.data)}`);
  }
}
