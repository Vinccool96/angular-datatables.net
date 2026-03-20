```typescript
import { Component, ViewChild, OnInit } from '@angular/core';

import { AngularDataTable } from 'angular-datatables.net';

@Component({
  selector: 'dt-instance',
  templateUrl: 'dt-instance-example.html',
})
export class DtInstanceExample implements OnInit {
  @ViewChild(AngularDataTable, { static: false })
  private datatableElement: AngularDataTable;

  dtOptions: DataTables.Settings = {};

  displayToConsole(datatableElement: AngularDataTable): void {
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
