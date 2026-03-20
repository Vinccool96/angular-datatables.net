import { AsyncPipe } from '@angular/common';
import { Component, OnInit, viewChild } from '@angular/core';
import { ADTSettings, AngularDataTable } from 'angular-datatables.net';

import { BaseDemo } from '../../shared/components/base-demo/base-demo';

@Component({
  imports: [BaseDemo, AngularDataTable, AsyncPipe],
  selector: 'app-dt-instance',
  styleUrl: './dt-instance-example.css',
  templateUrl: './dt-instance-example.html',
})
export class DtInstanceExample implements OnInit {
  public readonly pageTitle = 'Finding DataTable instance';
  protected readonly datatableElement = viewChild(AngularDataTable);
  protected dtOptions: ADTSettings = {};
  protected readonly mdHTML = 'docs/advanced/dt-instance/source-html.md';
  protected readonly mdIntro = 'docs/advanced/dt-instance/intro.md';
  protected readonly mdTS = 'docs/advanced/dt-instance/source-ts.md';
  protected readonly mdTSV1 = 'docs/advanced/dt-instance/source-ts-dtv1.md';

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
      ],
    };
  }

  protected displayToConsole(datatableElement: AngularDataTable | undefined): void {
    if (datatableElement === undefined) {
      return;
    }

    void datatableElement.dtInstance.then((dtInstance) => {
      console.log(dtInstance);
    });
  }
}
