import { getSystemPath, normalize, virtualFs } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { rmSync } from 'node:fs';
import path from 'node:path';
import { PackageJson } from 'type-fest';

import { ADTStyleOptions } from '../ng-add/models/style-options';
import { AngularJson } from './utils/angular-json';

// eslint-disable-next-line @typescript-eslint/no-require-imports,unicorn/prefer-module
const packageJSON = require('../../package.json') as PackageJson;
const adtVersion = packageJSON.version;

describe('ng-add', () => {
  let runner: SchematicTestRunner;
  let host: TempScopedNodeJsSyncHost;
  let tree: UnitTestTree;
  // eslint-disable-next-line unicorn/prefer-module
  const collectionPath = path.join(path.dirname(__filename), '../collection.json');
  let temporaryDirPath: string;
  let previousWorkingDir: string;

  /**
   * Write the content to the path
   * @param filePath The path
   * @param contents The content
   */
  function writeFile(filePath: string, contents: string): void {
    host.sync.write(normalize(filePath), virtualFs.stringToFileBuffer(contents));
  }

  /**
   * Runs the migration and returns the tree after it has been run.
   * @param style The style of the libraries added.
   * @param project The project to add the libraries to.
   * @returns The resulting tree
   */
  async function runMigration(style?: ADTStyleOptions, project?: string): Promise<UnitTestTree> {
    return await runner.runSchematic('ng-add', { project: project, style: style }, tree);
  }

  beforeEach(() => {
    runner = new SchematicTestRunner('schematics', collectionPath);
    host = new TempScopedNodeJsSyncHost();
    tree = new UnitTestTree(new HostTree(host));

    writeFile('/tsconfig.json', '{}');
    writeFile(
      '/angular.json',
      JSON.stringify({
        projects: {
          foo: {
            architect: { build: { options: { tsConfig: './tsconfig.json' } } },
            prefix: 'app',
            projectType: 'application',
            root: '',
            sourceRoot: 'src',
          },
        },
        version: 1,
      }),
    );
    writeFile(
      '/package.json',
      JSON.stringify({
        dependencies: {},
      }),
    );

    previousWorkingDir = process.cwd();
    temporaryDirPath = getSystemPath(host.root);

    // Switch into the temporary directory path. This allows us to run
    // the schematic against our custom unit test tree.
    process.chdir(temporaryDirPath);
  });

  afterEach(() => {
    process.chdir(previousWorkingDir);
    rmSync(temporaryDirPath, { recursive: true });
  });

  describe('package.json', () => {
    it('should add the libraries with default style DT', async () => {
      await runMigration();

      const content = JSON.parse(tree.readContent('/package.json')) as PackageJson;

      expect(content.dependencies).toEqual({
        'angular-datatables.net': adtVersion,
        'datatables.net': '^2.0.3',
        'datatables.net-dt': '^2.0.3',
        'jquery': '^3.6.0',
      });
      expect(content.devDependencies).toEqual({
        '@types/jquery': '^3.5.9',
      });
    });

    it('should add the libraries with DT style', async () => {
      await runMigration(ADTStyleOptions.DT);

      const content = JSON.parse(tree.readContent('/package.json')) as PackageJson;

      expect(content.dependencies).toEqual({
        'angular-datatables.net': adtVersion,
        'datatables.net': '^2.0.3',
        'datatables.net-dt': '^2.0.3',
        'jquery': '^3.6.0',
      });
      expect(content.devDependencies).toEqual({
        '@types/jquery': '^3.5.9',
      });
    });

    it('should add the libraries with BS5 style', async () => {
      await runMigration(ADTStyleOptions.BS5);

      const content = JSON.parse(tree.readContent('/package.json')) as PackageJson;

      expect(content.dependencies).toEqual({
        'angular-datatables.net': adtVersion,
        'datatables.net': '^2.0.3',
        'datatables.net-bs5': '^2.0.3',
        'jquery': '^3.6.0',
      });
      expect(content.devDependencies).toEqual({
        '@types/jquery': '^3.5.9',
      });
    });

    it('should add the libraries with BS4 style', async () => {
      await runMigration(ADTStyleOptions.BS4);

      const content = JSON.parse(tree.readContent('/package.json')) as PackageJson;

      expect(content.dependencies).toEqual({
        'angular-datatables.net': adtVersion,
        'datatables.net': '^2.0.3',
        'datatables.net-bs4': '^2.0.3',
        'jquery': '^3.6.0',
      });
      expect(content.devDependencies).toEqual({
        '@types/jquery': '^3.5.9',
      });
    });

    it('should add the libraries with BS3 style', async () => {
      await runMigration(ADTStyleOptions.BS3);

      const content = JSON.parse(tree.readContent('/package.json')) as PackageJson;

      expect(content.dependencies).toEqual({
        'angular-datatables.net': adtVersion,
        'datatables.net': '^2.0.3',
        'datatables.net-bs': '^2.0.3',
        'jquery': '^3.6.0',
      });
      expect(content.devDependencies).toEqual({
        '@types/jquery': '^3.5.9',
      });
    });
  });

  describe('angular.json', () => {
    it('should add the scripts and assets with default style DT', async () => {
      await runMigration();

      const content = JSON.parse(tree.readContent('/angular.json')) as AngularJson;

      expect(content.projects['foo']?.architect?.build.options?.scripts).toEqual([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/datatables.net/js/dataTables.min.js',
      ]);
      expect(content.projects['foo']?.architect?.build.options?.styles).toEqual([
        'node_modules/datatables.net-dt/css/jquery.dataTables.min.css',
      ]);
    });

    it('should add the scripts and assets with DT style', async () => {
      await runMigration(ADTStyleOptions.DT);

      const content = JSON.parse(tree.readContent('/angular.json')) as AngularJson;

      expect(content.projects['foo']?.architect?.build.options?.scripts).toEqual([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/datatables.net/js/dataTables.min.js',
      ]);
      expect(content.projects['foo']?.architect?.build.options?.styles).toEqual([
        'node_modules/datatables.net-dt/css/jquery.dataTables.min.css',
      ]);
    });

    it('should add the scripts and assets with BS5 style', async () => {
      await runMigration(ADTStyleOptions.BS5);

      const content = JSON.parse(tree.readContent('/angular.json')) as AngularJson;

      expect(content.projects['foo']?.architect?.build.options?.scripts).toEqual([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/datatables.net/js/dataTables.min.js',
        'node_modules/datatables.net-bs5/js/dataTables.bootstrap5.min.js',
      ]);
      expect(content.projects['foo']?.architect?.build.options?.styles).toEqual([
        'node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css',
      ]);
    });

    it('should add the scripts and assets with BS4 style', async () => {
      await runMigration(ADTStyleOptions.BS4);

      const content = JSON.parse(tree.readContent('/angular.json')) as AngularJson;

      expect(content.projects['foo']?.architect?.build.options?.scripts).toEqual([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/datatables.net/js/dataTables.min.js',
        'node_modules/datatables.net-bs4/js/dataTables.bootstrap4.min.js',
      ]);
      expect(content.projects['foo']?.architect?.build.options?.styles).toEqual([
        'node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css',
      ]);
    });

    it('should add the scripts and assets with BS3 style', async () => {
      await runMigration(ADTStyleOptions.BS3);

      const content = JSON.parse(tree.readContent('/angular.json')) as AngularJson;

      expect(content.projects['foo']?.architect?.build.options?.scripts).toEqual([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/datatables.net/js/dataTables.min.js',
        'node_modules/datatables.net-bs/js/dataTables.bootstrap.min.js',
      ]);
      expect(content.projects['foo']?.architect?.build.options?.styles).toEqual([
        'node_modules/datatables.net-bs/css/dataTables.bootstrap.min.css',
      ]);
    });
  });
});
