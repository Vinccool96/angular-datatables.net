import { Component, OnInit } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

import 'datatables.net-select';

@Component({
  selector: 'app-select',
  imports: [DataTableDirective, BaseDemoComponent],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
})
export class SelectComponent implements OnInit {
  readonly pageTitle = 'DataTables Select extension';
  readonly mdIntro = 'docs/extensions/select/intro.md';
  readonly mdInstall = 'docs/extensions/select/installation.md';
  readonly mdInstallV1 = 'docs/extensions/select/installation-dtv1.md';
  readonly mdHTML = 'docs/extensions/select/source-html.md';
  readonly mdTS = 'docs/extensions/select/source-ts.md';
  readonly mdTSV1 = 'docs/extensions/select/source-ts-dtv1.md';

  dtOptions: ADTSettings = {};

  ngOnInit(): void {
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
        },
      ],
      // Use this attribute to enable the select extension
      select: true,
    };
  }
}
