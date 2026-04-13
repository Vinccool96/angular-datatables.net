import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: './dist/lib/schematics',
  resolve: {
    // List of extensions to try for imports that omit extensions
    extensions: ['.mjs', '.js', '/index.js', '.mts', '.ts', '.jsx', '.tsx'],
  },
  test: {
    dir: './dist/lib/schematics',
    globals: true,
  },
});
