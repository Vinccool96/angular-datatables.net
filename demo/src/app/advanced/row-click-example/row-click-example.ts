import { Component, OnInit, signal } from '@angular/core';
import { ADTSettings, AngularDatatable } from 'angular-datatables.net';

import { Person } from '../../person/models/person';
import { BaseDemo } from '../../shared/components/base-demo/base-demo';

@Component({
  imports: [BaseDemo, AngularDatatable],
  selector: 'app-row-click',
  styleUrl: './row-click-example.css',
  templateUrl: './row-click-example.html',
})
export class RowClickExample implements OnInit {
  public readonly message = signal('');
  public readonly pageTitle = 'Row click event';
  protected dtOptions: ADTSettings = {};
  protected readonly mdHTML = 'docs/advanced/row-click/source-html.md';
  protected readonly mdIntro = 'docs/advanced/row-click/intro.md';

  protected readonly mdTS = 'docs/advanced/row-click/source-ts.md';

  protected readonly mdTSV1 = 'docs/advanced/row-click/source-ts-dtv1.md';

  public ngOnInit(): void {
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
      rowCallback: (row: Node, data: object, _index: number): Node => {
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

  private someClickHandler(info: Person): void {
    this.message.set(`${info.id} - ${info.firstName}`);
  }
}
