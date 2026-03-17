import { mockProvider } from '@ngneat/spectator';
import { MarkdownService } from 'ngx-markdown';
import { of, Subject } from 'rxjs';

export function provideMarkdownServiceTesting() {
  return mockProvider(MarkdownService, { getSource: (source: string) => of(source), reload$: new Subject<void>() });
}
