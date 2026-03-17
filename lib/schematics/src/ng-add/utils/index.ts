/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Tree } from '@angular-devkit/schematics';
import { JsonObject, PackageJson } from 'type-fest';

export function addAssetToAngularJson(host: Tree, assetType: string, assetPath: string): boolean {
  const sourceText = (host.read('angular.json') as Buffer).toString('utf8');
  const json = JSON.parse(sourceText) as JsonObject | null;

  if (json === null) {
    return false;
  }

  const projectName = Object.keys(json['projects'] as JsonObject)[0];
  const projectObject = (json.projects as JsonObject)[projectName] as JsonObject;
  const targets = projectObject.targets ?? projectObject.architect;

  const targetLocation: string[] = (((targets as JsonObject).build as JsonObject).options as Record<string, string[]>)[
    assetType
  ];

  // update UI that `assetPath` wasn't re-added to angular.json
  if (targetLocation.includes(assetPath)) {
    return false;
  }

  targetLocation.push(assetPath);

  host.overwrite('angular.json', JSON.stringify(json, undefined, 2));

  return true;
}

/**
 * This function has been borrowed from:
 * https://github.com/valor-software/ngx-bootstrap/tree/development/schematics/src/utils/index.ts
 *
 * Note: This function accepts an additional parameter `isDevDependency` so we
 * can place a given dependency in the correct dependencies array inside package.json
 */
export function addPackageToPackageJson(
  host: Tree,
  thePackage: string,
  version: string,
  isDevelopmentDependency = false,
): boolean {
  if (host.exists('package.json')) {
    const sourceText = (host.read('package.json') as Buffer).toString('utf8');
    const json = JSON.parse(sourceText) as PackageJson;

    if (json.dependencies === undefined) {
      json.dependencies = {};
    }

    if (json.devDependencies === undefined) {
      json.devDependencies = {};
    }

    // update UI that `pkg` wasn't re-added to package.json
    if (json.dependencies[thePackage] !== undefined || json.devDependencies[thePackage] !== undefined) {
      return false;
    }

    if (!isDevelopmentDependency) {
      json.dependencies[thePackage] = version;
      json.dependencies = sortObjectByKeys(json.dependencies);
    }

    if (isDevelopmentDependency) {
      json.devDependencies[thePackage] = version;
      json.devDependencies = sortObjectByKeys(json.devDependencies);
    }

    host.overwrite('package.json', JSON.stringify(json, undefined, 2));
    return true;
  }

  return false;
}

function sortObjectByKeys(object: Partial<Record<string, string>>): Partial<Record<string, string>> {
  const result: Partial<Record<string, string>> = {};

  // eslint-disable-next-line unicorn/no-array-sort
  for (const key of Object.keys(object).sort()) {
    result[key] = object[key];
  }

  return result;
}
