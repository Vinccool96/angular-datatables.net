import { FormControl } from '@angular/forms';

export interface CustomRangeForm {
  max: FormControl<null | number>;
  min: FormControl<null | number>;
}
