import { Element, Node, ParseTreeResult, visitAll } from '@angular/compiler';
import path from 'node:path';
import ts from 'typescript';

import { parseTemplate } from '../utils/parse-html';
import { MigrationError } from '../utils/types';
import {
  AnalyzedFile,
  ElementCollector,
  ElementToMigrate,
  i18nCollector,
  newImportIdentifier,
  oldImportIdentifier,
} from './types';

/**
 * Analyzes a source file to find file that need to be migrated and the text ranges within them.
 * @param sourceFile File to be analyzed.
 * @param analyzedFiles Map in which to store the results.
 */
export function analyze(sourceFile: ts.SourceFile, analyzedFiles: Map<string, AnalyzedFile>): void {
  forEachClass(sourceFile, (node) => {
    if (ts.isClassDeclaration(node)) {
      analyzeDecorators(node, sourceFile, analyzedFiles);
    } else {
      analyzeImportDecorators(node, sourceFile, analyzedFiles);
    }
  });
}

/**
 * Analyzes the decorators to see if they should be removed
 * @param node The node to analyze.
 * @param sourceFile The file containing the node.
 * @param analyzedFiles Map in which to store the results.
 */
function analyzeDecorators(
  node: ts.ClassDeclaration,
  sourceFile: ts.SourceFile,
  analyzedFiles: Map<string, AnalyzedFile>,
): void {
  const decorator = ts.getDecorators(node)?.find((dec) => {
    return (
      ts.isCallExpression(dec.expression) &&
      ts.isIdentifier(dec.expression.expression) &&
      dec.expression.expression.text === 'Component'
    );
  }) as (ts.Decorator & { expression: ts.CallExpression }) | undefined;

  const metadata =
    decorator !== undefined &&
    decorator.expression.arguments.length > 0 &&
    ts.isObjectLiteralExpression(decorator.expression.arguments[0])
      ? decorator.expression.arguments[0]
      : null;

  if (metadata === null) {
    return;
  }

  for (const property of metadata.properties) {
    // All the properties we care about should have static
    // names and be initialized to a static string.
    if (
      !ts.isPropertyAssignment(property) ||
      (!ts.isIdentifier(property.name) && !ts.isStringLiteralLike(property.name))
    ) {
      continue;
    }

    switch (property.name.text) {
      case 'imports': {
        AnalyzedFile.addRange(sourceFile.fileName, sourceFile, analyzedFiles, {
          end: property.initializer.getEnd(),
          node: property,
          remove: true,
          start: property.name.getStart(),
          type: 'importDecorator',
        });
        break;
      }

      case 'template': {
        // +1/-1 to exclude the opening/closing characters from the range.
        AnalyzedFile.addRange(sourceFile.fileName, sourceFile, analyzedFiles, {
          end: property.initializer.getEnd() - 1,
          node: property,
          remove: true,
          start: property.initializer.getStart() + 1,
          type: 'template',
        });
        break;
      }

      case 'templateUrl': {
        // Leave the end as undefined which means that the range is until the end of the file.
        if (ts.isStringLiteralLike(property.initializer)) {
          const filePath = path.join(path.dirname(sourceFile.fileName), property.initializer.text);
          AnalyzedFile.addRange(filePath, sourceFile, analyzedFiles, {
            node: property,
            remove: true,
            start: 0,
            type: 'templateUrl',
          });
        }
        break;
      }
    }
  }
}

/**
 * calculates the level of nesting of the items in the collector
 * @param visitor The collector.
 * @param hasLineBreaks Whether the template contains line breaks or not.
 */
export function calculateNesting(visitor: ElementCollector, hasLineBreaks: boolean): void {
  // start from top of template
  // loop through each element
  const nestedQueue: number[] = [];

  for (let index = 0; index < visitor.elements.length; index++) {
    const currentElement = visitor.elements[index];

    if (index === 0) {
      nestedQueue.push(currentElement.element.sourceSpan.end.offset);
      currentElement.hasLineBreaks = hasLineBreaks;
      continue;
    }

    currentElement.hasLineBreaks = hasLineBreaks;
    currentElement.nestCount = getNestedCount(currentElement, nestedQueue);

    if (currentElement.element.sourceSpan.end.offset !== nestedQueue.at(-1)) {
      nestedQueue.push(currentElement.element.sourceSpan.end.offset);
    }
  }
}

/**
 * Edits the imports of the file
 * @param template The template
 * @param node The node to remove
 * @returns The new import
 */
export function editImports(template: string, node: ts.Node): string {
  if (template.startsWith('imports') && ts.isPropertyAssignment(node)) {
    const updatedImport = updateClassImports(node);
    return updatedImport ?? template;
  } else if (ts.isImportDeclaration(node)) {
    return updateImportDeclaration(node);
  }

  return template;
}

/**
 * Retrieves the original block of text in the template for length comparison during migration processing.
 * @param elementToMigrate The element.
 * @param template The current template.
 * @param offset The current offset.
 * @returns The original block
 */
export function getOriginals(
  elementToMigrate: ElementToMigrate,
  template: string,
  offset: number,
): { childLength: number; childNodes: Node[]; children: string[]; end: string; start: string } {
  // original opening block
  if (elementToMigrate.element.children.length > 0) {
    const childStart = elementToMigrate.element.children[0].sourceSpan.start.offset - offset;
    const childEnd = (elementToMigrate.element.children.at(-1) as Node).sourceSpan.end.offset - offset;
    const start = template.slice(
      elementToMigrate.element.sourceSpan.start.offset - offset,
      elementToMigrate.element.children[0].sourceSpan.start.offset - offset,
    );
    // original closing block
    const end = template.slice(
      (elementToMigrate.element.children.at(-1) as Node).sourceSpan.end.offset - offset,
      elementToMigrate.element.sourceSpan.end.offset - offset,
    );
    const childLength = childEnd - childStart;
    return {
      childLength: childLength,
      childNodes: elementToMigrate.element.children,
      children: getOriginalChildren(elementToMigrate.element.children, template, offset),
      end: end,
      start: start,
    };
  }

  // self closing or no children
  const start = template.slice(
    elementToMigrate.element.sourceSpan.start.offset - offset,
    elementToMigrate.element.sourceSpan.end.offset - offset,
  );
  // original closing block
  return { childLength: 0, childNodes: [], children: [], end: '', start: start };
}

/**
 * determines if a given template string contains line breaks
 * @param template The template to verify.
 * @returns If the template has line breaks
 */
export function hasLineBreaks(template: string): boolean {
  return /[\r\n]/.test(template);
}

/**
 * properly adjusts template offsets based on current nesting levels
 * @param element The element
 * @param nestLevel The current nesting level
 * @param offset The current offset
 * @param postOffsets The post offsets to apply
 * @returns The resulting offset
 */
export function reduceNestingOffset(
  element: ElementToMigrate,
  nestLevel: number,
  offset: number,
  postOffsets: number[],
): number {
  if (element.nestCount <= nestLevel) {
    const count = nestLevel - element.nestCount;

    // reduced nesting, add post offset
    for (let index = 0; index <= count; index++) {
      offset += postOffsets.pop() ?? 0;
    }
  }

  return offset;
}

/**
 * Verifies if the i18n structure is valid.
 * @param parsed The parsed tree.
 * @param fileName The name of the file.
 * @returns The error caused by the validation, if any.
 */
export function validateI18nStructure(parsed: ParseTreeResult, fileName: string): Error | null {
  const visitor = new i18nCollector();
  visitAll(visitor, parsed.rootNodes);
  const parents = visitor.elements.filter((element) => element.children.length > 0);
  for (const p of parents) {
    for (const element of visitor.elements) {
      if (element === p) {
        continue;
      }
      if (isChildOf(p, element)) {
        return new Error(
          `i18n Nesting error: The migration would result in invalid i18n nesting for ` +
            `${fileName}. Element with i18n attribute "${p.name}" would result having a child of ` +
            `element with i18n attribute "${element.name}". Please fix and re-run the migration.`,
        );
      }
    }
  }
  return null;
}

/**
 * Returns the errors when parsing the template.
 * @param migrated The new template
 * @param fileName The name of the file
 * @returns The potential errors
 */
export function validateMigratedTemplate(migrated: string, fileName: string): MigrationError[] {
  const parsed = parseTemplate(migrated);
  const errors: MigrationError[] = [];

  if (parsed.errors.length > 0) {
    errors.push({
      error: new Error(
        `The migration resulted in invalid HTML for ${fileName}. ` +
          `Please check the template for valid HTML structures and run the migration again.`,
      ),
      type: 'parse',
    });
  }

  if (parsed.tree !== undefined) {
    const i18nError = validateI18nStructure(parsed.tree, fileName);

    if (i18nError !== null) {
      errors.push({ error: i18nError, type: 'i18n' });
    }
  }
  return errors;
}

/**
 * Analyzes the import decorator to see if it should be changed
 * @param node The node to analyze.
 * @param sourceFile The file containing the node.
 * @param analyzedFiles Map in which to store the results.
 */
function analyzeImportDecorators(
  node: ts.ImportDeclaration,
  sourceFile: ts.SourceFile,
  analyzedFiles: Map<string, AnalyzedFile>,
): void {
  if (!node.getText().includes('angular-datatables.net')) {
    return;
  }

  const clause = node.getChildAt(1) as ts.ImportClause;

  if (clause.namedBindings === undefined || !ts.isNamedImports(clause.namedBindings)) {
    return;
  }

  const elements = clause.namedBindings.elements.filter((element) => oldImportIdentifier === element.getText());

  if (elements.length === 0) {
    return;
  }

  AnalyzedFile.addRange(sourceFile.fileName, sourceFile, analyzedFiles, {
    end: node.getEnd(),
    node: node,
    remove: true,
    start: node.getStart(),
    type: 'importDeclaration',
  });
}

/**
 * Executes a callback on each class declaration in a file.
 * @param sourceFile File to be analyzed.
 * @param callback The callback to be executed
 */
function forEachClass(
  sourceFile: ts.SourceFile,
  callback: (node: ts.ClassDeclaration | ts.ImportDeclaration) => void,
): void {
  sourceFile.forEachChild(function walk(node) {
    if (ts.isClassDeclaration(node) || ts.isImportDeclaration(node)) {
      callback(node);
    }
    node.forEachChild(walk);
  });
}

/**
 * Returns the level deep a migratable element is nested.
 * @param etm The element to migrate
 * @param aggregator The aggregator
 * @returns The level
 */
function getNestedCount(etm: ElementToMigrate, aggregator: number[]): number {
  if (aggregator.length === 0) {
    return 0;
  }

  if (
    etm.element.sourceSpan.start.offset < (aggregator.at(-1) as number) &&
    etm.element.sourceSpan.end.offset !== aggregator.at(-1)
  ) {
    // element is nested
    aggregator.push(etm.element.sourceSpan.end.offset);
    return aggregator.length - 1;
  } else {
    // not nested
    aggregator.pop();
    return getNestedCount(etm, aggregator);
  }
}

/**
 * Gets the original children from the template
 * @param children The child nodes.
 * @param template The current template.
 * @param offset The current offset.
 * @returns The original children
 */
function getOriginalChildren(children: Node[], template: string, offset: number): string[] {
  return children.map((child) => {
    return template.slice(child.sourceSpan.start.offset - offset, child.sourceSpan.end.offset - offset);
  });
}

/**
 * Verifies if the element is a child of the parent.
 * @param parent The desired parent.
 * @param element The element to verify.
 * @returns If the element is a child
 */
function isChildOf(parent: Element, element: Element): boolean {
  return (
    parent.sourceSpan.start.offset < element.sourceSpan.start.offset &&
    parent.sourceSpan.end.offset > element.sourceSpan.end.offset
  );
}

/**
 * Edits the assignment
 * @param propertyAssignment The property to edit
 * @returns The new imports if everything worked well
 */
function updateClassImports(propertyAssignment: ts.PropertyAssignment): string | null {
  const printer = ts.createPrinter();
  const importList = propertyAssignment.initializer;

  // Can't change non-array literals.
  if (!ts.isArrayLiteralExpression(importList)) {
    return null;
  }

  const elements = importList.elements.map((element) => {
    if (!ts.isIdentifier(element) || element.text !== oldImportIdentifier) {
      return element;
    }

    return ts.factory.createIdentifier(newImportIdentifier);
  });

  const updatedElements = ts.factory.updateArrayLiteralExpression(importList, elements);
  const updatedAssignment = ts.factory.updatePropertyAssignment(
    propertyAssignment,
    propertyAssignment.name,
    updatedElements,
  );
  return printer.printNode(ts.EmitHint.Unspecified, updatedAssignment, updatedAssignment.getSourceFile());
}

/**
 * Updates the import declaration to contain the right directive.
 * @param declaration The declaration to update.
 * @returns The new import.
 */
function updateImportDeclaration(declaration: ts.ImportDeclaration): string {
  const clause = declaration.getChildAt(1) as ts.ImportClause;
  const updatedClause = updateImportClause(clause);
  const printer = ts.createPrinter({
    removeComments: true,
  });
  const updated = ts.factory.updateImportDeclaration(
    declaration,
    declaration.modifiers,
    updatedClause,
    declaration.moduleSpecifier,
    // eslint-disable-next-line unicorn/no-useless-undefined
    undefined,
  );
  return printer.printNode(ts.EmitHint.Unspecified, updated, clause.getSourceFile());
}

/**
 * Creates a new import clause with the right directive.
 * @param clause The import clause.
 * @returns The new import clause.
 */
function updateImportClause(clause: ts.ImportClause): ts.ImportClause {
  if (clause.namedBindings !== undefined && ts.isNamedImports(clause.namedBindings)) {
    const elements = clause.namedBindings.elements.map((element): ts.ImportSpecifier => {
      if (element.getText() !== oldImportIdentifier) {
        return element;
      }

      return ts.factory.createImportSpecifier(
        element.isTypeOnly,
        element.propertyName,
        ts.factory.createIdentifier(newImportIdentifier),
      );
    });
    clause = ts.factory.updateImportClause(
      clause,
      clause.phaseModifier,
      clause.name,
      ts.factory.createNamedImports(elements),
    );
  }
  return clause;
}
