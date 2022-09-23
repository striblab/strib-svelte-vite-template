import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [svelte(), viteCompression()],
  experimental: {
    renderBuiltUrl(filename, type) {
      return `${filename}.gz` // To use gzipped assets in the built index.html
    }
  }
})