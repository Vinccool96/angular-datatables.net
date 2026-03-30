```typescript
import { Component, OnInit } from '@angular/core';
import { ADTSettings, AngularDatatable } from 'angular-datatables.net';
import 'datatables.net-responsive';

@Component({
  imports: [AngularDatatable],
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
