import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  imports: [MarkdownComponent],
  selector: 'app-welcome',
  styleUrl: './welcome-page.css',
  templateUrl: './welcome-page.html',
})
export class WelcomePage {
  protected readonly installMd = 'docs/welcome/installation.md';
}
