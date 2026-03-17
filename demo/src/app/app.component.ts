import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import DataTable from 'datatables.net';
import { filter, Subject, takeUntil } from 'rxjs';

import { DtVersionService } from './shared/services/dt-version.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  dtVersion: 'v2' | 'v1' = 'v2';

  private readonly router = inject(Router);
  private readonly dtVersionService = inject(DtVersionService);

  protected readonly destroy$ = new Subject<void>();

  constructor() {
    this.dtVersion = this.dtVersionService.dtVersion;
  }

  ngOnInit() {
    DataTable.ext.errMode = 'none';
    $('.button-collapse').sideNav({
      closeOnClick: true,
    });

    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe((_) => {
        // Note: setTimeout is needed to let DOM render tabs
        setTimeout(() => {
          $('ul.tabs').tabs();
        }, 600);
      });

    $('.dt-version-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: true, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 14,
      belowOrigin: true,
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: true, // Stops event propagation
    } as Partial<M.DropdownOptions>);
  }

  onDTVersionChanged(v: 'v2' | 'v1') {
    this.dtVersion = v;
    this.dtVersionService.versionChanged$.next(v);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
