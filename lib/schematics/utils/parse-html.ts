/**
 * @license MIT
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { HtmlParser, ParseTreeResult } from '@angular/compiler';

import { MigrationError } from './types';

export interface ParseResult {
  errors: MigrationError[];
  tree: ParseTreeResult | undefined;
}

/**
 * parses the template string into the Html AST
 * @param template The template to parse
 * @returns The result
 */
export function parseTemplate(template: string): ParseResult {
  let parsed: ParseTreeResult;

  try {
    // Note: we use the HtmlParser here, instead of the `parseTemplate` function, because the
    // latter returns an Ivy AST, not an HTML AST. The HTML AST has the advantage of preserving
    // interpolated text as text nodes containing a mixture of interpolation tokens and text tokens,
    // rather than turning them into `BoundText` nodes like the Ivy AST does. This allows us to
    // easily get the text-only ranges without having to reconstruct the original text.
    parsed = new HtmlParser().parse(template, '', {
      preserveLineEndings: true,
      // Allows for ICUs to be parsed.
      tokenizeExpansionForms: true,
      // Explicitly disable blocks so that their characters are treated as plain text.
      tokenizeBlocks: true,
    });

    // Don't migrate invalid templates.
    if (parsed.errors.length > 0) {
      const errors = parsed.errors.map((error) => ({ error: error, type: 'parse' }));
      return { errors, tree: undefined };
    }
  } catch (error: unknown) {
    return { errors: [{ error: error, type: 'parse' }], tree: undefined };
  }

  return { errors: [], tree: parsed };
}
