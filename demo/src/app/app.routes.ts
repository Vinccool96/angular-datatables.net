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
    loadComponent: () => import('./welcome-page/welcome-page').then((c) => c.WelcomePage),
    path: 'welcome',
  },
  {
    loadComponent: () => import('./getting-started-page/getting-started-page').then((c) => c.GettingStartedPage),
    path: 'getting-started',
  },
  {
    loadComponent: () => import('./more-help-page/more-help-page').then((c) => c.MoreHelpPage),
    path: 'more-help',
  },
  {
    loadComponent: () => import('./person/person-id-page').then((c) => c.PersonIdPage),
    path: 'person/:id',
  },
  {
    loadComponent: () => import('./faq-page/faq-page').then((c) => c.FaqPage),
    path: 'faq',
  },
  ...basicRoutes,
  ...advancedRoutes,
  ...extensionsRoutes,
];
