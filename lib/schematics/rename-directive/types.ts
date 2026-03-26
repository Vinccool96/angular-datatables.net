import { Attribute, Element, RecursiveVisitor } from '@angular/compiler';
import ts from 'typescript';

export const newDatatableDirective = 'adtDatatable';
export const oldDatatableDirective = 'datatable';

export const startMarker = '◬';
export const endMarker = '✢';

export const oldImportIdentifier = 'DatatableDirective';
export const newImportIdentifier = 'AngularDataTable';

export interface Offsets {
  post: number;
  pre: number;
}

export interface Result {
  offsets: Offsets;
  template: string;
}

/**
 * Represents a range of text within a file. Omitting the end means that it's until the end of the file.
 */
interface Range {
  end?: number;
  node: ts.Node;
  remove: boolean;
  start: number;
  type: string;
}

/**
 * Represents a file that was analyzed by the migration.
 */
export class AnalyzedFile {
  public importRanges: Range[] = [];
  public sourceFile: ts.SourceFile;
  public templateRanges: Range[] = [];
  private ranges: Range[] = [];

  public constructor(sourceFile: ts.SourceFile) {
    this.sourceFile = sourceFile;
  }

  /**
   * Returns the ranges in the order in which they should be migrated.
   * @returns The ranges
   */
  public getSortedRanges(): Range[] {
    // templates first for checking on whether certain imports can be safely removed
    this.templateRanges = [...this.ranges]
      .filter((x) => x.type === 'template' || x.type === 'templateUrl')
      // eslint-disable-next-line unicorn/no-array-sort
      .sort((aStart, bStart) => bStart.start - aStart.start);
    this.importRanges = [...this.ranges]
      .filter((x) => x.type === 'importDecorator' || x.type === 'importDeclaration')
      // eslint-disable-next-line unicorn/no-array-sort
      .sort((aStart, bStart) => bStart.start - aStart.start);
    return [...this.templateRanges, ...this.importRanges];
  }

  /**
   * Adds a text range to an `AnalyzedFile`.
   * @param path Path of the file.
   * @param sourceFile The source file
   * @param analyzedFiles Map keeping track of all the analyzed files.
   * @param range Range to be added.
   */
  public static addRange(
    path: string,
    sourceFile: ts.SourceFile,
    analyzedFiles: Map<string, AnalyzedFile>,
    range: Range,
  ): void {
    let analysis = analyzedFiles.get(path);

    if (analysis === undefined) {
      analysis = new AnalyzedFile(sourceFile);
      analyzedFiles.set(path, analysis);
    }

    const duplicate = analysis.ranges.find((current) => current.start === range.start && current.end === range.end);

    if (duplicate === undefined) {
      analysis.ranges.push(range);
    }
  }
}

/**
 * Represents an element with a migratable attribute
 */
export class ElementToMigrate {
  public attribute: Attribute;
  public element: Element;
  public hasLineBreaks = false;
  public nestCount = 0;

  public constructor(element: Element, attribute: Attribute) {
    this.element = element;
    this.attribute = attribute;
  }

  public attributeEnd(offset: number): number {
    return this.attribute.sourceSpan.end.offset - offset;
  }

  public attributeStart(offset: number): number {
    return this.attribute.sourceSpan.start.offset - offset;
  }

  public end(offset: number): number {
    return this.element.sourceSpan.end.offset - offset;
  }

  public length(): number {
    return this.element.sourceSpan.end.offset - this.element.sourceSpan.start.offset;
  }

  public start(offset: number): number {
    return this.element.sourceSpan.start.offset - offset;
  }
}

/**
 * Finds all elements with datatables directives.
 */
export class ElementCollector extends RecursiveVisitor {
  public readonly elements: ElementToMigrate[] = [];

  public constructor(private myAttributes: string[] = []) {
    super();
  }

  public override visitElement(element: Element): void {
    if (element.name === 'table' && element.attrs.length > 0) {
      for (const attribute of element.attrs) {
        if (this.myAttributes.includes(attribute.name)) {
          this.elements.push(new ElementToMigrate(element, attribute));
        }
      }
    }

    super.visitElement(element, null);
  }
}

/**
 * Finds all elements that represent i18n blocks.
 */
export class i18nCollector extends RecursiveVisitor {
  public readonly elements: Element[] = [];

  public override visitElement(element: Element): void {
    if (element.attrs.some((a) => a.name === 'i18n')) {
      this.elements.push(element);
    }

    super.visitElement(element, null);
  }
}
