import { Component } from '@angular/core';

import { BaseDemo } from '../../shared/components/base-demo/base-demo';

@Component({
  imports: [BaseDemo],
  selector: 'app-server-side-angular-way',
  styleUrl: './server-side-angular-way-example.css',
  templateUrl: './server-side-angular-way-example.html',
})
export class ServerSideAngularWayExample {
  public readonly pageTitle = 'Server side the Angular way';
  protected readonly mdHTML = 'docs/basic/server-side-angular-way/source-html.md';
  protected readonly mdIntro = 'docs/basic/server-side-angular-way/intro.md';
  protected readonly mdTSV1 = 'docs/basic/server-side-angular-way/source-ts.md';
}
