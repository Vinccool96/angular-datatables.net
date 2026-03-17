import { AfterViewInit, Component, OnInit, viewChild } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  imports: [BaseDemoComponent, DataTableDirective],
  selector: 'app-individual-column-filtering',
  styleUrl: './individual-column-filtering.component.css',
  templateUrl: './individual-column-filtering.component.html',
})
export class IndividualColumnFilteringComponent implements AfterViewInit, OnInit {
  readonly datatableElement = viewChild(DataTableDirective);
  dtOptions: ADTSettings = {};
  readonly mdHTML = 'docs/advanced/indi-col-filter/source-html.md';
  readonly mdIntro = 'docs/advanced/indi-col-filter/intro.md';
  readonly mdTS = 'docs/advanced/indi-col-filter/source-ts.md';

  readonly mdTSV1 = 'docs/advanced/indi-col-filter/source-ts-dtv1.md';

  readonly pageTitle = 'Individual column searching';

  ngAfterViewInit(): void {
    void this.datatableElement()?.dtInstance.then((dtInstance) => {
      dtInstance.columns().every(function () {
        const search = this.search.bind(this);
        $('input', this.footer()).on('keyup change', function () {
          if (search() !== this['value']) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            search(this['value']).draw();
          }
        });
      });
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
