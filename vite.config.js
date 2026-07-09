import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// If the site lives in a subpath (e.g. GitHub Pages: username.github.io/repo-name/),
// set base: '/repo-name/' or VITE_BASE in .env.production — see Vite "Public Base Path".
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  server: {
    // Honor the port injected by the harness/preview (autoPort) when present.
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
