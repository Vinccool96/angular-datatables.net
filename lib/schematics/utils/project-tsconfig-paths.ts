/**
 * @license MIT
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { json, normalize, virtualFs, workspaces } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';

/**
 * Gets all tsconfig paths from a CLI project by reading the workspace configuration and looking for common tsconfig
 * locations.
 * @param tree the file tree
 * @returns The config paths
 */
export async function getProjectTsConfigPaths(tree: Tree): Promise<{ buildPaths: string[]; testPaths: string[] }> {
  // Start with some tsconfig paths that are generally used within CLI projects. Note
  // that we are not interested in IDE-specific tsconfig files (e.g. /tsconfig.json)
  const buildPaths = new Set<string>();
  const testPaths = new Set<string>();

  const workspace = await getWorkspace(tree);
  for (const [, project] of workspace.projects) {
    for (const [name, target] of project.targets) {
      if (name !== 'build' && name !== 'test') {
        continue;
      }

      for (const [, options] of allTargetOptions(target)) {
        const tsConfig = options['tsConfig'];
        // Filter out tsconfig files that don't exist in the CLI project.
        if (typeof tsConfig !== 'string' || !tree.exists(tsConfig)) {
          continue;
        }

        if (name === 'build') {
          buildPaths.add(normalize(tsConfig));
        } else {
          testPaths.add(normalize(tsConfig));
        }
      }
    }
  }

  return {
    buildPaths: [...buildPaths],
    testPaths: [...testPaths],
  };
}

/**
 * Get options for all configurations for the passed builder target.
 * @param target The target
 * @yields {[string | undefined, Record<string, json.JsonValue | undefined>]} The options
 */
function* allTargetOptions(
  target: workspaces.TargetDefinition,
): Iterable<[string | undefined, Record<string, json.JsonValue | undefined>]> {
  if (target.options !== undefined) {
    yield [undefined, target.options];
  }

  if (target.configurations === undefined) {
    return;
  }

  for (const [name, options] of Object.entries(target.configurations)) {
    if (options !== undefined) {
      yield [name, options];
    }
  }
}

/**
 * Creates the host
 * @param tree The file tree
 * @returns The workspace host
 */
function createHost(tree: Tree): workspaces.WorkspaceHost {
  return {
    isDirectory: function (path: string): Promise<boolean> {
      // Approximate a directory check.
      // We don't need to consider empty directories and hence this is a good enough approach.
      // This is also per documentation, see:
      // https://angular.dev/tools/cli/schematics-for-libraries#get-the-project-configuration
      return Promise.resolve(!tree.exists(path) && tree.getDir(path).subfiles.length > 0);
    },
    isFile: function (path: string): Promise<boolean> {
      return Promise.resolve(tree.exists(path));
    },
    readFile: function (path: string): Promise<string> {
      const data = tree.read(path) as unknown as virtualFs.FileBuffer | undefined;
      if (data === undefined) {
        throw new Error('File not found.');
      }

      return Promise.resolve(virtualFs.fileBufferToString(data));
    },
    writeFile: function (path: string, data: string): Promise<void> {
      tree.overwrite(path, data);
      return Promise.resolve();
    },
  };
}

/**
 * Returns the current workspace
 * @param tree The file tree
 * @returns The definition
 */
async function getWorkspace(tree: Tree): Promise<workspaces.WorkspaceDefinition> {
  const host = createHost(tree);
  const { workspace } = await workspaces.readWorkspace('/', host);

  return workspace;
}
