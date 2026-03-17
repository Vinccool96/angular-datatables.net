import { Component, inject, OnInit, signal } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';

import { AjaxService } from './service/ajax.service';
import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  selector: 'app-with-ajax-callback',
  imports: [BaseDemoComponent, DataTableDirective],
  templateUrl: './with-ajax-callback.component.html',
  styleUrl: './with-ajax-callback.component.css',
})
export class WithAjaxCallbackComponent implements OnInit {
  readonly pageTitle = 'AJAX with callback';
  readonly mdIntro = 'docs/basic/with-ajax-callback/intro.md';
  readonly mdHTML = 'docs/basic/with-ajax-callback/source-html.md';
  readonly mdTS = 'docs/basic/with-ajax-callback/source-ts.md';
  readonly mdTSV1 = 'docs/basic/with-ajax-callback/source-ts-dtv1.md';

  private readonly ajax = inject(AjaxService);

  readonly dtOptions = signal<ADTSettings>({});

  ngOnInit() {
    this.dtOptions.set({
      ajax: (_, callback) => {
        this.ajax.getResult().subscribe((result) => {
          callback(result);
        });
      },
      columns: [
        {
          title: 'ID',
          data: 'id',
        },
        {
          title: 'First name',
          data: 'firstName',
        },
        {
          title: 'Last name',
          data: 'lastName',
        },
      ],
    });
  }
}
