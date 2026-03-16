import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-faq',
  imports: [MarkdownComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
})
export class FaqComponent {
  readonly faqMd = 'docs/faq.md';

  onLoad() {
    // Hide Copy button
    $('.toolbar').hide();

    // red color for questions
    $('h5').css('color', 'red');
  }
}
