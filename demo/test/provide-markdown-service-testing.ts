import { FactoryProvider } from '@angular/core';
import { mockProvider } from '@ngneat/spectator';
import { MarkdownService } from 'ngx-markdown';
import { of, Subject } from 'rxjs';

/**
 * Creates a mock of {@link MarkdownService} for tests
 * @returns The mock
 */
export function provideMarkdownServiceTesting(): FactoryProvider {
  return mockProvider(MarkdownService, { getSource: (source: string) => of(source), reload$: new Subject<void>() });
}
