import { Routes } from '@angular/router';

export const basicRoutes: Routes = [
  {
    path: 'basic/zero-config',
    loadComponent: () => import('./zero-config/zero-config.component').then((c) => c.ZeroConfigComponent),
  },
  {
    path: 'basic/with-options',
    loadComponent: () => import('./with-options/with-options.component').then((c) => c.WithOptionsComponent),
  },
  {
    path: 'basic/with-ajax',
    loadComponent: () => import('./with-ajax/with-ajax.component').then((c) => c.WithAjaxComponent),
  },
  {
    path: 'basic/with-ajax-callback',
    loadComponent: () =>
      import('./with-ajax-callback/with-ajax-callback.component').then((c) => c.WithAjaxCallbackComponent),
  },
  {
    path: 'basic/new-server-side',
    loadComponent: () => import('./new-server-side/new-server-side.component').then((c) => c.NewServerSideComponent),
  },
  {
    path: 'basic/angular-way',
    loadComponent: () => import('./angular-way/angular-way.component').then((c) => c.AngularWayComponent),
  },
  {
    path: 'basic/server-side-angular-way',
    loadComponent: () =>
      import('./server-side-angular-way/server-side-angular-way.component').then(
        (c) => c.ServerSideAngularWayComponent,
      ),
  },
];
