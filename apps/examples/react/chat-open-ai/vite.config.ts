import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
      },
    },
  },
  plugins: [react(), cssInjectedByJsPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
