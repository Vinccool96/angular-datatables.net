import { Routes } from '@angular/router';

export const extensionsRoutes: Routes = [
  {
    loadComponent: () => import('./buttons-example/buttons-example').then((c) => c.ButtonsExample),
    path: 'extensions/buttons',
  },
  {
    loadComponent: () => import('./colreorder-example/colreorder-example').then((c) => c.ColreorderExample),
    path: 'extensions/colreorder',
  },
  {
    loadComponent: () => import('./fixedcolumns-example/fixedcolumns-example').then((c) => c.FixedcolumnsExample),
    path: 'extensions/fixedcolumns',
  },
  {
    loadComponent: () => import('./responsive-example/responsive-example').then((c) => c.ResponsiveExample),
    path: 'extensions/responsive',
  },
  {
    loadComponent: () => import('./select-example/select-example').then((c) => c.SelectExample),
    path: 'extensions/select',
  },
];
