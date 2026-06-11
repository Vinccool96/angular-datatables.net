import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatExpansionPanel, MatExpansionPanelHeader } from '@angular/material/expansion';
import { MatFormField } from '@angular/material/input';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatOption, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { RouterLink, RouterOutlet } from '@angular/router';
import DataTable from 'datatables.net';
import { Subject } from 'rxjs';

import { DtVersionOrchestrator } from './shared/services/dt-version-orchestrator';

@Component({
  imports: [
    RouterOutlet,
    FormsModule,
    RouterLink,
    MatFormField,
    MatSelect,
    MatSelectTrigger,
    MatOption,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatNavList,
    MatListItem,
    MatExpansionPanel,
    MatExpansionPanelHeader,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnDestroy, OnInit {
  protected readonly destroy$ = new Subject<void>();

  protected dtVersion = signal<'v1' | 'v2'>('v2');
  private readonly dtVersionOrchestrator = inject(DtVersionOrchestrator);

  public constructor() {
    this.dtVersion.set(this.dtVersionOrchestrator.dtVersion);
    toObservable(this.dtVersion).subscribe((version) => {
      this.dtVersionOrchestrator.versionChanged$.next(version);
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public ngOnInit(): void {
    DataTable.ext.errMode = 'none';
  }
}
