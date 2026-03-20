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
