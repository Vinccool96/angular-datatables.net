```typescript
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

import { AngularDataTable } from 'angular-datatables.net';

@Component({
  selector: 'app-multiple-tables',
  templateUrl: 'multiple-tables-example.html',
})
export class MultipleTablesExample implements OnInit {
  @ViewChildren(AngularDataTable)
  dtElements: QueryList;

  dtOptions: DataTables.Settings[] = [];

  displayToConsole(): void {
    this.dtElements.forEach((dtElement: AngularDataTable, index: number) => {
      dtElement.dtInstance.then((dtInstance: any) => {
        console.log(`The DataTable ${index} instance ID is: ${dtInstance.table().node().id}`);
      });
    });
  }

  ngOnInit(): void {
    this.dtOptions[0] = this.buildDtOptions('data/data.json');
    this.dtOptions[1] = this.buildDtOptions('data/data1.json');
  }

  private buildDtOptions(url: string): DataTables.Settings {
    return {
      ajax: url,
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
