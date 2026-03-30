import { Component, OnInit } from '@angular/core';
import { ADTSettings, AngularDatatable } from 'angular-datatables.net';

import { BaseDemo } from '../../shared/components/base-demo/base-demo';
import 'datatables.net-fixedcolumns-dt';

@Component({
  imports: [AngularDatatable, BaseDemo],
  selector: 'app-fixedcolumns',
  styleUrl: './fixedcolumns-example.css',
  templateUrl: './fixedcolumns-example.html',
})
export class FixedcolumnsExample implements OnInit {
  protected dtOptions: ADTSettings = {};
  protected readonly mdHTML = 'docs/extensions/fixedcolumns/source-html.md';
  protected readonly mdInstall = 'docs/extensions/fixedcolumns/installation.md';
  protected readonly mdIntro = 'docs/extensions/fixedcolumns/intro.md';
  protected readonly mdTS = 'docs/extensions/fixedcolumns/source-ts.md';
  protected readonly mdTSV1 = 'docs/extensions/fixedcolumns/source-ts-dtv1.md';
  protected readonly pageTitle = 'DataTables Fixed Columns extension';

  public ngOnInit(): void {
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
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
        {
          data: 'lastName',
          title: 'Last name',
        },
      ],
      fixedColumns: {
        left: 3,
        right: 0,
      },
      // Make sure that scrollX is set to true for this to work!
      scrollX: true,
    } as ADTSettings;
  }
}
