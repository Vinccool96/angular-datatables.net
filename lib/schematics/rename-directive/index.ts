import { Rule, SchematicsException, Tree } from '@angular-devkit/schematics';
import { join } from '@angular/compiler-cli';
import path from 'node:path';
import ts from 'typescript';

import { canMigrateFile, createMigrationProgram } from '../utils/compiler-host';
import { getProjectTsConfigPaths } from '../utils/project-tsconfig-paths';
import { MigrationError } from '../utils/types';
import { migrateTemplate } from './migration';
import { AnalyzedFile } from './types';
import { analyze } from './util';

interface Options {
  format?: boolean;
  path?: string;
}

/**
 * Renames the directive to its name in 20.X
 * @param options The options of the migration
 * @returns The rule
 */
export function rename(options: Options): Rule {
  return async (tree, context) => {
    let allPaths: string[] = [];
    const basePath = process.cwd();
    let pathToMigrate: string | undefined;

    if (options.path !== undefined && options.path !== '') {
      if (options.path.startsWith('..')) {
        throw new SchematicsException('Cannot run directive renaming migration outside of the current project.');
      }

      pathToMigrate = join(basePath, options.path).replaceAll('\\', '/');

      if (pathToMigrate.trim() !== '') {
        allPaths.push(pathToMigrate);
      }
    } else {
      const { buildPaths, testPaths } = await getProjectTsConfigPaths(tree);
      allPaths = [...buildPaths, ...testPaths];
    }

    if (allPaths.length === 0) {
      context.logger.warn('Could not find any tsconfig file. Cannot run the directive renaming migration.');
      return;
    }

    let errors: string[] = [];
    let sourceFilesCount = 0;

    for (const tsconfigPath of allPaths) {
      const program = createMigrationProgram(tree, tsconfigPath, basePath);
      const sourceFiles = program
        .getSourceFiles()
        .filter(
          (sourceFile) =>
            (pathToMigrate !== undefined && pathToMigrate !== ''
              ? sourceFile.fileName.startsWith(pathToMigrate)
              : true) && canMigrateFile(basePath, sourceFile, program),
        );

      const migrateErrors = runDirectiveRenamingMigration(tree, sourceFiles, basePath, options);
      errors = [...errors, ...migrateErrors];
      sourceFilesCount += sourceFiles.length;
    }

    if (errors.length > 0) {
      context.logger.warn(`WARNING: ${errors.length} errors occurred during your migration:\n`);

      for (const error of errors) {
        context.logger.warn(error);
      }
    } else if (sourceFilesCount === 0) {
      context.logger.warn('Directive renaming migration did not find any files to migrate');
    }
  };
}

/**
 * Runs the migration
 * @param tree The file tree
 * @param sourceFiles The source file to migrate
 * @param basePath The base path
 * @param schematicOptions The options of the migration
 * @returns The files that were migrated
 */
function runDirectiveRenamingMigration(
  tree: Tree,
  sourceFiles: ts.SourceFile[],
  basePath: string,
  schematicOptions?: Options,
): string[] {
  const analysis = new Map<string, AnalyzedFile>();
  const migrateErrors = new Map<string, MigrationError[]>();

  for (const sourceFile of sourceFiles) {
    analyze(sourceFile, analysis);
  }

  const paths = sortFilePaths([...analysis.keys()]);

  for (const filePath of paths) {
    const file = analysis.get(filePath) as AnalyzedFile;
    const ranges = file.getSortedRanges();
    const relativePath = path.relative(basePath, filePath);
    const content = tree.readText(relativePath);
    const update = tree.beginUpdate(relativePath);

    for (const { end, node, start, type } of ranges) {
      const template = content.slice(start, end);
      const length = (end ?? content.length) - start;

      const { errors, migrated } = migrateTemplate(
        template,
        type,
        node,
        file,

      );

      if (migrated !== undefined) {
        update.remove(start, length);
        update.insertLeft(start, migrated);
      }

      if (errors.length > 0) {
        migrateErrors.set(filePath, errors);
      }
    }

    tree.commitUpdate(update);
  }

  const errorList: string[] = [];

  for (const [template, errors] of migrateErrors) {
    errorList.push(generateErrorMessage(template, errors));
  }

  return errorList;
}

/**
 * Sorts the names
 * @param names The names
 * @returns The array passed as a parameter
 */
function sortFilePaths(names: string[]): string[] {
  names.sort((a, _) => (a.endsWith('.html') ? -1 : 0));
  return names;
}

/**
 *
 * @param path The path of the file
 * @param errors The migrations errors that occurred for the file
 * @returns The error message
 */
function generateErrorMessage(path: string, errors: MigrationError[]): string {
  let errorMessage = `Template "${path}" encountered ${errors.length} errors during migration:\n`;
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  errorMessage += errors.map((error) => ` - ${error.type}: ${error.error}\n`).toString();
  return errorMessage;
}
