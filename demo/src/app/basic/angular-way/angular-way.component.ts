import { AfterViewInit, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ADTSettings, DataTableDirective } from 'angular-datatables.net';
import { Subject } from 'rxjs';

import { Person } from '../../person/models/person';
import { BaseDemoComponent } from '../../shared/components/base-demo/base-demo.component';
import { AngularWayDataService } from './services/angular-way-data.service';

@Component({
  imports: [DataTableDirective, BaseDemoComponent],
  selector: 'app-angular-way',
  styleUrl: './angular-way.component.css',
  templateUrl: './angular-way.component.html',
})
export class AngularWayComponent implements AfterViewInit, OnDestroy, OnInit {
  dtOptions: ADTSettings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject<ADTSettings | null>();
  readonly mdHTML = 'docs/basic/angular-way/source-html.md';
  readonly mdIntro = 'docs/basic/angular-way/intro.md';

  readonly mdTSV1 = 'docs/basic/angular-way/source-ts.md';
  readonly pageTitle = 'Angular way';

  readonly persons = signal<Person[]>([]);

  private readonly dataService = inject(AngularWayDataService);

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

  ngOnInit(): void {
    this.dtOptions = {
      lengthMenu: [2, 10, 25],
      pageLength: 2,
      pagingType: 'full_numbers',
    };
  }
}
