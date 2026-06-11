import { webdriverio } from '@vitest/browser-webdriverio';
import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      instances: [{ browser: 'firefox', headless: true }],
      provider: webdriverio({
        capabilities: {
          'browserName': 'firefox',
          'wdio:geckodriverOptions': {
            binary: path.resolve(process.cwd(), 'drivers/geckodriver.exe'),
          },
        },
      }),
    },
    setupFiles: './demo/setup-test.ts',
  },
});
