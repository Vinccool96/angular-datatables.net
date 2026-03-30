```typescript
import { Component, ViewChild, OnInit } from '@angular/core';

import { AngularDatatable } from 'angular-datatables.net';

@Component({
  selector: 'dt-instance',
  templateUrl: 'dt-instance-example.html',
})
export class DtInstanceExample implements OnInit {
  @ViewChild(AngularDatatable, { static: false })
  private datatableElement: AngularDatatable;

  dtOptions: DataTables.Settings = {};

  displayToConsole(datatableElement: AngularDatatable): void {
    datatableElement.dtInstance.then((dtInstance: DataTables.Api) => console.log(dtInstance));
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
    };
  }
}
```
