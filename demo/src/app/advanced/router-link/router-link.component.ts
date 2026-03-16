import { Component, effect, inject, OnDestroy, signal, TemplateRef, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';
import { Subject } from 'rxjs';

import { DemoNgTemplateRefComponent } from '../../shared/components/demo-ng-template-ref/demo-ng-template-ref.component';
import { DemoNgTemplateRefEventType } from '../../shared/models/demo-ng-template-ref-event-type';
import { Person } from '../../person/models/person';
import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  selector: 'app-router-link',
  imports: [DataTableDirective, DemoNgTemplateRefComponent, BaseDemoComponent],
  templateUrl: './router-link.component.html',
  styleUrl: './router-link.component.css',
})
export class RouterLinkComponent implements OnDestroy {
  readonly pageTitle = 'Router Link';
  readonly mdIntro = 'docs/advanced/router-link/intro.md';
  readonly mdHTML = 'docs/advanced/router-link/source-html.md';
  readonly mdTSV1 = 'docs/advanced/router-link/source-ts-dtv1.md';
  readonly mdTS = 'docs/advanced/router-link/source-ts.md';

  dtOptions: ADTSettings = {};
  readonly dtTrigger = new Subject<ADTSettings>();

  readonly demoNg = viewChild<TemplateRef<unknown>>('demoNg');

  private readonly router = inject(Router);

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
            title: 'Action',
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
      if (this.ready()) {
        this.dtTrigger.next(this.dtOptions);
      }
    });
  }

  onCaptureEvent(event: DemoNgTemplateRefEventType) {
    void this.router.navigate([`/person/${(event.data as Person).id}`]);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
