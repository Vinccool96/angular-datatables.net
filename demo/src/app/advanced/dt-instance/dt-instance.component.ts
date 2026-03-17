import { AsyncPipe } from '@angular/common';
import { Component, OnInit, viewChild } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  imports: [BaseDemoComponent, DataTableDirective, AsyncPipe],
  selector: 'app-dt-instance',
  styleUrl: './dt-instance.component.css',
  templateUrl: './dt-instance.component.html',
})
export class DtInstanceComponent implements OnInit {
  readonly datatableElement = viewChild(DataTableDirective);
  dtOptions: ADTSettings = {};
  readonly mdHTML = 'docs/advanced/dt-instance/source-html.md';
  readonly mdIntro = 'docs/advanced/dt-instance/intro.md';
  readonly mdTS = 'docs/advanced/dt-instance/source-ts.md';

  readonly mdTSV1 = 'docs/advanced/dt-instance/source-ts-dtv1.md';

  readonly pageTitle = 'Finding DataTable instance';

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
    };
  }
}
