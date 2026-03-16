import { Component, OnInit } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';
import 'datatables.net-colreorder';

@Component({
  selector: 'app-colreorder',
  imports: [DataTableDirective, BaseDemoComponent],
  templateUrl: './colreorder.component.html',
  styleUrl: './colreorder.component.css',
})
export class ColreorderComponent implements OnInit {
  readonly pageTitle = 'DataTables ColReorder extension';
  readonly mdIntro = 'docs/extensions/colreorder/intro.md';
  readonly mdInstall = 'docs/extensions/colreorder/installation.md';
  readonly mdHTML = 'docs/extensions/colreorder/source-html.md';
  readonly mdTS = 'docs/extensions/colreorder/source-ts.md';
  readonly mdTSV1 = 'docs/extensions/colreorder/source-ts-dtv1.md';

  dtOptions: ADTSettings = {};

  ngOnInit(): void {
    this.dtOptions = {
      ajax: 'data/data.json',
      columns: [
        {
          title: 'No move me!',
          data: 'id',
        },
        {
          title: 'Try to move me!',
          data: 'firstName',
        },
        {
          title: 'You cannot move me! *evil laugh*',
          data: 'lastName',
        },
      ],
      dom: 'Rt',
      // Use this attribute to enable colreorder
      colReorder: {
        columns: ':nth-child(2)',
      },
    };
  }
}
