import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 상대 경로 설정을 통해 배포 시 리소스 경로 문제 해결
  server: {
    host: true,
  }
})
