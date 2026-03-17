import { AfterViewInit, Component, inject, OnDestroy, OnInit, viewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';
import DataTables, { Api } from 'datatables.net';

import { Person } from '../../person/models/person';
import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';
import { CustomRangeForm } from './models/custom-range.form';

@Component({
  imports: [BaseDemoComponent, DataTableDirective, ReactiveFormsModule],
  selector: 'app-custom-range-search',
  styleUrl: './custom-range-search.component.css',
  templateUrl: './custom-range-search.component.html',
})
export class CustomRangeSearchComponent implements AfterViewInit, OnDestroy, OnInit {
  dtOptions: ADTSettings = {};
  private readonly formBuilder = inject(FormBuilder);
  readonly form: FormGroup<CustomRangeForm> = this.formBuilder.group<CustomRangeForm>({
    max: this.formBuilder.control(null),
    min: this.formBuilder.control(null),
  });
  readonly mdHTML = 'docs/advanced/custom-range/source-html.md';
  readonly mdIntro = 'docs/advanced/custom-range/intro.md';

  readonly mdTS = 'docs/advanced/custom-range/source-ts.md';

  readonly mdTSV1 = 'docs/advanced/custom-range/source-ts-dtv1.md';

  readonly pageTitle = 'Custom filtering - Range search';

  private readonly datatableElement = viewChild(DataTableDirective);

  private dtInstance: Api | null = null;

  filterById(): boolean {
    this.dtInstance?.draw();
    return false;
  }

  ngAfterViewInit() {
    void this.datatableElement()?.dtInstance.then((instance) => {
      this.dtInstance = instance;
      instance.search.fixed('range', (_data, rowData: Person): boolean => {
        const id = rowData.id; // use data for the id column
        const min = (this.form.get('min') as FormControl<null | number>).value ?? Number.NaN;
        const max = (this.form.get('max') as FormControl<null | number>).value ?? Number.NaN;
        return (
          (Number.isNaN(min) && Number.isNaN(max)) ||
          (Number.isNaN(min) && id <= max) ||
          (min <= id && Number.isNaN(max)) ||
          (min <= id && id <= max)
        );
      });
    });
  }

  ngOnDestroy(): void {
    // We remove the last function in the global ext search array so we do not add the fn each time the component is drawn
    // /!\ This is not the ideal solution as other components may add other search function in this array, so be careful when
    // handling this global variable
    DataTables.ext.search.pop();
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

    this.form.valueChanges.subscribe(() => {
      this.dtInstance?.draw();
    });
  }
}
