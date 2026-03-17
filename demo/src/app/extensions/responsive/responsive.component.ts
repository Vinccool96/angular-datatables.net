import { Component, OnInit } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';
import 'datatables.net-responsive';

@Component({
  imports: [DataTableDirective, BaseDemoComponent],
  selector: 'app-responsive',
  styleUrl: './responsive.component.css',
  templateUrl: './responsive.component.html',
})
export class ResponsiveComponent implements OnInit {
  dtOptions: ADTSettings = {};
  readonly mdHTML = 'docs/extensions/responsive/source-html.md';
  readonly mdInstall = 'docs/extensions/responsive/installation.md';
  readonly mdIntro = 'docs/extensions/responsive/intro.md';
  readonly mdTS = 'docs/extensions/responsive/source-ts.md';
  readonly mdTSV1 = 'docs/extensions/responsive/source-ts-dtv1.md';

  readonly pageTitle = 'DataTables Responsive extension';

  ngOnInit() {
    this.dtOptions = {
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
          className: 'none',
          data: 'lastName',
          title: 'Last name',
        },
      ],
      // Use this attribute to enable the responsive extension
      responsive: true,
    };
  }
}
