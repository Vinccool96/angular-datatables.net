```html
<table adtDatatable [dtOptions]="dtOptions" class="row-border hover">
  <thead>
    <tr>
      <th>ID</th>
      <th>First name</th>
      <th>Last name</th>
    </tr>
  </thead>
  <tbody>
    @if (persons()?.length !== 0) { @for (person of persons(); track person.id) {
    <tr>
      <td>{{ person.id }}</td>
      <td>{{ person.firstName }}</td>
      <td>{{ person.lastName }}</td>
    </tr>
    } } @else {
    <tr>
      <td colspan="3" class="no-data-available">No data!</td>
    </tr>
    }
  </tbody>
</table>
```
