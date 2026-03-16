import { Component, OnInit, signal } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  selector: 'app-with-options',
  imports: [BaseDemoComponent, DataTableDirective],
  templateUrl: './with-options.component.html',
  styleUrl: './with-options.component.css',
})
export class WithOptionsComponent implements OnInit {
  readonly pageTitle = 'With Options';
  readonly mdIntro = 'docs/basic/with-options/intro.md';
  readonly mdHTML = 'docs/basic/with-options/source-html.md';
  readonly mdTS = 'docs/basic/with-options/source-ts.md';
  readonly mdTSV1 = 'docs/basic/with-options/source-ts-dtv1.md';

  readonly dtOptions = signal<ADTSettings>({});

  ngOnInit() {
    this.dtOptions.set({
      pagingType: 'simple',
    });
  }
}
