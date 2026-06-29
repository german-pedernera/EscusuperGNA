import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo-escusuper.jpeg', 'favicon.svg'],
      manifest: {
        name: 'Escuela Superior Gendarmería',
        short_name: 'EscuSuper',
        description: 'Taller de Evaluación - Escuela Superior de Gendarmería',
        theme_color: '#1a3328',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'logo-escusuper.jpeg',
            sizes: '192x192',
            type: 'image/jpeg'
          },
          {
            src: 'logo-escusuper.jpeg',
            sizes: '512x512',
            type: 'image/jpeg'
          }
        ]
      }
    })
  ],
})
