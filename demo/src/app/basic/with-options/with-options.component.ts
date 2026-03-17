import { Component, OnInit, signal } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  imports: [BaseDemoComponent, DataTableDirective],
  selector: 'app-with-options',
  styleUrl: './with-options.component.css',
  templateUrl: './with-options.component.html',
})
export class WithOptionsComponent implements OnInit {
  readonly dtOptions = signal<ADTSettings>({});
  readonly mdHTML = 'docs/basic/with-options/source-html.md';
  readonly mdIntro = 'docs/basic/with-options/intro.md';
  readonly mdTS = 'docs/basic/with-options/source-ts.md';
  readonly mdTSV1 = 'docs/basic/with-options/source-ts-dtv1.md';

  readonly pageTitle = 'With Options';

  ngOnInit() {
    this.dtOptions.set({
      pagingType: 'simple',
    });
  }
}
