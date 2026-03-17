import { Component, inject, OnInit } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';
import { firstValueFrom } from 'rxjs';

import { LoadDtOptionsWithPromiseOptionsService } from './services/load-dt-options-with-promise-options.service';
import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';

@Component({
  selector: 'app-load-dt-options-with-promise',
  imports: [BaseDemoComponent, DataTableDirective],
  templateUrl: './load-dt-options-with-promise.component.html',
  styleUrl: './load-dt-options-with-promise.component.css',
})
export class LoadDtOptionsWithPromiseComponent implements OnInit {
  readonly pageTitle = 'Load DT Options with Promise';
  readonly mdIntro = 'docs/advanced/load-dt-opt-with-promise/intro.md';
  readonly mdHTML = 'docs/advanced/load-dt-opt-with-promise/source-html.md';
  readonly mdTS = 'docs/advanced/load-dt-opt-with-promise/source-ts.md';
  readonly mdTSV1 = 'docs/advanced/load-dt-opt-with-promise/source-ts-dtv1.md';

  dtOptions!: Promise<ADTSettings>;

  private readonly optionsService = inject(LoadDtOptionsWithPromiseOptionsService);

  ngOnInit(): void {
    this.dtOptions = firstValueFrom(this.optionsService.obtainOptions())
      .then((v) => v)
      .catch((error: unknown) => this.handleError(error as Error));
  }

  private handleError(error: Error) {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject<ADTSettings>(error);
  }
}
