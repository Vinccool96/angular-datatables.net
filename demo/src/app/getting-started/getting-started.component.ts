import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { Subject, takeUntil } from 'rxjs';

import { DtVersionService } from '../shared/services/dt-version.service';

@Component({
  imports: [MarkdownComponent],
  selector: 'app-getting-started',
  styleUrl: './getting-started.component.css',
  templateUrl: './getting-started.component.html',
})
export class GettingStartedComponent implements OnDestroy, OnInit {
  protected readonly dtVersion = signal<'v1' | 'v2'>('v2');
  protected readonly md = 'docs/get-started.md';
  protected readonly mdV1 = 'docs/get-started-dtv1.md';

  private readonly destroy$ = new Subject<void>();
  private readonly dtVersionService = inject(DtVersionService);

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public ngOnInit(): void {
    this.dtVersionService.versionChanged$.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      this.dtVersion.set(v);
    });
  }
}
