import { Routes } from '@angular/router';

export const advancedRoutes: Routes = [
  {
    path: 'advanced/custom-range-search',
    loadComponent: () =>
      import('./custom-range-search/custom-range-search.component').then((c) => c.CustomRangeSearchComponent),
  },
  {
    path: 'advanced/dt-instance',
    loadComponent: () => import('./dt-instance/dt-instance.component').then((c) => c.DtInstanceComponent),
  },
  {
    path: 'advanced/individual-column-filtering',
    loadComponent: () =>
      import('./individual-column-filtering/individual-column-filtering.component').then(
        (c) => c.IndividualColumnFilteringComponent,
      ),
  },
  {
    path: 'advanced/load-dt-options-with-promise',
    loadComponent: () =>
      import('./load-dt-options-with-promise/load-dt-options-with-promise.component').then(
        (c) => c.LoadDtOptionsWithPromiseComponent,
      ),
  },
  {
    path: 'advanced/multiple-tables',
    loadComponent: () => import('./multiple-tables/multiple-tables.component').then((c) => c.MultipleTablesComponent),
  },
  {
    path: 'advanced/rerender',
    loadComponent: () => import('./rerender/rerender.component').then((c) => c.RerenderComponent),
  },
  {
    path: 'advanced/router-link',
    loadComponent: () => import('./router-link/router-link.component').then((c) => c.RouterLinkComponent),
  },
  {
    path: 'advanced/row-click',
    loadComponent: () => import('./row-click/row-click.component').then((c) => c.RowClickComponent),
  },
  {
    path: 'advanced/using-ng-pipe',
    loadComponent: () => import('./using-ng-pipe/using-ng-pipe.component').then((c) => c.UsingNgPipeComponent),
  },
  {
    path: 'advanced/using-ng-template-ref',
    loadComponent: () =>
      import('./using-ng-template-ref/using-ng-template-ref.component').then((c) => c.UsingNgTemplateRefComponent),
  },
];
