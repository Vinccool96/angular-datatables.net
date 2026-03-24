/* eslint-disable @typescript-eslint/unbound-method */
/**
 * @license MIT
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import path from 'node:path';
import ts from 'typescript';

/**
 * Parses the config
 * @param tsconfigPath The path of the config file
 * @param basePath The base path
 * @returns The parsed config
 */
export function parseTsconfigFile(tsconfigPath: string, basePath: string): ts.ParsedCommandLine {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { config } = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  const parseConfigHost = {
    fileExists: ts.sys.fileExists,
    readDirectory: ts.sys.readDirectory,
    readFile: ts.sys.readFile,
    useCaseSensitiveFileNames: ts.sys.useCaseSensitiveFileNames,
  };

  // Throw if incorrect arguments are passed to this function. Passing relative base paths
  // results in root directories not being resolved and in later type checking runtime errors.
  // More details can be found here: https://github.com/microsoft/TypeScript/issues/37731.
  if (!path.isAbsolute(basePath)) {
    throw new Error('Unexpected relative base path has been specified.');
  }

  return ts.parseJsonConfigFileContent(config, parseConfigHost, basePath, {});
}
