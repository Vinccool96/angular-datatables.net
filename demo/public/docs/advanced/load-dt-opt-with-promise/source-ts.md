```typescript
// ./services/load-dt-options-with-promise-options-api.ts

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ADTSettings } from 'angular-datatables.net';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadDtOptionsWithPromiseOptionsApi {
  private readonly http = inject(HttpClient);

  public obtainOptions(): Observable<ADTSettings> {
    return this.http.get<ADTSettings>('data/dtOptions.json');
  }
}
```

```typescript
// ./load-dt-options-with-promise-example.ts

import { Component, inject, OnInit } from '@angular/core';
import { ADTSettings, AngularDatatable } from 'angular-datatables.net';
import { firstValueFrom } from 'rxjs';

import { LoadDtOptionsWithPromiseOptionsApi } from './services/load-dt-options-with-promise-options-api';

@Component({
  imports: [AngularDatatable],
  selector: 'app-load-dt-options-with-promise',
  templateUrl: './load-dt-options-with-promise-example.html',
})
export class LoadDtOptionsWithPromiseExample implements OnInit {
  protected dtOptions!: Promise<ADTSettings>;

  private readonly optionsService = inject(LoadDtOptionsWithPromiseOptionsApi);

  public ngOnInit(): void {
    this.dtOptions = firstValueFrom(this.optionsService.obtainOptions())
      .then((v) => v)
      .catch((error: unknown) => this.handleError(error as Error));
  }

  private handleError(error: Error): Promise<ADTSettings> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject<ADTSettings>(error);
  }
}
```
