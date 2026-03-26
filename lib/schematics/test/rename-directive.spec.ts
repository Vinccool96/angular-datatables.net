import { getSystemPath, logging, normalize, virtualFs } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { rmSync } from 'node:fs';
import path from 'node:path';

describe('rename-directive migration', () => {
  let runner: SchematicTestRunner;
  let host: TempScopedNodeJsSyncHost;
  let tree: UnitTestTree;
  // eslint-disable-next-line unicorn/prefer-module
  const collectionPath = path.join(path.dirname(__filename), '../migrations.json');
  let temporaryDirPath: string;
  let previousWorkingDir: string;
  let errorOutput: string[] = [];
  let warnOutput: string[] = [];

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
   * @param path The path of the migration.
   * @param format If the files should be formated or not.
   * @returns The resulting tree
   */
  async function runMigration(path?: string, format = true): Promise<UnitTestTree> {
    return await runner.runSchematic('rename-directive', { format: format, path: path }, tree);
  }

  beforeEach(() => {
    runner = new SchematicTestRunner('schematics', collectionPath);
    host = new TempScopedNodeJsSyncHost();
    tree = new UnitTestTree(new HostTree(host));

    errorOutput = [];
    warnOutput = [];
    runner.logger.subscribe((entry: logging.LogEntry) => {
      if (entry.level === 'error') {
        errorOutput.push(entry.message);
      } else if (entry.level === 'warn') {
        warnOutput.push(entry.message);
      }
    });

    writeFile('/tsconfig.json', '{}');
    writeFile(
      '/angular.json',
      JSON.stringify({
        projects: { t: { architect: { build: { options: { tsConfig: './tsconfig.json' } } }, root: '' } },
        version: 1,
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

  describe('inline template', () => {

    beforeEach(() => {
      writeFile(
        '/comp.ts',
        `
        import { Component } from '@angular/core';
        import { ADTSettings, DatatableDirective } from 'angular-datatables.net';

        @Component({
          imports: [DatatableDirective],
          template: \`<table datatable [dtOptions]="dtOptions"></table>\`,
        })
        class Comp {
          protected dtOptions: ADTSettings = { pagingType: 'simple' };
        }
      `,
      );
    });

    it(`should migrate the inline template name`, async () => {
      await runMigration();

      const content = tree.readContent('/comp.ts');

      expect(content).toContain('template: `<table adtDatatable [dtOptions]="dtOptions"></table>`');
    });

    it('should rename the component import', async () => {
      await runMigration();

      const content = tree.readContent('/comp.ts');

      expect(content).toContain('imports: [AngularDataTable],');
    });

    it('should rename the file import', async () => {
      await runMigration();

      const content = tree.readContent('/comp.ts');

      expect(content).toContain("import { ADTSettings, AngularDataTable } from 'angular-datatables.net';");
    });
  });
});
