import { Routes } from '@angular/router';

export const extensionsRoutes: Routes = [
  {
    loadComponent: () => import('./buttons/buttons.component').then((c) => c.ButtonsComponent),
    path: 'extensions/buttons',
  },
  {
    loadComponent: () => import('./colreorder/colreorder.component').then((c) => c.ColreorderComponent),
    path: 'extensions/colreorder',
  },
  {
    loadComponent: () => import('./fixedcolumns/fixedcolumns.component').then((c) => c.FixedcolumnsComponent),
    path: 'extensions/fixedcolumns',
  },
  {
    loadComponent: () => import('./responsive/responsive.component').then((c) => c.ResponsiveComponent),
    path: 'extensions/responsive',
  },
  {
    loadComponent: () => import('./select/select.component').then((c) => c.SelectComponent),
    path: 'extensions/select',
  },
];
