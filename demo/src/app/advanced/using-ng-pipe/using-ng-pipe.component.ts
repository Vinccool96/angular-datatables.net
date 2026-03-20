import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ADTSettings, AngularDataTable } from 'angular-datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  imports: [AngularDataTable, BaseDemoComponent],
  providers: [UpperCasePipe, CurrencyPipe],
  selector: 'app-using-ng-pipe',
  styleUrl: './using-ng-pipe.component.css',
  templateUrl: './using-ng-pipe.component.html',
})
export class UsingNgPipeComponent implements OnInit {
  public readonly pageTitle = 'Using Angular Pipe';
  public readonly pipeCurrencyInstance = inject(CurrencyPipe);
  protected dtOptions: ADTSettings = {};
  protected readonly mdHTML = 'docs/advanced/using-ng-pipe/source-html.md';
  protected readonly mdIntro = 'docs/advanced/using-ng-pipe/intro.md';
  protected readonly mdTS = 'docs/advanced/using-ng-pipe/source-ts.md';
  protected readonly mdTSV1 = 'docs/advanced/using-ng-pipe/source-ts-dtv1.md';

  private readonly pipeInstance = inject(UpperCasePipe);

  public ngOnInit(): void {
    this.dtOptions = {
      ajax: 'data/data.json',
      columns: [
        {
          data: 'id',
          ngPipeArgs: ['USD', 'symbol'],
          ngPipeInstance: this.pipeCurrencyInstance,
          title: 'Id (Money)',
        },
        {
          data: 'firstName',
          ngPipeInstance: this.pipeInstance,
          title: 'First name',
        },
        {
          data: 'lastName',
          ngPipeInstance: this.pipeInstance,
          title: 'Last name',
        },
      ],
    };
  }
}
