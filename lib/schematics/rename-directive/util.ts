import { Node } from '@angular/compiler';
import path from 'node:path';
import ts from 'typescript';

import { parseTemplate } from '../utils/parse-html';
import { MigrationError } from '../utils/types';
import { AnalyzedFile, ElementCollector, ElementToMigrate, newImportIdentifier, oldImportIdentifier } from './types';

/**
 * Analyzes a source file to find file that need to be migrated and the text ranges within them.
 * @param sourceFile File to be analyzed.
 * @param analyzedFiles Map in which to store the results.
 */
export function analyze(sourceFile: ts.SourceFile, analyzedFiles: Map<string, AnalyzedFile>): void {
  forEachClass(sourceFile, (node) => {
    if (ts.isClassDeclaration(node)) {
      analyzeDecorators(node, sourceFile, analyzedFiles);
    } else if (ts.isImportDeclaration(node)) {
      analyzeImportDecorators(node, sourceFile, analyzedFiles);
    } else if (ts.isPropertyDeclaration(node)) {
      analyzePropertyDeclaration(node, sourceFile, analyzedFiles);
    }
  });
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
 * Edits the call expression of the file
 * @param template The template
 * @param callExpression The original call expression
 * @returns The new call expression
 */
export function editCallExpression(template: string, callExpression: ts.Node): string {
  if (!ts.isCallExpression(callExpression) || !callExpression.getText().includes(oldImportIdentifier)) {
    return template;
  }

  const printer = ts.createPrinter();

  const expression = callExpression.expression;

  const expressionArguments = callExpression.arguments.map((argument) => {
    if (!ts.isIdentifier(argument) || argument.getText() !== oldImportIdentifier) {
      return argument;
    }

    return ts.factory.createIdentifier(newImportIdentifier);
  });

  const updated = ts.factory.createCallExpression(expression, callExpression.typeArguments, expressionArguments);

  return printer.printNode(ts.EmitHint.Unspecified, updated, callExpression.getSourceFile());
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
 * Edits the property declaration
 * @param template The template
 * @param property The property to edit
 * @returns The new property
 */
export function editPropertyDeclaration(template: string, property: ts.Node): string {
  const printer = ts.createPrinter();

  if (
    !ts.isPropertyDeclaration(property) ||
    !property.getText().includes(oldImportIdentifier) ||
    property.type === undefined ||
    !property.type.getText().includes(oldImportIdentifier) ||
    property.modifiers === undefined ||
    property.modifiers.length === 0 ||
    !property.modifiers.some((modifier) => modifier.getText().includes(oldImportIdentifier))
  ) {
    return template;
  }

  const modifiers = property.modifiers.map((modifier) => {
    if (!ts.isDecorator(modifier) || !modifier.getText().includes(oldImportIdentifier)) {
      return modifier;
    }

    const oldExpression = modifier.expression;

    if (!ts.isCallExpression(oldExpression)) {
      return modifier;
    }

    const expressionArguments = oldExpression.arguments.map((argument) => {
      if (!ts.isIdentifier(argument) || argument.getText() !== oldImportIdentifier) {
        return argument;
      }

      return ts.factory.createIdentifier(newImportIdentifier);
    });

    return ts.factory.createDecorator(
      ts.factory.createCallExpression(oldExpression.expression, oldExpression.typeArguments, expressionArguments),
    );
  });

  const oldType = property.type;

  let newType: ts.TypeNode;

  if (ts.isArrayTypeNode(oldType)) {
    if (
      !ts.isTypeReferenceNode(oldType.elementType) ||
      !ts.isIdentifier(oldType.elementType.typeName) ||
      oldType.elementType.typeName.getText() !== oldImportIdentifier
    ) {
      return template;
    }

    newType = ts.factory.createArrayTypeNode(
      ts.factory.createTypeReferenceNode(ts.factory.createIdentifier(newImportIdentifier)),
    );
  } else if (ts.isTypeReferenceNode(oldType) && ts.isIdentifier(oldType.typeName)) {
    if (
      oldType.typeName.getText() === 'Array' &&
      oldType.typeArguments !== undefined &&
      oldType.typeArguments.length === 1
    ) {
      newType = ts.factory.createTypeReferenceNode(oldType.typeName, [
        ts.factory.createTypeReferenceNode(ts.factory.createIdentifier(newImportIdentifier)),
      ]);
    } else if (oldType.typeName.getText() === oldImportIdentifier) {
      newType = ts.factory.createTypeReferenceNode(ts.factory.createIdentifier(newImportIdentifier));
    } else {
      return template;
    }
  } else if (ts.isUnionTypeNode(oldType)) {
    newType = ts.factory.createUnionTypeNode(
      oldType.types.map((element): ts.TypeNode => {
        if (
          !ts.isTypeReferenceNode(element) ||
          !ts.isIdentifier(element.typeName) ||
          element.getText() !== oldImportIdentifier
        ) {
          return element;
        }

        return ts.factory.createTypeReferenceNode(ts.factory.createIdentifier(newImportIdentifier));
      }),
    );
  } else {
    return template;
  }

  const updated = ts.factory.createPropertyDeclaration(
    modifiers,
    property.name,
    property.questionToken ?? property.exclamationToken,
    newType,
    property.initializer,
  );
  return printer.printNode(ts.EmitHint.Unspecified, updated, property.getSourceFile());
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

  return errors;
}

/**
 * Analyzes the property assignments to see if they should be modified.
 * @param node The node to analyze.
 * @param sourceFile The file containing the node.
 * @param analyzedFiles Map in which to store the results.
 */
function analyzePropertyDeclaration(
  node: ts.PropertyDeclaration,
  sourceFile: ts.SourceFile,
  analyzedFiles: Map<string, AnalyzedFile>,
): void {
  if (!node.getText().includes(oldImportIdentifier)) {
    return;
  }

  if (node.initializer !== undefined) {
    const initializer = node.initializer;

    if (!ts.isCallExpression(initializer) || !initializer.getText().includes(oldImportIdentifier)) {
      return;
    }

    const called = initializer.arguments[0];

    if (!ts.isIdentifier(called) || called.getText() !== oldImportIdentifier) {
      return;
    }

    AnalyzedFile.addRange(sourceFile.fileName, sourceFile, analyzedFiles, {
      end: initializer.getEnd(),
      node: initializer,
      start: initializer.getStart(),
      type: 'callExpression',
    });
    return;
  }

  if (
    node.modifiers === undefined ||
    !node.modifiers.some((modifier) => ts.isDecorator(modifier) && modifier.getText().includes(oldImportIdentifier))
  ) {
    return;
  }

  AnalyzedFile.addRange(sourceFile.fileName, sourceFile, analyzedFiles, {
    end: node.getEnd(),
    node: node,
    start: node.getStart(),
    type: 'propertyDeclaration',
  });
}

/**
 * Analyzes the decorators to see if they should be modified
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
  callback: (node: ts.ClassDeclaration | ts.ImportDeclaration | ts.PropertyDeclaration) => void,
): void {
  sourceFile.forEachChild(function walk(node) {
    if (ts.isClassDeclaration(node) || ts.isImportDeclaration(node) || ts.isPropertyDeclaration(node)) {
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
