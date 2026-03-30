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
// ./using-ng-template-ref-example.ts

import { AfterViewInit, Component, effect, OnDestroy, signal, TemplateRef, viewChild } from '@angular/core';
import { ADTSettings, AngularDatatable } from 'angular-datatables.net';
import { Subject } from 'rxjs';

import { DemoNgTemplateRef } from './components/demo-ng-template-ref/demo-ng-template-ref';
import { DemoNgTemplateRefEventType } from './models/demo-ng-template-ref-event-type';

@Component({
  imports: [AngularDatatable, DemoNgTemplateRef],
  selector: 'app-using-ng-template-ref',
  templateUrl: './using-ng-template-ref-example.html',
})
export class UsingNgTemplateRefExample implements AfterViewInit, OnDestroy {
  public readonly message = signal('');
  protected dtOptions: ADTSettings = {};
  protected readonly dtTrigger = new Subject<ADTSettings>();

  protected readonly mdTS = 'docs/advanced/using-ng-template-ref/source-ts.md';

  private readonly afterViewInit = signal(false);
  private readonly demoNg = viewChild<TemplateRef<DemoNgTemplateRef>>('demoNg');
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
```
