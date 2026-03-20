```typescript
import { Component, OnInit } from '@angular/core';
import { ADTSettings, AngularDataTable } from 'angular-datatables.net';
import 'datatables.net-responsive';

@Component({
  imports: [AngularDataTable],
  selector: 'app-responsive',
  templateUrl: './responsive-example.html',
})
export class ResponsiveExample implements OnInit {
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
          className: 'none',
          data: 'lastName',
          title: 'Last name',
        },
      ],
      // Use this attribute to enable the responsive extension
      responsive: true,
    };
  }
}
```
