import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  imports: [MarkdownComponent],
  selector: 'app-faq',
  styleUrl: './faq-page.css',
  templateUrl: './faq-page.html',
})
export class FaqPage {
  protected readonly faqMd = 'docs/faq.md';

  protected onLoad(): void {
    // Hide Copy button
    $('.toolbar').hide();

    // red color for questions
    $('h5').css('color', 'red');
  }
}
