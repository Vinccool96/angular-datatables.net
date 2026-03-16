import { FormControl } from '@angular/forms';

export interface CustomRangeForm {
  min: FormControl<number | null>;
  max: FormControl<number | null>;
}
