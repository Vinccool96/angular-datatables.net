import { Component, OnInit, viewChildren } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';
import { Config } from 'datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  selector: 'app-multiple-tables',
  imports: [DataTableDirective, BaseDemoComponent],
  templateUrl: './multiple-tables.component.html',
  styleUrl: './multiple-tables.component.css',
})
export class MultipleTablesComponent implements OnInit {
  readonly pageTitle = 'Multiple tables in the same page';
  readonly mdIntro = 'docs/advanced/multiple-tables/intro.md';
  readonly mdHTML = 'docs/advanced/multiple-tables/source-html.md';
  readonly mdTS = 'docs/advanced/multiple-tables/source-ts.md';
  readonly mdTSV1 = 'docs/advanced/multiple-tables/source-ts-dtv1.md';

  readonly datatableElements = viewChildren(DataTableDirective);

  dtOptions: ADTSettings[] = [];

  displayToConsole(): void {
    this.datatableElements().forEach((dtElement: DataTableDirective, index: number) => {
      void dtElement.dtInstance.then((dtInstance) => {
        const node = dtInstance.table().node() as HTMLElement;
        console.log(`The DataTable ${index} instance ID is: ${node.id}`);
      });
    });
  }

  ngOnInit(): void {
    this.dtOptions[0] = this.buildDtOptions('data/data.json');
    this.dtOptions[1] = this.buildDtOptions('data/data1.json');
  }

  private buildDtOptions(url: string): Config {
    return {
      ajax: url,
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
