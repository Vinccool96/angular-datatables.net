import ts from 'typescript';

export interface MigrationError {
  error: unknown;
  type: string;
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
