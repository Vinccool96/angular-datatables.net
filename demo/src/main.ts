import { bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app';
import { appConfig } from './app/app.config';

// eslint-disable-next-line unicorn/prefer-top-level-await
bootstrapApplication(App, appConfig).catch((error: unknown) => {
  console.error(error);
});
