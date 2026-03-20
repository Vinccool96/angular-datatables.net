```typescript
import { Component, OnInit } from '@angular/core';
import { ADTSettings, AngularDataTable } from 'angular-datatables.net';
import 'datatables.net-select';

@Component({
  imports: [AngularDataTable],
  selector: 'app-select',
  templateUrl: './select-example.html',
})
export class SelectExample implements OnInit {
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
      // Use this attribute to enable the select extension
      select: true,
    };
  }
}
```
