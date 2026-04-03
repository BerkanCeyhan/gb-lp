import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const version = process.env.VITE_VERSION || '';
const base = version ? `/gb/${version}/` : '/';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base,
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'vendor-react';
          if (id.includes('node_modules/gsap')) return 'vendor-gsap';
          if (id.includes('node_modules/lucide-react')) return 'vendor-ui';
        }
      }
    }
  }
})