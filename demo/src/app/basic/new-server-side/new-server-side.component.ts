import { Component } from '@angular/core';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  selector: 'app-new-server-side',
  imports: [BaseDemoComponent],
  templateUrl: './new-server-side.component.html',
  styleUrl: './new-server-side.component.css',
})
export class NewServerSideComponent {
  pageTitle = 'Server-side processing';
  mdIntro = 'docs/basic/new-server-side/intro.md';
  mdHTML = 'docs/basic/new-server-side/source-html.md';
  mdTS = 'docs/basic/new-server-side/source-ts.md';
  mdTSV1 = 'docs/basic/new-server-side/source-ts-dtv1.md';
}
