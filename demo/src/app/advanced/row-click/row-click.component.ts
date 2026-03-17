import { Component, OnInit, signal } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';

import { Person } from '../../person/models/person';
import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  imports: [BaseDemoComponent, DataTableDirective],
  selector: 'app-row-click',
  styleUrl: './row-click.component.css',
  templateUrl: './row-click.component.html',
})
export class RowClickComponent implements OnInit {
  dtOptions: ADTSettings = {};
  readonly mdHTML = 'docs/advanced/row-click/source-html.md';
  readonly mdIntro = 'docs/advanced/row-click/intro.md';
  readonly mdTS = 'docs/advanced/row-click/source-ts.md';
  readonly mdTSV1 = 'docs/advanced/row-click/source-ts-dtv1.md';

  readonly message = signal('');

  readonly pageTitle = 'Row click event';

  ngOnInit(): void {
    this.dtOptions = {
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

  someClickHandler(info: Person): void {
    this.message.set(`${info.id} - ${info.firstName}`);
  }
}
