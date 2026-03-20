import { Component, input, output } from '@angular/core';

import { DemoNgTemplateRefEventType } from '../../models/demo-ng-template-ref-event-type';

@Component({
  imports: [],
  selector: 'app-demo-ng-template-ref',
  styleUrl: './demo-ng-template-ref.css',
  templateUrl: './demo-ng-template-ref.html',
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
