```typescript
import { Component, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables.net';

@Component({
  selector: 'with-options',
  templateUrl: 'with-options.component.html',
})
export class WithOptionsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple',
    };
  }
}
```
