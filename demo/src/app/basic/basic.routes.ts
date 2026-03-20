import { Routes } from '@angular/router';

export const basicRoutes: Routes = [
  {
    loadComponent: () => import('./zero-config-example/zero-config-example').then((c) => c.ZeroConfigExample),
    path: 'basic/zero-config',
  },
  {
    loadComponent: () => import('./with-options-example/with-options-example').then((c) => c.WithOptionsExample),
    path: 'basic/with-options',
  },
  {
    loadComponent: () => import('./with-ajax-example/with-ajax.component').then((c) => c.WithAjaxComponent),
    path: 'basic/with-ajax',
  },
  {
    loadComponent: () =>
      import('./with-ajax-callback/with-ajax-callback-example').then((c) => c.WithAjaxCallbackExample),
    path: 'basic/with-ajax-callback',
  },
  {
    loadComponent: () =>
      import('./new-server-side-example/new-server-side-example').then((c) => c.NewServerSideExample),
    path: 'basic/new-server-side',
  },
  {
    loadComponent: () => import('./angular-way/angular-way-example').then((c) => c.AngularWayExample),
    path: 'basic/angular-way',
  },
  {
    loadComponent: () =>
      import('./server-side-angular-way-example/server-side-angular-way-example').then(
        (c) => c.ServerSideAngularWayExample,
      ),
    path: 'basic/server-side-angular-way',
  },
];
