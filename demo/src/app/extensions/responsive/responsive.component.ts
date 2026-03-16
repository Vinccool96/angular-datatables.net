import { Component, OnInit } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';
import 'datatables.net-responsive';

@Component({
  selector: 'app-responsive',
  imports: [DataTableDirective, BaseDemoComponent],
  templateUrl: './responsive.component.html',
  styleUrl: './responsive.component.css',
})
export class ResponsiveComponent implements OnInit {
  readonly pageTitle = 'DataTables Responsive extension';
  readonly mdIntro = 'docs/extensions/responsive/intro.md';
  readonly mdInstall = 'docs/extensions/responsive/installation.md';
  readonly mdHTML = 'docs/extensions/responsive/source-html.md';
  readonly mdTS = 'docs/extensions/responsive/source-ts.md';
  readonly mdTSV1 = 'docs/extensions/responsive/source-ts-dtv1.md';

  dtOptions: ADTSettings = {};

  ngOnInit() {
    this.dtOptions = {
      ajax: 'data/data.json',
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
          className: 'none',
        },
      ],
      // Use this attribute to enable the responsive extension
      responsive: true,
    };
  }
}
