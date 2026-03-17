import { Component, inject, OnInit, signal } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';
import { AjaxService } from './service/ajax.service';

@Component({
  imports: [BaseDemoComponent, DataTableDirective],
  selector: 'app-with-ajax-callback',
  styleUrl: './with-ajax-callback.component.css',
  templateUrl: './with-ajax-callback.component.html',
})
export class WithAjaxCallbackComponent implements OnInit {
  readonly dtOptions = signal<ADTSettings>({});
  readonly mdHTML = 'docs/basic/with-ajax-callback/source-html.md';
  readonly mdIntro = 'docs/basic/with-ajax-callback/intro.md';
  readonly mdTS = 'docs/basic/with-ajax-callback/source-ts.md';
  readonly mdTSV1 = 'docs/basic/with-ajax-callback/source-ts-dtv1.md';

  readonly pageTitle = 'AJAX with callback';

  private readonly ajax = inject(AjaxService);

  ngOnInit() {
    this.dtOptions.set({
      ajax: (_, callback) => {
        this.ajax.getResult().subscribe((result) => {
          callback(result);
        });
      },
      columns: [
        {
          data: 'id',
          title: 'ID',
        },
        {
          data: 'firstName',
          title: 'First name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
      ],
    });
  }
}
