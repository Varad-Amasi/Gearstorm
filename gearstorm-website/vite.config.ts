import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Three.js rarely changes, so give it its own long-lived chunk
          // instead of bundling it with our robot code.
          if (id.includes('node_modules/three/')) {
            return 'three';
          }
          return undefined;
        },
      },
    },
    // The three chunk is inherently large and loads lazily, well after paint.
    chunkSizeWarningLimit: 900,
  },
});
