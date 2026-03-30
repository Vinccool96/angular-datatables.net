```typescript
// ./service/ajax-callback-api.ts

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Person } from '../../../person/models/person';

@Injectable({
  providedIn: 'root',
})
export class AjaxCallbackApi {
  private readonly http = inject(HttpClient);

  public getResult(): Observable<{ data: Person[] }> {
    return this.http.get('data/data.json') as Observable<{ data: Person[] }>;
  }
}
```

```typescript
// ./with-ajax-callback-example.ts

import { Component, inject, OnInit } from '@angular/core';
import { ADTSettings, AngularDatatable } from 'angular-datatables.net';

import { AjaxCallbackApi } from './service/ajax-callback-api';

@Component({
  imports: [AngularDatatable],
  selector: 'app-with-ajax-callback',
  templateUrl: './with-ajax-callback-example.html',
})
export class WithAjaxCallbackExample implements OnInit {
  protected dtOptions: ADTSettings = {};

  private readonly ajax = inject(AjaxCallbackApi);

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
