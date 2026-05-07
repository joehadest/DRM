import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Expõe na rede local (tablet/celular na mesma Wi‑Fi)
    host: true,
    port: 5173,
  },
})
