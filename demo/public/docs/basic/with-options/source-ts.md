```typescript
import { Component, OnInit } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';

@Component({
  imports: [DataTableDirective],
  selector: 'app-with-options',
  styleUrl: './with-options.component.css',
  templateUrl: './with-options.component.html',
})
export class WithOptionsComponent implements OnInit {
  public dtOptions: ADTSettings = {};

  public ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple',
    };
  }
}
```
