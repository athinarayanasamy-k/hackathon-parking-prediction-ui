import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(), tsconfigPaths()],
  server: {
    port: 3000,
    open: true,
    cors: true,
    host: true,
    allowedHosts: ['http://192.168.1.14:8080'],
    hmr: {
      clientPort: 3000,
      protocol: 'wss',
    },
  },
})
