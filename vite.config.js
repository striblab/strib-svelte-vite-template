import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  base: '',
  plugins: [
    svelte(),
    viteCompression({
      filter: /\.(js|css|svg)$/, // Compress only these file types
    })
  ]
})
