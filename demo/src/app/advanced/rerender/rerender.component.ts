import { AfterViewInit, Component, OnDestroy, OnInit, viewChild } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';
import { Subject } from 'rxjs';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  imports: [BaseDemoComponent, DataTableDirective],
  selector: 'app-rerender',
  styleUrl: './rerender.component.css',
  templateUrl: './rerender.component.html',
})
export class RerenderComponent implements AfterViewInit, OnDestroy, OnInit {
  readonly datatableElement = viewChild(DataTableDirective);
  dtOptions: ADTSettings = {};
  readonly dtTrigger = new Subject<ADTSettings | null>();
  readonly mdHTML = 'docs/advanced/rerender/source-html.md';
  readonly mdIntro = 'docs/advanced/rerender/intro.md';

  readonly mdTS = 'docs/advanced/rerender/source-ts.md';

  readonly mdTSV1 = 'docs/advanced/rerender/source-ts-dtv1.md';

  readonly pageTitle = 'Rerender';

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
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
