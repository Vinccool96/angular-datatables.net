import { Component, inject, OnInit } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';
import { firstValueFrom } from 'rxjs';

import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';
import { LoadDtOptionsWithPromiseOptionsService } from './services/load-dt-options-with-promise-options.service';

@Component({
  imports: [BaseDemoComponent, DataTableDirective],
  selector: 'app-load-dt-options-with-promise',
  styleUrl: './load-dt-options-with-promise.component.css',
  templateUrl: './load-dt-options-with-promise.component.html',
})
export class LoadDtOptionsWithPromiseComponent implements OnInit {
  public readonly pageTitle = 'Load DT Options with Promise';
  protected dtOptions!: Promise<ADTSettings>;
  protected readonly mdHTML = 'docs/advanced/load-dt-opt-with-promise/source-html.md';
  protected readonly mdIntro = 'docs/advanced/load-dt-opt-with-promise/intro.md';
  protected readonly mdTS = 'docs/advanced/load-dt-opt-with-promise/source-ts.md';
  protected readonly mdTSV1 = 'docs/advanced/load-dt-opt-with-promise/source-ts-dtv1.md';

  private readonly optionsService = inject(LoadDtOptionsWithPromiseOptionsService);

  public ngOnInit(): void {
    this.dtOptions = firstValueFrom(this.optionsService.obtainOptions())
      .then((v) => v)
      .catch((error: unknown) => this.handleError(error as Error));
  }

  private handleError(error: Error): Promise<ADTSettings> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject<ADTSettings>(error);
  }
}
