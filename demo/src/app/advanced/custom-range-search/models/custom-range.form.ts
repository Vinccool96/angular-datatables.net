import { FormControl } from '@angular/forms';

export interface CustomRangeForm {
  max: FormControl<number | null>;
  min: FormControl<number | null>;
}
