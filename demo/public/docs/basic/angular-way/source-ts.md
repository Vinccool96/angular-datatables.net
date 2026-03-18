```typescript
// ./services/angular-way-data.service.ts

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Person } from '../../../person/models/person';

@Injectable({
  providedIn: 'root',
})
export class AngularWayDataService {
  private http = inject(HttpClient);

  public obtainData(): Observable<{ data: Person[] }> {
    return this.http.get<{ data: Person[] }>('data/data.json');
  }
}
```

```typescript
import { AfterViewInit, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';
import { Subject } from 'rxjs';

import { Person } from '../../person/models/person';
import { AngularWayDataService } from './services/angular-way-data.service';

@Component({
  imports: [DataTableDirective],
  selector: 'app-angular-way',
  templateUrl: './angular-way.component.html',
})
export class AngularWayComponent implements AfterViewInit, OnDestroy, OnInit {
  protected dtOptions: ADTSettings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  protected dtTrigger = new Subject<ADTSettings | null>();
  protected readonly persons = signal<Person[]>([]);

  private readonly dataService = inject(AngularWayDataService);

  public ngAfterViewInit(): void {
    this.dataService.obtainData().subscribe((data) => {
      this.persons.set(data.data);
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next(null);
    });
  }

  public ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  public ngOnInit(): void {
    this.dtOptions = {
      lengthMenu: [2, 10, 25],
      pageLength: 2,
      pagingType: 'full_numbers',
    };
  }
}
```
