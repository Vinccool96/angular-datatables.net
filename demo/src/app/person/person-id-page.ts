import { JsonPipe, Location } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Person } from './models/person';
import { PersonApi } from './services/person-api';

@Component({
  imports: [JsonPipe],
  selector: 'app-person',
  styleUrl: './person-id-page.css',
  templateUrl: './person-id-page.html',
})
export class PersonIdPage implements OnInit {
  protected readonly person = signal<Person | null>(null);

  private readonly location = inject(Location);
  private readonly personApi = inject(PersonApi);
  private readonly route = inject(ActivatedRoute);

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.person.set(this.personApi.getPerson(id));
  }

  protected goBack(): void {
    this.location.back();
  }
}
