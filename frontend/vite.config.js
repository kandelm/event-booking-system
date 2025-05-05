import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: { '.js': 'jsx' },
  },
  server: {
    port: 5173,
    strictPort: true,
    open: true,
  },
});