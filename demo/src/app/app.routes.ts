import { Routes } from '@angular/router';
import { basicRoutes } from './basic/basic.routes';
import { advancedRoutes } from './advanced/advanced.routes';
import { extensionsRoutes } from './extensions/extensions.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadComponent: () => import('./welcome/welcome.component').then((c) => c.WelcomeComponent),
  },
  {
    path: 'getting-started',
    loadComponent: () => import('./getting-started/getting-started.component').then((c) => c.GettingStartedComponent),
  },
  {
    path: 'more-help',
    loadComponent: () => import('./more-help/more-help.component').then((c) => c.MoreHelpComponent),
  },
  {
    path: 'person/:id',
    loadComponent: () => import('./person/person.component').then((c) => c.PersonComponent),
  },
  {
    path: 'faq',
    loadComponent: () => import('./faq/faq.component').then((c) => c.FaqComponent),
  },
  ...basicRoutes,
  ...advancedRoutes,
  ...extensionsRoutes,
];
