```html
<form [formGroup]="form" (submit)="filterById()">
  <label>
    Min
    <input type="number" name="min" id="min" formControlName="min" />
  </label>
  <label>
    Max
    <input type="number" name="max" id="max" formControlName="max" />
  </label>
  <button class="btn btn-primary" type="submit" data-testid="submit">Filter by ID</button>
</form>
<br />
<table adtDatatable [dtOptions]="dtOptions" class="row-border hover"></table>
```
