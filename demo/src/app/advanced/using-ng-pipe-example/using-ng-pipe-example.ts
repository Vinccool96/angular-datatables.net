import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ADTSettings, AngularDataTable } from 'angular-datatables.net';

import { BaseDemo } from '../../shared/components/base-demo/base-demo';

@Component({
  imports: [AngularDataTable, BaseDemo],
  providers: [UpperCasePipe, CurrencyPipe],
  selector: 'app-using-ng-pipe',
  styleUrl: './using-ng-pipe-example.css',
  templateUrl: './using-ng-pipe-example.html',
})
export class UsingNgPipeExample implements OnInit {
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
