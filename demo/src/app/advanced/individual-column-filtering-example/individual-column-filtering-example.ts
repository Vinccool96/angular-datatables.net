import { AfterViewInit, Component, OnInit, viewChild } from '@angular/core';
import { ADTSettings, AngularDatatable } from 'angular-datatables.net';

import { BaseDemo } from '../../shared/components/base-demo/base-demo';

@Component({
  imports: [BaseDemo, AngularDatatable],
  selector: 'app-individual-column-filtering',
  styleUrl: './individual-column-filtering-example.css',
  templateUrl: './individual-column-filtering-example.html',
})
export class IndividualColumnFilteringExample implements AfterViewInit, OnInit {
  public dtOptions: ADTSettings = {};
  public readonly pageTitle = 'Individual column searching';
  protected readonly mdHTML = 'docs/advanced/indi-col-filter/source-html.md';
  protected readonly mdIntro = 'docs/advanced/indi-col-filter/intro.md';
  protected readonly mdTS = 'docs/advanced/indi-col-filter/source-ts.md';
  protected readonly mdTSV1 = 'docs/advanced/indi-col-filter/source-ts-dtv1.md';
  private readonly datatableElement = viewChild(AngularDatatable);

  public ngAfterViewInit(): void {
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
}
