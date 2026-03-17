import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  imports: [MarkdownComponent],
  selector: 'app-welcome',
  styleUrl: './welcome.component.css',
  templateUrl: './welcome.component.html',
})
export class WelcomeComponent {
  protected readonly installMd = 'docs/welcome/installation.md';
}
