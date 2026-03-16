import { Component, inject, OnInit } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-using-ng-pipe',
  imports: [DataTableDirective, BaseDemoComponent],
  templateUrl: './using-ng-pipe.component.html',
  styleUrl: './using-ng-pipe.component.css',
})
export class UsingNgPipeComponent implements OnInit {
  readonly pageTitle = 'Using Angular Pipe';
  readonly mdIntro = 'docs/advanced/using-ng-pipe/intro.md';
  readonly mdHTML = 'docs/advanced/using-ng-pipe/source-html.md';
  readonly mdTS = 'docs/advanced/using-ng-pipe/source-ts.md';
  readonly mdTSV1 = 'docs/advanced/using-ng-pipe/source-ts-dtv1.md';

  private readonly pipeInstance = inject(UpperCasePipe);
  public readonly pipeCurrencyInstance = inject(CurrencyPipe);

  dtOptions: ADTSettings = {};

  ngOnInit(): void {
    this.dtOptions = {
      ajax: 'data/data.json',
      columns: [
        {
          title: 'Id (Money)',
          data: 'id',
          ngPipeInstance: this.pipeCurrencyInstance,
          ngPipeArgs: ['USD', 'symbol'],
        },
        {
          title: 'First name',
          data: 'firstName',
          ngPipeInstance: this.pipeInstance,
        },
        {
          title: 'Last name',
          data: 'lastName',
          ngPipeInstance: this.pipeInstance,
        },
      ],
    };
  }
}
