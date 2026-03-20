```typescript
import { Component, OnInit } from '@angular/core';
import { ADTSettings, AngularDataTable } from 'angular-datatables.net';

@Component({
  imports: [AngularDataTable],
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
