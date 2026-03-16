import { Component, OnInit } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';
import { Feature } from 'datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

import 'datatables.net-buttons-dt';

@Component({
  selector: 'app-buttons',
  imports: [DataTableDirective, BaseDemoComponent],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css',
})
export class ButtonsComponent implements OnInit {
  readonly pageTitle = 'DataTables Buttons extension';
  readonly mdIntro = 'docs/extensions/buttons/intro.md';
  readonly mdInstall = 'docs/extensions/buttons/installation.md';
  readonly mdInstallV1 = 'docs/extensions/buttons/installation-dtv1.md';
  readonly mdHTML = 'docs/extensions/buttons/source-html.md';
  readonly mdTS = 'docs/extensions/buttons/source-ts.md';
  readonly mdTSV1 = 'docs/extensions/buttons/source-ts-dtv1.md';

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
      // Declare the use of the extension in the dom parameter
      // dom: 'Bftip',
      layout: {
        bottomStart: 'info',
        bottom2Start: 'paging',
        bottomEnd: null as unknown as Feature,
        topEnd: null as unknown as Feature,
        topStart: 'search',
        top1Start: 'buttons' as keyof Feature,
      },
      // Configure the buttons
      buttons: [
        'columnsToggle',
        'colvis',
        'copy',
        {
          extend: 'csv',
          text: 'CSV export',
          fieldSeparator: ';',
          exportOptions: [1, 2, 3],
        },
        'excel',
        {
          text: 'Some button',
          key: '1',
          action: () => {
            alert('Button activated');
          },
        },
      ],
    };
  }
}
