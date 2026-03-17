import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-welcome',
  imports: [MarkdownComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  readonly installMd = 'docs/welcome/installation.md';
}
