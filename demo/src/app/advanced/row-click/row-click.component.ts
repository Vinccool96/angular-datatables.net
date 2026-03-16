import { Component, OnInit, signal } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';

import { Person } from '../../person/models/person';
import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  selector: 'app-row-click',
  imports: [BaseDemoComponent, DataTableDirective],
  templateUrl: './row-click.component.html',
  styleUrl: './row-click.component.css',
})
export class RowClickComponent implements OnInit {
  readonly pageTitle = 'Row click event';
  readonly mdIntro = 'docs/advanced/row-click/intro.md';
  readonly mdHTML = 'docs/advanced/row-click/source-html.md';
  readonly mdTS = 'docs/advanced/row-click/source-ts.md';
  readonly mdTSV1 = 'docs/advanced/row-click/source-ts-dtv1.md';

  readonly message = signal('');

  dtOptions: ADTSettings = {};

  someClickHandler(info: Person): void {
    this.message.set(`${info.id} - ${info.firstName}`);
  }

  ngOnInit(): void {
    this.dtOptions = {
      ajax: 'data/data.json',
      columns: [
        {
          title: 'ID',
          data: 'id',
        },
        {
          title: 'First name',
          data: 'firstName',
        },
        {
          title: 'Last name',
          data: 'lastName',
        },
      ],
      rowCallback: (row: Node, data: object, _index: number) => {
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are
        // deprecated in favor of `off` and `on`
        $('td', row).off('click');
        $('td', row).on('click', () => {
          this.someClickHandler(data as Person);
        });
        return row;
      },
    };
  }
}
