import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

import { IADTSchematicsOptions } from './models/schematics-options';
import { ADT_SUPPORTED_STYLES, ADTStyleOptions } from './models/style-options';
import { addAssetToAngularJson, addPackageToPackageJson } from './utils';

/**
 * Add the settings to angular
 * @param options The options
 * @returns The rules
 */
export default function add(options: IADTSchematicsOptions): Rule {
  return chain([addPackageJsonDependencies(options), installPackageJsonDependencies(), updateAngularJsonFile(options)]);
}

/**
 * Adds the package to the dependencies
 * @param options The options
 * @returns The rule that add to the dependencies
 */
function addPackageJsonDependencies(options: IADTSchematicsOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    // Update package.json
    const styleDeps = ADT_SUPPORTED_STYLES.find((element) => element.style === options.style);

    const dependencies = [
      { isDev: false, name: 'jquery', version: '^3.6.0' },
      {
        fancyName: 'datatables.net (v2)',
        isDev: false,
        name: 'datatables.net',
        version: '^2.0.3',
      },
      { isDev: true, name: '@types/jquery', version: '^3.5.9' },
    ];

    if (styleDeps !== undefined) {
      if (styleDeps.style !== ADTStyleOptions.DT) {
        context.logger.log(
          'warn',
          'Your project needs Bootstrap CSS installed and configured for changes to take affect.',
        );
      }

      for (const element of styleDeps.packageJson) {
        dependencies.push(element);
      }
    }

    for (const dependency of dependencies) {
      const result = addPackageToPackageJson(tree, dependency.name, dependency.version, dependency.isDev);
      if (result) {
        context.logger.log(
          'info',
          `✅️ Added "${dependency.fancyName ?? dependency.name}" into "${dependency.isDev ? 'devDependencies' : 'dependencies'}"`,
        );
      } else {
        context.logger.log('info', `ℹ️  Skipped adding "${dependency.name}" into package.json`);
      }
    }
    return tree;
  };
}

const install = (host: Tree, context: SchematicContext): Tree => {
  context.addTask(new NodePackageInstallTask());
  context.logger.log('info', `🔍 Installing packages...`);

  return host;
};

/**
 * Installs the dependencies
 * @returns The rule that install the dependencies
 */
function installPackageJsonDependencies(): Rule {
  return install;
}

/**
 * Updates the angular.json file.
 * @param options The current options
 * @returns The rule that updates the angular.json file
 */
function updateAngularJsonFile(options: IADTSchematicsOptions): Rule {
  return (tree: Tree, context: SchematicContext): void => {
    const styleDeps = ADT_SUPPORTED_STYLES.find((element) => element.style === options.style);

    const assets = [
      {
        fancyName: 'jQuery Core',
        path: 'node_modules/jquery/dist/jquery.min.js',
        target: 'scripts',
      },
      {
        fancyName: 'DataTables.net Core JS',
        path: 'node_modules/datatables.net/js/dataTables.min.js',
        target: 'scripts',
      },
    ];

    if (styleDeps !== undefined) {
      for (const element of styleDeps.angularJson) {
        assets.push(element);
      }
    }

    for (const asset of assets) {
      const result = addAssetToAngularJson(tree, asset.target, asset.path);
      if (result) {
        context.logger.log('info', `✅️ Added "${asset.fancyName}" into angular.json`);
      } else {
        context.logger.log('info', `ℹ️  Skipped adding "${asset.fancyName}" into angular.json`);
      }
    }
  };
}
