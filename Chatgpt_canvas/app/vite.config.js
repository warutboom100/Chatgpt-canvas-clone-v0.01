import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: ["UI_API_IP_ADDRESS","Admin_API_IP_ADDRESS"],
  plugins: [react()],
  define: {
    global: {},
  },
})
