import { AfterViewInit, Component, effect, inject, OnDestroy, signal, TemplateRef, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ADTSettings, AngularDataTable } from 'angular-datatables.net';
import { Subject } from 'rxjs';

import { Person } from '../../person/models/person';
import { BaseDemo } from '../../shared/components/base-demo/base-demo';
import { DemoNgTemplateRef } from '../../shared/components/demo-ng-template-ref/demo-ng-template-ref';
import { DemoNgTemplateRefEventType } from '../../shared/models/demo-ng-template-ref-event-type';

@Component({
  imports: [AngularDataTable, DemoNgTemplateRef, BaseDemo],
  selector: 'app-router-link',
  styleUrl: './router-link-example.css',
  templateUrl: './router-link-example.html',
})
export class RouterLinkExample implements AfterViewInit, OnDestroy {
  public readonly pageTitle = 'Router Link';
  protected dtOptions: ADTSettings = {};
  protected readonly dtTrigger = new Subject<ADTSettings | null>();
  protected readonly mdHTML = 'docs/advanced/router-link/source-html.md';
  protected readonly mdIntro = 'docs/advanced/router-link/intro.md';
  protected readonly mdTS = 'docs/advanced/router-link/source-ts.md';
  protected readonly mdTSV1 = 'docs/advanced/router-link/source-ts-dtv1.md';
  private readonly afterViewInit = signal(false);

  private readonly demoNg = viewChild<TemplateRef<unknown>>('demoNg');

  private readonly ready = signal(false);
  private readonly router = inject(Router);

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
            defaultContent: '',
            ngTemplateRef: {
              context: {
                // needed for capturing events inside <ng-template>
                captureEvents: this.onCaptureEvent.bind(this),
              },
              ref: demo,
            },
            title: 'Action',
          },
        ],
      };

      this.ready.set(true);
    });

    effect(() => {
      if (this.ready() && this.afterViewInit()) {
        this.dtTrigger.next(null);
      }
    });
  }

  public ngAfterViewInit(): void {
    this.afterViewInit.set(true);
  }

  public ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private onCaptureEvent(event: DemoNgTemplateRefEventType): void {
    void this.router.navigate([`/person/${(event.data as Person).id}`]);
  }
}
