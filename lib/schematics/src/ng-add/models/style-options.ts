export enum ADTStyleOptions {
  BS3 = 'bs3',
  BS4 = 'bs4',
  BS5 = 'bs5',
  DT = 'dt',
}

export const ADT_SUPPORTED_STYLES = [
  {
    angularJson: [
      {
        fancyName: 'DataTables.net Core CSS',
        path: 'node_modules/datatables.net-dt/css/jquery.dataTables.min.css',
        target: 'styles',
      },
    ],
    packageJson: [{ isDev: false, name: 'datatables.net-dt', version: '^2.0.3' }],
    style: ADTStyleOptions.DT,
  },
  {
    angularJson: [
      {
        fancyName: 'DataTables.net Bootstrap 3 CSS',
        path: 'node_modules/datatables.net-bs/css/dataTables.bootstrap.min.css',
        target: 'styles',
      },
      {
        fancyName: 'DataTables.net Bootstrap 3 JS',
        path: 'node_modules/datatables.net-bs/js/dataTables.bootstrap.min.js',
        target: 'scripts',
      },
    ],
    packageJson: [{ isDev: false, name: 'datatables.net-bs', version: '^2.0.3' }],
    style: ADTStyleOptions.BS3,
  },
  {
    angularJson: [
      {
        fancyName: 'DataTables.net Bootstrap 4 CSS',
        path: 'node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css',
        target: 'styles',
      },
      {
        fancyName: 'DataTables.net Bootstrap 4 JS',
        path: 'node_modules/datatables.net-bs4/js/dataTables.bootstrap4.min.js',
        target: 'scripts',
      },
    ],
    packageJson: [{ isDev: false, name: 'datatables.net-bs4', version: '^2.0.3' }],
    style: ADTStyleOptions.BS4,
  },
  {
    angularJson: [
      {
        fancyName: 'DataTables.net Bootstrap 5 CSS',
        path: 'node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css',
        target: 'styles',
      },
      {
        fancyName: 'DataTables.net Bootstrap 5 JS',
        path: 'node_modules/datatables.net-bs5/js/dataTables.bootstrap5.min.js',
        target: 'scripts',
      },
    ],
    packageJson: [{ isDev: false, name: 'datatables.net-bs5', version: '^2.0.3' }],
    style: ADTStyleOptions.BS5,
  },
];
