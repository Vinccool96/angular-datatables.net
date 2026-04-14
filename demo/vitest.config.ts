import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: './demo/setup-test.ts',
  },
});
