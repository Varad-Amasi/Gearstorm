import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { siteUrlPlugin } from './vite.siteUrlPlugin.ts';

const proxy = {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true,
  },
  '/uploads': {
    target: 'http://localhost:3000',
    changeOrigin: true,
  },
} as const;

export default defineConfig({
  plugins: [
    react(),
    siteUrlPlugin(),
    visualizer({
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
      open: false,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/three/')) {
            return 'three';
          }
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router')
          ) {
            return 'react-vendor';
          }
          if (
            id.includes('node_modules/@tanstack/') ||
            id.includes('node_modules/axios/')
          ) {
            return 'data-vendor';
          }
          return undefined;
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
  server: {
    proxy,
    watch: {
      // Word files in public/docs lock on Windows and crash chokidar.
      ignored: ['**/public/docs/**'],
    },
  },
  preview: { proxy },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: [
        'src/schemas/**/*.ts',
        'src/services/apiClient.ts',
        'src/components/forms/ContactForm.tsx',
        'src/components/forms/RegistrationForm.tsx',
        'src/components/forms/TeamMemberFields.tsx',
      ],
      thresholds: {
        lines: 70,
        functions: 65,
        statements: 70,
      },
    },
  },
});
