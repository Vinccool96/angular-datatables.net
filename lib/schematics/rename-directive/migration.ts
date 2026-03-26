import { visitAll } from '@angular/compiler';
import ts from 'typescript';

import { parseTemplate } from '../utils/parse-html';
import { MigrationError } from '../utils/types';
import {
  AnalyzedFile,
  ElementCollector,
  ElementToMigrate,
  endMarker,
  newDatatableDirective,
  oldDatatableDirective,
  Result,
  startMarker,
} from './types';
import {
  calculateNesting,
  editImports,
  getOriginals,
  hasLineBreaks,
  reduceNestingOffset,
  validateMigratedTemplate,
} from './util';

const datatables = [oldDatatableDirective];

interface MigrationResult {
  changed: boolean;
  errors: MigrationError[];
  migrated: string;
}

/**
 * Actually migrates a given template to the new syntax
 * @param template The template to migrate.
 * @param templateType The type of template.
 * @param node The current node.
 * @param file The file containing the node.
 * @returns The migration result
 */
export function migrateTemplate(
  template: string,
  templateType: string,
  node: ts.Node,
  file: AnalyzedFile,
): { errors: MigrationError[]; migrated: string | undefined } {
  let errors: MigrationError[] = [];
  let migrated = template;

  if (templateType === 'template' || templateType === 'templateUrl') {
    const directiveResult = migrateDirective(template);

    if (directiveResult.errors.length > 0) {
      return { errors: directiveResult.errors, migrated: template };
    }

    migrated = directiveResult.migrated;
    const changed = directiveResult.changed;

    if (changed) {
      const errors = validateMigratedTemplate(migrated, file.sourceFile.fileName);
      if (errors.length > 0) {
        return { errors: errors, migrated: template };
      }
    }

    errors = [...directiveResult.errors];
  } else {
    migrated = editImports(template, node);
  }

  return { errors: errors, migrated: migrated };
}

/**
 * Migrates the directive
 * @param template The template to migrate.
 * @returns The result
 */
function migrateDirective(template: string): MigrationResult {
  const errors: MigrationError[] = [];
  const parsed = parseTemplate(template);

  if (parsed.tree === undefined) {
    return { changed: false, errors: errors, migrated: template };
  }

  let result = template;
  const visitor = new ElementCollector(datatables);
  visitAll(visitor, parsed.tree.rootNodes);
  calculateNesting(visitor, hasLineBreaks(template));

  let offset = 0;
  let nestLevel = -1;
  const postOffsets: number[] = [];

  for (const element of visitor.elements) {
    let migrateResult: Result = { offsets: { post: 0, pre: 0 }, template: result };
    // applies the post offsets after closing
    offset = reduceNestingOffset(element, nestLevel, offset, postOffsets);

    try {
      migrateResult = migrateAngularDatatableDirective(element, result, offset);
    } catch (error: unknown) {
      errors.push({ error: error, type: oldDatatableDirective });
    }

    result = migrateResult.template;
    offset += migrateResult.offsets.pre;
    postOffsets.push(migrateResult.offsets.post);
    nestLevel = element.nestCount;
  }

  const changed = visitor.elements.length > 0;

  return { changed: changed, errors: errors, migrated: result };
}

/**
 * Replaces structural directive datatable instances with new adtDatatable.
 * Returns null if the migration failed (e.g. there was a syntax error).
 * @param elementToMigrate The element to migrate
 * @param template The template
 * @param offset The current offset
 * @returns The result
 */
export function migrateAngularDatatableDirective(
  elementToMigrate: ElementToMigrate,
  template: string,
  offset: number,
): Result {
  const originals = getOriginals(elementToMigrate, template, offset);
  const startBlock = `${startMarker}${newDatatableDirective}`;
  const endBlock = endMarker;

  const updatedTemplate =
    template.slice(0, elementToMigrate.attributeStart(offset)) +
    newDatatableDirective +
    template.slice(elementToMigrate.attributeEnd(offset));

  const pre = originals.start.length - startBlock.length;
  const post = originals.end.length - endBlock.length;

  return { offsets: { post: post, pre: pre }, template: updatedTemplate };
}
