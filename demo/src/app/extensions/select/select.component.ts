import { Component, OnInit } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

import 'datatables.net-select';

@Component({
  imports: [DataTableDirective, BaseDemoComponent],
  selector: 'app-select',
  styleUrl: './select.component.css',
  templateUrl: './select.component.html',
})
export class SelectComponent implements OnInit {
  dtOptions: ADTSettings = {};
  readonly mdHTML = 'docs/extensions/select/source-html.md';
  readonly mdInstall = 'docs/extensions/select/installation.md';
  readonly mdInstallV1 = 'docs/extensions/select/installation-dtv1.md';
  readonly mdIntro = 'docs/extensions/select/intro.md';
  readonly mdTS = 'docs/extensions/select/source-ts.md';
  readonly mdTSV1 = 'docs/extensions/select/source-ts-dtv1.md';

  readonly pageTitle = 'DataTables Select extension';

  ngOnInit(): void {
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
          data: 'lastName',
          title: 'Last name',
        },
      ],
      // Use this attribute to enable the select extension
      select: true,
    };
  }
}
