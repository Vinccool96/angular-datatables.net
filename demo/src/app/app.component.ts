import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import DataTable from 'datatables.net';
import { filter, Subject, takeUntil } from 'rxjs';

import { DtVersionService } from './shared/services/dt-version.service';

@Component({
  imports: [RouterOutlet, FormsModule, RouterLink],
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy, OnInit {
  protected readonly destroy$ = new Subject<void>();

  protected dtVersion: 'v1' | 'v2' = 'v2';
  private readonly dtVersionService = inject(DtVersionService);

  private readonly router = inject(Router);

  public constructor() {
    this.dtVersion = this.dtVersionService.dtVersion;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public ngOnInit(): void {
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
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      belowOrigin: true,
      constrainWidth: true, // Does not change width of dropdown to that of the activator
      gutter: 14,
      hover: false, // Activate on hover
      inDuration: 300,
      outDuration: 225,
      stopPropagation: true, // Stops event propagation
    } as Partial<M.DropdownOptions>);
  }

  protected onDTVersionChanged(v: 'v1' | 'v2'): void {
    this.dtVersion = v;
    this.dtVersionService.versionChanged$.next(v);
  }
}
