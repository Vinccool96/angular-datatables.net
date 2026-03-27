```typescript
import { AfterViewInit, Component, OnInit, viewChild } from '@angular/core';
import { ADTSettings, AngularDatatable } from 'angular-datatables.net';

@Component({
  imports: [AngularDatatable],
  selector: 'app-individual-column-filtering',
  styleUrl: './individual-column-filtering-example.css',
  templateUrl: './individual-column-filtering-example.html',
})
export class IndividualColumnFilteringExample implements AfterViewInit, OnInit {
  public dtOptions: ADTSettings = {};
  private readonly datatableElement = viewChild(AngularDatatable);

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
