import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { Subject, takeUntil } from 'rxjs';

import { DtVersionService } from '../shared/services/dt-version.service';

@Component({
  selector: 'app-getting-started',
  imports: [MarkdownComponent],
  templateUrl: './getting-started.component.html',
  styleUrl: './getting-started.component.css',
})
export class GettingStartedComponent implements OnInit, OnDestroy {
  protected readonly dtVersion = signal<'v1' | 'v2'>('v2');

  private readonly dtVersionService = inject(DtVersionService);

  protected readonly mdV1 = 'docs/get-started-dtv1.md';
  protected readonly md = 'docs/get-started.md';

  private readonly destroy$ = new Subject<void>();

  ngOnInit() {
    this.dtVersionService.versionChanged$.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      this.dtVersion.set(v);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
