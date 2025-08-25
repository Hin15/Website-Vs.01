// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/My-web/', // ให้ Vite รู้ว่าเวลาสร้างไฟล์ต้องอิง path นี้
  plugins: [react()],
})
