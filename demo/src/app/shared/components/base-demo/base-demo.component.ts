import { Component, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';

import { DtVersionService } from '../../services/dt-version.service';

@Component({
  imports: [MarkdownComponent, RouterLink],
  selector: 'app-base-demo',
  styleUrl: './base-demo.component.css',
  templateUrl: './base-demo.component.html',
})
export class BaseDemoComponent implements OnInit {
  public readonly deprecated = input(false);
  public readonly mdHTML = input('');
  public readonly mdInstall = input('');
  public readonly mdInstallV1 = input('');
  public readonly mdIntro = input('');
  public readonly mdTS = input('');
  public readonly mdTSV1 = input('');
  public readonly pageTitle = input('');

  protected readonly dtVersion = signal<'v1' | 'v2'>('v2');

  private readonly dtVersionService = inject(DtVersionService);

  public ngOnInit(): void {
    this.initBackToTop();

    this.dtVersionService.versionChanged$.subscribe((v) => {
      this.dtVersion.set(v);
    });
  }

  private initBackToTop(): void {
    // hide scroll button on page load
    // eslint-disable-next-line @typescript-eslint/unbound-method
    $(this.scrollCallback);
    // scroll handler
    // eslint-disable-next-line @typescript-eslint/unbound-method
    $(globalThis).on('scroll', this.scrollCallback);

    $('#toTop').on('click', function () {
      $('html, body').animate({ scrollTop: 0 }, 1000);
    });
  }

  private scrollCallback(): void {
    if ($(this).scrollTop() === undefined) {
      $('#toTop').fadeOut();
    } else {
      $('#toTop').fadeIn();
    }
  }
}
