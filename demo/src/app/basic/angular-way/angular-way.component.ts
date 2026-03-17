import { AfterViewInit, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';
import { Subject } from 'rxjs';

import { Person } from '../../person/models/person';
import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';
import { AngularWayDataService } from './services/angular-way-data.service';

@Component({
  selector: 'app-angular-way',
  imports: [DataTableDirective, BaseDemoComponent],
  templateUrl: './angular-way.component.html',
  styleUrl: './angular-way.component.css',
})
export class AngularWayComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly pageTitle = 'Angular way';
  readonly mdIntro = 'docs/basic/angular-way/intro.md';
  readonly mdHTML = 'docs/basic/angular-way/source-html.md';
  readonly mdTSV1 = 'docs/basic/angular-way/source-ts.md';

  dtOptions: ADTSettings = {};
  readonly persons = signal<Person[]>([]);

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject<ADTSettings | null>();

  private readonly dataService = inject(AngularWayDataService);

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      lengthMenu: [2, 10, 25],
    };
  }

  ngAfterViewInit() {
    this.dataService.obtainData().subscribe((data) => {
      this.persons.set(data.data);
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next(null);
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
