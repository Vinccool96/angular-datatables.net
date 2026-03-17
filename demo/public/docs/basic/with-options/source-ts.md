```typescript
import { Component, OnInit, signal } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-with-options',
  templateUrl: 'with-options.component.html',
})
export class WithOptionsComponent implements OnInit {
  readonly dtOptions: ADTSettings = {};

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple',
    };
  }
}
```
