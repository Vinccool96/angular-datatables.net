import { Component, OnInit } from '@angular/core';
import { ADTSettings, AngularDataTable } from 'angular-datatables.net';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  imports: [BaseDemoComponent, AngularDataTable],
  selector: 'app-with-options',
  styleUrl: './with-options.component.css',
  templateUrl: './with-options.component.html',
})
export class WithOptionsComponent implements OnInit {
  public dtOptions: ADTSettings = {};
  public readonly pageTitle = 'With Options';
  protected readonly mdHTML = 'docs/basic/with-options/source-html.md';
  protected readonly mdIntro = 'docs/basic/with-options/intro.md';
  protected readonly mdTS = 'docs/basic/with-options/source-ts.md';
  protected readonly mdTSV1 = 'docs/basic/with-options/source-ts-dtv1.md';

  public ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple',
    };
  }
}
