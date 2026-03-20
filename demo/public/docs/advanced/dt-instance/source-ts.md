```typescript
import { AsyncPipe } from '@angular/common';
import { Component, OnInit, viewChild } from '@angular/core';
import { ADTSettings, AngularDataTable } from 'angular-datatables.net';

@Component({
  imports: [AngularDataTable, AsyncPipe],
  selector: 'app-dt-instance',
  templateUrl: './dt-instance.component.html',
})
export class DtInstanceComponent implements OnInit {
  protected readonly datatableElement = viewChild(AngularDataTable);
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
    };
  }

  protected displayToConsole(datatableElement: AngularDataTable | undefined): void {
    if (datatableElement === undefined) {
      return;
    }

    void datatableElement.dtInstance.then((dtInstance) => {
      console.log(dtInstance);
    });
  }
}
```
