import { Injectable } from '@angular/core';

import data from '../../../../public/data/data.json';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  public getPerson(id: string): Person | null {
    const persons: Person[] = data.data;
    return persons.find((person) => person.id === Number.parseInt(id)) ?? null;
  }
}
