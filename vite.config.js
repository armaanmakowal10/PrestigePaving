import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// If the site lives in a subpath (e.g. GitHub Pages: username.github.io/repo-name/),
// set base: '/repo-name/' or VITE_BASE in .env.production — see Vite "Public Base Path".
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
