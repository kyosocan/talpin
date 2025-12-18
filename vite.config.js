import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages 部署时需要设置 base 路径
  // 如果部署到 https://<用户名>.github.io/<仓库名>/
  // 请将 base 设置为 '/<仓库名>/'
  base: '/talpin/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
