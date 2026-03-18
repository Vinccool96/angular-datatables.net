```typescript
// ./service/ajax.service.ts

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Person } from '../../../person/models/person';

@Injectable({
  providedIn: 'root',
})
export class AjaxService {
  private readonly http = inject(HttpClient);

  public getResult(): Observable<{ data: Person[] }> {
    return this.http.get('data/data.json') as Observable<{ data: Person[] }>;
  }
}
```

```typescript
// ./with-ajax-callback.component.ts

import { Component, inject, OnInit } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';

import { AjaxService } from './service/ajax.service';

@Component({
  imports: [DataTableDirective],
  selector: 'app-with-ajax-callback',
  templateUrl: './with-ajax-callback.component.html',
})
export class WithAjaxCallbackComponent implements OnInit {
  protected dtOptions: ADTSettings = {};

  private readonly ajax = inject(AjaxService);

  public ngOnInit(): void {
    this.dtOptions = {
      ajax: (_, callback): void => {
        this.ajax.getResult().subscribe((result) => {
          callback(result);
        });
      },
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
