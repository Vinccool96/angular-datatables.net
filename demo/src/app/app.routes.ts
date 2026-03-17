import { Routes } from '@angular/router';

import { advancedRoutes } from './advanced/advanced.routes';
import { basicRoutes } from './basic/basic.routes';
import { extensionsRoutes } from './extensions/extensions.routes';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/welcome',
  },
  {
    loadComponent: () => import('./welcome/welcome.component').then((c) => c.WelcomeComponent),
    path: 'welcome',
  },
  {
    loadComponent: () => import('./getting-started/getting-started.component').then((c) => c.GettingStartedComponent),
    path: 'getting-started',
  },
  {
    loadComponent: () => import('./more-help/more-help.component').then((c) => c.MoreHelpComponent),
    path: 'more-help',
  },
  {
    loadComponent: () => import('./person/person.component').then((c) => c.PersonComponent),
    path: 'person/:id',
  },
  {
    loadComponent: () => import('./faq/faq.component').then((c) => c.FaqComponent),
    path: 'faq',
  },
  ...basicRoutes,
  ...advancedRoutes,
  ...extensionsRoutes,
];
