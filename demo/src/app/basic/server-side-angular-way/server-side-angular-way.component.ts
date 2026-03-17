import { Component } from '@angular/core';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  imports: [BaseDemoComponent],
  selector: 'app-server-side-angular-way',
  styleUrl: './server-side-angular-way.component.css',
  templateUrl: './server-side-angular-way.component.html',
})
export class ServerSideAngularWayComponent {
  readonly mdHTML = 'docs/basic/server-side-angular-way/source-html.md';
  readonly mdIntro = 'docs/basic/server-side-angular-way/intro.md';
  readonly mdTSV1 = 'docs/basic/server-side-angular-way/source-ts.md';
  readonly pageTitle = 'Server side the Angular way';
}
