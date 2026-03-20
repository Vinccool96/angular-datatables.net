```typescript
import { Component, OnInit, viewChildren } from '@angular/core';
import { ADTSettings, AngularDataTable } from 'angular-datatables.net';

@Component({
  imports: [AngularDataTable],
  selector: 'app-multiple-tables',
  templateUrl: './multiple-tables.component.html',
})
export class MultipleTablesComponent implements OnInit {
  public readonly datatableElements = viewChildren(AngularDataTable);
  protected dtOptions: ADTSettings[] = [];

  public ngOnInit(): void {
    this.dtOptions[0] = this.buildDtOptions('data/data.json');
    this.dtOptions[1] = this.buildDtOptions('data/data1.json');
  }

  protected displayToConsole(): void {
    for (let index = 0; index < this.datatableElements().length; index++) {
      const dtElement: AngularDataTable = this.datatableElements()[index];
      void dtElement.dtInstance.then((dtInstance) => {
        const node = dtInstance.table().node() as HTMLElement;
        console.log(`The DataTable ${index} instance ID is: ${node.id}`);
      });
    }
  }

  private buildDtOptions(url: string): ADTSettings {
    return {
      ajax: url,
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
