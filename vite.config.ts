import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/miraeN_function_test/',
  server: {
    port: 8080,
    open: "/miraeN_function_test/"
  }
})
