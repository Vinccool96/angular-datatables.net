// noinspection ES6UnusedImports

import { ADTSettings } from 'angular-datatables.net';

import data from '../public/data/data.json';
import dtOptionsJson from '../public/data/dtOptions.json';
import { Person } from '../src/app/person/models/person';

/**
 * Returns the content of `data.json`
 * @returns The data
 */
export function loadDataJson(): { data: Person[] } {
  return structuredClone(data) as { data: Person[] };
}

/**
 * Returns the content of `dtOptions.json`
 * @returns The data
 */
export function loadDtOptionsJson(): ADTSettings {
  return structuredClone(dtOptionsJson) as ADTSettings;
}
