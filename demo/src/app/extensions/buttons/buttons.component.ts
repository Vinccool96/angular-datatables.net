import { Component, OnInit } from '@angular/core';
import { ADTSettings, AngularDataTable } from 'angular-datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

import 'datatables.net-buttons-dt';

@Component({
  imports: [AngularDataTable, BaseDemoComponent],
  selector: 'app-buttons',
  styleUrl: './buttons.component.css',
  templateUrl: './buttons.component.html',
})
export class ButtonsComponent implements OnInit {
  protected dtOptions: ADTSettings = {};
  protected readonly mdHTML = 'docs/extensions/buttons/source-html.md';
  protected readonly mdInstall = 'docs/extensions/buttons/installation.md';
  protected readonly mdInstallV1 = 'docs/extensions/buttons/installation-dtv1.md';
  protected readonly mdIntro = 'docs/extensions/buttons/intro.md';
  protected readonly mdTS = 'docs/extensions/buttons/source-ts.md';
  protected readonly mdTSV1 = 'docs/extensions/buttons/source-ts-dtv1.md';
  protected readonly pageTitle = 'DataTables Buttons extension';

  public ngOnInit(): void {
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
          action: (): void => {
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
      layout: {
        bottom2Start: 'paging',
        bottomEnd: null,
        bottomStart: 'info',
        top1Start: 'buttons',
        topEnd: null,
        topStart: 'search',
      },
    };
  }
}
