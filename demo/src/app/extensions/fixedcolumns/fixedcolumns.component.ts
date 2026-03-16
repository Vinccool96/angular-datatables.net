import { Component, OnInit } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';
import 'datatables.net-fixedcolumns-dt';

@Component({
  selector: 'app-fixedcolumns',
  imports: [DataTableDirective, BaseDemoComponent],
  templateUrl: './fixedcolumns.component.html',
  styleUrl: './fixedcolumns.component.css',
})
export class FixedcolumnsComponent implements OnInit {
  readonly pageTitle = 'DataTables Fixed Columns extension';
  readonly mdIntro = 'docs/extensions/fixedcolumns/intro.md';
  readonly mdInstall = 'docs/extensions/fixedcolumns/installation.md';
  readonly mdHTML = 'docs/extensions/fixedcolumns/source-html.md';
  readonly mdTS = 'docs/extensions/fixedcolumns/source-ts.md';
  readonly mdTSV1 = 'docs/extensions/fixedcolumns/source-ts-dtv1.md';

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
        },
        {
          title: 'Last name',
          data: 'lastName',
        },
        {
          title: 'Last name',
          data: 'lastName',
        },
        {
          title: 'Last name',
          data: 'lastName',
        },
        {
          title: 'Last name',
          data: 'lastName',
        },
        {
          title: 'Last name',
          data: 'lastName',
        },
        {
          title: 'Last name',
          data: 'lastName',
        },
        {
          title: 'Last name',
          data: 'lastName',
        },
        {
          title: 'Last name',
          data: 'lastName',
        },
        {
          title: 'Last name',
          data: 'lastName',
        },
        {
          title: 'Last name',
          data: 'lastName',
        },
        {
          title: 'Last name',
          data: 'lastName',
        },
        {
          title: 'Last name',
          data: 'lastName',
        },
        {
          title: 'Last name',
          data: 'lastName',
        },
        {
          title: 'Last name',
          data: 'lastName',
        },
        {
          title: 'Last name',
          data: 'lastName',
        },
      ],
      // Make sure that scrollX is set to true for this to work!
      scrollX: true,
      fixedColumns: {
        left: 3,
        right: 0,
      },
    } as ADTSettings;
  }
}
