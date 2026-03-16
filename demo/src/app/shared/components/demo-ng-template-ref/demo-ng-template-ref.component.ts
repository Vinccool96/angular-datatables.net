import { Component, input, output } from '@angular/core';

import { DemoNgTemplateRefEventType } from '../../models/demo-ng-template-ref-event-type';

@Component({
  selector: 'app-demo-ng-template-ref',
  imports: [],
  templateUrl: './demo-ng-template-ref.component.html',
  styleUrl: './demo-ng-template-ref.component.css',
})
export class DemoNgTemplateRefComponent {
  readonly data = input<object>({});
  readonly actionText = input('Action 1');

  readonly emitter = output<DemoNgTemplateRefEventType>();

  onAction1() {
    this.emitter.emit({
      cmd: 'action1',
      data: this.data(),
    });
  }
}
