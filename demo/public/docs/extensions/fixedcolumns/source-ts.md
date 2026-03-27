```typescript
import { Component, OnInit } from '@angular/core';
import { ADTSettings, AngularDatatable } from 'angular-datatables.net';
import 'datatables.net-fixedcolumns-dt';

@Component({
  imports: [AngularDatatable],
  selector: 'app-fixedcolumns',
  templateUrl: './fixedcolumns-example.html',
})
export class FixedcolumnsExample implements OnInit {
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
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
      ],
      fixedColumns: {
        left: 3,
        right: 0,
      },
      // Make sure that scrollX is set to true for this to work!
      scrollX: true,
    } as ADTSettings; // Unfortunately required because there's still a type issue for fixedcolumns
  }
}
```
