// noinspection ES6UnusedImports

import { ADTSettings } from 'angular-datatables.net';

import data from '../public/data/data.json';
import dtOptionsJson from '../public/data/dtOptions.json';
import { Person } from '../src/app/person/models/person';

export function loadDataJson() {
  return structuredClone(data) as { data: Person[] };
}

export function loadDtOptionsJson() {
  return structuredClone(dtOptionsJson) as ADTSettings;
}
