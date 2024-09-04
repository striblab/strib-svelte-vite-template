import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [svelte(), viteCompression(
    {
      filter: /\.(js|css|html|svg)$/, // Compress only these file types
    }
  )],
  experimental: {
    renderBuiltUrl(filename, { type }) {
      if (type === 'public' && /\.(js|css|html|svg)$/.test(filename)) {
        return `/${filename}.gz`; // Add leading slash and append .gz to specified types
      }
      return `/${filename}`; // Add leading slash for other files like fonts
    }
  }
})