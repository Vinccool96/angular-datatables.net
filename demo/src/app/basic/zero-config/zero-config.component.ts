import { Component } from '@angular/core';
import { DataTableDirective } from 'angular-datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  selector: 'app-zero-config',
  imports: [BaseDemoComponent, DataTableDirective],
  templateUrl: './zero-config.component.html',
  styleUrl: './zero-config.component.css',
})
export class ZeroConfigComponent {
  readonly pageTitle = 'Zero configuration';
  readonly mdIntro = 'docs/basic/zero-config/intro.md';
  readonly mdHTML = 'docs/basic/zero-config/source-html.md';
  readonly mdTSV1 = 'docs/basic/zero-config/source-ts.md';
}
