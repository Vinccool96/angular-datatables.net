/**
 * @license MIT
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/vinccool96/angular-datatables.net/master/LICENSE
 */

import {
  Directive,
  ElementRef,
  inject,
  input,
  model,
  OnDestroy,
  OnInit,
  PipeTransform,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { Api } from 'datatables.net';
import { Subject } from 'rxjs';

import { ADTColumns, ADTSettings, ADTTemplateRef } from './models/settings';

@Directive({
  selector: '[adtDatatable]',
})
export class AngularDataTable implements OnDestroy, OnInit {
  /**
   * The DataTable instance built by the jQuery library [DataTables](datatables.net).
   *
   * It's possible to execute the [DataTables APIs](https://datatables.net/reference/api/) with this variable.
   */
  public dtInstance!: Promise<Api>;

  /**
   * The DataTable option you pass to configure your table.
   */
  public readonly dtOptions = model<ADTSettings>({});

  /**
   * This trigger is used if one wants to trigger manually the DT rendering. Useful when rendering angular rendered DOM.
   */
  public readonly dtTrigger = input<Subject<ADTSettings> | Subject<ADTSettings | null>>();

  // Only used for destroying the table when destroying this directive
  private dt: Api | undefined;

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly vcr = inject(ViewContainerRef);

  public ngOnDestroy(): void {
    this.dtTrigger()?.unsubscribe();

    this.dt?.destroy(true);
  }

  public ngOnInit(): void {
    const trigger = this.dtTrigger();

    if (trigger === undefined) {
      this.displayTable(null);
    } else {
      trigger.subscribe((options) => {
        this.displayTable(options);
      });
    }
  }

  private applyNgPipeTransform(row: Node, columns: ADTColumns[]): void {
    // Filter columns with pipe declared
    const colsWithPipe = columns.filter((x) => x.ngPipeInstance !== undefined && x.ngTemplateRef === undefined);

    for (const element of colsWithPipe) {
      const pipe = element.ngPipeInstance as PipeTransform;
      const pipeArguments = element.ngPipeArgs ?? [];
      // find index of column using `data` attr
      const index = columns.filter((c) => c.visible !== false).findIndex((event) => event.id === element.id);
      // get <td> element which holds data using index
      const rowFromCol = row.childNodes.item(index);
      // Transform data with Pipe and PipeArgs
      const rowValue = $(rowFromCol).text();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const rowValueAfter = pipe.transform(rowValue, ...pipeArguments) as string;
      // Apply transformed string to <td>
      $(rowFromCol).text(rowValueAfter);
    }
  }

  private applyNgRefTemplate(row: Node, columns: ADTColumns[], data: object): void {
    // Filter columns using `ngTemplateRef`
    const colsWithTemplate = columns.filter((x) => x.ngTemplateRef !== undefined && x.ngPipeInstance === undefined);

    for (const element of colsWithTemplate) {
      const { context, ref } = element.ngTemplateRef as ADTTemplateRef;
      // get <td> element which holds data using index
      const index = columns.filter((c) => c.visible !== false).findIndex((column) => column.id === element.id);
      const cellFromIndex = row.childNodes.item(index);
      // reset cell before applying transform
      $(cellFromIndex).html('');
      // render onto DOM
      // finalize context to be sent to user
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const _context = Object.assign({}, context, context?.userData, {
        adtData: data,
      });
      const instance = this.vcr.createEmbeddedView(ref, _context);
      this.renderer.appendChild(cellFromIndex, instance.rootNodes[0]);
    }
  }

  private displayTable(dtOptions: ADTSettings | null): void {
    // assign new options if provided
    if (dtOptions !== null) {
      this.dtOptions.set(dtOptions);
    }

    this.dtInstance = new Promise((resolve, reject) => {
      void Promise.resolve(this.dtOptions()).then((resolvedDTOptions) => {
        // validate object
        const isTableEmpty =
          Object.keys(resolvedDTOptions).length === 0 && $('tbody tr', this.el.nativeElement).length === 0;

        if (isTableEmpty) {
          reject(new Error('Both the table and dtOptions cannot be empty'));
          return;
        }

        // Set a column unique
        if (resolvedDTOptions.columns !== undefined) {
          for (const col of resolvedDTOptions.columns) {
            if ((col.id ?? '').trim() === '') {
              col.id = this.getColumnUniqueId();
            }
          }
        }

        // Using setTimeout as a "hack" to be "part" of NgZone
        setTimeout(() => {
          // Assign DT properties here
          let options: ADTSettings = {
            rowCallback: (row, data, index) => {
              if (resolvedDTOptions.columns !== undefined) {
                const columns = resolvedDTOptions.columns;
                this.applyNgPipeTransform(row, columns);
                this.applyNgRefTemplate(row, columns, data);
              }

              // run user specified row callback if provided.
              if (resolvedDTOptions.rowCallback !== undefined) {
                // @ts-expect-error It's normal
                resolvedDTOptions.rowCallback(row, data, index);
              }
            },
          };
          // merge user's config with ours
          options = Object.assign({}, resolvedDTOptions, options);
          this.dt = $(this.el.nativeElement).DataTable(options);
          resolve(this.dt);
        });
      });
    });
  }

  private getColumnUniqueId(): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let index = 0; index < 6; index++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result.trim();
  }
}
