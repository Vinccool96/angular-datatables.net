import { Component } from '@angular/core';
import { AngularDatatable } from 'angular-datatables.net';

import { BaseDemo } from '../../shared/components/base-demo/base-demo';

@Component({
  imports: [BaseDemo, AngularDatatable],
  selector: 'app-zero-config',
  styleUrl: './zero-config-example.css',
  templateUrl: './zero-config-example.html',
})
export class ZeroConfigExample {
  public readonly pageTitle = 'Zero configuration';
  protected readonly mdHTML = 'docs/basic/zero-config/source-html.md';
  protected readonly mdIntro = 'docs/basic/zero-config/intro.md';
  protected readonly mdTSV1 = 'docs/basic/zero-config/source-ts.md';
}
