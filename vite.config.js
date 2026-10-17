import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/api': {
        target: 'https://ads-wheeler-backend.vercel.app',
        changeOrigin: true,
        secure: true
      }
    }
  }
});
