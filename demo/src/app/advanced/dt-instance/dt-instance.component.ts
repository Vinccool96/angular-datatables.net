import { Component, OnInit, viewChild } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';
import { AsyncPipe } from '@angular/common';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  selector: 'app-dt-instance',
  imports: [BaseDemoComponent, DataTableDirective, AsyncPipe],
  templateUrl: './dt-instance.component.html',
  styleUrl: './dt-instance.component.css',
})
export class DtInstanceComponent implements OnInit {
  readonly pageTitle = 'Finding DataTable instance';
  readonly mdIntro = 'docs/advanced/dt-instance/intro.md';
  readonly mdHTML = 'docs/advanced/dt-instance/source-html.md';
  readonly mdTS = 'docs/advanced/dt-instance/source-ts.md';
  readonly mdTSV1 = 'docs/advanced/dt-instance/source-ts-dtv1.md';

  readonly datatableElement = viewChild(DataTableDirective);

  dtOptions: ADTSettings = {};

  displayToConsole(datatableElement: DataTableDirective | undefined): void {
    if (datatableElement === undefined) {
      return;
    }

    void datatableElement.dtInstance.then((dtInstance) => {
      console.log(dtInstance);
    });
  }

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
    };
  }
}
