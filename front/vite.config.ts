import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import tsconfingPaths from 'vite-tsconfig-paths';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfingPaths()],
  base: './',
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
  },
  server: {
    fs: {
      cachedChecks: false,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      exclude: [
        ...(configDefaults.coverage.exclude as string[]),
        'src/test',
        'src/main.tsx',
      ],
    },
  },
});
