import { Component, input, output } from '@angular/core';

import { DemoNgTemplateRefEventType } from '../../models/demo-ng-template-ref-event-type';

@Component({
  imports: [],
  selector: 'app-demo-ng-template-ref',
  styleUrl: './demo-ng-template-ref.component.css',
  templateUrl: './demo-ng-template-ref.component.html',
})
export class DemoNgTemplateRefComponent {
  readonly actionText = input('Action 1');
  readonly data = input<object>({});

  readonly emitter = output<DemoNgTemplateRefEventType>();

  onAction1() {
    this.emitter.emit({
      cmd: 'action1',
      data: this.data(),
    });
  }
}
