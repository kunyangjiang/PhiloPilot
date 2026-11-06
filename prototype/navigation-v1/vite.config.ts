import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// The prototype reads the real course draft directly from E:\PhiloPilot\content
// (read-only). The content folder is the only location outside this prototype
// that the dev server is allowed to serve.
const root = fileURLToPath(new URL('.', import.meta.url));
const contentDir = fileURLToPath(new URL('../../content', import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@content': contentDir },
  },
  server: {
    port: 5178,
    strictPort: false,
    fs: { allow: [root, contentDir] },
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
