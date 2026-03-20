```typescript
import { Component, OnInit, signal } from '@angular/core';
import { ADTSettings, AngularDataTable } from 'angular-datatables.net';

import { Person } from '../../person/models/person';

@Component({
  imports: [AngularDataTable],
  selector: 'app-row-click',
  styleUrl: './row-click-example.css',
  templateUrl: './row-click-example.html',
})
export class RowClickExample implements OnInit {
  public readonly message = signal('');
  protected dtOptions: ADTSettings = {};

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
```
