```typescript
import { Component, OnInit } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';
import 'datatables.net-colreorder';

@Component({
  imports: [DataTableDirective],
  selector: 'app-colreorder',
  templateUrl: './colreorder.component.html',
})
export class ColreorderComponent implements OnInit {
  protected dtOptions: ADTSettings = {};

  public ngOnInit(): void {
    this.dtOptions = {
      ajax: 'data/data.json',
      // Use this attribute to enable colreorder
      colReorder: {
        columns: ':nth-child(2)',
      },
      columns: [
        {
          data: 'id',
          title: 'No move me!',
        },
        {
          data: 'firstName',
          title: 'Try to move me!',
        },
        {
          data: 'lastName',
          title: 'You cannot move me! *evil laugh*',
        },
      ],
      dom: 'Rt',
    };
  }
}
```
