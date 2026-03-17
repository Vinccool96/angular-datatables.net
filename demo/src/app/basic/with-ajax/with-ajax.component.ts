import { Component, OnInit, signal } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  imports: [BaseDemoComponent, DataTableDirective],
  selector: 'app-with-ajax',
  styleUrl: './with-ajax.component.css',
  templateUrl: './with-ajax.component.html',
})
export class WithAjaxComponent implements OnInit {
  public readonly dtOptions = signal<ADTSettings>({});
  public readonly pageTitle = 'With Ajax';
  protected readonly mdHTML = 'docs/basic/with-ajax/source-html.md';
  protected readonly mdIntro = 'docs/basic/with-ajax/intro.md';
  protected readonly mdTS = 'docs/basic/with-ajax/source-ts.md';
  protected readonly mdTSV1 = 'docs/basic/with-ajax/source-ts-dtv1.md';

  public ngOnInit(): void {
    this.dtOptions.set({
      ajax: 'data/data.json',
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
      search: false,
    });
  }
}
