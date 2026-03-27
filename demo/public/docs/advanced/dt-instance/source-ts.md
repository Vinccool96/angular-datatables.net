```typescript
import { AsyncPipe } from '@angular/common';
import { Component, OnInit, viewChild } from '@angular/core';
import { ADTSettings, AngularDatatable } from 'angular-datatables.net';

@Component({
  imports: [AngularDatatable, AsyncPipe],
  selector: 'app-dt-instance',
  templateUrl: './dt-instance-example.html',
})
export class DtInstanceExample implements OnInit {
  protected readonly datatableElement = viewChild(AngularDatatable);
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

  protected displayToConsole(datatableElement: AngularDatatable | undefined): void {
    if (datatableElement === undefined) {
      return;
    }

    void datatableElement.dtInstance.then((dtInstance) => {
      console.log(dtInstance);
    });
  }
}
```
