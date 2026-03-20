```typescript
// ./models/demo-ng-template-ref-event-type.ts

export interface DemoNgTemplateRefEventType {
  cmd: string;
  data: unknown;
}
```

```typescript
// ./components/demo-ng-template-ref/demo-ng-template-ref.ts

import { Component, input, output } from '@angular/core';

import { DemoNgTemplateRefEventType } from '../../models/demo-ng-template-ref-event-type';

@Component({
  imports: [],
  selector: 'app-demo-ng-template-ref',
  template: `
    <div class="btn-group d-block text-center">
      <button class="btn btn-sm btn-dark" (click)="onAction1()">
        {{ actionText() }}
      </button>
    </div>
  `,
})
export class DemoNgTemplateRef {
  public readonly actionText = input('Action 1');
  public readonly data = input<object>({});

  public readonly emitter = output<DemoNgTemplateRefEventType>();

  protected onAction1(): void {
    this.emitter.emit({
      cmd: 'action1',
      data: this.data(),
    });
  }
}
```

```typescript
// .router-link-example.ts

import { AfterViewInit, Component, effect, inject, OnDestroy, signal, TemplateRef, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ADTSettings, AngularDataTable } from 'angular-datatables.net';
import { Subject } from 'rxjs';

import { Person } from '../../person/models/person';
import { DemoNgTemplateRef } from './components/demo-ng-template-ref/demo-ng-template-ref';
import { DemoNgTemplateRefEventType } from './models/demo-ng-template-ref-event-type';

@Component({
  imports: [AngularDataTable, DemoNgTemplateRef],
  selector: 'app-router-link',
  templateUrl: './router-link-example.html',
})
export class RouterLinkExample implements AfterViewInit, OnDestroy {
  protected dtOptions: ADTSettings = {};
  protected readonly dtTrigger = new Subject<ADTSettings | null>();
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
```
