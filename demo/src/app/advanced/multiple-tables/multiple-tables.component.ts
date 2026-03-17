import { Component, OnInit, viewChildren } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';
import { Config } from 'datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  imports: [DataTableDirective, BaseDemoComponent],
  selector: 'app-multiple-tables',
  styleUrl: './multiple-tables.component.css',
  templateUrl: './multiple-tables.component.html',
})
export class MultipleTablesComponent implements OnInit {
  readonly datatableElements = viewChildren(DataTableDirective);
  dtOptions: ADTSettings[] = [];
  readonly mdHTML = 'docs/advanced/multiple-tables/source-html.md';
  readonly mdIntro = 'docs/advanced/multiple-tables/intro.md';
  readonly mdTS = 'docs/advanced/multiple-tables/source-ts.md';

  readonly mdTSV1 = 'docs/advanced/multiple-tables/source-ts-dtv1.md';

  readonly pageTitle = 'Multiple tables in the same page';

  displayToConsole(): void {
    for (let index = 0; index < this.datatableElements().length; index++) {
      const dtElement: DataTableDirective = this.datatableElements()[index];
      void dtElement.dtInstance.then((dtInstance) => {
        const node = dtInstance.table().node() as HTMLElement;
        console.log(`The DataTable ${index} instance ID is: ${node.id}`);
      });
    }
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
