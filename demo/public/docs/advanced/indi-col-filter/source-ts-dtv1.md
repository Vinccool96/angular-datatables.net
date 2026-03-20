```typescript
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { AngularDataTable } from 'angular-datatables.net';

@Component({
  selector: 'app-individual-column-filtering',
  templateUrl: 'individual-column-filtering-example.html',
})
export class IndividualColumnFilteringExample implements OnInit, AfterViewInit {
  @ViewChild(AngularDataTable, { static: false })
  datatableElement: AngularDataTable;

  dtOptions: DataTables.Settings = {};

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

  ngAfterViewInit(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.footer()).on('keyup change', function () {
          if (that.search() !== this['value']) {
            that.search(this['value']).draw();
          }
        });
      });
    });
  }
}
```
