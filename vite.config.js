import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  theme:{
    fontFamily:{
      sans:['Poppins','sans-serif'],
    }
  },
  base:"/vjyothi-ecommerce/",
  plugins: [react()]
})
