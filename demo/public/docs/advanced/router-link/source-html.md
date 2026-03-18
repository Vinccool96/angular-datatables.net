```html
<table adtDatatable [dtOptions]="dtOptions" [dtTrigger]="dtTrigger" class="row-border hover"></table>

<ng-template #demoNg let-data="adtData" let-emitter="captureEvents">
  <app-demo-ng-template-ref [data]="data" actionText="View" (emitter)="emitter($event)" />
</ng-template>
```
