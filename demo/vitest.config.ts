import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    browser: {
      screenshotFailures: false,
    },
    setupFiles: './demo/setup-test.ts',
  },
});
