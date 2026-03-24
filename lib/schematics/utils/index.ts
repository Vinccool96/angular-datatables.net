/**
 * @license MIT
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Tree } from '@angular-devkit/schematics';
import { JsonObject, PackageJson } from 'type-fest';

/**
 * Determines if the asset should be added to angular.json
 * @param host The file host
 * @param assetType The type of asset
 * @param assetPath The path of the asset
 * @returns If the asset should be added to angular.json
 */
export function addAssetToAngularJson(host: Tree, assetType: string, assetPath: string): boolean {
  const sourceText = (host.read('angular.json') as Buffer).toString('utf8');
  const json = JSON.parse(sourceText) as JsonObject | null;

  if (json === null) {
    return false;
  }

  const projectName = Object.keys(json['projects'] as JsonObject)[0];
  const projectObject = (json['projects'] as JsonObject)[projectName] as JsonObject;
  const targets = projectObject['targets'] ?? projectObject['architect'];

  const targetLocation: string[] = (
    ((targets as JsonObject)['build'] as JsonObject)['options'] as Record<string, string[]>
  )[assetType];

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
 * @param host The file host
 * @param thePackage The package to add
 * @param version The version of the package to add
 * @param isDevelopmentDependency If it's a dev dependency
 * @returns If the package should be added
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

/**
 * Sorts the object by keys in another object
 * @param object The object that should have its keys sorted
 * @returns A new object
 */
function sortObjectByKeys(object: Partial<Record<string, string>>): Partial<Record<string, string>> {
  const result: Partial<Record<string, string>> = {};

  for (const key of Object.keys(object).toSorted()) {
    result[key] = object[key];
  }

  return result;
}
