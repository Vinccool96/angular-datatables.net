import { Routes } from '@angular/router';

export const extensionsRoutes: Routes = [
  {
    path: 'extensions/buttons',
    loadComponent: () => import('./buttons/buttons.component').then((c) => c.ButtonsComponent),
  },
  {
    path: 'extensions/colreorder',
    loadComponent: () => import('./colreorder/colreorder.component').then((c) => c.ColreorderComponent),
  },
  {
    path: 'extensions/fixedcolumns',
    loadComponent: () => import('./fixedcolumns/fixedcolumns.component').then((c) => c.FixedcolumnsComponent),
  },
  {
    path: 'extensions/responsive',
    loadComponent: () => import('./responsive/responsive.component').then((c) => c.ResponsiveComponent),
  },
  {
    path: 'extensions/select',
    loadComponent: () => import('./select/select.component').then((c) => c.SelectComponent),
  },
];
