import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AjaxService {
  private readonly http = inject(HttpClient);

  public getResult() {
    return this.http.get('data/data.json');
  }
}
