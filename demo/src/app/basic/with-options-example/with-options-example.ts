import { Component, OnInit } from '@angular/core';
import { ADTSettings, AngularDatatable } from 'angular-datatables.net';

import { BaseDemo } from '../../shared/components/base-demo/base-demo';

@Component({
  imports: [BaseDemo, AngularDatatable],
  selector: 'app-with-options',
  styleUrl: './with-options-example.css',
  templateUrl: './with-options-example.html',
})
export class WithOptionsExample implements OnInit {
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
