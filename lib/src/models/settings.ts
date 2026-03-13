import { PipeTransform, TemplateRef } from '@angular/core';
import { Config, ConfigColumns } from 'datatables.net';

export interface ADTSettings extends Config {
  columns?: ADTColumns[];
}

export interface ADTColumns extends ConfigColumns {
  /** Define the column's unique identifier */
  id?: string;
  /** Set instance of Angular pipe to transform the data of particular column */
  ngPipeInstance?: PipeTransform;
  /** Define the arguments for the transform method of the pipe, to change its behavior */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ngPipeArgs?: any[];
  /** Set `TemplateRef` to transform the data of this column */
  ngTemplateRef?: ADTTemplateRef;
}

export interface ADTTemplateRef {
  /** `TemplateRef` to work with */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: TemplateRef<any>;
  /** */
  context?: ADTTemplateRefContext;
}

export interface ADTTemplateRefContext {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  captureEvents: Function;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userData?: any;
}
