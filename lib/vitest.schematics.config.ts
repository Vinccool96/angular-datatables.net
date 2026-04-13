import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    // List of extensions to try for imports that omit extensions
    extensions: ['.mjs', '.js', '/index.js', '.mts', '.ts', '.jsx', '.tsx'],
  },
  test: {
    globals: true,
    include: ['dist/lib/schematics/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    server: {
      deps: {
        inline: ['@angular', '@angular-devkit/schematics', '@angular-devkit/schematics/tasks'],
      },
    },
  },
});
