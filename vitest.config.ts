import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
    environmentOptions: {
      jsdom: {
        // Fix for jsdom issues with mutations
        pretendToBeVisual: true,
      },
    },
    coverage: {
      provider: 'v8', // Make sure coverage works with Stryker
      reporter: ['text', 'json', 'html'],
    },
  },
});
