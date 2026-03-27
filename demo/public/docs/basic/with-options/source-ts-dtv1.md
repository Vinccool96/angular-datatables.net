```typescript
import { Component, OnInit } from '@angular/core';
import { AngularDatatable } from 'angular-datatables.net';

@Component({
  selector: 'with-options',
  templateUrl: 'with-options-example.html',
})
export class WithOptionsExample implements OnInit {
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple',
    };
  }
}
```
