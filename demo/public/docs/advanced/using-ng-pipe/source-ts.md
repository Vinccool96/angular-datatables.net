```typescript
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ADTSettings, AngularDataTable } from 'angular-datatables.net';

@Component({
  imports: [AngularDataTable],
  providers: [UpperCasePipe, CurrencyPipe],
  selector: 'app-using-ng-pipe',
  templateUrl: './using-ng-pipe-example.html',
})
export class UsingNgPipeExample implements OnInit {
  public readonly pipeCurrencyInstance = inject(CurrencyPipe);
  protected dtOptions: ADTSettings = {};

  private readonly pipeInstance = inject(UpperCasePipe);

  public ngOnInit(): void {
    this.dtOptions = {
      ajax: 'data/data.json',
      columns: [
        {
          data: 'id',
          ngPipeArgs: ['USD', 'symbol'],
          ngPipeInstance: this.pipeCurrencyInstance,
          title: 'Id (Money)',
        },
        {
          data: 'firstName',
          ngPipeInstance: this.pipeInstance,
          title: 'First name',
        },
        {
          data: 'lastName',
          ngPipeInstance: this.pipeInstance,
          title: 'Last name',
        },
      ],
    };
  }
}
```
