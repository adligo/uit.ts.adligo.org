// vite.config.js
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { resolve } from 'path';
import checker from 'vite-plugin-checker';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'public/index.html'),
      },
    },
  },
  plugins: [
    nodePolyfills(),
    checker({
      typescript: true, // Use tsc for type checking
    }),
  ],
});