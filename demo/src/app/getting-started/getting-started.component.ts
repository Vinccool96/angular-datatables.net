import { Component, inject, OnInit, signal } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

import { DtVersionService } from '../shared/services/dt-version.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-getting-started',
  imports: [MarkdownComponent],
  templateUrl: './getting-started.component.html',
  styleUrl: './getting-started.component.css',
})
export class GettingStartedComponent implements OnInit {
  protected readonly dtVersion = signal<'v1' | 'v2'>('v2');

  private readonly dtVersionService = inject(DtVersionService);

  protected readonly mdV1 = 'docs/get-started-dtv1.md';
  protected readonly md = 'docs/get-started.md';

  ngOnInit() {
    this.dtVersionService.versionChanged$.pipe(takeUntilDestroyed()).subscribe((v) => {
      this.dtVersion.set(v);
    });
  }
}
