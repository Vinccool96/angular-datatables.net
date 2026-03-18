import { Component, OnInit, viewChildren } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  imports: [DataTableDirective, BaseDemoComponent],
  selector: 'app-multiple-tables',
  styleUrl: './multiple-tables.component.css',
  templateUrl: './multiple-tables.component.html',
})
export class MultipleTablesComponent implements OnInit {
  public readonly datatableElements = viewChildren(DataTableDirective);
  public readonly pageTitle = 'Multiple tables in the same page';
  protected dtOptions: ADTSettings[] = [];
  protected readonly mdHTML = 'docs/advanced/multiple-tables/source-html.md';
  protected readonly mdIntro = 'docs/advanced/multiple-tables/intro.md';
  protected readonly mdTS = 'docs/advanced/multiple-tables/source-ts.md';
  protected readonly mdTSV1 = 'docs/advanced/multiple-tables/source-ts-dtv1.md';

  public ngOnInit(): void {
    this.dtOptions[0] = this.buildDtOptions('data/data.json');
    this.dtOptions[1] = this.buildDtOptions('data/data1.json');
  }

  protected displayToConsole(): void {
    for (let index = 0; index < this.datatableElements().length; index++) {
      const dtElement: DataTableDirective = this.datatableElements()[index];
      void dtElement.dtInstance.then((dtInstance) => {
        const node = dtInstance.table().node() as HTMLElement;
        console.log(`The DataTable ${index} instance ID is: ${node.id}`);
      });
    }
  }

  private buildDtOptions(url: string): ADTSettings {
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
