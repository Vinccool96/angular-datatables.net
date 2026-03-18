import { AfterViewInit, Component, inject, OnInit, viewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';
import { Api } from 'datatables.net';

import { Person } from '../../person/models/person';
import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';
import { CustomRangeForm } from './models/custom-range.form';

@Component({
  imports: [BaseDemoComponent, DataTableDirective, ReactiveFormsModule],
  selector: 'app-custom-range-search',
  styleUrl: './custom-range-search.component.css',
  templateUrl: './custom-range-search.component.html',
})
export class CustomRangeSearchComponent implements AfterViewInit, OnInit {
  public readonly pageTitle = 'Custom filtering - Range search';
  protected dtOptions: ADTSettings = {};
  private readonly formBuilder = inject(FormBuilder);
  protected readonly form: FormGroup<CustomRangeForm> = this.formBuilder.group<CustomRangeForm>({
    max: this.formBuilder.control(null),
    min: this.formBuilder.control(null),
  });
  protected readonly mdHTML = 'docs/advanced/custom-range/source-html.md';
  protected readonly mdIntro = 'docs/advanced/custom-range/intro.md';
  protected readonly mdTS = 'docs/advanced/custom-range/source-ts.md';
  protected readonly mdTSV1 = 'docs/advanced/custom-range/source-ts-dtv1.md';

  private readonly datatableElement = viewChild(DataTableDirective);

  private dtInstance: Api | undefined;

  public ngAfterViewInit(): void {
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

    this.form.valueChanges.subscribe(() => {
      this.dtInstance?.draw();
    });
  }

  protected filterById(): boolean {
    this.dtInstance?.draw();
    return false;
  }
}
