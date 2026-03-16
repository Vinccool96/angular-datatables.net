import { Component, inject, input, signal, TemplateRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';

import { DtVersionService } from '../../services/dt-version.service';

@Component({
  selector: 'app-base-demo',
  imports: [MarkdownComponent, RouterLink],
  templateUrl: './base-demo.component.html',
  styleUrl: './base-demo.component.css',
})
export class BaseDemoComponent {
  readonly pageTitle = input('');
  readonly mdIntro = input('');
  readonly mdInstall = input('');
  readonly mdInstallV1 = input('');
  readonly mdHTML = input('');
  readonly mdTS = input('');
  readonly mdTSV1 = input('');
  readonly deprecated = input(false);

  protected readonly dtVersion = signal<'v1' | 'v2'>('v2');

  private readonly dtVersionService = inject(DtVersionService);

  private scrollCallback() {
    if ($(this).scrollTop() !== undefined) {
      $('#toTop').fadeIn();
    } else {
      $('#toTop').fadeOut();
    }
  }

  initBackToTop() {
    // hide scroll button on page load
    // eslint-disable-next-line @typescript-eslint/unbound-method
    $(this.scrollCallback);
    // scroll handler
    // eslint-disable-next-line @typescript-eslint/unbound-method
    $(window).on('scroll', this.scrollCallback);

    $('#toTop').on('click', function () {
      $('html, body').animate({ scrollTop: 0 }, 1000);
    });
  }
}
