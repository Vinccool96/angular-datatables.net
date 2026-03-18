```typescript
import { AsyncPipe } from '@angular/common';
import { Component, OnInit, viewChild } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';

@Component({
  imports: [DataTableDirective, AsyncPipe],
  selector: 'app-dt-instance',
  templateUrl: './dt-instance.component.html',
})
export class DtInstanceComponent implements OnInit {
  protected readonly datatableElement = viewChild(DataTableDirective);
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

  protected displayToConsole(datatableElement: DataTableDirective | undefined): void {
    if (datatableElement === undefined) {
      return;
    }

    void datatableElement.dtInstance.then((dtInstance) => {
      console.log(dtInstance);
    });
  }
}
```
