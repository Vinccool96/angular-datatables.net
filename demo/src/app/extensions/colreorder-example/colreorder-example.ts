import { Component, OnInit } from '@angular/core';
import { ADTSettings, AngularDatatable } from 'angular-datatables.net';

import { BaseDemo } from '../../shared/components/base-demo/base-demo';
import 'datatables.net-colreorder';

@Component({
  imports: [AngularDatatable, BaseDemo],
  selector: 'app-colreorder',
  styleUrl: './colreorder-example.css',
  templateUrl: './colreorder-example.html',
})
export class ColreorderExample implements OnInit {
  protected dtOptions: ADTSettings = {};
  protected readonly mdHTML = 'docs/extensions/colreorder/source-html.md';
  protected readonly mdInstall = 'docs/extensions/colreorder/installation.md';
  protected readonly mdIntro = 'docs/extensions/colreorder/intro.md';
  protected readonly mdTS = 'docs/extensions/colreorder/source-ts.md';
  protected readonly mdTSV1 = 'docs/extensions/colreorder/source-ts-dtv1.md';
  protected readonly pageTitle = 'DataTables ColReorder extension';

  public ngOnInit(): void {
    this.dtOptions = {
      ajax: 'data/data.json',
      // Use this attribute to enable colreorder
      colReorder: {
        columns: ':nth-child(2)',
      },
      columns: [
        {
          data: 'id',
          title: 'No move me!',
        },
        {
          data: 'firstName',
          title: 'Try to move me!',
        },
        {
          data: 'lastName',
          title: 'You cannot move me! *evil laugh*',
        },
      ],
      dom: 'Rt',
    };
  }
}
