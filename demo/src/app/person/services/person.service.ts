import { Injectable } from '@angular/core';

import { Person } from '../models/person';

import data from '../../../../public/data/data.json';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  getPerson(id: string): Person | null {
    const persons: Person[] = data.data;
    return persons.find((person) => person.id === parseInt(id)) ?? null;
  }
}
