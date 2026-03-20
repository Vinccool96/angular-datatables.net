import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import DataTable from 'datatables.net';
import { filter, Subject, takeUntil } from 'rxjs';

import { DtVersionOrchestrator } from './shared/services/dt-version-orchestrator';

@Component({
  imports: [RouterOutlet, FormsModule, RouterLink],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnDestroy, OnInit {
  protected readonly destroy$ = new Subject<void>();

  protected dtVersion: 'v1' | 'v2' = 'v2';
  private readonly dtVersionOrchestrator = inject(DtVersionOrchestrator);

  private readonly router = inject(Router);

  public constructor() {
    this.dtVersion = this.dtVersionOrchestrator.dtVersion;
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
    this.dtVersionOrchestrator.versionChanged$.next(v);
  }
}
