```typescript
import { Component, OnInit } from '@angular/core';
import { ADTSettings, AngularDatatable } from 'angular-datatables.net';

@Component({
  imports: [AngularDatatable],
  selector: 'app-with-options',
  templateUrl: './with-options-example.html',
})
export class WithOptionsExample implements OnInit {
  public dtOptions: ADTSettings = {};

  public ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple',
    };
  }
}
```
