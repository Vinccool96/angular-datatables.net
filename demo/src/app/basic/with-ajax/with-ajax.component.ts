import { Component, OnInit, signal } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  imports: [BaseDemoComponent, DataTableDirective],
  selector: 'app-with-ajax',
  styleUrl: './with-ajax.component.css',
  templateUrl: './with-ajax.component.html',
})
export class WithAjaxComponent implements OnInit {
  readonly dtOptions = signal<ADTSettings>({});
  readonly mdHTML = 'docs/basic/with-ajax/source-html.md';
  readonly mdIntro = 'docs/basic/with-ajax/intro.md';
  readonly mdTS = 'docs/basic/with-ajax/source-ts.md';
  readonly mdTSV1 = 'docs/basic/with-ajax/source-ts-dtv1.md';

  readonly pageTitle = 'With Ajax';

  ngOnInit() {
    this.dtOptions.set({
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
      ],
      search: false,
    });
  }
}
