import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// Served behind images-pipeline under /ai/
export default defineConfig({
  base: '/ai/',
  plugins: [react()],
  server: {
    host: true,
    port: 8080,
  },
})
