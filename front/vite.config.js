import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import tsconfingPaths from 'vite-tsconfig-paths';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfingPaths()],
    base: '/quizApp/',
    css: {
        postcss: './postcss.config.js',
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
        css: true,
        coverage: {
            provider: 'v8',
            exclude: [
                ...configDefaults.coverage.exclude,
                'src/test',
                'src/main.tsx',
            ],
        },
    },
});
