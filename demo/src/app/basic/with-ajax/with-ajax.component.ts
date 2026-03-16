import { Component, OnInit, signal } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';
import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  selector: 'app-with-ajax',
  imports: [BaseDemoComponent, DataTableDirective],
  templateUrl: './with-ajax.component.html',
  styleUrl: './with-ajax.component.css',
})
export class WithAjaxComponent implements OnInit {
  readonly pageTitle = 'With Ajax';
  readonly mdIntro = 'docs/basic/with-ajax/intro.md';
  readonly mdHTML = 'docs/basic/with-ajax/source-html.md';
  readonly mdTS = 'docs/basic/with-ajax/source-ts.md';
  readonly mdTSV1 = 'docs/basic/with-ajax/source-ts-dtv1.md';

  readonly dtOptions = signal<ADTSettings>({});

  ngOnInit() {
    this.dtOptions.set({
      ajax: 'data/data.json',
      search: false,
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
