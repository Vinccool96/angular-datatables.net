import { AfterViewInit, Component, OnDestroy, OnInit, viewChild } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';
import { Subject } from 'rxjs';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  selector: 'app-rerender',
  imports: [BaseDemoComponent, DataTableDirective],
  templateUrl: './rerender.component.html',
  styleUrl: './rerender.component.css',
})
export class RerenderComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly pageTitle = 'Rerender';
  readonly mdIntro = 'docs/advanced/rerender/intro.md';
  readonly mdHTML = 'docs/advanced/rerender/source-html.md';
  readonly mdTS = 'docs/advanced/rerender/source-ts.md';
  readonly mdTSV1 = 'docs/advanced/rerender/source-ts-dtv1.md';

  readonly datatableElement = viewChild(DataTableDirective);

  dtOptions: ADTSettings = {};

  readonly dtTrigger = new Subject<ADTSettings | null>();

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
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    void this.datatableElement()?.dtInstance.then((dtInstance) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }
}
