import { Component } from '@angular/core';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  selector: 'app-server-side-angular-way',
  imports: [BaseDemoComponent],
  templateUrl: './server-side-angular-way.component.html',
  styleUrl: './server-side-angular-way.component.css',
})
export class ServerSideAngularWayComponent {
  readonly pageTitle = 'Server side the Angular way';
  readonly mdIntro = 'docs/basic/server-side-angular-way/intro.md';
  readonly mdHTML = 'docs/basic/server-side-angular-way/source-html.md';
  readonly mdTSV1 = 'docs/basic/server-side-angular-way/source-ts.md';
}
