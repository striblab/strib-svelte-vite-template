import './scss/style.scss'
import App from './App.svelte'

// Serve local webfonts during dev 
// but switch to CORS-controlled hosted versions for build
if (import.meta.env.DEV) {
  import("./scss/local-webfonts.scss")
} 
if (import.meta.env.PROD) {
  import("./scss/strib-webfonts.scss")
}

const app = new App({
  target: document.getElementById('proj-container')
})

export default app
