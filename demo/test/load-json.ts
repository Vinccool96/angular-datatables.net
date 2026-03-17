// noinspection ES6UnusedImports

import { ADTSettings } from 'angular-datatables.net';
import { Person } from '../src/app/person/models/person';
import data from '../public/data/data.json';
import dtOptionsJson from '../public/data/dtOptions.json';

export function loadDataJson() {
  return structuredClone(data) as { data: Person[] };
}

export function loadDtOptionsJson() {
  return structuredClone(dtOptionsJson) as ADTSettings;
}
