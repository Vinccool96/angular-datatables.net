import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ADTSettings } from 'angular-datatables.net';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadDtOptionsWithPromiseOptionsService {
  private readonly http = inject(HttpClient);

  public obtainOptions(): Observable<ADTSettings> {
    return this.http.get<ADTSettings>('data/dtOptions.json');
  }
}
