import { AfterViewInit, Component, OnDestroy, OnInit, viewChild } from '@angular/core';
import { ADTSettings, AngularDatatable } from 'angular-datatables.net';
import { Subject } from 'rxjs';

import { BaseDemo } from '../../shared/components/base-demo/base-demo';

@Component({
  imports: [BaseDemo, AngularDatatable],
  selector: 'app-rerender',
  styleUrl: './rerender-example.css',
  templateUrl: './rerender-example.html',
})
export class RerenderExample implements AfterViewInit, OnDestroy, OnInit {
  public readonly pageTitle = 'Rerender';
  protected dtOptions: ADTSettings = {};
  protected readonly dtTrigger = new Subject<ADTSettings | null>();
  protected readonly mdHTML = 'docs/advanced/rerender/source-html.md';
  protected readonly mdIntro = 'docs/advanced/rerender/intro.md';
  protected readonly mdTS = 'docs/advanced/rerender/source-ts.md';
  protected readonly mdTSV1 = 'docs/advanced/rerender/source-ts-dtv1.md';

  private readonly datatableElement = viewChild(AngularDatatable);

  public ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  public ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
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
  }

  public rerender(): void {
    void this.datatableElement()?.dtInstance.then((dtInstance) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }
}
