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

  describe('datatable in template', () => {
    it(`should migrate the inline template name`, async () => {
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

      await runMigration();

      const content = tree.readContent('/comp.ts');

      expect(content).toContain('template: `<table adtDatatable [dtOptions]="dtOptions"></table>`');
    });

    it('should migrate multiple inline templates in the same file', async () => {
      writeFile(
        '/comp.ts',
        `
        import { Component } from '@angular/core';
        import { ADTSettings, DatatableDirective } from 'angular-datatables.net';

        @Component({
          imports: [DatatableDirective],
          template: \`<table datatable [dtOptions]="dtOptionsOfFirst"></table>\`,
        })
        class FirstComp {
          protected dtOptionsOfFirst: ADTSettings = { pagingType: 'simple' };
        }

        @Component({
          imports: [DatatableDirective],
          template: \`<table datatable [dtOptions]="dtOptionsOfSecond"></table>\`,
        })
        class SecondComp {
          protected dtOptionsOfSecond: ADTSettings = { pagingType: 'simple' };
        }
        `,
      );

      await runMigration();

      const content = tree.readContent('/comp.ts');

      expect(content).toContain('template: `<table adtDatatable [dtOptions]="dtOptionsOfFirst"></table>`');
      expect(content).toContain('template: `<table adtDatatable [dtOptions]="dtOptionsOfSecond"></table>`');
    });

    it('should migrate an external template', async () => {
      writeFile(
        '/comp.ts',
        `
        import { Component } from '@angular/core';
        import { ADTSettings, DatatableDirective } from 'angular-datatables.net';

        @Component({
          imports: [DatatableDirective],
          templateUrl: './comp.html',
        })
        class Comp {
          protected dtOptions: ADTSettings = { pagingType: 'simple' };
        }
        `,
      );
      writeFile('/comp.html', '<table datatable [dtOptions]="dtOptions"></table>');

      await runMigration();
      const content = tree.readContent('/comp.html');

      expect(content).toBe('<table adtDatatable [dtOptions]="dtOptions"></table>');
    });

    it('should migrate a template referenced by multiple components', async () => {
      writeFile(
        '/comp.ts',
        `
        import { Component } from '@angular/core';
        import { ADTSettings, DatatableDirective } from 'angular-datatables.net';

        @Component({
          imports: [DatatableDirective],
          templateUrl: './comp.html',
        })
        class Comp {
          protected dtOptions: ADTSettings = { pagingType: 'simple' };
        }
        `,
      );
      writeFile(
        '/other-comp.ts',
        `
        import { Component } from '@angular/core';
        import { ADTSettings, DatatableDirective } from 'angular-datatables.net';

        @Component({
          imports: [DatatableDirective],
          templateUrl: './comp.html',
        })
        class OtherComp {
          protected dtOptions: ADTSettings = { pagingType: 'simple' };
        }
        `,
      );
      writeFile('/comp.html', '<table datatable [dtOptions]="dtOptions"></table>');

      await runMigration();
      const content = tree.readContent('/comp.html');

      expect(content).toBe('<table adtDatatable [dtOptions]="dtOptions"></table>');
    });

    it('should migrate a nested class', async () => {
      writeFile(
        '/comp.ts',
        `
        import { Component } from '@angular/core';
        import { ADTSettings, DatatableDirective } from 'angular-datatables.net';

        function foo() {
          @Component({
            imports: [DatatableDirective],
            template: \`<table datatable [dtOptions]="dtOptions"></table>\`,
          })
          class Comp {
            protected dtOptions: ADTSettings = { pagingType: 'simple' };
          }
        }
        `,
      );

      await runMigration();

      const content = tree.readContent('/comp.ts');

      expect(content).toContain('template: `<table adtDatatable [dtOptions]="dtOptions"></table>`');
    });
  });

  describe('imports', () => {
    it('should rename the component import', async () => {
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

      await runMigration();

      const content = tree.readContent('/comp.ts');

      expect(content).toContain('imports: [AngularDatatable],');
    });

    it('should rename the file import', async () => {
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

      await runMigration();

      const content = tree.readContent('/comp.ts');

      expect(content).toContain("import { ADTSettings, AngularDatatable } from 'angular-datatables.net';");
    });
  });

  describe('viewChild', () => {
    it('should migrate viewChild', async () => {
      writeFile(
        '/comp.ts',
        `
        import { Component, viewChild } from '@angular/core';
        import { ADTSettings, DatatableDirective } from 'angular-datatables.net';

        @Component({
          imports: [DatatableDirective],
          template: \`<table datatable [dtOptions]="dtOptions"></table>\`,
        })
        class Comp {
          protected dtOptions: ADTSettings = { pagingType: 'simple' };

          private readonly dtInstance = viewChild(DatatableDirective);
        }
        `,
      );

      await runMigration();

      const content = tree.readContent('/comp.ts');

      expect(content).toContain('private readonly dtInstance = viewChild(AngularDatatable);');
    });

    it('should migrate viewChild.required', async () => {
      writeFile(
        '/comp.ts',
        `
        import { Component, viewChild } from '@angular/core';
        import { ADTSettings, DatatableDirective } from 'angular-datatables.net';

        @Component({
          imports: [DatatableDirective],
          template: \`<table datatable [dtOptions]="dtOptions"></table>\`,
        })
        class Comp {
          protected dtOptions: ADTSettings = { pagingType: 'simple' };

          private readonly dtInstance = viewChild.required(DatatableDirective);
        }
        `,
      );

      await runMigration();

      const content = tree.readContent('/comp.ts');

      expect(content).toContain('private readonly dtInstance = viewChild.required(AngularDatatable);');
    });

    it('should migrate viewChildren', async () => {
      writeFile(
        '/comp.ts',
        `
        import { Component, viewChildren } from '@angular/core';
        import { ADTSettings, DatatableDirective } from 'angular-datatables.net';

        @Component({
          imports: [DatatableDirective],
          template: \`<table datatable [dtOptions]="dtOptions"></table>\`,
        })
        class Comp {
          protected dtOptions: ADTSettings = { pagingType: 'simple' };

          private readonly dtInstance = viewChildren(DatatableDirective);
        }
        `,
      );

      await runMigration();

      const content = tree.readContent('/comp.ts');

      expect(content).toContain('private readonly dtInstance = viewChildren(AngularDatatable);');
    });

    it('should migrate ViewChild with question token', async () => {
      writeFile(
        '/comp.ts',
        `
        import { Component, ViewChild } from '@angular/core';
        import { ADTSettings, DatatableDirective } from 'angular-datatables.net';

        @Component({
          imports: [DatatableDirective],
          template: \`<table datatable [dtOptions]="dtOptions"></table>\`,
        })
        class Comp {
          protected dtOptions: ADTSettings = { pagingType: 'simple' };

          @ViewChild(DatatableDirective) private readonly dtInstance?: DatatableDirective;
        }
        `,
      );

      await runMigration();

      const content = tree.readContent('/comp.ts');

      expect(content).toContain('@ViewChild(AngularDatatable)\nprivate readonly dtInstance?: AngularDatatable;');
    });

    it('should migrate ViewChild with exclamation token', async () => {
      writeFile(
        '/comp.ts',
        `
        import { Component, ViewChild } from '@angular/core';
        import { ADTSettings, DatatableDirective } from 'angular-datatables.net';

        @Component({
          imports: [DatatableDirective],
          template: \`<table datatable [dtOptions]="dtOptions"></table>\`,
        })
        class Comp {
          protected dtOptions: ADTSettings = { pagingType: 'simple' };

          @ViewChild(DatatableDirective) private readonly dtInstance!: DatatableDirective;
        }
        `,
      );

      await runMigration();

      const content = tree.readContent('/comp.ts');

      expect(content).toContain('@ViewChild(AngularDatatable)\nprivate readonly dtInstance!: AngularDatatable;');
    });

    it('should migrate ViewChildren with exclamation token', async () => {
      writeFile(
        '/comp.ts',
        `
        import { Component, ViewChildren } from '@angular/core';
        import { ADTSettings, DatatableDirective } from 'angular-datatables.net';

        @Component({
          imports: [DatatableDirective],
          template: \`<table datatable [dtOptions]="dtOptions"></table>\`,
        })
        class Comp {
          protected dtOptions: ADTSettings = { pagingType: 'simple' };

          @ViewChildren(DatatableDirective) private readonly dtInstance!: DatatableDirective[];
        }
        `,
      );

      await runMigration();

      const content = tree.readContent('/comp.ts');

      expect(content).toContain('@ViewChildren(AngularDatatable)\nprivate readonly dtInstance!: AngularDatatable[];');
    });
  });
});
