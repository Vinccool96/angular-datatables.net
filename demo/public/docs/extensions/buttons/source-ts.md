```typescript
import { Component, OnInit } from '@angular/core';
import { ADTSettings, AngularDatatable } from 'angular-datatables.net';

import 'datatables.net-buttons-dt';

@Component({
  imports: [AngularDatatable],
  selector: 'app-buttons',
  templateUrl: './buttons-example.html',
})
export class ButtonsExample implements OnInit {
  protected dtOptions: ADTSettings = {};

  public ngOnInit(): void {
    this.dtOptions = {
      ajax: 'data/data.json',
      // Configure the buttons
      buttons: [
        'columnsToggle',
        'colvis',
        'copy',
        {
          exportOptions: [1, 2, 3],
          extend: 'csv',
          fieldSeparator: ';',
          text: 'CSV export',
        },
        'excel',
        {
          action: (): void => {
            alert('Button activated');
          },
          key: '1',
          text: 'Some button',
        },
      ],
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
      layout: {
        bottom2Start: 'paging',
        bottomEnd: null,
        bottomStart: 'info',
        top1Start: 'buttons',
        topEnd: null,
        topStart: 'search',
      },
    };
  }
}
```
