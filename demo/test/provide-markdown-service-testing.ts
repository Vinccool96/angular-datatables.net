import { mockProvider } from '@ngneat/spectator';
import { MarkdownService } from 'ngx-markdown';
import { of, Subject } from 'rxjs';

export function provideMarkdownServiceTesting() {
  return mockProvider(MarkdownService, { getSource: (src: string) => of(src), reload$: new Subject<void>() });
}
