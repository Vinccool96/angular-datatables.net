import { Tree } from '@angular-devkit/schematics';

/**
 * Returns the file content
 * @param tree The current file tree
 * @param path The required path
 * @returns The file content
 */
// https://github.com/angular/angular-cli/blob/16.1.x/packages/schematics/angular/utility/test/get-file-content.ts
export function getFileContent(tree: Tree, path: string): string {
  const fileEntry = tree.get(path);

  if (fileEntry === null) {
    throw new Error(`The file (${path}) does not exist.`);
  }

  return fileEntry.content.toString();
}
