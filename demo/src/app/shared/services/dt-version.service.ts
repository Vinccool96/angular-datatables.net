import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DtVersionService {
  public dtVersion: 'v1' | 'v2' = 'v2';

  public readonly versionChanged$ = new BehaviorSubject<'v1' | 'v2'>(this.dtVersion);
}
