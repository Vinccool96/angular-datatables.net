import { AfterViewInit, Component, OnInit, viewChild } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  selector: 'app-individual-column-filtering',
  imports: [BaseDemoComponent, DataTableDirective],
  templateUrl: './individual-column-filtering.component.html',
  styleUrl: './individual-column-filtering.component.css',
})
export class IndividualColumnFilteringComponent implements OnInit, AfterViewInit {
  readonly pageTitle = 'Individual column searching';
  readonly mdIntro = 'docs/advanced/indi-col-filter/intro.md';
  readonly mdHTML = 'docs/advanced/indi-col-filter/source-html.md';
  readonly mdTS = 'docs/advanced/indi-col-filter/source-ts.md';
  readonly mdTSV1 = 'docs/advanced/indi-col-filter/source-ts-dtv1.md';

  readonly datatableElement = viewChild(DataTableDirective);

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
    };
  }

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
}
