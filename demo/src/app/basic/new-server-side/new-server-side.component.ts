import { Component } from '@angular/core';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  imports: [BaseDemoComponent],
  selector: 'app-new-server-side',
  styleUrl: './new-server-side.component.css',
  templateUrl: './new-server-side.component.html',
})
export class NewServerSideComponent {
  mdHTML = 'docs/basic/new-server-side/source-html.md';
  mdIntro = 'docs/basic/new-server-side/intro.md';
  mdTS = 'docs/basic/new-server-side/source-ts.md';
  mdTSV1 = 'docs/basic/new-server-side/source-ts-dtv1.md';
  pageTitle = 'Server-side processing';
}
