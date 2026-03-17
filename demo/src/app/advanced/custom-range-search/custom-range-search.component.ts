import { AfterViewInit, Component, inject, OnDestroy, OnInit, viewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';
import DataTables, { Api } from 'datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';
import { CustomRangeForm } from './models/custom-range.form';
import { Person } from '../../person/models/person';

@Component({
  selector: 'app-custom-range-search',
  imports: [BaseDemoComponent, DataTableDirective, ReactiveFormsModule],
  templateUrl: './custom-range-search.component.html',
  styleUrl: './custom-range-search.component.css',
})
export class CustomRangeSearchComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly pageTitle = 'Custom filtering - Range search';
  readonly mdIntro = 'docs/advanced/custom-range/intro.md';
  readonly mdHTML = 'docs/advanced/custom-range/source-html.md';
  readonly mdTS = 'docs/advanced/custom-range/source-ts.md';
  readonly mdTSV1 = 'docs/advanced/custom-range/source-ts-dtv1.md';

  private readonly datatableElement = viewChild(DataTableDirective);

  private readonly formBuilder = inject(FormBuilder);

  readonly form: FormGroup<CustomRangeForm> = this.formBuilder.group<CustomRangeForm>({
    min: this.formBuilder.control(null),
    max: this.formBuilder.control(null),
  });

  dtOptions: ADTSettings = {};

  private dtInstance: Api | null = null;

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

    this.form.valueChanges.subscribe(() => {
      this.dtInstance?.draw();
    });
  }

  ngAfterViewInit() {
    void this.datatableElement()?.dtInstance.then((instance) => {
      this.dtInstance = instance;
      instance.search.fixed('range', (_data, rowData: Person): boolean => {
        const id = rowData.id; // use data for the id column
        const min = (this.form.get('min') as FormControl<number | null>).value ?? Number.NaN;
        const max = (this.form.get('max') as FormControl<number | null>).value ?? Number.NaN;
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

  filterById(): boolean {
    this.dtInstance?.draw();
    return false;
  }
}
