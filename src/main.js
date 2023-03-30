import './scss/style.scss'
import App from './App.svelte'

// Serve local webfonts during dev 
if (import.meta.env.DEV) {
  import("./scss/local-webfonts.scss")
} 

document.getElementById('proj-container').innerHTML = ""
const app = new App({
  target: document.getElementById('proj-container')
})

export default app
