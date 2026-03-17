import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  imports: [DataTableDirective, BaseDemoComponent],
  providers: [UpperCasePipe, CurrencyPipe],
  selector: 'app-using-ng-pipe',
  styleUrl: './using-ng-pipe.component.css',
  templateUrl: './using-ng-pipe.component.html',
})
export class UsingNgPipeComponent implements OnInit {
  dtOptions: ADTSettings = {};
  readonly mdHTML = 'docs/advanced/using-ng-pipe/source-html.md';
  readonly mdIntro = 'docs/advanced/using-ng-pipe/intro.md';
  readonly mdTS = 'docs/advanced/using-ng-pipe/source-ts.md';
  readonly mdTSV1 = 'docs/advanced/using-ng-pipe/source-ts-dtv1.md';

  readonly pageTitle = 'Using Angular Pipe';
  public readonly pipeCurrencyInstance = inject(CurrencyPipe);

  private readonly pipeInstance = inject(UpperCasePipe);

  ngOnInit(): void {
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
