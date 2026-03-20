```typescript
import { AfterViewInit, Component, OnInit, viewChild } from '@angular/core';
import { ADTSettings, AngularDataTable } from 'angular-datatables.net';

@Component({
  imports: [AngularDataTable],
  selector: 'app-individual-column-filtering',
  styleUrl: './individual-column-filtering.component.css',
  templateUrl: './individual-column-filtering.component.html',
})
export class IndividualColumnFilteringComponent implements AfterViewInit, OnInit {
  public dtOptions: ADTSettings = {};
  private readonly datatableElement = viewChild(AngularDataTable);

  public ngAfterViewInit(): void {
    void this.datatableElement()?.dtInstance.then((dtInstance) => {
      dtInstance.columns().every(function () {
        const search = this.search.bind(this);
        $('input', this.footer()).on('keyup change', function () {
          if (search() !== this['value']) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            search(this['value']).draw();
          }
        });
      });
    });
  }

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
