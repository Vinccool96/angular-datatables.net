import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DtVersionService {
  dtVersion: 'v1' | 'v2' = 'v2';

  readonly versionChanged$ = new BehaviorSubject<'v1' | 'v2'>(this.dtVersion);
}
