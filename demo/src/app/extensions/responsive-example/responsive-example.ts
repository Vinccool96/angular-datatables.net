import { Component, OnInit } from '@angular/core';
import { ADTSettings, AngularDataTable } from 'angular-datatables.net';

import { BaseDemo } from '../../shared/components/base-demo/base-demo';
import 'datatables.net-responsive';

@Component({
  imports: [AngularDataTable, BaseDemo],
  selector: 'app-responsive',
  styleUrl: './responsive-example.css',
  templateUrl: './responsive-example.html',
})
export class ResponsiveExample implements OnInit {
  protected dtOptions: ADTSettings = {};
  protected readonly mdHTML = 'docs/extensions/responsive/source-html.md';
  protected readonly mdInstall = 'docs/extensions/responsive/installation.md';
  protected readonly mdIntro = 'docs/extensions/responsive/intro.md';
  protected readonly mdTS = 'docs/extensions/responsive/source-ts.md';
  protected readonly mdTSV1 = 'docs/extensions/responsive/source-ts-dtv1.md';
  protected readonly pageTitle = 'DataTables Responsive extension';

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
