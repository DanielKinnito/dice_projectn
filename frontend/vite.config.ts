import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/dice': {
        target: 'http://localhost:8000', // Django dev server
        changeOrigin: true,
      },
    }
  }
})
