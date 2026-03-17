import { Component, OnInit } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';
import { Feature } from 'datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

import 'datatables.net-buttons-dt';

@Component({
  imports: [DataTableDirective, BaseDemoComponent],
  selector: 'app-buttons',
  styleUrl: './buttons.component.css',
  templateUrl: './buttons.component.html',
})
export class ButtonsComponent implements OnInit {
  dtOptions: ADTSettings = {};
  readonly mdHTML = 'docs/extensions/buttons/source-html.md';
  readonly mdInstall = 'docs/extensions/buttons/installation.md';
  readonly mdInstallV1 = 'docs/extensions/buttons/installation-dtv1.md';
  readonly mdIntro = 'docs/extensions/buttons/intro.md';
  readonly mdTS = 'docs/extensions/buttons/source-ts.md';
  readonly mdTSV1 = 'docs/extensions/buttons/source-ts-dtv1.md';

  readonly pageTitle = 'DataTables Buttons extension';

  ngOnInit(): void {
    this.dtOptions = {
      ajax: 'data/data.json',
      // Configure the buttons
      buttons: [
        'columnsToggle',
        'colvis',
        'copy',
        {
          exportOptions: [1, 2, 3],
          extend: 'csv',
          fieldSeparator: ';',
          text: 'CSV export',
        },
        'excel',
        {
          action: () => {
            alert('Button activated');
          },
          key: '1',
          text: 'Some button',
        },
      ],
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
      // Declare the use of the extension in the dom parameter
      // dom: 'Bftip',
      layout: {
        bottom2Start: 'paging',
        bottomEnd: null as unknown as Feature,
        bottomStart: 'info',
        top1Start: 'buttons' as keyof Feature,
        topEnd: null as unknown as Feature,
        topStart: 'search',
      },
    };
  }
}
