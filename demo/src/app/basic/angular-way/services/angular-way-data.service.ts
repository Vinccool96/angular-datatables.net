import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
