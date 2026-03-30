```typescript
import { Component, OnInit } from '@angular/core';
import { ADTSettings, AngularDatatable } from 'angular-datatables.net';

@Component({
  imports: [AngularDatatable],
  selector: 'app-with-ajax',
  templateUrl: './with-ajax.component.html',
})
export class WithAjaxComponent implements OnInit {
  public dtOptions: ADTSettings = {};

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
    };
  }
}
```
