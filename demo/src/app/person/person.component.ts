import { JsonPipe, Location } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Person } from './models/person';
import { PersonService } from './services/person.service';

@Component({
  imports: [JsonPipe],
  selector: 'app-person',
  styleUrl: './person.component.css',
  templateUrl: './person.component.html',
})
export class PersonComponent implements OnInit {
  protected readonly person = signal<Person | null>(null);

  private readonly location = inject(Location);
  private readonly personService = inject(PersonService);
  private readonly route = inject(ActivatedRoute);

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.person.set(this.personService.getPerson(id));
  }

  protected goBack(): void {
    this.location.back();
  }
}
