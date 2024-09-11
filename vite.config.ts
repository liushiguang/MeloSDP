import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      proxy: {
          // 将所有以 /api 开头的请求代理到 http://localhost:5000
          '/api': {
              target: 'http://localhost:5000',
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ''),
          },
      },
  },
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'./src'),
    }
  }
})
