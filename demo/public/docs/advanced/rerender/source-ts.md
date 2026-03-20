```typescript
import { AfterViewInit, Component, OnDestroy, OnInit, viewChild } from '@angular/core';
import { ADTSettings, AngularDataTable } from 'angular-datatables.net';
import { Subject } from 'rxjs';

@Component({
  imports: [AngularDataTable],
  selector: 'app-rerender',
  templateUrl: './rerender-example.html',
})
export class RerenderExample implements AfterViewInit, OnDestroy, OnInit {
  protected dtOptions: ADTSettings = {};
  protected readonly dtTrigger = new Subject<ADTSettings | null>();

  private readonly datatableElement = viewChild(AngularDataTable);

  public ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  public ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
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

  public rerender(): void {
    void this.datatableElement()?.dtInstance.then((dtInstance) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }
}
```
