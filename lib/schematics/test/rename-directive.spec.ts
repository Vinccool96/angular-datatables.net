import { normalize, virtualFs } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import path from 'node:path';

describe('rename-directive migration', () => {
  let runner: SchematicTestRunner;
  let host: TempScopedNodeJsSyncHost;
  let tree: UnitTestTree;
  // eslint-disable-next-line unicorn/prefer-module
  const collectionPath = path.join(path.dirname(__filename), '../migrations.json');

  /**
   * Write the content to the path
   * @param filePath The path
   * @param contents The content
   */
  function writeFile(filePath: string, contents: string): void {
    host.sync.write(normalize(filePath), virtualFs.stringToFileBuffer(contents));
  }

  beforeEach(() => {
    runner = new SchematicTestRunner('schematics', collectionPath);
    host = new TempScopedNodeJsSyncHost();
    tree = new UnitTestTree(new HostTree(host));

    writeFile('/tsconfig.json', '{}');
    writeFile(
      '/angular.json',
      JSON.stringify({
        projects: { t: { architect: { build: { options: { tsConfig: './tsconfig.json' } } }, root: '' } },
        version: 1,
      }),
    );
  });

  it(`should change wizardModule to mageModule`, async () => {
    const newTree = await runner.runSchematic('rename-directive', {}, tree);
  });
});
