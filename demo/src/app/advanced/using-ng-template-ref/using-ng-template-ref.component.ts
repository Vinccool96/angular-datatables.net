import { AfterViewInit, Component, effect, OnDestroy, signal, TemplateRef, viewChild } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';
import { Subject } from 'rxjs';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';
import { DemoNgTemplateRefComponent } from '../../shared/components/demo-ng-template-ref/demo-ng-template-ref.component';
import { DemoNgTemplateRefEventType } from '../../shared/models/demo-ng-template-ref-event-type';

@Component({
  selector: 'app-using-ng-template-ref',
  imports: [DataTableDirective, BaseDemoComponent, DemoNgTemplateRefComponent],
  templateUrl: './using-ng-template-ref.component.html',
  styleUrl: './using-ng-template-ref.component.css',
})
export class UsingNgTemplateRefComponent implements AfterViewInit, OnDestroy {
  readonly pageTitle = 'Using Angular TemplateRef';
  readonly mdIntro = 'docs/advanced/using-ng-template-ref/intro.md';
  readonly mdHTML = 'docs/advanced/using-ng-template-ref/source-html.md';
  readonly mdTS = 'docs/advanced/using-ng-template-ref/source-ts.md';

  dtOptions: ADTSettings = {};
  readonly dtTrigger = new Subject<ADTSettings>();

  readonly demoNg = viewChild<TemplateRef<DemoNgTemplateRefComponent>>('demoNg');

  readonly message = signal('');
  private readonly ready = signal(false);
  private readonly afterViewInit = signal(false);

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
            title: 'ID',
            data: 'id',
          },
          {
            title: 'First name',
            data: 'firstName',
          },
          {
            title: 'Last name',
            data: 'lastName',
          },
          {
            title: 'Actions',
            data: null,
            defaultContent: '',
            ngTemplateRef: {
              ref: demo,
              context: {
                // needed for capturing events inside <ng-template>
                captureEvents: this.onCaptureEvent.bind(this),
              },
            },
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

  onCaptureEvent(event: DemoNgTemplateRefEventType) {
    this.message.set(`Event '${event.cmd}' with data '${JSON.stringify(event.data)}`);
  }

  ngAfterViewInit() {
    this.afterViewInit.set(true);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
