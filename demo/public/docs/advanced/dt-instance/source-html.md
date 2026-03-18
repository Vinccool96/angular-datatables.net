```html
<p>
  <button type="button" class="btn waves-effect waves-light blue" (click)="displayToConsole(datatableElement())">
    Display the DataTable instance in the console
  </button>
</p>
<blockquote>
  The DataTable instance ID is: {{ $any((datatableElement()?.dtInstance | async)?.table()?.node())['id'] }}
</blockquote>
<table adtDatatable [dtOptions]="dtOptions" class="row-border hover"></table>
```
