/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  BrowserBuilderOptions,
  BrowserBuilderTarget,
  ProjectType,
  WorkspaceProject,
} from '@schematics/angular/utility/workspace-models';

/**
 * Resolves the architect options for the build target of the given project.
 */
export function getProjectTargetOptions(project: WorkspaceProject<ProjectType.Application>): BrowserBuilderOptions {
  const targetsBuild = project.targets?.build as BrowserBuilderTarget | undefined;

  if (targetsBuild?.options !== undefined) {
    return targetsBuild.options as BrowserBuilderOptions;
  }

  const architectBuild = project.architect?.build as BrowserBuilderTarget | undefined;

  if (architectBuild?.options !== undefined) {
    return architectBuild.options as BrowserBuilderOptions;
  }

  throw new Error(`Cannot determine project target configuration for: build.`);
}
