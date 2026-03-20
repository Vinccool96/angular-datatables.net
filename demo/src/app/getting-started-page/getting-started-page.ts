import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { Subject, takeUntil } from 'rxjs';

import { DtVersionOrchestrator } from '../shared/services/dt-version-orchestrator';

@Component({
  imports: [MarkdownComponent],
  selector: 'app-getting-started',
  styleUrl: './getting-started-page.css',
  templateUrl: './getting-started-page.html',
})
export class GettingStartedPage implements OnDestroy, OnInit {
  protected readonly dtVersion = signal<'v1' | 'v2'>('v2');
  protected readonly md = 'docs/get-started.md';
  protected readonly mdV1 = 'docs/get-started-dtv1.md';

  private readonly destroy$ = new Subject<void>();
  private readonly dtVersionOrchestrator = inject(DtVersionOrchestrator);

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public ngOnInit(): void {
    this.dtVersionOrchestrator.versionChanged$.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      this.dtVersion.set(v);
    });
  }
}
