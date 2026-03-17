/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/vinccool96/angular-datatables.net/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DataTableDirective } from './angular-datatables.directive';

@NgModule({
  exports: [DataTableDirective],
  imports: [CommonModule, DataTableDirective],
})
export class DataTablesModule {}
