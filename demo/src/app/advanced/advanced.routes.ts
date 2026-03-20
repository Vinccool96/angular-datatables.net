import { Routes } from '@angular/router';

export const advancedRoutes: Routes = [
  {
    loadComponent: () =>
      import('./custom-range-search/custom-range-search-example').then((c) => c.CustomRangeSearchExample),
    path: 'advanced/custom-range-search',
  },
  {
    loadComponent: () => import('./dt-instance-example/dt-instance-example').then((c) => c.DtInstanceExample),
    path: 'advanced/dt-instance',
  },
  {
    loadComponent: () =>
      import('./individual-column-filtering-example/individual-column-filtering-example').then(
        (c) => c.IndividualColumnFilteringExample,
      ),
    path: 'advanced/individual-column-filtering',
  },
  {
    loadComponent: () =>
      import('./load-dt-options-with-promise/load-dt-options-with-promise-example').then(
        (c) => c.LoadDtOptionsWithPromiseExample,
      ),
    path: 'advanced/load-dt-options-with-promise',
  },
  {
    loadComponent: () =>
      import('./multiple-tables-example/multiple-tables-example').then((c) => c.MultipleTablesExample),
    path: 'advanced/multiple-tables',
  },
  {
    loadComponent: () => import('./rerender-example/rerender-example').then((c) => c.RerenderExample),
    path: 'advanced/rerender',
  },
  {
    loadComponent: () => import('./router-link-example/router-link-example').then((c) => c.RouterLinkExample),
    path: 'advanced/router-link',
  },
  {
    loadComponent: () => import('./row-click-example/row-click-example').then((c) => c.RowClickExample),
    path: 'advanced/row-click',
  },
  {
    loadComponent: () => import('./using-ng-pipe-example/using-ng-pipe-example').then((c) => c.UsingNgPipeExample),
    path: 'advanced/using-ng-pipe',
  },
  {
    loadComponent: () =>
      import('./using-ng-template-ref-example/using-ng-template-ref-example').then((c) => c.UsingNgTemplateRefExample),
    path: 'advanced/using-ng-template-ref',
  },
];
