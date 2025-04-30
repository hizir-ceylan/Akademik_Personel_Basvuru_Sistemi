import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Proxy ayarı
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3001"
    }
  }
})
