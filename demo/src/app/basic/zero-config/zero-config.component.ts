import { Component } from '@angular/core';
import { DataTableDirective } from 'angular-datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  imports: [BaseDemoComponent, DataTableDirective],
  selector: 'app-zero-config',
  styleUrl: './zero-config.component.css',
  templateUrl: './zero-config.component.html',
})
export class ZeroConfigComponent {
  public readonly pageTitle = 'Zero configuration';
  protected readonly mdHTML = 'docs/basic/zero-config/source-html.md';
  protected readonly mdIntro = 'docs/basic/zero-config/intro.md';
  protected readonly mdTSV1 = 'docs/basic/zero-config/source-ts.md';
}
