import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // Ignorar el archivo todos.json para evitar recargas cuando json-server lo modifica
      ignored: ['**/todos.json']
    }
  }
})
