import { Component, inject, OnInit } from '@angular/core';
import { ADTSettings, AngularDatatable } from 'angular-datatables.net';

import { BaseDemo } from '../../shared/components/base-demo/base-demo';
import { AjaxCallbackApi } from './service/ajax-callback-api';

@Component({
  imports: [BaseDemo, AngularDatatable],
  selector: 'app-with-ajax-callback',
  styleUrl: './with-ajax-callback-example.css',
  templateUrl: './with-ajax-callback-example.html',
})
export class WithAjaxCallbackExample implements OnInit {
  public readonly pageTitle = 'AJAX with callback';
  protected dtOptions: ADTSettings = {};
  protected readonly mdHTML = 'docs/basic/with-ajax-callback/source-html.md';
  protected readonly mdIntro = 'docs/basic/with-ajax-callback/intro.md';
  protected readonly mdTS = 'docs/basic/with-ajax-callback/source-ts.md';
  protected readonly mdTSV1 = 'docs/basic/with-ajax-callback/source-ts-dtv1.md';

  private readonly ajax = inject(AjaxCallbackApi);

  public ngOnInit(): void {
    this.dtOptions = {
      ajax: (_, callback): void => {
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
    };
  }
}
