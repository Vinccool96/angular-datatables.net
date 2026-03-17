/**
 * @license MIT
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { BrowserBuilderOptions, WorkspaceProject } from '@schematics/angular/utility/workspace-models';

/**
 * Resolves the architect options for the build target of the given project.
 * @param project The project
 * @returns The options
 */
export function getProjectTargetOptions(project: WorkspaceProject): BrowserBuilderOptions {
  const targetsBuild = project.targets?.build;

  if (targetsBuild?.options !== undefined) {
    return targetsBuild.options;
  }

  const architectBuild = project.architect?.build;

  if (architectBuild?.options !== undefined) {
    return architectBuild.options;
  }

  throw new Error(`Cannot determine project target configuration for: build.`);
}
