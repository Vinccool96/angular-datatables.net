import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  imports: [MarkdownComponent],
  selector: 'app-faq',
  styleUrl: './faq.component.css',
  templateUrl: './faq.component.html',
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
