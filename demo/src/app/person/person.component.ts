import { JsonPipe, Location } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PersonService } from './services/person.service';
import { Person } from './models/person';

@Component({
  selector: 'app-person',
  imports: [JsonPipe],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css',
})
export class PersonComponent implements OnInit {
  protected readonly person = signal<Person | null>(null);

  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);
  private readonly personService = inject(PersonService);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.person.set(this.personService.getPerson(id));
  }

  goBack(): void {
    this.location.back();
  }
}
