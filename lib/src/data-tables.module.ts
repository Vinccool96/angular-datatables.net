/**
 * @license MIT
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/vinccool96/angular-datatables.net/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AngularDataTable } from './angular-data-table';

@NgModule({
  exports: [AngularDataTable],
  imports: [CommonModule, AngularDataTable],
})
export class DataTablesModule {}
