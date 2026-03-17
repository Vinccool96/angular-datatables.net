import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';

import { DtVersionService } from '../../services/dt-version.service';

@Component({
  imports: [MarkdownComponent, RouterLink],
  selector: 'app-base-demo',
  styleUrl: './base-demo.component.css',
  templateUrl: './base-demo.component.html',
})
export class BaseDemoComponent {
  readonly deprecated = input(false);
  readonly mdHTML = input('');
  readonly mdInstall = input('');
  readonly mdInstallV1 = input('');
  readonly mdIntro = input('');
  readonly mdTS = input('');
  readonly mdTSV1 = input('');
  readonly pageTitle = input('');

  protected readonly dtVersion = signal<'v1' | 'v2'>('v2');

  private readonly dtVersionService = inject(DtVersionService);

  initBackToTop() {
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

  private scrollCallback() {
    if ($(this).scrollTop() === undefined) {
      $('#toTop').fadeOut();
    } else {
      $('#toTop').fadeIn();
    }
  }
}
