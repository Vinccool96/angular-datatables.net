```typescript
// models/custom-range.form.ts
import { FormControl } from '@angular/forms';

export interface CustomRangeForm {
  max: FormControl<number | null>;
  min: FormControl<number | null>;
}
```

```typescript
// custom-range-search-example.ts
import { AfterViewInit, Component, inject, OnInit, viewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ADTSettings, AngularDataTable } from 'angular-datatables.net';
import { Api } from 'datatables.net';

import { Person } from '../../person/models/person';
import { CustomRangeForm } from './models/custom-range.form';

@Component({
  imports: [AngularDataTable, ReactiveFormsModule],
  selector: 'app-custom-range-search',
  styleUrl: './custom-range-search-example.css',
  templateUrl: './custom-range-search-example.html',
})
export class CustomRangeSearchExample implements AfterViewInit, OnInit {
  protected dtOptions: ADTSettings = {};
  private readonly formBuilder = inject(FormBuilder);
  protected readonly form: FormGroup<CustomRangeForm> = this.formBuilder.group<CustomRangeForm>({
    max: this.formBuilder.control(null),
    min: this.formBuilder.control(null),
  });

  private readonly datatableElement = viewChild(AngularDataTable);
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
```
