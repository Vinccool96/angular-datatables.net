// noinspection ES6UnusedImports

import type { ADTSettings } from 'angular-datatables.net';

import type { Person } from '../src/app/person/models/person';

import data from '../public/data/data.json';
import dtOptionsJson from '../public/data/dtOptions.json';

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
